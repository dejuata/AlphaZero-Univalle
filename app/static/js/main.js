// Load board
board("board");

function insertPiecestoBoard() {
  let btn = document.getElementById('play')

  btn.onclick = () => {
    STATE = [];
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

  let jsonData = { data: info };  
 
  let formattedJsonData = JSON.stringify(jsonData);
  newXHR.send(formattedJsonData);

  function reqListener() {
    let data = JSON.parse(this.response);
    let position = data['position'];

    // if(!avoidReturning(position, STATE, SCORE)){
    //   setPiece(position, () => {
    //     STATE.push(getState());      
    //     console.log(STATE)
    //   });
    // } else {
    //   removeElement(MOVES, position)
    //   sendData('position', getState())
    // }    
    setPiece(position, () => {
      STATE.push(getState());      
      console.log(STATE)
    });
    console.log(position)   
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
  
  if(file) {
    reader.readAsText(file);
    reader.addEventListener('load', function(e){
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

  function range(row){
    let j = 0;
    if(row >= 0 && row < 6) j = 5;
    if(row >= 6 && row < 12) j = 4;
    if(row >= 12 && row < 18) j = 3;
    if(row >= 18 && row < 24) j = 2;
    if(row >= 24 && row < 30) j = 1;
    if(row >= 30 && row < 36) j = 0;

    return j;
  }

  let col = 0;
  for(let i = 0; i < 36; i++){
    if(col == 6) col = 0;

    if(lst[i] == 1) max = `${range(i)}${col}`;

    if(lst[i] == 2) min = `${range(i)}${col}`;

    if(lst[i] == 5) apples.push(`${range(i)}${col}`);

    col++
  }

  let position = [max, min].concat( apples )

  // console.log(position)
  start(apples.length, position, () => {
    setUploadForm();
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

function avoidReturning(position, states, score){
  for(let i = 0; i < states.length; i++){
    if(states[i]['state']['players'][0] == position && score == states[i]['state']['score']){
      return true;
    }
  }
  return false;
}

function removeElement(array, element){
  let index = array.indexOf(element);
  if (index > -1) return array.splice(index, 1);
}