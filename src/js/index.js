import { DOMSelectors } from "./DOM";
import { genres } from "./genre";
import { lastfm } from "./lastfm.api.js";

lastfm.substring(1);

lastfm.artist.getInfo(
  { artist: "The Smiths" },
  {
    success: function (data) {},
    error: function (code, message) {},
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
      window.document.onload = lastfm.user.getTopArtists(
        {
          user: "dior-_-",
          limit: 10,
        },
        {
          success: function (data) {},
          error: function (data) {
            alert(data.error + " " + data.message);
          },
        }
      );
      $(document).ready(function () {
        $.getJSON(
          "http://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=test&api_key=4a9f5581a9cdf20a699f540ac52a95c9&limit=10&format=json&callback=?",
          function (json) {
            var html = "";
            $.each(json.topartists.artist, function (i, item) {
              html +=
                "<p><a href=" +
                item.url +
                " target='_blank'>" +
                item.name +
                " - " +
                "Play count : " +
                item.playcount +
                "</a></p>";
            });
            $("#result").append(html);
          }
        );
      });

      lastfm.artist.getInfo(
        { artist: topArtistName },
        {
          success: function (data) {
            console.log(data);
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
