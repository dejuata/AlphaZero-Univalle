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
// load board
onload = board;
