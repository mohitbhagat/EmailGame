
var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('space', 'assets/deep-space.jpg');
    game.load.image('bullet', 'assets/bullets.png');
    game.load.image('ship', 'assets/ship.png');
    game.load.image('msg', 'assets/msg.png');

}

var sprite;
var cursors;

var msgs;
var bullet;
var bullets;
var bulletTime = 0;
var genTime = 100;

function create() {

    //  This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    //  We need arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A spacey background
    game.add.tileSprite(0, 0, game.width, game.height, 'space');

    //  Our ships bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);


    //msgs
    msgs = game.add.group();
    msgs.enableBody = true;
    msgs.physicsBodyType = Phaser.Physics.ARCADE;
    msgs.createMultiple(30, 'msg');
    msgs.setAll('anchor.x', 0.5);
    msgs.setAll('anchor.y', 0.5);


    //  Our player ship
    sprite = game.add.sprite(300, 300, 'ship');
    sprite.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.drag.set(100);
    sprite.body.maxVelocity.set(200);
    sprite.body.collideWorldBounds = true;

    //  Game input
    cursors = game.input.keyboard.createCursorKeys();

    game.input.keyboard.onUpCallback = function(e){            
        if(e.keyCode == Phaser.Keyboard.SPACEBAR){
         fireBullet();        
         }            
     };

}

function update() {

    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(sprite.rotation, 200, sprite.body.acceleration);
    }
    else
    {
        sprite.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 300;
    }
    else
    {
        sprite.body.angularVelocity = 0;
    }
    if (genTime == 100) {
        createMsg();
    }
    if (genTime == 0) {
        genTime = 100;
    } else {
        --genTime;
    }

}

 function createMsg () {
    var side = game.rnd.integerInRange(-1, 5);
    console.log(side);
    var x, y;
    if (side < 2) {
        y = game.world.randomY;
        x = -50;
        if (side == 1) {
            x = game.width + 50;
        }
    } else {
        x = game.world.randomX;
        y = -50;
        if (side == 1) {
            y = game.height + 50;
        }
    }
    var msg = msgs.create(x, y, 'msg');
    msg.body.collideWorldBounds = true;
    msg.body.bounce.set(0.8);
    game.physics.arcade.moveToXY(msg, game.world.centerX, game.world.centerY, 100, 0);
    
 }


function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.body.x + 16, sprite.body.y + 16);
            bullet.rotation = sprite.rotation;
            game.physics.arcade.velocityFromRotation(sprite.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 50;
        }
    }
}


function render() {
}
