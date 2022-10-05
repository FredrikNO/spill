const grid = document.querySelector('.grid');
const level_player = document.createElement('div');
level_player.classList.add('level')
const block = document.createElement('div');
block.classList.add('block');
const user = document.createElement('div');
user.classList.add('user');
const screenSize = 1400;
const BLOCK_WIDTH = 50;
const BLOCK_HEIGT = 100;
const userStartLocation = [0, 0];
let userCurrentLocation = userStartLocation;
const startLocation = [1350, 0];
let blockLocation = startLocation;
let topOfJump = false;
let userTimer;
let speedModifier = 1;
let sublevel = 0;
let level = 0;
let tempJumpVariable = '';
let setTimer;
let startGame='';
showLevel('Press enter to start','')

// Updates the location of the block
function updateBlock() {
    block.style.left = blockLocation[0] + 'px';
    block.style.bottom = blockLocation[1];
    grid.appendChild(block);
}

// Updates the location of the user
function UpdateUser() {
    user.style.left = userCurrentLocation[0];
    user.style.bottom = userCurrentLocation[1] + 'px';
    grid.appendChild(user);
}

// Uppdates the message on the top of the game screen
function showLevel(message, value) {
    level_player.innerHTML = message+value;
    grid.appendChild(level_player);
}

// Moves the block in the game window. For each 5 sublevels the speed of the block gets faster.
// At the end/(start) of the gamescreen the block gets reset to the startposition.
function moveBlock() {
    if (blockLocation[0] >= 0 - BLOCK_WIDTH) {
        blockLocation[0] -= 4 * speedModifier;
    }
    else {
        blockLocation[0] = screenSize-BLOCK_WIDTH;
        sublevel++;
    }
    if (sublevel >= 5) {
        speedModifier++;
        level++;
        sublevel = 0;
        showLevel('level: ',level)
    }
    updateBlock()
}

// Checking for collision betwwen the block and the user.
function collision() {
    if ((userCurrentLocation[0] + BLOCK_WIDTH) > blockLocation[0] &&
        userCurrentLocation[1] < blockLocation[1] + BLOCK_HEIGT) {
        resetGame();
        showLevel('Press enter to start','')
    }
}

// Resetting game data
function resetGame(){
    userCurrentLocation[1]=0;
    blockLocation[0]=screenSize-BLOCK_WIDTH;
    startGame='';
    level=0;
    sublevel=0;
    topOfJump=false;
    tempJumpVariable='';
    clearInterval(userTimer);
    clearInterval(setTimer)
}

// Jump function: when pressing space the user block jumps in y axis up til 200px before returning to the ground.
function userJump() {
    if (topOfJump) {
        userCurrentLocation[1] -= 6;
        if (userCurrentLocation[1] === 0) {
            userCurrentLocation[1] = 0;
            topOfJump = false;
            tempJumpVariable = '';
            clearTimeout(userTimer);
        }
    }
    else {
        userCurrentLocation[1] += 6;
        if (userCurrentLocation[1] >= 200) {
            topOfJump = true;
        }
    }
    UpdateUser()
}

// Eventlistner nr 1 is for starting the game. When the game is started you can use eventlistner nr 2 to make the user jump.
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter'&&e.key!=startGame) {
        startGame=e.key;
        document.addEventListener('keydown', function (e) {
            if (e.key === ' ' && e.key != tempJumpVariable) {
                tempJumpVariable = e.key;
                userTimer = setInterval(userJump, 20);
            }
        
        }) 
        showLevel('level: ',level)
        UpdateUser();
        setTimer = setInterval(function () {
            moveBlock();
            collision();
        }, 20);
    }
})