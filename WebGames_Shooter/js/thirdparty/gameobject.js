/*=============================================
-----------------------------------
Copyright (c) 2016 Emmanuel Vaccaro
-----------------------------------
@file: gameobject.js
@date: 25/09/2016
@author: Emmanuel Vaccaro
@brief: Class object that defines a GameObject 
entity
===============================================*/

// List of gameobjects in the scene
var gameObjects = [];

/*
 * Object class
 */
var instanceId = 0;
function BaseObject()
{
    var objectId = instanceId++;
    var object =
    {
        transform: null,
        gameObject: null,
        types: [],
        instanceId: objectId,
        name: 'BaseObject ' + this.instanceId,
        Start: function() {},
        update: function (deltaTime) { },
        draw: function () { },
        onCollisionStay: function (col) {},
        CompareType: function(type) {
            for (var i = 0; i < this.types.length; i++) {
                if (this.types[i] == type) {
                    return true;
                }
            }
            return false;
        },
        ToTypes: function ()
        {
            return this.types;
        }
    }
    
    var currentCaller = arguments.callee;
    while (currentCaller != null)
    {
        var callerName = currentCaller.toString();
        callerName = callerName.substr('function '.length);
        callerName = callerName.substr(0, callerName.indexOf('('));

        if (callerName != "")
        {
            object.types.push(callerName);
            currentCaller = currentCaller.caller;
        } else {
            currentCaller = null;
        }

    }

    return object;
}

function Component()
{
    var component = new BaseObject();
    component.InitializeComponent = function () {}
    return component;
}

/*
 * GameObject class 
 */
function GameObject()
{
    var gameObject = new BaseObject();
    gameObject.name = 'GameObject ' + gameObject.instanceId; // to distinguish between gameobjects
    gameObject.transform = new Transform();
    gameObject.velocity = new Vector2();
    gameObject.isActive = true;
    gameObject.tag = 'untagged',
    gameObject.layer = 'none',
    gameObject.components  = [];
    gameObject.getWidth  = function() {
        return this.width * this.scale;
    };
    gameObject.getHeight = function() {
        return this.height * this.scale;
    },
    gameObject.Start = function ()
    {
        this.transform.gameObject = this;
        this.transform.transform = this.transform;
        for (var i = 0; i < this.components.length; i++) {
            this.components[i].Start();
        }
    }
    gameObject.update = function (deltaTime)
    {
        this.transform.update(deltaTime);
        //console.log("You must override the 'update' function for " + this.name);
        for (var i = 0; i < this.components.length; i++)
        {
            this.components[i].update(deltaTime);
        }
    },
    gameObject.draw = function ()
    {
        if (this.isActive)
        {
            for (var i = 0; i < this.components.length; i++) {
                this.components[i].draw();
            }
        }
    },
    gameObject.onCollisionStay = function(col) {
        // Use this function to handle collision response
        for (var i = 0; i < this.components.length; i++) {
            this.components[i].onCollisionStay(col);
        }
    },
    gameObject.AddComponent = function (component)
    {
        component.gameObject = this;
        component.transform = this.transform;
        component.InitializeComponent();
        component.Start();
        this.components.push(component);
    }
    gameObject.GetComponent = function (componentType)
    {
        for (var i = 0; i < this.components.length; i++)
        {
            var component = this.components[i];
            if (component.CompareType(componentType)) {
                return this.components[i];
            }
        }
        return null;
    }
    gameObject.GetComponents = function (componentType)
    {
        var components = [];
        var isFound = false;
        for (var i = 0; i < this.components.length; i++) {
            var typeA = componentType;
            var typeB = this.components[i].ToType();
            if (typeA == typeB) {
                components.push(this.components[i]);
                isFound = true;
            }
        }
        if (isFound) {
            return components;
        }
        return null;
    }
    
    // Add to gameObjects list
    gameObjects.push(gameObject);

    return gameObject;
}