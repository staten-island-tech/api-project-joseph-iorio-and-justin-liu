import { lastfm } from "./lastfm.api.js";
import { axios } from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom";
const fetch = require("node-fetch");

function ArtistTop() {
  const getChart = () => {
    const response = axios.get("./lastfm.api.js");
    lastfm.tag.getWeeklyArtistChart(
      { tag: "electronic", limit: 6 },
      {
        success: function (data) {
          "#top_artists".html(
            "#lastfmTemplateArtists".render(data.weeklyartistchart.artist)
          );

          topArtistName = data.weeklyartistchart.artist[0].name;

          lastfm.artist.getInfo(
            { artist: topArtistName },
            {
              success: function (data) {
                "#top_artist".html(
                  "#lastfmTemplateArtistInfo".render(data.artist)
                );

                lastfm.artist.getTopTracks(
                  { artist: topArtistName, limit: 9 },
                  {
                    success: function (data) {
                      "#top_tracks".html(
                        "#lastfmTemplateTracks".render(data.toptracks.track)
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

    topArtistName = "";
    window.on(function () {
      // define api keys
      apiKey = "f21088bf9097b49ad4e7f487abab981e";
      apiSecret = "7ccaec2093e33cded282ec7bc81c6fca";
      // create a Cache object
      cache = new LastFMCache();
      // create a LastFM object
      lastfm = new LastFM({
        apiKey: apiKey,
        apiSecret: apiSecret,
        cache: cache,
      });
      topArtistName = "";
      // get weekly artist chart by tag 'trance'

      lastfm.tag.getWeeklyArtistChart(
        { tag: "trance", limit: 6 },
        {
          success: function (data) {
            // render top weekly artist using 'lastfmTemplateArtists' template

            "#top_artists".html(
              "#lastfmTemplateArtists".render(data.weeklyartistchart.artist)
            );

            // define top artist name

            topArtistName = data.weeklyartistchart.artist[0].name;

            // load details of the artist

            lastfm.artist.getInfo(
              { artist: topArtistName },
              {
                success: function (data) {
                  // render the single artist info using 'lastfmTemplateArtistInfo' template
                  "#top_artist".html(
                    "#lastfmTemplateArtistInfo".render(data.artist)
                  );

                  // load the artis's top tracks

                  lastfm.artist.getTopTracks(
                    { artist: topArtistName, limit: 9 },
                    {
                      success: function (data) {
                        // render the tracks using 'lastfmTemplateTracks' template

                        "#top_tracks".html(
                          "#lastfmTemplateTracks".render(data.toptracks.track)
                        );
                      },
                    }
                  );
                },
                error: function (code, message) {
                  alert("Error #" + code + ": " + message);
                },
              }
            );
          },
        }
      );
    });
  };
}
