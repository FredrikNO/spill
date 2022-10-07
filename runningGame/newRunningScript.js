import BlockActions from "./blockActions.js";
import UserActions from "./userActions.js";
import Message from "./messages.js";

// Varables.
let blockMoveTimer;
let jumpTimer;
let startgame=false;
let jumped=false;

// Make the Block and add it to the gamescreen.
const block=new BlockActions([1350,0])
block.updateLocation();
block.addClass('block')

// make messagebox in gameview.
const message=new Message();
message.Message='Press enter to start/restart and space to jump';
block.appendMessageBox(message.level);
message.update();

// Make the User and add it to the gamescreen.
const user= new UserActions([0,0],jumped);
user.updateLocation();
user.addClass('user');

// Adds an eventlistner to detect enter press. Starts the game.
document.addEventListener('keydown',function (e){
    if(e.key==='Enter'&&!startgame){
        startgame=true;
        blockMoveTimer=setInterval(function (){
            block.moveBlock();
            collision();
            message.Message=`level: ${block.level}`
            message.update();
            },30);

    }

})

// Adds an eventlistner to detect space press. Makes the user jump.
document.addEventListener("keydown",function(e){
    if(startgame){
        if(e.key===' '&& !user.jumped){
            user.updateJumped();
            jumpTimer=setInterval(function(){
            user.userJump(jumpTimer);
         },30)    
        }
}
})

// Checks for collision between the user block and the moving block. When a hit occurs it will reset the game.
function collision() {
        if ((user.updateBlockLocation[0]+ user.block_width) > block.updateBlockLocation[0] &&
            user.updateBlockLocation[1] < block.updateBlockLocation[1] + block.block_height && startgame) {
                clearInterval(blockMoveTimer);
                clearInterval(jumpTimer);
                user.reset();
                block.reset();   
                startgame=false;
        }
    }