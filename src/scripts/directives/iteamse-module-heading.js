;(function () {
  "use strict";
  angular.module(
    "iteamse.module.heading",
    []
  )
  /*
   * @desc
   *   This is used to render the random heading on
   *   the start page.
   *
   *   Required values
   *   headings {string} - String of headings from the document
   *
   *   Example:
   *     <heading headings="Heading 1,Heading 2"></heading>
   */
  .directive("heading", function ($http) {
    return {
      restrict: "E",
      replace: true,
      scope: {
        headings: "@",
      },
      templateUrl: "/content/partials/heading.html",
      link: function (scope, element) {
        var headings = scope.headings.split(',');
        var max = headings.length - 1;
        var random = Math.min(Math.max(0, Math.floor(Math.random() * max)), max);
        scope.randomHeading = headings[random];
      }
    };
  });
})();