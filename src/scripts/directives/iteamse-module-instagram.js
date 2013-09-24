;(function (angular, stdlib) {
  "use strict";
  angular.module(
    "iteamse.module.instagram",
    []
  )
  /*
   * @desc
   *   This is used to render the instagram-elements.
   *   The Values needed are a name-attribute and
   *     a max-attribute (optional.)
   *   Example:
   *     <instagram name="ankjevel" max="3"></instagram>
   */
  .directive("instagram", function ($http) {
    return {
      restrict: "E",
      replace: true,
      scope: true,
      templateUrl: "/content/partials/instagram.html",
      link: function (scope, element, attrs) {
        var name, max, options;

        name = attrs.name;
        max = +attrs.max || 3;

        scope.instagramFeed = [];

        if (typeof name !== "string" || !name) {
          return;
        }

        options = {
          url: "http://insta-team.se/user/" + name + "?count=" + max,
          method: "GET"
        };

        $http(options).success(function (content) {
          if (!content && !content.data && !(content.data instanceof Array)) {
            return;
          }
          scope.instagramFeed = content.data;
        }).error(function (data) {
          stdlib.console.error(data);
        });
      }
    };
  });
})(angular, window);