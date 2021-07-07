/*=============================================
-----------------------------------
Copyright (c) 2016 Emmanuel Vaccaro
-----------------------------------
@file: physics.js
@date: 25/03/2016
@author: Emmanuel Vaccaro
@brief: Simulates physics
===============================================*/

function Bounds(width, height)
{
    if (width == null) { width = 10; }
    if (height == null) { height = 10; }
    var bounds =
    {
        size: { width: width, height: height },
        extents: new Vector2(),
        center: new Vector2(),
        max: new Vector2(),
        min: new Vector2(),
    }
    bounds.extents = new Vector2(bounds.size.width / 2, bounds.size.height / 2);
    return bounds;
}

function Collider()
{
    var collider = new Component();
   // collider.type.push('Collider');
    collider.bounds = new Bounds();
    collider.enabled = true;
    return collider;
}

function BoxCollider()
{
    var boxCollider = new Collider();
   // boxCollider.type.push('BoxCollider');
    boxCollider.size = new Vector2(10, 10);
    boxCollider.center = new Vector2();
    boxCollider.InitializeComponent = function ()
    {
        var renderer = this.gameObject.GetComponent('Renderer');
        if (renderer != null) {
            var spriteRenderer = this.gameObject.GetComponent('SpriteRenderer');
            if (spriteRenderer != null) {
                var width = spriteRenderer.sprite.width;
                var height = spriteRenderer.sprite.height;
                this.size = new Vector2(width, height);
            }
        }
    }
    boxCollider.update = function (deltaTime)
    {
        Gizmos.AddBox(this.transform.position, this.size.Multiply(this.transform.scale), 0, "green", false);
    }
    return boxCollider;
}

function CircleCollider()
{
    var circleCollider = new Collider();
    circleCollider.radius = 50.0;
    circleCollider.center = new Vector2();
    circleCollider.InitializeComponent = function ()
    {
        var renderer = this.gameObject.GetComponent('Renderer');
        if (renderer != null) {
            var spriteRenderer = this.gameObject.GetComponent('SpriteRenderer');
            if (spriteRenderer != null) {
                var width = spriteRenderer.sprite.width;
                var height = spriteRenderer.sprite.height;
                this.radius = Math.max(width, height) / 2;
            }
        }
    }
    circleCollider.update = function (deltaTime)
    {
        Gizmos.AddCircle(this.transform.position, this.radius * this.transform.scale, "green", false);
    }
    return circleCollider;
}

function HandleCollisions()
{
    for (var x = 0; x < gameObjects.length; x++) {
        for (var y = 0; y < gameObjects.length; y++) {
            var gameObjectA = gameObjects[x];
            var gameObjectB = gameObjects[y];
            
            // Check if both gameObjects exist
            if (gameObjectA != null && gameObjectB != null &&
                !Object.is(gameObjectA, gameObjectB)) // AND they are not the same
            {
                var colA = gameObjectA.GetComponent('Collider');
                var colB = gameObjectB.GetComponent('Collider');
                // Check if both colliders exist
                if (colA != null && colB != null &&
                    colA.enabled && colB.enabled) // AND they're both enabled
                {
                    // Determine if those objects collide with each other
                    if (Collides(colA, colB)) {
                        // Collision is touching
                        gameObjectA.onCollisionStay(colB);
                        gameObjectB.onCollisionStay(colA);
                    }
                }
            }
        }
    }
}

function Collides(colA, colB)
{
    // Box to Box
    if(colA.CompareType('BoxCollider') && colB.CompareType('BoxCollider')) 
    {
        return BoxToBox(colA, colB);
    }

    // Box to Circle || Circle to Box
    if(colA.CompareType('BoxCollider') && colB.CompareType('CircleCollider') || 
       colB.CompareType('BoxCollider') && colA.CompareType('CircleCollider')) 
    {
        return BoxToCircle(colA, colB);
    }

    // Circle to Circle
    if(colA.CompareType('CircleCollider') && colB.CompareType('CircleCollider')) 
    {
        return CircleToCircle(colA, colB);
    }

    console.log("Error: Cannot detect colliders");
    return false;
}

function BoxToBox(boxA, boxB) 
{
    var boxASize = new Vector2(boxA.size.x * boxA.transform.scale, boxA.size.y * boxA.transform.scale);
    var boxBSize = new Vector2(boxB.size.x * boxB.transform.scale, boxB.size.y * boxB.transform.scale);
    
    if (Math.abs(boxA.transform.position.x - boxB.transform.position.x) < boxASize.x / 2 + boxBSize.x / 2) {
        if (Math.abs(boxA.transform.position.y - boxB.transform.position.y) < boxASize.y / 2 + boxBSize.y / 2) {
            return true;
        }
    }
    return false;
}

function CircleToCircle(circleA, circleB) 
{
    // NEEDS IMPLEMENTATION
    var a = circleA.transform.position.x - circleB.transform.position.x;
    var b = circleA.transform.position.y - circleB.transform.position.y;
    var distance = Math.sqrt(a * a + b * b);
    if (distance < circleA.radius * circleA.transform.scale + circleB.radius * circleB.transform.scale) {
        return true;
    }
    return false;
}

function BoxToCircle(box, circle) 
{
    // NEEDS IMPLEMENTATION
    return false;
}