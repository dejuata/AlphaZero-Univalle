let MOVE, CELL, MOVES, PLAYER, MAX = true;
let STATE = [];

let SCORE = {
  max: 0,
  min: 0,
  total: 0
};
let SETUP = {
  img: '/static/img/',
  player: {
    max: 'wN',
    min: 'bN',
  },
  apple: 'rA',
  score: {
    max: 'scoreWN',
    min: 'scoreBN',
  },
  css: {
    cell: {
      white: 'white',
      black: 'black',
      highlight: 'highlight',
      lemon: 'lemon'
    }
  }
};

// create board
function board(id) {
  let board = document.getElementById(id);
  let columns = ' abcdef'.split('');

  for (let i = 7; i > 0; i--) {
    let row = board.insertRow();

    for (let j = 0; j < 7; j++) {
      let cell = row.insertCell();

      if (i == 1 ) {
        cell.innerHTML = `<div class="notation">${columns[j]}</div>`;
      }
      else if (j == 0) {
        cell.innerHTML = `<div class="notation">${i - 1}</div>`;
      }
      else {
        let color = '';
        if (i % 2 == 0 && j % 2 != 0) color = SETUP.css.cell.white;
        if (i % 2 != 0 && j % 2 != 0) color = SETUP.css.cell.black;
        if (i % 2 == 0 && j % 2 == 0) color = SETUP.css.cell.black;
        if (i % 2 != 0 && j % 2 == 0) color = SETUP.css.cell.white;
        // id : row, column
        cell.innerHTML = `<div class="cell ${color}" id=${i - 2}${j - 1} onclick="movePiece(this)"> </div>`;
      }
    }
  }
}

function buildPieces(piece) {
  let img = document.createElement('img');
  img.src = `${SETUP.img}${piece}.png`;
  img.id = piece;
  img.className = piece;
  return img;
}

function positionRandom() {
  let numbers = '012345'.split('');
  return `${numbers[parseInt(6 * Math.random())]}${numbers[parseInt(6 * Math.random())]}`;
}

function positionPieces(n) {
  let position = [];
  let tmp = positionRandom();
  let i = 0;
  position[0] = positionRandom();

  while (i < n - 1) {
    if (position.indexOf(tmp) < 0) {
      position.push(tmp);
      i++;
    }
    else {
      tmp = positionRandom();
    }
  }
  return position;
}

function buildImages(position) {
  let images = [];
  for (let i = 0; i < position.length; i++){
    let div = document.getElementById(position[i]);
    images.push(div);
  }
  return images;
}

function emptyBoard() {
  for (let i = 0; i < 6; i++){
    for (let j = 0; j < 6; j++){
      let div = document.getElementById(`${i}${j}`);
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    }
  }
  updateScoreInHtml(SETUP.score.max, 0);
  updateScoreInHtml(SETUP.score.min, 0);
  SCORE = {
    max: 0,
    min: 0,
    total: 0
  }
}

function buildApples(n) {
  let apples = [];
  for (let i = 0; i < n; i++){
    apples.push(buildPieces(SETUP.apple));
  }
  return apples;
}

function start(n, positionRandom, callback) {
  // clear board
  emptyBoard();
  // init score
  SCORE.total = parseInt(n);
  let whiteHorse = buildPieces(SETUP.player.max);
  let blackHorse = buildPieces(SETUP.player.min);
  let apples = buildApples(parseInt(n));

  // get position random
  let position = positionRandom;
  if (position.length == 0) position = positionPieces(parseInt(n) + 2);
  let images = buildImages(position);

  images[0].appendChild(whiteHorse);
  images[1].appendChild(blackHorse);

  for (let i = 2; i < images.length; i++) {
    images[i].appendChild(apples[i - 2]);
  }
  // start MAX with the play
  callback()
}

function possibleMove(n) {
  let result = [];
  let position = n.split('').map((x) => parseInt(x));
  let row = position[0];
  let col = position[1];

  if (row >= 0 && row <= 4) {
    if (col >= 0 && col <= 3) result.push(`${row + 1}${col + 2}`);
    if (col <= 5 && col >= 2) result.push(`${row + 1}${col - 2}`);
  }
  if (row <= 5 && row >= 1) {
    if (col >= 0 && col <= 3) result.push(`${row - 1}${col + 2}`);
    if (col <= 5 && col >= 2) result.push(`${row - 1}${col - 2}`);
  }
  if (row >= 0 && row <= 3) {
    if (col >= 0 && col <= 4) result.push(`${row + 2}${col + 1}`);
    if (col <= 5 && col >= 1) result.push(`${row + 2}${col - 1}`);
  }
  if (row >= 2 && row <= 5) {
    if (col >= 0 && col <= 4) result.push(`${row - 2}${col + 1}`);
    if (col <= 5 && col >= 1) result.push(`${row - 2}${col - 1}`);
  }
  return result;
}

function highlightCell(position, active) {
  for (let i = 0; i < position.length; i++){
    let cell = document.getElementById(position[i]);
    if (active) {
      cell.classList.add(SETUP.css.cell.highlight);
    }
    else {
      cell.classList.remove(SETUP.css.cell.highlight);
    }
  }
}

function selectHorseToMove(e) {
  MOVES = possibleMove(e.id)
  highlightCell(MOVES, true);
}

function score(player) {
  if (player == SETUP.player.max) {
    SCORE.max++;
    SCORE.total--;
    updateScoreInHtml(SETUP.score.max, SCORE.max);
  }
  if (player == SETUP.player.min) {
    SCORE.min++;
    SCORE.total--;
    updateScoreInHtml(SETUP.score.min, SCORE.min);
  }
  winner();
}
// Robo
function theft(player) {
  if (player == SETUP.player.max) {
    SCORE.max += SCORE.min;
    SCORE.min = 0;
    updateScoreInHtml(SETUP.score.max, SCORE.max);
    updateScoreInHtml(SETUP.score.min, SCORE.min);
  }
  if (player == SETUP.player.min) {
    SCORE.min += SCORE.max;
    SCORE.max = 0;
    updateScoreInHtml(SETUP.score.max, SCORE.max);
    updateScoreInHtml(SETUP.score.min, SCORE.min);
  }
  winner();
}

function winner() {
  if (SCORE.total == 0) {
    let title = document.getElementById('winner-title');
    let win = SCORE.max < SCORE.min ? '🎉 ¡You Win! 🎉 ': '💩 ¡You Lose! 💩';
    title.innerText = win;
    UIkit.modal('#winner').show();
  }
}

function updateScoreInHtml(id, score) {
  let el = document.getElementById(id);
  el.innerText = score;
}

function validateMove(e) {
  // Celda anterior
  let child = CELL.childNodes;
  let player = buildPieces(PLAYER.id);

  for (let i = 0; i < child.length; i++){
    if (PLAYER.id == child[i].id) {
      CELL.removeChild(child[i]);
    }
  }
  if (e.firstChild && e.firstChild.id == SETUP.apple) {
    e.removeChild(e.firstChild);
    score(PLAYER.id);
  }
  // robo
  if (e.firstChild && e.firstChild.id != SETUP.apple) {    
    e.classList.add('parent');
    e.firstChild.classList.add('img1');
    player.classList.add('img2');
    // Robo
    // theft(PLAYER.id);
  }

  e.appendChild(player);
}

function removeStyleCell() {
  let style = CELL.className.split(' ');
  if (style.indexOf(SETUP.css.cell.lemon) >= 0) {
    CELL.classList.remove(SETUP.css.cell.lemon);
  }
}

function offset(elem) {
  let rect = elem.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  }
}

function translateAnim(e) {
  let cell = offset(e);
  let piece = offset(PLAYER);
  let dx = cell.left - piece.left;
  let dy = cell.top - piece.top;

  if (e.classList.contains('parent')) {
    e.classList.remove('parent');
  }
  PLAYER.style.transform = `translate(${dx}px, ${dy}px)`;
}

// Esta funcion toca eliminarla
function maxTurn() {
  if (SCORE.total > 0) {
    let max = document.getElementById(SETUP.player.max);
    let e = max.parentElement;
    MOVES = possibleMove(e.id)
    // TODO: hacer un loading para cuando se envie la petición
    sendData('position', getState());
  }
}

// move only black horse MIN
function movePiece(e) {
  // pequeño problema con e.firstElementChild es definido como null
  if (!MOVE && e.firstElementChild.id == SETUP.player.min && !MAX) {
    PLAYER = e.firstElementChild;
    CELL = e;
    selectHorseToMove(e);
    e.classList.add(SETUP.css.cell.lemon);
    MOVE = true;
  }
  else if (MOVE && !MAX) {
    if (MOVES.indexOf(e.id) >= 0) {
      translateAnim(e);
      setTimeout(() => {
        validateMove(e);
        // turn MAX
        MAX = true;
        maxTurn();
      }, 400);
      removeStyleCell();
      highlightCell(MOVES, false);
      MOVE = false;
    }
    else {
      removeStyleCell();
      highlightCell(MOVES, false);
      MOVE = false;
    }
  }
}

// move only white horse
function setPiece(position, callback) {
  PLAYER = document.getElementById(SETUP.player.max);
  let current = PLAYER.parentElement;
  CELL = current;
  selectHorseToMove(current);
  current.classList.add(SETUP.css.cell.lemon);
  // next position
  if (MOVES.indexOf(position) >= 0) {
    setTimeout(() => {
      let nextCell = document.getElementById(position);
      translateAnim(nextCell);
      setTimeout(() => {
        validateMove(nextCell);
        MAX = false;       
      }, 400);
      removeStyleCell();
      highlightCell(MOVES, false);
    }, 500);
  }
  callback();
}

function getState(){
  let apples = Array.from(document.getElementsByClassName('rA'));
  
  return {
    'state': {
      'players':[
        document.getElementById('wN').parentElement.id,
        document.getElementById('bN').parentElement.id
      ],
      'score': SCORE,
      'apples': apples.map(x => x.parentElement.id)
    },
    'moves': MOVES,
  }
}



