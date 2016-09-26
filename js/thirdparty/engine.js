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

var prevTime = Date.now();
var currTime = 0;
var deltaTime = 0;

// Define the clear color
var CLEAR_COLOR = "white";
var canvasCenter = new Vector2(canvas.width / 2, canvas.height / 2);

// Updates all elements in the game
function UpdateEngine()
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
    for (var i = 0; i < gameObjects.length; i++) {
        gameObjects[i].update(deltaTime);
    }
}

/* Debugging */
$('#content').append("<ul id='debugger'></ul>");
var Debug = {
    log: function (text)
    {
        if (debugging) {
            $('#debugger').append("<li>" + text + "</li>");
        }
    },
    clear: function (text)
    {
        $('#debugger').empty();
    }
}

// Draws all elements to the screen
function DrawEngine()
{
    // Loop through all game objects and draw each element
    for (var i = 0; i < gameObjects.length; i++) {
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

/*
 * Load all sprites
 */
var spriteFolderPath = "resources/sprites/";
for (var i = 0; i < sprites.length; i++) {
    var fileName = sprites[i];
    var image = new Image();
    image.src = spriteFolderPath + fileName;
    loadedImages[fileName] = image;
}

$(window).load(function ()
{
    Start();
    // Loop through all game objects and call update on each
    for (var i = 0; i < gameObjects.length; i++) {
        gameObjects[i].Start();
    }

    // Set interval will call the functions at a... set interval (in milliseconds)
    setInterval(function ()
    {
        Debug.clear();

        // Clear the screen before the frame commenses
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Set a clear color and create our back buffer
        context.fillStyle = CLEAR_COLOR;
        context.fillRect(0, 0, canvas.width, canvas.height);

        Update();

        UpdateEngine();
        DrawEngine();
        Gizmos.Draw();
    }, 1000 / FPS);
});