(function () {
  "use strict";
  angular.module(
    "iteamse.module.general",
    []
  )

  /**
   * Makes code blocks pretty on blog
   */
  .directive("makePretty", function () {
    return {
      link: function () {
        $("pre code").each(function (i, element) {
          hljs.highlightBlock(element);
        });
      }
    };
  })

  /**
   * Make anchor tags for headers on type page
   */
  .directive("makeAnchors", function () {
    return {
      link: function () {
        $(":header").each(function () {
          $(this).append('<a id="' + $(this).text().replace(/ /g, "-") + '"></a>');
        });
      }
    };
  })

  /**
   * Mobile nav
   */
  .directive("mobileNav", function ($window) {
    return {
      link: function (scope, elm) {
        var arrow, link, subpage, url;

        link = elm.find("a");
        arrow = elm.find("div");

        subpage = elm.attr("data-subpage");
        url = link.attr("data-url");

        arrow.bind("click", function () {
          scope.subpages = subpage;
          scope.$apply();
        });

        link.bind("click", function () {
          $window.location = url;
          scope.$apply();
        });
      }
    };
  });
})();