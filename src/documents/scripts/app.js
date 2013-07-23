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
  });

})();