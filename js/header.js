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

    /*
    engine.world.bounds = {
        min: { x: 0, y: 0 }, max: { x: canvasWidth, y: canvasHeight }
    };
    */

    var circleAmount = 50;
    var circles = [];

    // create two boxes and a ground
    for(var i = 0; i < circleAmount; i++) {
        var circle = Bodies.circle((32 + i * 64) % canvasWidth, (32 + (i * 64) / canvasWidth), 32, {
            restitution: 0.2,
            render: {
                sprite: {
                    texture: 'favicon.ico',
                    xScale: 1,
                    yScale: 1,
                },

            }
        });

        circles.push(circle);
    }

    var ground = Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 10, { isStatic: true });
    var leftWall = Bodies.rectangle(-5, canvasHeight / 2,10,canvasHeight, {isStatic: true});
    var rightWall = Bodies.rectangle(canvasWidth + 5, canvasHeight / 2, 10, canvasHeight, {isStatic: true});
    var ceiling = Bodies.rectangle(canvasWidth / 2, -5, canvasWidth, 10, {isStatic: true});

    // add borders to the world
    World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // add shapes to the world
    World.add(engine.world, circles);

    Render.setPixelRatio(render, 'auto');

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
});