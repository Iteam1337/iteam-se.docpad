;(function (angular) {
  "use strict";
  angular.module(
    "iteamse.config",
    []
  ).config(function ($compileProvider) {
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension|spotify):/);
  });
})(angular);