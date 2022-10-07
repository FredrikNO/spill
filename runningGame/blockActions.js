import Block from "./block.js";

export default class BlockActions extends Block{
    constructor(startLocation){
        super(startLocation);
        this.speedModifier=1;
        this.sublevel=0;
        this.level=0;
    }
    
    // Logic for moving the block towards the user
    moveBlock(){
        if(this.updateBlockLocation[0]>=0-this.block_width){
            this.updateBlockLocation[0]-=4*this.speedModifier;
        }
        else{
            this.updateBlockLocation[0]=this.sceenWidht-this.block_width;
            this.sublevel++;
        }
        if(this.sublevel>=1){
            this.speedModifier++;
            this.sublevel=0;
            this.level++;
        }
    this.updateLocation();
    }

    // Resets all the variable needed.
    reset(){
        this.level=0;
        this.sublevel=0;
        this.speedModifier=1;
        this.updateBlockLocation=[this.startx,this.starty];
        this.updateLocation;
    }
}