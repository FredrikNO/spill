import Block from "./block.js";

export default class UserActions extends Block {
    constructor(startLocation, jumped) {
        super(startLocation);
        this.topOfJump = false;
        this.jumped=jumped;
    }
    // User jump logic
    userJump(timer) {
            if (this.topOfJump) {
                this.updateBlockLocation[1] -= 6;
                if (this.updateBlockLocation[1] === 0) {
                    this.topOfJump = false;
                    clearInterval(timer);
                    this.jumped=false;
                }
            }
            else {
                this.updateBlockLocation[1] += 6;
                if (this.updateBlockLocation[1] >= 200) {
                    this.topOfJump = true;
                }
            }
            this.updateLocation();
    }

    //Updates the jumped variable used in the userJump function. 
    updateJumped(){
        this.jumped=true;
    }

    // Resets all veriables needed in block
    reset(){
        this.topOfJump=false;
        this.jumped=false;
        this.updateBlockLocation=[this.startx,this.starty];
        this.updateLocation();
    }
}
