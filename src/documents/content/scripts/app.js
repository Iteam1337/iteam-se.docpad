(function (stdlib, stdang, stdhighlight, query) {
    "use strict";

    stdang.module("iteamse", [])

        .config(function ($compileProvider) {
            $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension|spotify):/);
        })

        /**
         * Makes code blocks pretty on blog
         */
        .directive("makePretty", function () {
            return {
                link: function () {
                    query("pre code").each(function (i, element) {
                        stdhighlight.highlightBlock(element);
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
                    query(":header").each(function () {
                        query(this).append('<a id="' + query(this).text().replace(/ /g, "-") + '"></a>');
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
        })

        /*
         * @desc
         *   this is used to render the instagram-elements
         */
        .directive("instagram", function ($http) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/content/partials/instagram.html",
                link: function (scope, element, attrs) {
                    var name, url, options, max;

                    name = attrs.name;
                    max = attrs.max ? +attrs.max : 3;
                    url = "http://insta-team.se/user/" + name + "?count=" + max;

                    options = {
                        url: url,
                        method: "GET"
                    };

                    scope.instagramFeed = [];

                    $http(options).success(function (content) {
                        if (!content && !content.data && !(content.data instanceof Array)) {
                            return;
                        }
                        scope.instagramFeed = content.data;
                        stdlib.console.log(content.data);
                    }).error(function (data) {
                        stdlib.console.error(data);
                    });
                }
            };
        });

})(window, angular, hljs, $);