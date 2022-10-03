let backgroundXpos = 0;
let gameSpeed=2;

class Background {
    constructor(image, speedModifier) {
        this.x = backgroundXpos
        this.y = 0;
        this.width=1400;
        this.height=500;
        this.image=image;
        this.speedModifier=speedModifier;
        this.speed=gameSpeed*this.speedModifier;
    }
    update(){
        this.speed=gameSpeed*this.speedModifier
        if(this.x<=-this.width){
            this.x=0;
        }
        else{
            this.x-=this.speed
        }
    }
        draw() {
        ctx.drawImage(this.image, this.x, this.y);
        ctx.drawImage(this.image, this.x + this.width, this.y)
    }
}