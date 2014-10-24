var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update });

function preload(){
  game.load.image('i1', '/img/acryl_bladerunner.png');
  game.load.image('i2', '/img/alex-bisleys_horsy_5.png');
  game.load.image('i3', '/img/archmage_in_your_face.png');
  game.load.atlasJSONHash('bot', '/img/running_bot.png', '/img/running_bot.json');
}

var s1;

function create(){
  var bot = game.add.sprite(0, 200, 'bot');
  bot.animations.add('run');
  bot.animations.play('run', 60, true);


  s1 = game.add.sprite(20, 30, 'i1');
  s1.scale.setTo(0.5);
  s1.anchor.set(0.5);
  var s2 = game.add.sprite(200, 30, 'i2');
  s2.scale.setTo(.3);
  var s3 = game.add.sprite(20, 300, 'i3');
  s3.scale.setTo(.1);

  game.physics.enable(s1, Phaser.Physics.ARCADE);
  game.physics.enable(s2, Phaser.Physics.ARCADE);
  game.physics.enable(s3, Phaser.Physics.ARCADE);

  s1.body.velocity.x = 150;
  s3.body.velocity.x = 150;
  s3.body.velocity.y = 150;

  var text = "- phaser -\n with a sprinkle of \n pixi dust.";
  var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
  game.add.text(game.world.centerX-300, 0, text, style);

  var tween = game.add.tween(s2);
  tween.to({ x: 600 }, 1000);
  tween.start();

  var tween1 = game.add.tween(bot);
  tween1.to({ x: 700 }, 7000);
  tween1.start();
}

function update(){
  if (game.physics.arcade.distanceToPointer(s1, game.input.activePointer) > 8)
    {
      game.physics.arcade.moveToPointer(s1, 300);
    }
    else
    {
        s1.body.velocity.set(0);
    }
}
