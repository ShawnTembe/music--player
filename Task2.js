Window.loadPlaylist = function () {
  var xhttp = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.body.innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", url, true);
  xhr.send();
}
