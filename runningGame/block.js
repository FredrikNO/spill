export default class Block{
    constructor(startLocation){
        this.sceenWidht=1400;
        this.block_width=50;
        this.block_height=100;
        this.startx=startLocation[0];
        this.starty=startLocation[1];
        this.updateBlockLocation=[this.startx,this.starty];
        this.yourObject=document.createElement('div');
        this.documentObject=document.querySelector('.grid');
    }

    // Updates the location of the block that is created.
    updateLocation() {
        this.yourObject.style.left=this.updateBlockLocation[0]+'px';
        this.yourObject.style.bottom =this.updateBlockLocation[1]+'px';
        this.documentObject.appendChild(this.yourObject);
    }

    // Adds a class to the div you crate in the constructor.
    addClass(divclass){
        this.yourObject.classList.add(`${divclass}`);
    }

    // Adds a message element to the game window.
    appendMessageBox(element){
        this.documentObject.appendChild(element);
    }
}