/*
 * Sprites
 */
var sprites = [
    'default.png',
    'player.png'
];

/*
 * Player GameObject
 */
function PlayerPrefab()
{
    var playerPrefab = new GameObject();
    playerPrefab.AddComponent(new SpriteRenderer());
    playerPrefab.AddComponent(new CircleCollider());
    playerPrefab.AddComponent(new PlayerScript());
    playerPrefab.name = "Player 1";
    playerPrefab.tag = "Player";
    return playerPrefab;
}

/*
 * Bullets
 */

// Bullet object function
function BulletPrefab()
{
    var bullet = new GameObject();
    bullet.AddComponent(new SpriteRenderer());
    bullet.AddComponent(new BulletScript());
    bullet.AddComponent(new CircleCollider());
    return bullet;
}

/*
 * Enemy Manager
 */
function EnemyManagerPrefab()
{
    var enemyManager = new GameObject();
    enemyManager.name = "Enemy Manager";
    enemyManager.AddComponent(new EnemyManagerScript());
    return enemyManager;
}

/*
 * Enemy GameObject
 */
function EnemyPrefab()
{
    var enemy = new GameObject();
    enemy.name = "Enemy";
    enemy.tag = "Enemy";
    enemy.color = "red";
    enemy.AddComponent(new EnemyScript());
    enemy.AddComponent(new SpriteRenderer());
    enemy.AddComponent(new CircleCollider());
    return enemy;
}

/*
 * Crosshair
 */

$('body').css('cursor', 'none');

var crosshair = new GameObject();
crosshair.AddComponent(new CircleCollider());
crosshair.color = "red";
crosshair.radius = 30;
crosshair.update = function (deltaTime)
{
    this.transform.position = Input.GetMousePosition();
}
crosshair.draw = function ()
{
    context.save();
    context.translate(this.transform.position.x, this.transform.position.y);
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

var player;
var enemyManager;

function Start()
{
    player = new PlayerPrefab();
    enemyManager = new EnemyManagerPrefab();
    player.transform.parent = enemyManager.transform;
}

function Update()
{

}