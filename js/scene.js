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
var playerPrefab = new GameObject();
playerPrefab.name = "Player";
playerPrefab.tag = "Player";
playerPrefab.AddComponent(new SpriteRenderer());
playerPrefab.AddComponent(new CircleCollider());
playerPrefab.AddComponent(new PlayerScript());

/*
 * Bullets
 */

// Bullet object function
var bulletPrefab = new GameObject();
bulletPrefab.AddComponent(new SpriteRenderer());
bulletPrefab.AddComponent(new BulletScript());
bulletPrefab.AddComponent(new CircleCollider());

/*
 * Enemy Manager
 */
var enemyManagerPrefab = new GameObject();
enemyManagerPrefab.name = "Enemy Manager";
enemyManagerPrefab.AddComponent(new EnemyManagerScript());

/*
 * Enemy GameObject
 */
var enemyPrefab = new GameObject();
enemyPrefab.name = "Enemy";
enemyPrefab.tag = "Enemy";
enemyPrefab.color = "red";
enemyPrefab.AddComponent(new EnemyScript());
enemyPrefab.AddComponent(new SpriteRenderer());
enemyPrefab.AddComponent(new CircleCollider());


var crosshair = new GameObject();
crosshair.AddComponent(CrosshairScript);

var player = GameObject.Instantiate(playerPrefab);
var enemyManager = GameObject.Instantiate(enemyManagerPrefab);
