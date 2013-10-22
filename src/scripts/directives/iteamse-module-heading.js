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
        var random = Math.floor(Math.random() * (headings.length - 1 + 1)) + 0;
        
        scope.randomHeading = headings[random];
      }
    };
  });
})();