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
  .directive("mobileNav", function() {
    return {
      link: function (scope, elm, attr) {
        var arrow, link, subpage, url;

        link = elm.find("a");
        arrow = elm.find("div");

        subpage = elm.attr("data-subpage");
        url = link.attr("data-url");

        arrow.bind("click", function() {
          scope.subpages = subpage;
          scope.$apply();
        });
        link.bind("click", function () {
          window.location = url;
          scope.$apply();
        });
      }
    };
  })
  /*
  * @desc
  *   this is used to render the instagram-elements
  */
  .directive("instagram", function($http) {
    return {
      restrict: "E",
      link: function(scope, element, attrs) {
        var name, url, options, max;

        scope.feed = [];

        name = attrs.name;
        max = attrs.max ? +attrs.max : 3;
        url = "http://insta-team.se/user/" + name + "?count=" + max;

        options = {
          url: url,
          method: "GET"
        };

        $http(options)
        .success(function(content) {
          if (content && content.data && content.data instanceof Array) {
            scope.feed = content.data;
          }
        })
        .error(function(data) {
          console.error(data);
        });
      }
    };
  });

})();