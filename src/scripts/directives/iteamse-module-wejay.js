;(function () {
  "use strict";

  angular.module(
    "iteamse.module.wejay", []
  )
  /*
   * @desc
   *  Wejay!
   */
  .directive("wejay", function ($http) {
    return {
      restrict: "A",
      scope: true,
      link: function (scope) {

        var lastfmKey, lastfmUser, lastfmUrl;

        lastfmKey = "59a34f30f3c5163f936e755463780ad2";
        lastfmUser = "iteam1337";
        lastfmUrl = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + lastfmUser + "&api_key=" + lastfmKey + "&format=json";

        /**
         * Gets now playing music from Last.fm
         * @param  {string} music URL to Last.fm recent tracks
         */
        $http.get(lastfmUrl).success(function (music) {
          var np, spotifyUrl;
          if (!music || !music.hasOwnProperty("recenttracks") || !(music.recenttracks.track instanceof Array)) {
            return;
          }
          np = music.recenttracks.track[0];
          spotifyUrl = "http://ws.spotify.com/search/1/track.json?q=";

          scope.nowplaying =  {
            "artist": np.artist['#text'],
            "track": np.name
          };

          spotifyUrl = spotifyUrl + np.artist["#text"].replace(/ /g, "+") + "+" + np.name.replace(/ /g, "+");

          $http.get(spotifyUrl).success(function (spotify) {
            spotify = spotify.tracks[0];

            scope.nowplaying.artistUrl = spotify.artists[0].href;
            scope.nowplaying.trackUrl  = spotify.href;
          });
        });
      }
    };

  });

})();