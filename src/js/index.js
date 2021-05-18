import { DOMSelectors } from "./DOM";
import { genres } from "./genre";
var lastfm = new LastFM({
  apiKey: "f21088bf9097b49ad4e7f487abab981e",
  apiSecret: "7ccaec2093e33cded282ec7bc81c6fca",
  cache: cache,
});

/* Load some artist info. */
lastfm.artist.getInfo(
  { artist: "The xx" },
  {
    success: function (data) {
      /* Use data. */
    },
    error: function (code, message) {
      /* Show error message. */
    },
  }
);
function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.send(null);
}
var topArtistName = "";
lastfm.tag.getWeeklyArtistChart(
  { tag: "pop", limit: 6 },
  {
    success: function (data) {
      $("#top_artists").html(
        "#lastfmTemplateArtists".render(data.weeklyartistchart.artist)
      );

      topArtistName = data.weeklyartistchart.artist[0].name;

      lastfm.artist.getInfo(
        { artist: topArtistName },
        {
          success: function (data) {
            $("#top_artist").html(
              $("#lastfmTemplateArtistInfo").render(data.artist)
            );
            var list = "<ol>";
            for (var i = 0; i < data.topartists.artist.length; i++) {
              list += "<li>" + data.topartists.artist[i].name + "</li>";
            }
            document.getElementById("topartists").innerHTML = list + "</ol>";

            lastfm.artist.getTopTracks(
              { artist: topArtistName, limit: 9 },
              {
                success: function (data) {
                  $("#top_tracks").html(
                    $("#lastfmTemplateTracks").render(data.toptracks.track)
                  );
                },
              }
            );
          },
        }
      );
    },
  }
);
