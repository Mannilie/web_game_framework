/*
 * Your Looks
 */
var sprites = [
    'default.png',
    'laser.png',
    'player.png'
];

/*
 * Sparkles
 */
var particlePrefab = new GameObject()
particlePrefab.AddComponent(new ParticleScript());

/*
 * You
 */
var playerPrefab = new GameObject();
playerPrefab.name = "Player";
playerPrefab.tag = "Player";
playerPrefab.AddComponent(new SpriteRenderer('player.png'));
playerPrefab.AddComponent(new BoxCollider());
playerPrefab.AddComponent(new PlayerScript());

/*
 * Shooty Things
 */
var bulletPrefab = new GameObject();
bulletPrefab.AddComponent(new SpriteRenderer('default.png', 100));
bulletPrefab.AddComponent(new BulletScript());
bulletPrefab.AddComponent(new BoxCollider());

/*
 * Your Boss
 */
var enemyManagerPrefab = new GameObject();
enemyManagerPrefab.name = "Enemy Manager";
enemyManagerPrefab.AddComponent(new EnemyManagerScript());

/*
 * Your Co-Worker
 */
var enemyPrefab = new GameObject();
enemyPrefab.name = "Enemy";
enemyPrefab.tag = "Enemy";
enemyPrefab.color = "red";
enemyPrefab.AddComponent(new EnemyScript());
enemyPrefab.AddComponent(new SpriteRenderer('player.png'));
enemyPrefab.AddComponent(new BoxCollider());

/*
 * How You See Things
 */
var crosshairPrefab = new GameObject();
crosshairPrefab.AddComponent(CrosshairScript);


/* Your Position */
var player = GameObject.Instantiate(playerPrefab);
var enemyManager = GameObject.Instantiate(enemyManagerPrefab);
var crosshair = GameObject.Instantiate(crosshairPrefab);
