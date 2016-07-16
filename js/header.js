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

    var circleAmount = canvasWidth / 16;
    var circles = [];

    var lightningBoltPath = Matter.Vertices.fromPath("M 346.50,112.50\
    390.00,112.50 520.50,114.00 520.50,114.00\
    520.50,114.00 550.50,43.50 550.50,43.50\
    550.50,43.50 630.00,27.00 630.00,27.00\
    630.00,27.00 607.50,100.50 607.50,100.50\
    607.50,100.50 628.50,94.50 628.50,94.50\
    628.50,94.50 630.00,111.00 630.00,111.00\
    630.00,111.00 805.50,112.50 805.50,112.50\
    805.50,112.50 805.50,397.50 805.50,397.50\
    805.50,397.50 807.00,409.50 807.00,409.50\
    807.00,409.50 828.00,409.50 828.00,409.50\
    828.00,409.50 826.50,454.50 826.50,454.50\
    826.50,454.50 322.50,453.00 322.50,453.00\
    322.50,453.00 319.50,409.50 319.50,409.50\
    319.50,409.50 345.00,408.00 345.00,408.00\
    345.00,408.00 346.50,133.50 346.50,114.00");

    var jHackPath = Matter.Vertices.fromPath("76.50,493.50\
    76.50,493.50 79.50,552.00 79.50,552.00\
    79.50,552.00 118.50,543.00 118.50,543.00\
    118.50,543.00 169.50,547.50 169.50,547.50\
    169.50,547.50 187.50,573.00 187.50,573.00\
    187.50,573.00 219.00,537.00 219.00,537.00\
    219.00,537.00 271.50,543.00 271.50,543.00\
    271.50,543.00 282.00,559.50 282.00,559.50\
    282.00,559.50 310.50,540.00 310.50,540.00\
    310.50,540.00 343.50,540.00 343.50,540.00\
    343.50,540.00 372.00,564.00 372.00,564.00\
    372.00,564.00 391.50,583.50 391.50,583.50\
    391.50,583.50 394.50,495.00 394.50,495.00\
    394.50,495.00 421.50,495.00 421.50,495.00\
    421.50,495.00 421.50,549.00 421.50,549.00\
    421.50,549.00 439.50,538.50 439.50,538.50\
    439.50,538.50 469.50,538.50 469.50,538.50\
    469.50,538.50 484.50,561.00 484.50,561.00\
    484.50,561.00 501.00,558.00 501.00,558.00\
    501.00,558.00 519.00,540.00 519.00,540.00\
    519.00,540.00 576.00,546.00 576.00,546.00\
    576.00,546.00 571.50,597.00 571.50,597.00\
    571.50,597.00 597.00,622.50 597.00,622.50\
    597.00,622.50 625.50,498.00 625.50,498.00\
    625.50,498.00 654.00,498.00 654.00,498.00\
    654.00,498.00 640.50,559.50 640.50,559.50\
    640.50,559.50 693.00,562.50 693.00,562.50\
    693.00,562.50 705.00,498.00 705.00,498.00\
    705.00,498.00 738.00,499.50 738.00,499.50\
    738.00,499.50 726.00,561.00 726.00,561.00\
    726.00,561.00 750.00,562.50 750.00,562.50\
    750.00,562.50 774.00,538.50 774.00,538.50\
    774.00,538.50 838.50,540.00 838.50,540.00\
    838.50,540.00 838.50,567.00 838.50,567.00\
    838.50,567.00 859.50,567.00 859.50,567.00\
    859.50,567.00 909.00,538.50 909.00,538.50\
    909.00,538.50 961.50,543.00 961.50,543.00\
    961.50,543.00 966.00,493.50 966.00,493.50\
    966.00,493.50 999.00,496.50 999.00,496.50\
    999.00,496.50 987.00,586.50 987.00,586.50\
    987.00,586.50 1020.00,541.50 1020.00,541.50\
    1020.00,541.50 1066.50,541.50 1066.50,541.50\
    1066.50,541.50 1078.50,496.50 1078.50,496.50\
    1078.50,496.50 1110.00,496.50 1110.00,496.50\
    1110.00,496.50 1086.00,658.50 1086.00,658.50\
    1086.00,658.50 72.00,660.00 72.00,660.00\
    72.00,660.00 64.50,700.50 64.50,700.50\
    64.50,700.50 19.50,706.50 19.50,706.50\
    19.50,706.50 19.50,678.00 19.50,678.00\
    19.50,678.00 43.50,664.50 43.50,664.50\
    43.50,664.50 42.00,493.50 42.00,493.50\
    42.00,493.50 76.50,495.00 76.50,495.00");

    var lightningBoltObject = Matter.Bodies.fromVertices(64, 32, lightningBoltPath, {isStatic: true,}, false, 0.01, 0);
    var jHackObject = Matter.Bodies.fromVertices(400, 200, jHackPath, {
        isStatic: true,
        restitution: 0.5,
        mass: 2,
        render: {
            sprite: {
                texture: 'assets/images/jacobshack_logo.png',
                xScale: 1,
                yScale: 1,
                yOffset: .34,
            }
        }
    });

    var makeCircle = function(x, y) {
        return Bodies.circle(x || 32, y || 32, 32, {
            restitution: 0.2,
            render: {
                sprite: {
                    texture: 'favicon.ico',
                    xScale: 1,
                    yScale: 1,
                },

            }
        });
    }

    // create two boxes and a ground
    for(var i = 0; i < circleAmount; i++) {
        circles.push(makeCircle((32 + i * 64) % canvasWidth, (32 + (i * 64) / canvasWidth)));
    }

    var ground = Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 10, { isStatic: true });
    var leftWall = Bodies.rectangle(-5, canvasHeight / 2,10,canvasHeight, {isStatic: true});
    var rightWall = Bodies.rectangle(canvasWidth + 5, canvasHeight / 2, 10, canvasHeight, {isStatic: true});
    var ceiling = Bodies.rectangle(canvasWidth / 2, -5, canvasWidth, 10, {isStatic: true});

    // add borders to the world
    World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // add shapes to the world
    World.add(engine.world, circles);

    World.add(engine.world, jHackObject);


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