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
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}
 var topArtistName = '';
   // get weekly artist chart by tag 'trance'

	    lastfm.tag.getWeeklyArtistChart({tag: 'pop', limit: 6}, {success: function(data){

	        // render top weekly artist using 'lastfmTemplateArtists' template

	        $('#top_artists').html(

	            ('#lastfmTemplateArtists').render(data.weeklyartistchart.artist)

	        );

	        topArtistName = data.weeklyartistchart.artist[0].name;

	        // load details of the artist

	        lastfm.artist.getInfo({artist: topArtistName}, {success: function(data){

	            // render the single artist info using 'lastfmTemplateArtistInfo' template

	            $('#top_artist').html(

	                $('#lastfmTemplateArtistInfo').render(data.artist)

	            );

	            // load the artis's top tracks

	            lastfm.artist.getTopTracks({artist: topArtistName, limit: 9}, {success: function(data){

	                // render the tracks using 'lastfmTemplateTracks' template

	                $('#top_tracks').html(

	                    $('#lastfmTemplateTracks').render(data.toptracks.track)

	                );

	            }})