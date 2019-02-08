//player class with x,y: for position , speed , score , life count and level
class Player{
    constructor(x,y,speed){
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.score = 0;
        this.life = 3;
        this.level = 1
    }
    // update player postion , score , level and reload new items
    update() {
        if (this.y < 0) {
            this.x = 200;
            this.y = 380;
            this.score += this.level*10;
            this.level++;
            items();
        }
    }
    // render player on the game and top line innormation (score , and level)
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        life();
        ctx.fillStyle = "white";
        ctx.font = "24px sans-serif";
        ctx.fillText(this.score, 372, 33);
        ctx.fillText(this.level, 270, 33);
    }
    // handel user key press
    handleInput(keyPress) {
        switch (keyPress) {
            case 'left' : if (this.x > 50) this.x -= this.speed + 50; break;
            case 'right': if (this.x < 400) this.x += this.speed + 50; break;
            case 'down' : if (this.y < 380) this.y += this.speed + 30; break;
            case 'up':    this.y -= this.speed + 30; break;
        }
    }
}

// ENEMY CLASS : player must avoid
class Enemy{
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    // update enemy postion and speed
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 550) {
            this.x = -100;
            this.speed = player.level*80 + Math.floor(Math.random() * 512);
        }
    }
    // render enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // check if collision the player
    checkCollisions() {
        if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {
            player.x = 200;
            player.y = 380;
            player.life--;
            life();
            items();
        }
    }
}

// GEM CLASS :  item player can collect
class Gem{
    constructor(st,rank){
        this.x ;
        this.y ;
        this.setLocation();
        this.rank=rank
        this.sprite = 'images/'+st;
    }
    // iTEM random location
    setLocation() {
        let x= Math.floor(Math.random() * 5);
        this.x = x*101;
        let y = Math.floor(Math.random() * 4);
        this.y= y*80-20;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    checkCollected() {
        if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {
            if (this.rank == 0 && player.life < 4) {
                player.life++;
                life();
            }
            else player.score += 5 * this.rank;
            this.x = -100;
            this.y = -100;
        }
    }
}

// this function will test if games over , if not show life count shapes
function life(){
    if (player.life==0){
        ctx.clearRect(0, 0, 505, 606);
        ctx.fillStyle = "black";
        ctx.font = "60px sans-serif";
        ctx.fillText('Game Over', 100, 300);
        ctx.font = "20px sans-serif";
        ctx.fillText('Your Score: '+player.score, 180, 350);
        ctx.fillText('Press any key to play again', 140, 380);
        window.stop();
        document.addEventListener('keypress', function() {location.reload();});

    }
    for (var i = 1; i <= player.life; i++) {
        ctx.drawImage(Resources.get('images/life.png'), 501 - (i * 23), 0);
    }
}

//gloabl player and enemys and items preparing
const player = new Player(202,380,50);

let allEnemies = [];
const enemyPosition = [60, 140, 220];
enemyPosition.forEach( posY =>  allEnemies.push(new Enemy(0, posY, 80 + Math.floor(Math.random() * 512))) );

let allItems = [];
    const inames= ['heart.png','orange.png','blue.png','green.png'];

function items(){
    allItems = [];
    inames.forEach( (item,index) => allItems.push(new Gem(item,index)));
}
items();

// wait
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});