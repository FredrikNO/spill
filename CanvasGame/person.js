let sx=0;
let sy=0;
let sWidth=57;
let sHeight=121;
let dx=10;
let dy=265;
let dWidth=100;
let dHeight=150;
let runningspeed=0;

class Player{
    constructor(image,animationSpeed, jumpHeight){
        this.sx=sx;
        this.sy=sy;
        this.sWidth=sWidth;
        this.sHeight=sHeight;
        this.dx=dx;
        this.dy=jumpHeight;
        this.dWidth=dWidth;
        this.dHeight=dHeight;
        this.image=image
        this.runningspeed=runningspeed;
        this.animationSpeed=animationSpeed;
    }
    update(){
        if(this.sx>=5){
            this.sx=0;
        }
        else{
            if(this.runningspeed%this.animationSpeed==0){
                this.sx++;
            }
            this.runningspeed++;
        }
    }
    draw(){
        ctx.drawImage(this.image,this.sx*sWidth,this.sy,this.sWidth,this.sHeight,this.dx,this.dy,this.dWidth,this.dHeight)
    }
}