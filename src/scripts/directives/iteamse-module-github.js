(function () {
  "use strict";
  angular.module(
    "iteamse.module.github",
    [
      "iteamse.factory.github"
    ]
  )
  /*
   * @desc
   *  Adds github — info
   */
  .directive("github", function ($GHEvents, $GHRepos) {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "/content/partials/github.html",
      scope: {
        username: "@"
      },
      link: function (scope) {
        var options;

        scope.github = {};

        options = {
          user: scope.username,
          maxTake: 6
        };

        $GHEvents(options, function (git) {
          scope.github.events = git;
        });

        $GHRepos(options, function (git) {
          scope.github.repos = git;
        });
      }
    };
  });
})();