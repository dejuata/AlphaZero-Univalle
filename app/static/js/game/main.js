function sendData() {
  console.log()
  function reqListener() {
    data = JSON.parse(this.response);
    setPiece(data['position']);
  }

  let newXHR = new XMLHttpRequest();
  let url = `${document.location.origin}/position`;

  newXHR.addEventListener('load', reqListener);
  newXHR.open('POST', url);
  newXHR.setRequestHeader("Content-type", "application/json")

  let jsonData = { data: MOVES };
  let formattedJsonData = JSON.stringify(jsonData);
  newXHR.send(formattedJsonData);
}
