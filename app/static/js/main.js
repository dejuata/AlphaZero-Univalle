// Load board
board("board");

function insertPiecestoBoard() {
  let btn = document.getElementById('play')

  btn.onclick = () => {
    STATE = [];
    theftEnabled();
    let apples = document.getElementById("apples").value;
    start(apples, [], () => setTimeout(() => {
      maxTurn()
    }, 500));
  }
}
// insert pieces
insertPiecestoBoard();

function playAgain() {
  let btn = document.getElementById('again');
  btn.onclick = () => {
    STATE = [];
    console.log(TOTAL[0], 'max')
    console.log(TOTAL[1], 'min')
    theftEnabled();
    let apples = document.getElementById("apples").value;
    start(apples, [], () => setTimeout(() => maxTurn(), 500));
  }
}

playAgain();

function sendData(endpoint, info) {
  let newXHR = new XMLHttpRequest();
  let url = `${document.location.origin}/${endpoint}`;

  newXHR.addEventListener('load', reqListener);
  newXHR.open('POST', url);
  newXHR.setRequestHeader("Content-type", "application/json")

  let jsonData = {
    data: info
  };

  let formattedJsonData = JSON.stringify(jsonData);
  newXHR.send(formattedJsonData);

  function reqListener() {
    let data = JSON.parse(this.response);
    let message = data['message'];
    console.log(message);
    let position = data['position'];

    setPiece(position, () => {
      STATE.push(getState());
    });
  }
}

document.getElementById('upload').style.display = 'none';

// load new state
let file = document.getElementById('file');

file.onchange = function () {
  let upload = document.getElementById('upload');
  let fileInput = document.getElementById('fileInput');

  if (this.files[0]) {
    upload.style.display = 'block';
    fileInput.style.display = 'none';
  } else {
    upload.style.display = 'none';
    fileInput.style.display = 'block';
  }
}

function setUploadForm() {
  document.getElementById('file').value = '';
  document.getElementById('fileInput').style.display = 'block';
  document.getElementById('upload').style.display = 'none';
}

// submit data of state
var form = document.getElementById("uploadForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let file = document.getElementById('file').files[0];

  let reader = new FileReader();

  if (file) {
    reader.readAsText(file);
    reader.addEventListener('load', function (e) {
      let data = e.target.result;
      loadState(data);
    })
  }
});


function loadState(data) {
  let lst = data.replace(/\n/g, ' ').split(' ');
  let max = '';
  let min = '';
  let apples = [];

  function range(row) {
    let j = 0;
    if (row >= 0 && row < 6) j = 5;
    if (row >= 6 && row < 12) j = 4;
    if (row >= 12 && row < 18) j = 3;
    if (row >= 18 && row < 24) j = 2;
    if (row >= 24 && row < 30) j = 1;
    if (row >= 30 && row < 36) j = 0;

    return j;
  }

  let col = 0;
  for (let i = 0; i < 36; i++) {
    if (col == 6) col = 0;

    if (lst[i] == 1) max = `${range(i)}${col}`;

    if (lst[i] == 2) min = `${range(i)}${col}`;

    if (lst[i] == 5) apples.push(`${range(i)}${col}`);

    col++
  }

  let position = [max, min].concat(apples)

  // console.log(position)
  start(apples.length, position, () => {
    setUploadForm();
    theftEnabled();
    // update score
    SCORE.max = parseInt(lst[36])
    SCORE.min = parseInt(lst[37])
    SCORE.total = parseInt(lst[38])

    updateScoreInHtml(SETUP.score.max, SCORE.max);
    updateScoreInHtml(SETUP.score.min, SCORE.min);

    setTimeout(() => {
      maxTurn();
      STATE = [];
    }, 500);
  })
}

function removeElement(array, element) {
  let index = array.indexOf(element);
  if (index > -1) return array.splice(index, 1);
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function downloadState() {
  let btn = document.getElementById('download');
  // btn.setAttribute('download', 'state.txt');

  btn.addEventListener("click", function (e) {
    e.preventDefault();

    let state = STATE[STATE.length - 1];
    let p = state['state']['players'];
    let a = state['state']['apples'];
    let s = state['state']['score'];

    let matrix = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]

    matrix[parseInt(p[0][0])][parseInt(p[0][1])] = 1
    matrix[parseInt(p[1][0])][parseInt(p[1][1])] = 2

    // apples
    for (let i = 0; i < a.length; i++) {
      matrix[parseInt(a[i][0])][parseInt(a[i][1])] = 5
    }

    matrix = matrix.reverse()

    let text = '';
    for (let i = 0; i < 6; i++) {
      text += matrix[i].join(' ') + '\n'
    }
    text += `${s['max']} ${s['min']} ${s['total']}`

    download('state.txt', text);
  }, false);
}

downloadState();

function theftEnabled() {
  if (document.getElementById("theft").checked) {
    THEFT = true;
  } else {
    THEFT = false;
  }
}