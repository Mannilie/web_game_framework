function Vector2(x, y)
{
    if (x == undefined) { x = 0; }
    if (y == undefined) { y = 0; }

    return {
        x, y,
        GetDotProduct: function(other) {
            return (x * other.x) + (y * other.y);
        },
        GetMagnitude: function ()
        {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        GetNormal: function ()
        {
            var result = new Vector2();
            var magnitude = this.GetMagnitude();
            if (magnitude != 0) {
                result.x = this.x / magnitude;
                result.y = this.y / magnitude;
            }
            return result;
        },
        Minus: function (other)
        {
            var result = new Vector2();
            result.x = this.x - other.x;
            result.y = this.y - other.y;
            return result;
        },
        Add: function (other)
        {
            var result = new Vector2();
            result.x = this.x += other.x;
            result.y = this.y += other.y;
            return result;
        },
        Multiply: function (other)
        {
            // Note(Manny): Differenciate between Vector2 & floats somehow
            var result = new Vector2();
            result.x = this.x * other;
            result.y = this.y * other;
            return result;
        }
    };
}

function DirectionToAngle(direction)
{
    return Math.atan2(direction.y, direction.x);
}
