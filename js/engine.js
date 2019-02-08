/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

const Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    let lastTime=0;
    const
        doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        let now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        lastTime = now;
        win.requestAnimationFrame(main);
    }
    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        lastTime = Date.now();
        main();

    }

    function update(dt) {
        allEnemies.forEach(enemy => {
            enemy.update(dt);
            enemy.checkCollisions();
        });
        allItems.forEach(item =>  item.checkCollected());
        player.update();
    }

    function render() {
        const header = ['images/header.png'];   // Header image
        ctx.drawImage(Resources.get(header[0]), 0, 0);
        const rowImages = [
                'images/water-block.png',    // Top row is water
                'images/stone-block.png',    // Row 1 of 3 of stone
                'images/stone-block.png',    // Row 2 of 3 of stone
                'images/stone-block.png',    // Row 3 of 3 of stone
                'images/grass-block.png',    // Row 1 of 2 of grass
                'images/grass-block.png'     // Row 2 of 2 of grass
            ],
            numRows = 6, numCols = 5;
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach( enemy => enemy.render());
        allItems.forEach( item=> item.render());
        player.render();
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/heart.png',
        'images/orange.png',
        'images/blue.png',
        'images/green.png',
        'images/header.png',
        'images/life.png'
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);
