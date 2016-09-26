// Dictionary of keycodes
var keys = {};

keys['w'] = 87;
keys['a'] = 65;
keys['s'] = 83;
keys['d'] = 68;
keys['space'] = 32;
keys['left'] = 37;
keys['up'] = 38;
keys['right'] = 39;
keys['down'] = 40;

// Dictionary of mouse button codes
var mouseButtons = {};

mouseButtons['left'] = 1;
mouseButtons['middle'] = 2;
mouseButtons['right'] = 3;

// Input object that handles input throughout the project
var Input = {
    _keysDown: [],
    _mousePosition: new Vector2(),
    _mouseButtonsDown: [],

    // Returns the mouse position variable
    GetMousePosition: function()
    {
        return this._mousePosition;
    },

    // Function that checks if a mouse button is down and returns true/false
    GetMouseButtonDown: function(buttonName) {
        // Try and obtain the button code from the list of mouse buttons defined
        var findButtonCode = mouseButtons[buttonName];
        // Check if the button code exists in the list
        if (findButtonCode != undefined) {
            // Check if the button is in the list of mouse buttons down
            if (this._mouseButtonsDown.includes(findButtonCode)) {
                // The button is down!
                return true;
            }
        }
        // The button is NOT down!
        return false;
    },

    // Function that checks if a key is down and returns true/false
    GetKeyDown: function (keyName)
    {
        // Try and obtain the keycode from the list of keys defined
        var findKeyCode = keys[keyName];
        // Check if the keycode exists in the list
        if (findKeyCode != undefined) {
            // Check if the key is in the list of keys down
            if (this._keysDown.includes(findKeyCode)) {
                // The key is down!
                return true;
            }
        } else {
            // Print error message otherwise
            console.error("The key name '" + keyName + "' is not defined inside of 'keys'");
        }
        // The key is NOT down
        return false;
    }
}

/*
 * Document events
 */

// Add an event to the document that gets the mouse position
$(document).mousemove(function (event)
{
    // Set the mouse positions
    Input._mousePosition.x = event.pageX;
    Input._mousePosition.y = event.pageY;
});

// Add a mousedown event to test for which buttons are down
$(document).mousedown(function (event)
{
    // Push the button that is down onto list
    Input._mouseButtonsDown.push(event.which);
});

// Add a mouseup event to test for mouse buttons which are up
$(document).mouseup(function (event)
{
    // Remove the key that is up from the keysDown list
    Input._mouseButtonsDown = Input._mouseButtonsDown.filter(function (buttonCode)
    {
        return buttonCode != event.which;
    });
})

// Add a keydown event to test for keys that are down
$(document).keydown(function (event)
{
    // Push the key that is down onto list
    Input._keysDown.push(event.keyCode);
});

// Add a keyup event to test for keys that are up
$(document).keyup(function (event)
{
    // Remove the key that is up from the keysDown list
    Input._keysDown = Input._keysDown.filter(function (keyCode)
    {
        return keyCode != event.keyCode;
    });
});