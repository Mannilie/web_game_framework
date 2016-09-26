/*
 * Player GameObject
 */
var player = new GameObject();
player.name = "Player 1";
player.tag = "Player";
player.color = "blue";
player.speed = 200;
player.shootRate = 0.15;
player.shootTimer = 0;
player.health = 100;

player.onCollisionStay = function (col)
{
    console.log(this.health);
}

player.update = function (deltaTime)
{
    var mousePos = Input.GetMousePosition();
    var direction = new Vector2(0, 0);
    direction = mousePos.Minus(this.position);
    direction = direction.GetNormal();
    this.rotation = DirectionToAngle(direction);

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
        this.position.x -= this.speed * deltaTime;
    }
    if (Input.GetKeyDown('right') || Input.GetKeyDown('d')) {
        this.position.x += this.speed * deltaTime;
    }
    if (Input.GetKeyDown('up') || Input.GetKeyDown('w')) {
        this.position.y -= this.speed * deltaTime;
    }
    if (Input.GetKeyDown('down') || Input.GetKeyDown('s')) {
        this.position.y += this.speed * deltaTime;
    }

    // Clamp the value of the player's movment so that they can 
    this.position.x = Math.min(Math.max(this.position.x, 0), canvas.width - this.width);
    this.position.y = Math.min(Math.max(this.position.y, 0), canvas.height - this.height);
};
// Shoots a bullet
player.shoot = function (direction)
{
    // Pre-set the bullet's position to the middle of the player 
    // That way it fires from the center of the player
    var bulletPosition = new Vector2(this.position.x, this.position.y);

    // Calculate velocity to be the normal of the direction 
    // from the player to the mouse
    var mousePos = Input.GetMousePosition();

    // Create a new bullet using the 'Bullet' function
    var bullet = new Bullet();
    bullet.position = bulletPosition;
    bullet.speed = 1000;
    bullet.scale = 0.5;
    bullet.rotation = this.rotation;
    bullet.velocity = direction;

    var fireSound = new Audio("resources/fire.wav");
    fireSound.play();
};

/*
 * Bullets
 */

// Bullet object function
function Bullet()
{
    var bullet = new GameObject();

    bullet.color = "purple";
    bullet.speed = 1.0;
    bullet.direction = new Vector2(0, 0);

    bullet.isWithinBounds = function ()
{
        var pos = this.position;
        if (pos.x >= 0 && pos.x <= canvas.width &&
            pos.y >= 0 && pos.y <= canvas.height) {
            return true;
        }

        CreateExplosion(this.position, 2, 40, "#525252");
        CreateExplosion(this.position, 2, 60, "#FFA318");
        return false;
    };

    bullet.update = function ()
{
        this.position.x += this.velocity.x * this.speed * deltaTime;
        this.position.y += this.velocity.y * this.speed * deltaTime;
        if (!this.isWithinBounds()) {
            var bulletSound = new Audio("resources/explosion.wav");
            bulletSound.play();
            Destroy(this);
        }
    };

    bullet.onCollisionStay = function (col)
{
        if (col.tag == "Enemy") {
            var bulletSound = new Audio("resources/explosion.wav");
            bulletSound.play();
            Destroy(col);
            Destroy(this);
            CreateExplosion(col.position, 5, 40, "#525252");
            CreateExplosion(col.position, 5, 80, "#FFA318");
        }
    }

    return bullet;
}


/*
 * Enemy Manager
 */
var enemyManager = new GameObject();
enemyManager.name = "Enemy Manager";
enemyManager.isVisible = false;
enemyManager.spawnRate = 0.5;
enemyManager.spawnTimer = 0;
enemyManager.update = function (deltaTime)
{
    this.spawnTimer += deltaTime;
    if (this.spawnTimer >= this.spawnRate) {
        var randomPos = new Vector2();
        randomPos.x = random(0, canvas.width);
        randomPos.y = random(0, canvas.height);

        var enemy = new Enemy();
        enemy.position = randomPos;
        enemy.speed = random(50, 80);

        this.spawnTimer = 0;
    }
}

/*
 * Enemy GameObject
 */
function Enemy()
{
    var enemy = new GameObject();
    enemy.name = "Enemy";
    enemy.tag = "Enemy";
    enemy.color = "red";
    enemy.speed = 20.0;
    enemy.damage = 1.0;
    enemy.attackRate = 1.0;
    enemy.attackTimer = 0;
    enemy.update = function (deltaTime)
{
        var direction = player.position.Minus(this.position);
        direction = direction.GetNormal();

        this.rotation = DirectionToAngle(direction);

        this.position.x += direction.x * this.speed * deltaTime;
        this.position.y += direction.y * this.speed * deltaTime;

        this.attackTimer += deltaTime;
    }
    enemy.onCollisionStay = function (col)
{
        if (col.tag == "Player") {
            if (this.attackTimer >= this.attackRate) {
                col.health -= this.damage;
                this.attackTimer = 0;
            }
        }
    }
    return enemy;
}


/*
 * Crosshair
 */

$('body').css('cursor', 'none');
var crosshair = new GameObject();
crosshair.color = "red";
crosshair.radius = 30;
crosshair.update = function (deltaTime)
{
    this.position = Input.GetMousePosition();
}
crosshair.draw = function ()
{
    context.save();
    context.translate(this.position.x, this.position.y);
    context.scale(this.scale, this.scale);

    // Draw first circle
    context.beginPath();
    context.strokeStyle = this.color;
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.closePath();

    // Draw second circle
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(0, 0, this.radius * 0.25, 0, Math.PI * 2);
    context.fill();
    context.closePath();

    context.restore();
}