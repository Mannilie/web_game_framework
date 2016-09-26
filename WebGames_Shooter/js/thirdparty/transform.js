/*=============================================
-----------------------------------
Copyright (c) 2016 Emmanuel Vaccaro
-----------------------------------
@file: transform.js
@date: 25/03/2016
@author: Emmanuel Vaccaro
@brief: Component that defines position, 
rotation & scale
===============================================*/
function Transform()
{
    var transform = new Component();
    // transform.type.push('Transform');
    transform.parent = null;
    transform.position = new Vector2();
    transform.rotation = 0;
    transform.scale = 1.0;
    transform.update = function (deltaTime)
    {
        if (this.parent != null) {
            this.position.Add(transform.parent.position);
            this.rotation += transform.parent.rotation;
        }
    }
    return transform;
}