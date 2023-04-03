import * as Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 720,
    height: 480,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}


const game = new Phaser.Game(config);


function preload() {
    this.load.image('tiles', 'assets/tilemap_packed.png');
    this.load.image('player', 'assets/mainplayer.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
}

function create() {
    const map = this.make.tilemap({ key: 'map'});
    const tiles = map.addTilesetImage('tiles0', 'tiles');
    const layer = map.createLayer('Tile Layer 1', tiles);

    const player = this.add.sprite(350, 460, 'player');

    // Enable input events on the canvas
    this.input.on('pointerdown', (pointer) => {
        // Set the target position on click coordinates
        const targetX = pointer.worldX;
        const targetY = pointer.worldY;

        // Calculate the distance between player and click coordinates
        const dx = targetX - player.x;
        const dy = targetY - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate duration of movement based on the distance
        const speed = 75; //sprites per second
        const duration = distance / speed * 1000;

        // Moving the player to target position
        this.tweens.add({
            targets: player,
            x: targetX,
            y: targetY,
            duration: duration,
            ease: 'Linear'
        });
    });
}

function update() {

}