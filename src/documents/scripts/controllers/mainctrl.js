(function() {

  'use strict';

  angular.module('iteamse').controller('MainCtrl', function($scope, $http) {

    var lastfmKey = '59a34f30f3c5163f936e755463780ad2',
    lastfmUser    = 'iteam1337',
    lastfmUrl     = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + lastfmUser + '&api_key=' + lastfmKey + '&format=json',
    spotifyUrl    = 'http://ws.spotify.com/search/1/track.json?q=';

    var np, time;

    $http.get(lastfmUrl).success(function (music) {
      np = music.recenttracks.track[0];

      $scope.nowplaying =  {
        "artist": np.artist['#text'],
        "track": np.name
      };

      $http.get(spotifyUrl + np.artist['#text'].replace(/ /g,'+') + '+' + np.name.replace(/ /g,'+'))
        .success(function (spotify) {
          spotify = spotify.tracks[0];

          $scope.nowplaying.artistUrl = spotify.artists[0].href;
          $scope.nowplaying.trackUrl  = spotify.href;
        });
    });

  });

})();