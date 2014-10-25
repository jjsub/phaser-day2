
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

   // game.load.image('title', 'assets/pics/catastrophi.png');

    game.load.spritesheet('button', 'assets/buttons/flixel-button.png', 80, 20);
    game.load.bitmapFont('nokia', 'assets/fonts/bitmapFonts/nokia16black.png', 'assets/fonts/bitmapFonts/nokia16black.xml');

    // game.load.audio('sfx', [ 'assets/audio/SoundEffects/fx_mixdown.mp3', 'assets/audio/SoundEffects/fx_mixdown.ogg' ]);
    game.load.audio('sfx', 'assets/audio/SoundEffects/fx_mixdown.ogg');
    game.load.atlasJSONHash('bot', 'assets/sprites/running_bot.png', 'assets/sprites/running_bot.json');
}

var fx;

var text;
var index = 0;
var line = '';

var textContent = ['Hola amigo', 'Hablar Espanol, Ingles y Coreano', 'Buenos o malo ?' 
                  , 'Es muy bueno'];

function create() {

   
    //for the text animation
     text = game.add.text(32, 380, '', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });

    nextLine();


	//game.add.image(0, 0, 'title');

	//	Here we set-up our audio sprite
	fx = game.add.audio('sfx');
    fx.allowMultiple = true;

	//	And this defines the markers.

	//	They consist of a key (for replaying), the time the sound starts and the duration, both given in seconds.
	//	You can also set the volume and loop state, although we don't use them in this example (see the docs)

	fx.addMarker('alien death', 1, 1.0);
	fx.addMarker('boss hit', 3, 0.5);
	fx.addMarker('escape', 4, 3.2);
	fx.addMarker('meow', 8, 0.5);
	fx.addMarker('numkey', 9, 0.1);
	fx.addMarker('ping', 10, 1.0);
	fx.addMarker('death', 12, 4.2);
	fx.addMarker('shot', 17, 1.0);
	fx.addMarker('squit', 19, 0.3);

	//	Make some buttons to trigger the sounds
	makeButton('alien death', 600, 100);
	makeButton('boss hit', 600, 140);
	makeButton('escape', 600, 180);
	makeButton('meow', 600, 220);
	makeButton('numkey', 600, 260);
	makeButton('ping', 600, 300);
	makeButton('death', 600, 340);
	makeButton('shot', 600, 380);
	makeButton('squit', 600, 420);

}

function makeButton(name, x, y) {

    var button = game.add.button(x, y, 'button', click, this, 0, 1, 2);
    button.name = name;
    button.scale.set(2, 1.5);
    button.smoothed = false;

    var text = game.add.bitmapText(x, y + 7, 'nokia', name, 16);
    text.x += (button.width / 2) - (text.textWidth / 2);

}

function updateLine() {

    if (line.length < textContent[index].length)
    {
        line = textContent[index].substr(0, line.length + 1);
        // text.text = line;
        text.setText(line);
    }
    else
    {
        //  Wait 2 seconds then start a new line
        game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
    }

}

function nextLine() {

    index++;

    if (index < textContent.length)
    {
        line = '';
        game.time.events.repeat(80, textContent[index].length + 1, updateLine, this);
    }

}


function click(button) {

	fx.play(button.name);
	//I can add one more function
	var bot = game.add.sprite(600, 80, 'bot');
    
    bot.animations.add('run');
    bot.animations.play('run', 15, true);
    bot.anchor.setTo(0.5, 0.5);
    bot.alpha = 0;
    

    //var tween = game.add.tween(bot);
    //tween.to({ x: 00 }, 3000);
    //.to({ y: 300 }, 1000, Phaser.Easing.Linear.None)
    //.to({ x: 100 }, 2000, Phaser.Easing.Linear.None)
    //.to({ y: 100 }, 1000, Phaser.Easing.Linear.None)
    //.loop()

     var tween = game.add.tween(bot).to({ x: 200 }, 1000, Phaser.Easing.Linear.None)
    .to({ y: 300 }, 1000, Phaser.Easing.Linear.None)
    .to({ x: 100 }, 2000, Phaser.Easing.Linear.None)
    .to({ y: 100 }, 1000, Phaser.Easing.Linear.None)
    .loop()
    .start();

    //And this starts it going
    tween.start();

    game.add.tween(bot).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);


    for (var i = 0; i < 30; i++)
    {
        var sprite = game.add.sprite(game.world.randomX,game.world.randomY,'bot');

        //  Fade in a sprite
        game.add.tween(sprite).to({ y: -50 }, Math.random() * 4500, Phaser.Easing.Cubic.Out, true);

        //  This tween starts with a random length delay
        game.add.tween(sprite).to({ alpha: 0 }, Math.random() * 4500, Phaser.Easing.Quadratic.InOut, true, Math.random() * 500);
    }

}