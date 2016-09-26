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