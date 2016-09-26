/*=============================================
-----------------------------------
Copyright (c) 2016 Emmanuel Vaccaro
-----------------------------------
@file: particle.js
@date: 25/03/2016
@author: Emmanuel Vaccaro
@brief: Defines a particle GameObject
===============================================*/

function ParticlePrefab()
{
    var particle = new GameObject();
    particle.AddComponent(new CircleCollider());
    particle.AddComponent(new ParticleScript());
    return particle;
}

function ParticleScript()
{
    var particleScript = new Component();
    particleScript.radius = 20;
    particleScript.velocity = new Vector2(0, 0);
    particleScript.scaleSpeed = 1;
    particleScript.speed = 100.0;
    particleScript.color = "black";
    particleScript.Start = function ()
    {
        this.transform.scale = 1.0;
        var circleCollider = this.gameObject.GetComponent('CircleCollider');
        circleCollider.radius = this.radius;
    }
    particleScript.update = function (dt)
    {
        // Shrinking
        this.transform.scale -= this.scaleSpeed * dt;

        if (this.transform.scale <= 0) {
            Destroy(this.gameObject);
        }

        // Moving away from explosion center
        this.transform.position.x += this.velocity.x * dt;
        this.transform.position.y += this.velocity.y * dt;
    };
    particleScript.draw = function ()
    {
        // translating the particle's coordinates
        context.save();
        // drawing a filled circle in the particle's local space
        context.translate(this.transform.position.x, this.transform.position.y);
       
        // scaling particle
        context.scale(this.transform.scale, this.transform.scale);
       
        context.fillStyle = this.color;

        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        context.closePath();

        context.fill();

        context.restore();
    }
    return particleScript;
}
