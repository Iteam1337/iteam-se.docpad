(function() {

  'use strict';

  angular.module('iteamse').controller('MainCtrl', function($scope, $http) {

    var time;

    $scope.mobileNav = false;
    $scope.allTags   = [];
    $scope.subpages  = null;

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