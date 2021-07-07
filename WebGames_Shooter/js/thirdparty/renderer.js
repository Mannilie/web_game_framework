/*=============================================
-----------------------------------
Copyright (c) 2016 Emmanuel Vaccaro
-----------------------------------
@file: renderer.js
@date: 26/09/2016
@author: Emmanuel Vaccaro
@brief: Component that renders sprites
===============================================*/

function Renderer()
{
    var renderer = new Component();
    //renderer.type.push('Renderer');
    return renderer;
}

function SpriteRenderer(file)
{
    var spriteRenderer = new Renderer();
    //spriteRenderer.type.push('SpriteRenderer');
    spriteRenderer.enabled = true;
    spriteRenderer.color = 'blue';
    spriteRenderer.sprite = new Sprite(file);
    spriteRenderer.update = function (deltaTime) { };
    spriteRenderer.draw = function ()
    {
        if (this.enabled) {
            // Use this function to draw elements
            context.save();
            context.translate(this.transform.position.x, this.transform.position.y);

            context.scale(this.transform.scale, this.transform.scale);

            //context.translate(this.position.x, this.position.y);
            context.rotate(this.transform.rotation);
            //context.translate(-this.position.x, -this.position.y);
            
            this.sprite.draw();
            
            context.restore();
        }
    };
    spriteRenderer.onCollisionStay = function (collidedObject)
    {
        // Use this function to handle collision response
    };

    return spriteRenderer;
}

var loadedImages = [];

function Sprite(file)
{
    if (file == null) { file = 'default.png'; }
    var loadedImage = loadedImages[file];
    if (loadedImage == null)
    {
        loadedImage = loadedImages['default.png'];
    }
    var sprite =
    {
        name: file,
        width: loadedImage.width,
        height: loadedImage.height,
        src: spriteFolderPath + file,
        color: 'blue',
        isLoaded: false,
        image: loadedImage,
        draw: function ()
        {
            if (this.image != null) {
                context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            }
        }
    }

    sprite.image.onload = function ()
    {
        sprite.width = this.width;
        sprite.height = this.height;
    }
    return sprite;
}
