if (window.attachEvent) {
  window.attachEvent("onload", start);
} else {
  if (window.onload) {
    var curronload = window.onload;
    var newonload = function (evt) {
      curronload(evt);
      start(evt);
    };
    window.onload = newonload;
  } else {
    window.addEventListener("load", function () {
      var url = "https://ws.audioscrobbler.com/2.0/";
      var method = "?method=user.getrecenttracks";
      var APIkey = "&api_key= 	cc9faf8fe35992da103b2b514f648254";
      var user = "&user= dior-_-" + document.querySelector("#username").value;
      fetch(url + method + user + APIkey + "&format=json").then(
        populateRecents
      );
    });

    function populateRecents(response) {
      document.querySelector(".data-window").style.display = "block";
      document.querySelector(".artist-grid").style.display = "none";
      return response.json().then(function (data) {
        var table = document.querySelector("#recentTable");
        for (var i = 0; i < 10; i++) {
          var row = table.insertRow(i + 1);
          var thumbnail = row.insertCell(0);
          var song = row.insertCell(1);
          var artist = row.insertCell(2);
          var album = row.insertCell(3);
          var info = data.recenttracks.track[i];
          var cover = info.image[0]["#text"];
          thumbnail.innerHTML = "<img src=" + cover + "/>";
          song.innerHTML = info.name;
          artist.innerHTML = info.artist["#text"];
          album.innerHTML = info.album["#text"];
        }
      });
    }
  }
}
