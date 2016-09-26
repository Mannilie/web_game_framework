/*
 * Scripts for GameObjects go here
 */

function PlayerScript()
{
    var playerScript = new Component();
    playerScript.speed = 200;
    playerScript.shootRate = 0.05;
    playerScript.shootTimer = 0;
    playerScript.health = 100;
    playerScript.Start = function ()
    {
        this.gameObject.tag = "Player";
        this.transform.scale = 0.4;
    }
    playerScript.update = function (deltaTime)
    {
        var mousePos = Input.GetMousePosition();
        var direction = new Vector2(0, 0);
        direction = mousePos.Minus(this.transform.position);
        direction = direction.GetNormal();
        this.transform.rotation = DirectionToAngle(direction);

        // Have a shoot timer that counts up in seconds using deltaTIme
        this.shootTimer += deltaTime;
        // If the shoot timer has reached the shoot rate
        if (this.shootTimer >= this.shootRate) {
            // Check if the space button was pressed
            if (Input.GetMouseButtonDown('left')) {
                // If it was, shoot the bullet
                this.shoot(direction);

                // Reset the timer
                this.shootTimer = 0;

                // NOTE: See how shootTimer is inside the keypress if statement and not the timer?
                // That's because we want to reset the timer AFTER we shoot the weapon.
            }
        }

        // Movement in different directions
        if (Input.GetKeyDown('left') || Input.GetKeyDown('a')) {
            this.transform.position.x -= this.speed * deltaTime;
        }
        if (Input.GetKeyDown('right') || Input.GetKeyDown('d')) {
            this.transform.position.x += this.speed * deltaTime;
        }
        if (Input.GetKeyDown('up') || Input.GetKeyDown('w')) {
            this.transform.position.y -= this.speed * deltaTime;
        }
        if (Input.GetKeyDown('down') || Input.GetKeyDown('s')) {
            this.transform.position.y += this.speed * deltaTime;
        }

        // Clamp the value of the player's movment so that they can 
        this.transform.position.x = Math.min(Math.max(this.transform.position.x, 0), canvas.width - this.transform.scale);
        this.transform.position.y = Math.min(Math.max(this.transform.position.y, 0), canvas.height - this.transform.scale);
    };
    playerScript.shoot = function (direction)
    {
        // Pre-set the bullet's position to the middle of the player 
        // That way it fires from the center of the player
        var bulletPosition = new Vector2(this.transform.position.x, this.transform.position.y);

        // Calculate velocity to be the normal of the direction 
        // from the player to the mouse
        var mousePos = Input.GetMousePosition();

        // Create a new bullet using the 'Bullet' function
        var bullet = new BulletPrefab();
        var bulletScript = bullet.GetComponent('BulletScript');
        if (bulletScript != null)
        {
            bulletScript.transform.position = bulletPosition;
            bulletScript.transform.rotation = this.transform.rotation;
            bulletScript.velocity = direction;
        }

        var fireSound = new Audio("resources/fire.wav");
        fireSound.play();
    };
    return playerScript;
}

function EnemyManagerScript()
{
    var enemyManagerScript = new Component();
    enemyManagerScript.isVisible = false;
    enemyManagerScript.spawnRate = 5;
    enemyManagerScript.spawnTimer = 0;
    enemyManagerScript.update = function (deltaTime)
    {
        this.transform.position.x += 0.4 * deltaTime;

        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.spawnRate) {
            var randomPos = new Vector2();
            randomPos.x = random(0, canvas.width);
            randomPos.y = random(0, canvas.height);

            var enemy = new EnemyPrefab();
            var enemyScript = enemy.GetComponent('EnemyScript');
            if (enemyScript != null)
            {
                enemyScript.transform.position = randomPos;
                enemyScript.speed = random(50, 80);
            }

            this.spawnTimer = 0;
        }
    }

    return enemyManagerScript;
}

function EnemyScript()
{
    var enemyScript = new Component();
    enemyScript.name = "Enemy " + enemyScript.instanceId;
    enemyScript.speed = 20.0;
    enemyScript.damage = 1.0;
    enemyScript.attackRate = 1.0;
    enemyScript.attackTimer = 0;
    enemyScript.Start = function ()
    {
        enemyScript.transform.scale = 0.4;
        enemyScript.gameObject.tag = "Enemy";
    }
    enemyScript.update = function (deltaTime)
    {
        var direction = player.transform.position.Minus(this.transform.position);
        direction = direction.GetNormal();

        this.rotation = DirectionToAngle(direction);

        this.transform.position.x += direction.x * this.speed * deltaTime;
        this.transform.position.y += direction.y * this.speed * deltaTime;

        this.attackTimer += deltaTime;
    }
    enemyScript.onCollisionStay = function (col)
    {
        if (col.gameObject.tag == "Player") {
            if (this.attackTimer >= this.attackRate) {
                col.health -= this.damage;
                this.attackTimer = 0;
            }
        }
    }
    return enemyScript;
}


function BulletScript()
{
    var bulletScript = new Component();
    bulletScript.speed = 1000.0;
    bulletScript.velocity = new Vector2();
    bulletScript.direction = new Vector2(0, 0);
    bulletScript.Start = function ()
    {
        bulletScript.transform.scale = 0.1;
    }
    bulletScript.isWithinBounds = function ()
    {
        var pos = this.transform.position;
        if (pos.x >= 0 && pos.x <= canvas.width &&
            pos.y >= 0 && pos.y <= canvas.height) {
            return true;
        }

        CreateExplosion(this.transform.position, 2, 40, "#525252");
        CreateExplosion(this.transform.position, 2, 60, "#FFA318");
        return false;
    };
    bulletScript.update = function (deltaTime)
    {
        this.transform.position.x += this.velocity.x * this.speed * deltaTime;
        this.transform.position.y += this.velocity.y * this.speed * deltaTime;
        if (!this.isWithinBounds()) {
            var bulletSound = new Audio("resources/explosion.wav");
            bulletSound.play();
            Destroy(this.gameObject);
        }
    };
    bulletScript.onCollisionStay = function (col)
    {
        if (col.gameObject.tag == "Enemy") {
            var bulletSound = new Audio("resources/explosion.wav");
            bulletSound.play();
            Destroy(col.gameObject);
            Destroy(this.gameObject);
            CreateExplosion(col.transform.position, 5, 40, "#525252");
            CreateExplosion(col.transform.position, 5, 80, "#FFA318");
        }
    }

    return bulletScript;
}