let APPLE = 1;

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
        cell.innerHTML = `<div class="cell ${color}" id=${columns[j]}${i-1}> </div>`;
      }
    }
  }
}

function buildPieces(piece) {
  let img = document.createElement('img');
  img.src = `/static/img/${piece}.png`;
  img.id = piece;
  img.className = 'piece';
  return img;
}

function positionRandom() {
  let columns = 'abcdef'.split('');
  let rows = '123456'.split('');
  return `${columns[parseInt(6 * Math.random())]}${rows[parseInt(6 * Math.random())]}`;
}

function positionPieces(n) {
  let position = []
  position[0] = positionRandom();
  for (let i = 1; i < n; i++){
    let tmp = positionRandom();
    if (position.indexOf(tmp) < 0) {
      position.push(tmp);
    }
    else {
      position.push(positionRandom());
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
  let columns = 'abcdef'.split('');
  for (let i = 0; i < columns.length; i++){
    for (let j = 1; j < 7; j++){
      let cell = `${columns[i]}${j}`;
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
  let blackHorse = buildPieces('bH');
  let whiteHorse = buildPieces('wH');
  let apples = buildApples(5);

  btn.onclick = () => {
    // clear board
    emptyBoard();
    // get position random
    let position = positionPieces(parseInt(numberApple()) + 2);
    let images = buildImages(position);
    console.log(numberApple());
    images[0].appendChild(whiteHorse);
    images[1].appendChild(blackHorse);

    for (let i = 2; i < images.length; i++){
      images[i].appendChild(apples[i - 2]);
    }
  }
}

// Load board
board();
// insert random pieces
insertPiecestoBoard();


