/*=============================================
-----------------------------------
Copyright (c) 2016 Emmanuel Vaccaro
-----------------------------------
@file: engine.js
@date: 24/03/2016
@author: Emmanuel Vaccaro
@brief: Updates the game, physics & time
===============================================*/

// Setup frames per second (cap)
var FPS = 60;
var debugging = true;

// Obtain the GameCanvas from the document
var canvas = document.getElementById('GameCanvas');
// Get the '2d' context from the canvas for drawing
var context = canvas.getContext('2d');

// List of gameobjects in the scene
var gameObjects = [];
var prevTime = Date.now();
var currTime = 0;
var deltaTime = 0;

// Define the clear color
var CLEAR_COLOR = "white";
var canvasCenter = new Vector2(canvas.width / 2, canvas.height / 2);

// Updates all elements in the game
function Update()
{
    // Calculate deltaTime
    currTime = Date.now();
    deltaTime = (currTime - prevTime) / 1000;
    prevTime = currTime;

    // Automatically scale the canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasCenter = new Vector2(canvas.width / 2, canvas.height / 2);

    HandleCollisions();

    // Loop through all game objects and call update on each
    for (var i = 0; i < gameObjects.length; i++)
{
        gameObjects[i].update(deltaTime);
    }
}
function HandleCollisions()
{
    for (var x = 0; x < gameObjects.length; x++)
{
        for (var y = 0; y < gameObjects.length; y++)
{
            var colA = gameObjects[x];
            var colB = gameObjects[y];
            if (!Object.is(colA, colB) &&
                colA.isVisible && colB.isVisible)
{
                if (Collides(colA, colB))
{
                    // Collision is touching
                    colA.onCollisionStay(colB);
                    colB.onCollisionStay(colA);
                }
            }
        }
    }
}
function Collides(colA, colB)
{
    if (Math.abs(colA.position.x - colB.position.x) < colA.getWidth() / 2 + colB.getWidth() / 2)
{
        if (Math.abs(colA.position.y - colB.position.y) < colA.getHeight() / 2 + colB.getHeight() / 2)
{
            return true;
        }
    }
    return false;
}

/* Debugging */
$('#content').append("<ul id='debugger'></ul>");
var Debug = {
    log: function (text)
{
        $('#debugger').append("<li>" + text + "</li>");
    },
    clear: function (text)
{
        $('#debugger').empty();
    }
}

// Draws all elements to the screen
function Draw()
{
    // Clear the screen before the frame commenses
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set a clear color and create our back buffer
    context.fillStyle = CLEAR_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Loop through all game objects and draw each element
    for (var i = 0; i < gameObjects.length; i++)
    {
        gameObjects[i].draw();
        Debug.log(gameObjects[i].name);
    }
}
function Destroy(gameObject)
{
    // If a game object is no longer active, remove it from the list
    gameObjects = gameObjects.filter(function (object)
    {
        return !Object.is(gameObject, object);
    });
}


// Helper methods
function random(min, max)
{
    // Randomizes between min and max values
    return min + Math.random() * (max - min);
}

// Set interval will call the functions at a... set interval (in milliseconds)
setInterval(function ()
{
    Debug.clear();
    Update();
    Draw();
}, 1000 / FPS);