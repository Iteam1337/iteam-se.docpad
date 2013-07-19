(function() {

  'use strict';

  angular.module('iteamse').controller('MainCtrl', function($scope, $http) {

    var lastfmKey = '59a34f30f3c5163f936e755463780ad2',
    lastfmUser    = 'iteam1337',
    lastfmUrl     = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + lastfmUser + '&api_key=' + lastfmKey + '&format=json',
    spotifyUrl    = 'http://ws.spotify.com/search/1/track.json?q=';

    var np, time;

    $scope.mobileNav = false;
    $scope.allTags   = [];

    /**
     * Gets now playing music from Last.fm
     * @param  {string} music URL to Last.fm recent tracks
     */
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

    /**
     * Searches Twitter for a given twitter hashtag, mention or other
     */
    if (document.getElementById('twitter')) {
      var cb = new Codebird(),
      query  = document.getElementById('twitter').innerHTML.replace(',',' OR ');

      cb.setConsumerKey('bvqOzAMz10CWGfcWOfow','DYYE1S4jWeTX3rp4P5uJQ62a1AhlqxGRPTnkGYGx7M');

      cb.__call(
          "search_tweets",
          "q=" + query,
          function (reply) {
            $scope.tweets = [];

            var tweets = reply.statuses,
            tweet, text;

            console.log(reply);

            Object.keys(tweets).map(function (i) {

              text = tweets[i]
                      .text
                      .replace(/(@)(\w*)/ig,'<a href="http://twitter.com/$2" target="_blank">$&</a>')
                      .replace(/(#)(\w*)/ig,'<a href="http://twitter.com/search/$2" target="_blank">$&</a>');

              tweet = {
                "text": text,
                "created_at": moment(tweets[i].created_at).fromNow()
              };

              $scope.tweets.push(tweet);
            });

            $scope.$apply();
          },
          true // this parameter required
      );
    }

  });

})();