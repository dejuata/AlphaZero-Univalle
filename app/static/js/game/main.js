function sendData() {
  function reqListener() {
    data = JSON.parse(this.response);
    setPiece(data['position'])
  }

  let newXHR = new XMLHttpRequest();
  let url = `${document.location.origin}/position`;

  newXHR.addEventListener('load', reqListener);
  newXHR.open('POST', url);

  let jsonData = { data: 'Ray'};
  let formattedJsonData = JSON.stringify(jsonData);

  newXHR.send(formattedJsonData);
}
