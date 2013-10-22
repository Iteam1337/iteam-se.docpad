;(function (angular, $) {
  "use strict";
  angular.module("revolunet.angular-carousel.image-carousel", [])
  .directive("imageCarousel", ["$rootScope", "$parse", "$compile", function ($rootScope, $parse, $compile) {

    var template = '' +
      '<div>' +
        '<ul class="images">' +
          '<li ng-repeat="image in images" ng-click="showModalAtIndex($index)">' +
            '<img ng-src="{{image}}" alt="image"/>' +
          '</li>' +
        '</ul>' +
        '<div class="modal fade hide" tabindex="-1" role="dialog" aria-hidden="true">' +
            '<div class="modal-body">' +
              '<button class="btn btn-inverse btn-large" data-dismiss="modal" aria-hidden="true" ng-click="close()">Stäng</button>' +
              '<ul class="images" rn-carousel rn-carousel-indicator>' +
                '<li ng-repeat="item in images" style="background-image:url(\'{{item}}\');"></li>' +
              '</ul>' +
            '</div>' +
        '</div>' +
      '</div>';

    return {
      restrict: "E",
      transclude: true,
      replace: true,
      scope: true,
      template: template,
      compile: function () {
        return function (scope, iElement, iAttrs) {
          var content;

          content = $(iElement).find('.modal');

          if (!content.length) {
            return console.error('no modal-body found');
          }

          content.appendTo($('body'));

          content.modal({
            show: false,
            dynamic: true
          });

          scope.images = $parse(iAttrs.images)(scope);

          scope.showModalAtIndex = function (index) {
            content.modal("show");
            $rootScope.$emit('forcePosition', index);
          };
        };
      }
    };
  }]);
})(angular, $);
