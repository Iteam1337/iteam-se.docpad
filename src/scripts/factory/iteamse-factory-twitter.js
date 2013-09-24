;(function (angular, LibCodebird, stdmoment) {

  "use strict";
  angular.module(
    "iteamse.factory.twitter",
    []
  )
  .factory("$twitter", function () {
    return function (query, callback) {
      var cb;

      if (!LibCodebird || !stdmoment) {
        return;
      }

      if (typeof query !== "string" || typeof callback !== "function") {
        return;
      }

      query = query.replace(",", " OR ");

      cb = new LibCodebird();
      cb.setConsumerKey("bvqOzAMz10CWGfcWOfow", "DYYE1S4jWeTX3rp4P5uJQ62a1AhlqxGRPTnkGYGx7M");

      cb.__call(
        "search_tweets",
        "q=" + query,
        function (reply) {
          var tweets, tweet, scopetweets, text;
          scopetweets = [];

          tweets = reply.statuses;

          Object.keys(tweets).map(function (i) {

            text = tweets[i].text
                    .replace(/(@)(\w*)/ig, '<a href="http://twitter.com/$2" target="_blank">$&</a>')
                    .replace(/(#)(\w*)/ig, '<a href="http://twitter.com/search/$2" target="_blank">$&</a>');
            tweet = {
              "text": text,
              "created_at": stdmoment(tweets[i].created_at).fromNow(),
              "user": tweets[i].user.name
            };

            scopetweets.push(tweet);
          });

          return callback(scopetweets);
        },
        true
      );
    };
  });

})(angular, Codebird, moment);