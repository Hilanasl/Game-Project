const start = document.getElementById('start-btn');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const input = document.querySelector('#input-points');
const blocks = document.querySelectorAll('#blocks > div');
let soundRed = document.querySelectorAll('audio #red');
let soundBlue = document.querySelectorAll('audio #blue');
let soundGreen = document.querySelectorAll('audio #green');
let soundYellow = document.querySelectorAll('audio #yellow');

let modalLost = document.querySelector(".modal-content-lost");
let modalWin = document.querySelector(".modal-content-win");
let modalWrap = document.querySelector("#myModal");

const colors = ['red', 'green', 'blue', 'yellow'];
const max = 10;
let newGame = [];
let count = 0;
let level = 0;
let player = [];

// -------- Generates the array with a random sequence -----------
function generateSequence(number) {
    let colorIndex = Math.floor(Math.random() * 4);
    newGame.push(colors[colorIndex]);
    return newGame
}

// -------- Starts the game and shows the color sequence ----------
function startGame() {
    count = 0;
    player = [];
    generateSequence(1)
    if (newGame.length > 3) {
        setTimeout(() => 1100);
        toggleModal('show');
        input.innerHTML = 'Points: 0';
        startGame();
        return;
    }
    let id = setInterval(() => {
        if (count === newGame.length) {
            clearInterval(id);
            return;
        }
        console.log(newGame);
        displaySequence(newGame, count);
        count++;
    }, 1000)
}

// -------- Defines what happens when each color is activated ---------
function displaySequence(sequence, i) {
    if (sequence[i] === 'red') {
        red.classList.toggle('not-active');
        red.classList.toggle('active');
        setTimeout(() => {
            red.classList.toggle('not-active')
            red.classList.toggle('active');
        }, 500)
    } else if (sequence[i] === 'blue') {
        blue.classList.toggle('not-active');
        blue.classList.toggle('active');
        setTimeout(() => {
            blue.classList.toggle('not-active')
            blue.classList.toggle('active');
        }, 500)
    } else if (sequence[i] === 'green') {
        green.classList.toggle('not-active');
        green.classList.toggle('active');
        setTimeout(() => {
            green.classList.toggle('not-active')
            green.classList.toggle('active');
        }, 500)
    } else if (sequence[i] === 'yellow') {
        yellow.classList.toggle('not-active');
        yellow.classList.toggle('active');
        setTimeout(() => {
            yellow.classList.toggle('not-active')
            yellow.classList.toggle('active');
        }, 500)
    }
}

// ------- Checks if the player matched the computer or not -------------
function matchPlayer() {
    if (player[level] === newGame[level]) {
        level++;
    } else {
        setTimeout(() => {
            toggleModal('show', false);
            input.innerHTML = 'Points: 0';
        }, 1100
        );
        newGame = [];
        startGame();
    }
    if (player.length === newGame.length) {
        input.innerHTML = `Points: ${level}`;
        level = 0;
        count += 1;
        startGame();
    }
}

// -------- Defines what happens when the player clicks each color ----------
function handleClick(evt) {
    const color = evt.target.id;
    const block = evt.target
    player.push(color);
    matchPlayer();
    if (block.classList.contains('not-active')) {
        block.classList.toggle('not-active');
        block.classList.toggle('active');
        setTimeout(() => {
            block.classList.toggle('not-active')
            block.classList.toggle('active');
        }, 200)
    }
}

// -------- Triggers the game start -----------------------------
start.addEventListener('click', () => {
    newGame = [];
    startGame();
    blocks.forEach(block => block.onclick = handleClick)
})

//---------------------Modal-------------------------------

let span = document.querySelectorAll(".close");

function toggleModal(mode = 'show', isWin = true) {
    if (mode === 'show') {
        myModal.style.display = 'block';
        if (isWin) {
            modalWin.style.display = 'block';
            modalLost.style.display = 'none';
        } else {
            modalLost.style.display = 'block';
            modalWin.style.display = 'none';
        }
    } else {
        myModal.style.display = 'none';
        modalWin.style.display = 'none';
        modalLost.style.display = 'none';
    }
}

// -------- closes the modal ---------------
span.forEach(el => {
    el.onclick = function () {
        modalWrap.style.display = 'none';
    }
})


