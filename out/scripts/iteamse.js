/*! iteamse - v0.9.0 - 2013-07-26 10:07 */
(function() {

  "use strict";

  var app = angular.module('iteamse', []);

  app.config(function ($compileProvider) {
    $compileProvider
      .urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension|spotify):/);
  });

  /**
   * Makes code blocks pretty on blog
   */
  app.directive('makePretty', function () {
    return {
      link: function (scope, elm, attr) {
        $('pre code').each(function (i, e) {
          hljs.highlightBlock(e);
        });
      }
    };
  })
  /**
   * Make anchor tags for headers on type page
   */
  .directive('makeAnchors', function () {
    return {
      link: function (scope, elm, attr) {
        $(':header').each(function () {
          $(this).append('<a id="' + $(this).text().replace(/ /g,'-') + '"></a>');
        });
      }
    };
  })
  /**
   * Mobile nav
   */
  .directive('mobileNav', function() {
    return {
      link: function (scope, elm, attr) {
        elm.bind('click', function () {

          if (elm.attr('data-subpage')) {
            scope.subpages = elm.attr('data-subpage');
          } else {
            window.location = elm.find('a').attr('data-url');
          }

          scope.$apply();
        });
      }
    };
  });

})();
(function() {

  'use strict';

  angular.module('iteamse').controller('AboutCtrl', function($scope, $http) {

    var canvas, ctx, chart, data, options, scaleOverride, scaleSteps, scaleStepWidth, scaleStartValue;

    scaleOverride   = true;
    scaleSteps      = 15;
    scaleStepWidth  = 1;
    scaleStartValue = 0;

    if (document.getElementById("turnoverNumbers")) {
      /**
       * Chart of turnover growth
       */
      data = {
        labels : ['1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012'],
        datasets : [
          {
            fillColor       : "rgba(155,189,9,0.5)",
            strokeColor     : "rgba(151,187,85,1)",
            pointColor      : "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            data            : [0.12, 0.2, 0.53, 1.1, 2.7, 3.7, 3.7, 2.7, 3.2, 3.9, 4.2, 7, 7.5, 7.5, 8.5, 10, 9.3, 11.6]
          }
        ]
      };

      options = {
        scaleOverride  : scaleOverride,
        scaleSteps     : scaleSteps,
        scaleStepWidth : scaleStepWidth,
        scaleStartValue: scaleStartValue,
        animationSteps : 160
      };

      canvas = document.getElementById("turnoverNumbers");
      ctx = canvas.getContext("2d");
      new Chart(ctx).Bar(data,options);


      /**
       * Chart of employee growth
       */
      data = {
        labels : ['1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012'],
        datasets : [
          {
            fillColor       : "rgba(255,189,9,0.5)",
            strokeColor     : "rgba(255,189,9,1)",
            pointColor      : "rgba(255,189,9,1)",
            pointStrokeColor: "#fff",
            data            : [0,0,1,2,3,4,3,4,4, 4, 6, 7, 7, 8 ,9 ,10, 11, 12]
          }
        ]
      };

      options = {
        scaleOverride  : scaleOverride,
        scaleSteps     : scaleSteps,
        scaleStepWidth : scaleStepWidth,
        scaleStartValue: scaleStartValue,
        animationSteps : 200
      };

      canvas = document.getElementById("employeeNumbers");
      ctx = canvas.getContext("2d");
      new Chart(ctx).Line(data,options);

      /**
       * Chart of work areas
       */
      data = [
        {
          value: 30,
          color:"#F38630"
        },
        {
          value: 70,
          color: "#E0E4CC"
        },
        {
          value: 50,
          color: "#69D2E7"
        }
      ];

      options = {
        animationSteps: 200
      };

      canvas = document.getElementById("businessareaNumbers");
      ctx = canvas.getContext("2d");
      new Chart(ctx).Pie(data, options);
    }
  });

})();
(function() {

  'use strict';

  angular.module('iteamse').controller('CoworkerCtrl', function($scope, $http) {

    var github, githubUser;

    $scope.github = undefined;

    if (document.getElementById('github')) {
      githubUser = document.getElementById('github').innerHTML;
      github     = 'https://api.github.com/users/{user}/events';

      $http.get(github.replace('{user}', githubUser))
        .success(function (data) {
          $scope.github = data.slice(0,10);

          $scope.github.map(function (push) {
            push.created_at = moment(push.created_at).fromNow();
          });
        });
    }
  });

})();
(function() {

  'use strict';

  angular.module('iteamse').controller('FeedbackCtrl', function($scope, $http) {

    $scope.inView = 0;

    $scope.changeFeedback = function (index) {
      $scope.inView = index;
    };

  });

})();
(function() {

  'use strict';

  angular.module('iteamse').controller('MainCtrl', function($scope, $http) {

    var time;

    $scope.mobileNav = false;
    $scope.allTags   = [];
    $scope.subpages  = null;
    $scope.twitter   = null;

    /**
     * Searches Twitter for a given twitter hashtag, mention or other
     */
    $scope.$watch('twitter', function() {
      if ($scope.twitter) {
        var cb = new Codebird(),
        query  = $scope.twitter.replace(',',' OR ');

        cb.setConsumerKey('bvqOzAMz10CWGfcWOfow','DYYE1S4jWeTX3rp4P5uJQ62a1AhlqxGRPTnkGYGx7M');

        cb.__call(
            "search_tweets",
            "q=" + query,
            function (reply) {
              $scope.tweets = [];

              var tweets = reply.statuses,
              tweet, text;

              Object.keys(tweets).map(function (i) {

                text = tweets[i]
                        .text
                        .replace(/(@)(\w*)/ig,'<a href="http://twitter.com/$2" target="_blank">$&</a>')
                        .replace(/(#)(\w*)/ig,'<a href="http://twitter.com/search/$2" target="_blank">$&</a>');

                tweet = {
                  "text": text,
                  "created_at": moment(tweets[i].created_at).fromNow(),
                  "user": tweets[i].user.name
                };

                $scope.tweets.push(tweet);
              });

              $scope.$apply();
            },
            true // this parameter required
        );
      }
    }, true);

  });

})();
(function() {

  'use strict';

  angular.module('iteamse').controller('WejayCtrl', function($scope, $http) {

    var lastfmKey = '59a34f30f3c5163f936e755463780ad2',
    lastfmUser    = 'iteam1337',
    lastfmUrl     = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + lastfmUser + '&api_key=' + lastfmKey + '&format=json',
    spotifyUrl    = 'http://ws.spotify.com/search/1/track.json?q=';

    var np;

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

  });

})();