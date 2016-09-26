function GameObject()
{
    var gameObjectId = gameObjects.length;

    var gameObject =
    {
        name: 'GameObject ' + gameObjectId,
        tag: "null",
        position: new Vector2(),
        velocity: new Vector2(),
        rotation: 0,
        width: 32,
        height: 32,
        scale: 1.0,
        color: "white",
        isActive: true,
        isVisible: true,
        getWidth: function() {
            return this.width * this.scale;
        },
        getHeight: function() {
            return this.height * this.scale;
        },
        update: function (deltaTime)
        {
            console.log("You must override the 'update' function for " + this.name);
        },
        draw: function ()
        {
            if (this.isVisible)
            {
                // Use this function to draw elements
                context.save();
                context.translate(this.position.x, this.position.y);

                context.scale(this.scale, this.scale);

                //context.translate(this.position.x, this.position.y);
                context.rotate(this.rotation);
                //context.translate(-this.position.x, -this.position.y);

                context.fillStyle = this.color;
                context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
                context.restore();
            }
        },
        onCollisionStay: function (collidedObject)
        {
            // Use this function to handle collision response
        }
    }

    gameObjects.push(gameObject);

    return gameObject;
}