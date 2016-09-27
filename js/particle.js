/*=============================================
-----------------------------------
Copyright (c) 2016 Emmanuel Vaccaro
-----------------------------------
@file: particle.js
@date: 25/03/2016
@author: Emmanuel Vaccaro
@brief: Defines a particle GameObject
===============================================*/

var particlePrefab = new GameObject()
particlePrefab.AddComponent(new CircleCollider());
particlePrefab.AddComponent(new ParticleScript());
