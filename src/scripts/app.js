;(function (stdlib, angular, highlight, $) {
  "use strict";

  angular.module("iteamse",
    [
      "iteamse.config",
      "iteamse.factory.github",
      "iteamse.factory.twitter",
      "iteamse.module.about-view",
      "iteamse.module.image-gallery",
      "iteamse.module.instagram",
      "iteamse.module.twitter",
      "iteamse.module.github",
      "iteamse.module.wejay"
    ]
  )

  /**
   * Makes code blocks pretty on blog
   */
  .directive("makePretty", function () {
    return {
      link: function () {
        $("pre code").each(function (i, element) {
          highlight.highlightBlock(element);
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
  .directive("mobileNav", function () {
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
          stdlib.location = url;
          scope.$apply();
        });
      }
    };
  });
})(window, angular, hljs, jQuery);