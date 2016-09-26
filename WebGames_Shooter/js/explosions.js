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
        var particle = new ParticlePrefab();
        var particleScript = particle.GetComponent('ParticleScript');
        particleScript.speed = speed;
        particleScript.color = color;
       
        // Particle will start at explosion center
        particleScript.transform.position = new Vector2(position.x, position.y);
        particleScript.velocity.x = random(-particleScript.speed, particleScript.speed);
        particleScript.velocity.y = random(-particleScript.speed, particleScript.speed);
    }
}