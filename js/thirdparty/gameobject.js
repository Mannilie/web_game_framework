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
 * GameObject class 
 */
class GameObject extends BaseObject
{
    constructor(other) 
    {
        super(other);
        this.name = other ? other.name : 'GameObject ' + this.instanceId; // to distinguish between gameobjects
        this.velocity = other ? other.velocity : new Vector();
        this.isActive = other ? other.isActive : true;
        this.tag = other ? other.tag : 'untagged';
        this.layer = other ? other.layer : 'none';
        this.transform = new Transform();
        this.gameObject = this;

        this.components = [];
        if (other && other.components)
        {
            for (var i = 0; i < other.components.length; i++)
            {
                var component = other.components[i];
                this.AddComponent(component.constructor);
            }
        }
    }
   
    Start()
    {
        this.transform.gameObject = this;
        this.transform.transform = this.transform;
        for (var i = 0; i < this.components.length; i++) {
            this.components[i].Start();
        }
    }
    Update()
    {
        this.transform.Update();
        //console.log("You must override the 'update' function for " + this.name);
        for (var i = 0; i < this.components.length; i++)
        {
            this.components[i].Update();
        }
    }
    Draw()
    {
        if (this.isActive)
        {
            for (var i = 0; i < this.components.length; i++) {
                this.components[i].Draw();
            }
        }
    }
    OnCollisionStay(col) {
        // Use this function to handle collision response
        for (var i = 0; i < this.components.length; i++) {
            this.components[i].OnCollisionStay(col);
        }
    }
    AddComponent(componentType)
    {
        var newComponent = null;
        if (componentType.isFunction()) {
            newComponent = new componentType();
        } else {
            newComponent = componentType;
        }
        newComponent.gameObject = this;
        newComponent.transform = this.transform;
        newComponent.InitializeComponent();

        if (engineInitialized)
        {
            newComponent.Start();
        }

        this.components.push(newComponent);
        return newComponent;
    }
    GetComponent(componentType)
    {
        for (var i = 0; i < this.components.length; i++)
        {
            var component = this.components[i];
            if (component instanceof componentType)
            {
                return this.components[i];
            }
        }
        return null;
    }
    GetComponents(componentType)
    {
        var components = [];
        var isFound = false;
        for (var i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof componentType) {
                components.push(this.components[i]);
                isFound = true;
            }
        }
        if (isFound) {
            return components;
        }
        return null;
    }
}

Object.prototype.isFunction = function() {
    var getType = {};
    return this && getType.toString.call(this) === '[object Function]';
}