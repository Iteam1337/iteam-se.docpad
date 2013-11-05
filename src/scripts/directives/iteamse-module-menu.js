(function () {
  "use strict";
  angular.module(
    "iteamse.module.menu",
    []
  )
  .directive("menu", function ($window) {
    return {
      link: function (scope, element, attrs) {
        var menu, offset;
        menu = $("#top-holder");
        offset = $(".offset");
        offset.height(menu.height());
        $($window).smartresize(function () {
          offset.height(menu.height());
        });
      }
    };
  });
})();