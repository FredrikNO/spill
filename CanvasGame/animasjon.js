const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let jumpHeight=265;

let background1= new Image();
background1.src='images/background1.png';
let background2= new Image();
background2.src='images/background2.png';
let background3= new Image();
background3.src='images/background3.png';
let background4= new Image();
background4.src='images/background4.png';
let walk=new Image();
walk.src='images/walkAnimation.png';

const layer1=new Background(background1,0.8);
const layer2=new Background(background2,0.5);
const layer3=new Background(background3,0.2);
const layer4=new Background(background4,1);

const backgroundLayers=[layer3,layer2,layer1,layer4]

// Player class and implementation


const player= new Player(walk,10,jumpHeight);

animateBackground();
function animateBackground() {
    ctx.clearRect(0, 0, 700, 500);
    backgroundLayers.forEach(Object=>{
        Object.update();
        Object.draw();
    })
    player.update();
    player.draw();
    requestAnimationFrame(animateBackground)
}

// Test player jump
document.addEventListener('keydown',function (e) {
    jumpHeight--;
})