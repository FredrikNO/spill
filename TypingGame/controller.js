// Lagt til en eventlistner som sjekker om en tast på tastaturet er blitt trykket på.
document.addEventListener('keypress', function (event) {
    if (startGame != 0) { //Må trykke på startknappen for å starte spillet.
        if (event.key == word[counter]) { //Sjekker om input er det samme som bokstaven på skjermen
            if (counter == (word.length - 1)) { //Sjekker om du har skrevet ferdig ordet.
                randomWord();
                resetModel();
                score++;
                updateView();
                return
            }
            counter++;
            lightUp.push('lightUp') //Gjør om fargen på ferdig skrevene bokstaver
        }
        else {
            wrongLetter();
            timerGame -= 5;
        }
        updateView();
    }
})
// Henter et random ord fra dictionary array og displayer det på skjermen. Tar også ut brukt ord slik at det ikke kommer igjen
function randomWord() {
    let randomIndex = Math.floor(Math.random() * dictionaryArray.length);
    word = dictionaryArray[randomIndex];
    updateView();
    dictionaryArray.splice(randomIndex, 1);
}
// Flasher rødt på skjermen dersom du tar feil bokstav.
function wrongLetter() {
    document.querySelector('body').classList.add('wrong');
    setTimeout(function () {
        document.querySelector('body').classList.remove('wrong');
    }, 200);
}
// Starter spillet og starter timeren til spillet.
function startTimer() {
    startGame=1;
    let timer = setInterval(function () {
        if (timerGame > 0) {
            timerGame--;
            updateView();
        }
        else {
            if (highScore < score) highScore = score;
            resetModel();
            selectedView = 'EndOfGame';
            updateView();
            timerGame = 30;
            startGame=0;
            score = 0;
            clearInterval(timer);
        }
    }, 1000)
}
// Henter ut ordene fra json filen og putter det inn i dictionaryArray.
function fillArray() {
    fetch('wordarray.json')
        .then(response => response.json())
        .then(json => {
            dictionaryArray = json;
        })
}
// Resetter deler av modellen.
function resetModel() {
    counter = 0;
    lightUp = [];
}
// Brukes til å resette viewet.-
function resetView() {
    selectedView = 'Startview';
    fillArray();
    resetModel();
    updateView();
}