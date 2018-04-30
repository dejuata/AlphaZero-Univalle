let MOVE, CELL, MOVES, PLAYER;
let MAX = true;

// create board
function board() {
  let board = document.getElementById("board");
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
        if (i % 2 == 0 && j % 2 != 0) color = 'white';
        if (i % 2 != 0 && j % 2 != 0) color = 'black';
        if (i % 2 == 0 && j % 2 == 0) color = 'black';
        if (i % 2 != 0 && j % 2 == 0) color = 'white';
        // id : row, column
        cell.innerHTML = `<div class="cell ${color}" id=${i - 2}${j - 1} onclick="movePiece(this)"> </div>`;
      }
    }
  }
}

function buildPieces(piece) {
  let img = document.createElement('img');
  img.src = `/static/img/${piece}.png`;
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
      let cell = `${i}${j}`;
      let div = document.getElementById(cell);
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    }
  }
}

function buildApples(n) {
  let apples = [];
  for (let i = 0; i < n; i++){
    apples.push(buildPieces('rA'));
  }
  return apples;
}

function numberApple() {
  return document.getElementById("apples").value;
}

function insertPiecestoBoard() {
  let btn = document.getElementById('play');

  btn.onclick = () => {
    let whiteHorse = buildPieces('wH');
    let blackHorse = buildPieces('bH');
    let apples = buildApples(parseInt(numberApple()));

    // clear board
    emptyBoard();
    // get position random
    let position = positionPieces(parseInt(numberApple()) + 2);
    let images = buildImages(position);

    images[0].appendChild(whiteHorse);
    images[1].appendChild(blackHorse);

    for (let i = 2; i < images.length; i++){
      images[i].appendChild(apples[i - 2]);
    }
    // start MAX with the play
    maxTurn();
  }
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
      cell.classList.add('highlight');
    }
    else {
      cell.classList.remove('highlight');
    }
  }
}

function selectHorseToMove(e) {
  MOVES = possibleMove(e.id)
  highlightCell(MOVES, true);
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
  if (e.firstChild && e.firstChild.id == 'rA') {
    e.removeChild(e.firstChild);
    // aqui se puede hacer el contador de las manzanas
  }
  if (e.firstChild && e.firstChild.id != 'rA') {
    e.classList.add('parent');
    e.firstChild.classList.add('img1');
    player.classList.add('img2');
  }

  e.appendChild(player);

}

function removeStyleCell() {
  let style = CELL.className.split(' ');
  if (style.indexOf('lemon') >= 0) {
    CELL.classList.remove('lemon');
  }
}

function offset(elem) {
  var rect = elem.getBoundingClientRect();

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

function maxTurn() {
  setTimeout(() => {
    let max = document.getElementById('wH');
    let e = max.parentElement;
    MOVES = possibleMove(e.id)
    // TODO: hacer un loading para cuando se envie la petición
    sendData();
  }, 500);
}

// move only black horse MIN
function movePiece(e) {
  if (!MOVE && e.firstElementChild.id == 'bH' && !MAX) {
    PLAYER = e.firstElementChild;
    CELL = e;
    selectHorseToMove(e);
    e.classList.add('lemon');
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
function setPiece(position) {
  PLAYER = document.getElementById('wH');
  let current = PLAYER.parentElement;
  CELL = current;
  selectHorseToMove(current);
  current.classList.add('lemon');
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
}
// Load board
board();
// insert random pieces
insertPiecestoBoard();


