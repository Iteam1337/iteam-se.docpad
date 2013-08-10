(function (stdang, LibCodebird, stdmoment) {
    "use strict";

    stdang.module("iteamse").controller("MainCtrl", function ($scope) {
        $scope.mobileNav = false;
        $scope.allTags = [];
        $scope.subpages = null;
        $scope.twitter = null;

        /**
         * Searches Twitter for a given twitter hashtag, mention or other
         */
        $scope.$watch("twitter", function () {
            var cb, query;
            if (!$scope.twitter) {
                return;
            }
            cb = new LibCodebird();
            query = $scope.twitter.replace(",", " OR ");

            cb.setConsumerKey("bvqOzAMz10CWGfcWOfow", "DYYE1S4jWeTX3rp4P5uJQ62a1AhlqxGRPTnkGYGx7M");

            cb.__call(
                "search_tweets",
                "q=" + query,
                function (reply) {
                    var tweets, tweet, text;
                    $scope.tweets = [];

                    tweets = reply.statuses;

                    Object.keys(tweets).map(function (i) {

                        text = tweets[i]
                            .text
                            .replace(/(@)(\w*)/ig, '<a href="http://twitter.com/$2" target="_blank">$&</a>')
                            .replace(/(#)(\w*)/ig, '<a href="http://twitter.com/search/$2" target="_blank">$&</a>');
                        tweet = {
                            "text": text,
                            "created_at": stdmoment(tweets[i].created_at).fromNow(),
                            "user": tweets[i].user.name
                        };

                        $scope.tweets.push(tweet);
                    });

                    $scope.$apply();
                },
                true
            );
        }, true);

    });

})(angular, Codebird, moment);