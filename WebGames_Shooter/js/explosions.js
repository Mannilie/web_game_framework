/*
 * Basic explosion, all particles move and shrink at the same speed
 * 
 * Parameter : explosion center position
 */

function CreateExplosion(position, count, speed, color)
{
    // Creating 4 particles that scatter at 0,d 90, 180 & 270 degrees
    for (var i = 0; i < count; i++)
    {
        var particle = Particle();
        particle.speed = speed;
        particle.color = color;

        // Particle will start at explosion center
        particle.position = new Vector2(position.x, position.y);
        particle.velocity.x = random(-particle.speed, particle.speed);
        particle.velocity.y = random(-particle.speed, particle.speed);
    }
}

function Particle()
{
    var particle = new GameObject();
    particle.radius = 20;
    particle.velocity = new Vector2(0, 0);
    particle.scaleSpeed = 1;
    particle.speed = 100.0;
    particle.scale = 1.0;
    
    particle.update = function (dt)
    {
        // Shrinking
        this.scale -= this.scaleSpeed * dt;

        if (this.scale <= 0)
        {
            Destroy(this);
        }

        // Moving away from explosion center
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
    };

    particle.draw = function()
    {
        // translating the particle's coordinates
        context.save();
        
        context.translate(this.position.x, this.position.y);

        // scaling particle
        context.scale(this.scale, this.scale);

        // drawing a filled circle in the particle's local space
        context.beginPath();
        context.arc(-this.radius / 2, -this.radius / 2, this.radius, 0, Math.PI * 2, true);
        context.closePath();

        context.fillStyle = this.color;
        context.fill();

        context.restore();
    }

    return particle;
}

function random(min, max)
{
    return min + Math.random() * (max - min);
}