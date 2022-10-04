const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const bordWidth = 560;
const bordHeight = 300;
const ballDiameter = 20
const userStart = [230, 10];
let currentPosition = userStart;
const ballStart = [250, 50];
let currentBallPosition = ballStart;
let timerid;

let xDirecton = 2;
let yDirecton = 2;

//create class

class Block {
    constructor(x, y) {
        this.blockBottomLeft = [x, y];
        this.blockBottomRight = [x + blockWidth, y];
        this.blockTopLeft = [x, y + blockHeight];
        this.blockTopRight = [x + blockWidth, y + blockHeight];
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

// tegn block
addBlocks()
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].blockBottomLeft[0] + 'px';
        block.style.bottom = blocks[i].blockBottomLeft[1] + 'px';
        grid.appendChild(block);

    }

}

// lag player

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user)

// tegn player
function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

//bevegelse på player

function moveUser(e) {
    switch (e.key) {
        case 'a':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }

            break;
        case 'd':
            if ((currentPosition[0] + blockWidth) < bordWidth) {
                currentPosition[0] += 10;
                drawUser();
            }

            break;
    }
}

document.addEventListener('keypress', moveUser)

// legg til ball
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();

// Oppdater ball position
function drawBall() {
    ball.style.left = currentBallPosition[0] + 'px';
    ball.style.bottom = currentBallPosition[1] + 'px';
}

// bevegelse ball
function moveBall() {
    currentBallPosition[0] += xDirecton;
    currentBallPosition[1] += yDirecton;
    checkCollisions();
    drawBall();

}
timerid = setInterval(moveBall, 20);

// se etter kollisjon
function checkCollisions() {
    // sjekk array for kollisjon
    for (let i = 0; i < blocks.length; i++) {
        if(currentBallPosition[0]>blocks[i].blockBottomLeft[0]&&currentBallPosition[0]<blocks[i].blockBottomRight[0]&&
           currentBallPosition[1]+ballDiameter>blocks[i].blockBottomLeft[1]&& currentBallPosition[1]<blocks[i].blockTopLeft[1]){
            blocks.splice(i,1);
            const allblocks=Array.from(document.querySelectorAll(".block"));
            allblocks[i].classList.remove('block')
            changeDirection();
           }
    }

    if (currentBallPosition[0] >= (bordWidth - ballDiameter) ||
        currentBallPosition[1] >= bordHeight - ballDiameter||
        currentBallPosition[0] <= 0) {
        changeDirection();
    }

    if(currentBallPosition[0]>currentPosition[0]&&currentBallPosition[0]<currentPosition[0]+blockWidth&&
        currentBallPosition[1]>currentPosition[1]&&currentBallPosition[1]<currentPosition[1]+blockHeight)
    {
            changeDirection();
    }

    // sjekk for tap
    if (currentBallPosition[1] <= 0) {
        clearInterval(timerid);
        console.log('loss')
    }

    // sjekk winner
    if(blocks.length===0){
        clearInterval(timerid);
        console.log('win');
    }
}
// endre ballrettning
function changeDirection() {
    if (xDirecton === 2 && yDirecton === 2) {
        yDirecton = -2;
        return
    }
    if (xDirecton === 2 && yDirecton === -2) {
        xDirecton = -2;
        return;
    }
    if (xDirecton === -2 && yDirecton === -2) {
        yDirecton = 2;
        return
    }
    if (xDirecton === -2 && yDirecton === 2) {
        xDirecton = 2;
        return
    }
}