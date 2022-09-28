updateView();
function updateView(){
    let html='';
    html=`
    <div class="setup">
        <button onclick="randomWord(); startTimer();">Start</button>
        <div>Tid igjen: ${timerGame}</div>
        <div>Din score: ${score}</div>
    </div>
    `;
    if(selectedView=='Startview'){
      html+=StartView();  
    }
    else if(selectedView=='EndOfGame'){
        html=endOfGame();
    }
    
    document.getElementById('page').innerHTML=html;
}

function StartView(){
    let wordGame='';
    for (let i = 0; i < word.length; i++) {
        wordGame+=`<div class="words ${lightUp[i]}">${word[i]}</div>`;
    }
    let html=`
    <div class="row">${wordGame}</div>
    `;
    return html;
}

function endOfGame(){
    let html=`
    <div class="setup">
        <div>${endMessage}</div>
        <div>Din score ble: ${score}</div>
        <div>Din highscore er: ${highScore}</div>
        <button onclick="resetView()">Prøv igjen</button>
    </div>
    `;
    return html;
}