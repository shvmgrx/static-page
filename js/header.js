/**
 * Created by leonhard on 12/07/16.
 */
$(document).ready(function() {

    if($(window).width() < 768 || $(window).height() < 384)
        return;


    var container = document.getElementsByClassName('splash-banner')[0];

    var canvasWidth = $(container).width();
    var canvasHeight = $(container).height();

    $(container).empty();


    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: canvasWidth,
            height: canvasHeight,
            showDebug: true,
            wireframes: false,
            background: '#fff',
        }
    });


    engine.world.bounds = {
        min: { x: 0, y: 0 }, max: { x: canvasWidth, y: canvasHeight }
    };

    engine.world.gravity = {
      x: 0,
      y: 0
    }

    var objects = [];

    var spriteFolder = "assets/images/sprites/"

    var objectTemplates = [
      {file: "jacobshack.png", amount: canvasWidth / 512, width: 280, height: 62},
      {file: "jake.png", amount: canvasWidth / 512, width: 150, height: 246},
      {file: "logo.ico", amount: canvasWidth / 64, circle: true, radius: 32},

      {file: "amazon.png", amount: 1, width: 200, height: 44},
      {file: "bloomberg.png", amount: 1, width: 200, height: 40},
      {file: "cliqz.png", amount: 1, width: 200, height: 51},
      {file: "gsa.png", amount: 1, width: 180, height: 78},
      {file: "hackharassment.png", amount: 1, width: 86, height: 37},
      {file: "mlh.png", amount: 1, width: 280, height: 62},
      {file: "skyscanner.png", amount: 1, width: 516, height: 89},
      {file: "twilio.png", amount: 1, width: 200, height: 60},
      {file: "yelp.png", amount: 1, width: 200, height: 101},

    ]

    var randomPosition = function() {
      return {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight
      }
    }


    var makeObjects = function(objects, position_func) {
      bodies = [];

      for (object of objects) {
        for(var i = 0; i < object.amount; i++) {
          var position = position_func();
          if(object.circle) {
            bodies.push(
              Bodies.circle(position.x, position.y, object.radius, {
                mass: 1, restitution: 0.2,
                render: {
                    sprite: {
                        texture: spriteFolder + object.file,
                        xScale: 1,
                        yScale: 1,
                    },

                }
              })
            );
          } else {
            bodies.push(
              Bodies.rectangle(position.x, position.y, object.width, object.height, {
                mass: 1, restitution: 0.5,
                render: {
                  sprite: {
                    texture: spriteFolder + object.file,
                    xScale: 1,
                    yScale: 1
                  }
                }
              })
            );
          }
        }
      }

      return bodies;
    }

    var shapes = makeObjects(objectTemplates, randomPosition);

    var ground = Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 10, { isStatic: true });
    var leftWall = Bodies.rectangle(-5, canvasHeight / 2,10,canvasHeight, {isStatic: true});
    var rightWall = Bodies.rectangle(canvasWidth + 5, canvasHeight / 2, 10, canvasHeight, {isStatic: true});
    var ceiling = Bodies.rectangle(canvasWidth / 2, -5, canvasWidth, 10, {isStatic: true});

    // add borders to the world
    World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // add shapes to the world
    World.add(engine.world, shapes);


    // Mouse draggy stuff and such
    var mouseConstraint = Matter.MouseConstraint.create(engine, {
        element: render.canvas
    });

    World.add(engine.world, mouseConstraint);


    Render.setPixelRatio(render, 'auto');

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
});
