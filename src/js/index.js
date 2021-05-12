import { DOMSelectors } from "./DOM";
import { genres } from "./genre";

var lastfm = new LastFM({
  apiKey: "c9946d11aaaaaaaaaaaaaaaaaaaaaaaace",
  apiSecret: "9dabf9aaaaaaaaaaaaaaaaxxx11ec3c7a993",
  cache: cache,
});

headers = {
  "user-agent": USER_AGENT,
};

payload = {
  api_key: API_KEY,
  method: "chart.gettopartists",
  format: "json",
};

r = requests.get(
  "https://ws.audioscrobbler.com/2.0/",
  (headers = headers),
  (params = payload)
);
r.status_code;
