(function (stdlib, angular, highlight, $) {
    "use strict";

    angular.module("iteamse", [])

        .config(function ($compileProvider) {
            $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension|spotify):/);
        })

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
        })

        /*
         * @desc
         *   This is used to render the instagram-elements.
         *   The Values needed are a name-attribute and
         *     a max-attribute (optional.)
         *   Example:
         *     <instagram name="ankjevel" max="3"></instagram>
         */
        .directive("instagram", function ($http) {
            return {
                restrict: "E",
                replace: true,
                scope: true,
                templateUrl: "/content/partials/instagram.html",
                link: function (scope, element, attrs) {
                    var name, max, options;

                    name = attrs.name;
                    max = +attrs.max || 3;

                    scope.instagramFeed = [];

                    if (typeof name !== "string" || !name) {
                        return;
                    }

                    options = {
                        url: "http://insta-team.se/user/" + name + "?count=" + max,
                        method: "GET"
                    };

                    $http(options).success(function (content) {
                        if (!content && !content.data && !(content.data instanceof Array)) {
                            return;
                        }
                        scope.instagramFeed = content.data;
                    }).error(function (data) {
                        stdlib.console.error(data);
                    });
                }
            };
        })
        /*
         * @desc
         *   This is used to handle the pseudo-image-gallery
         *   This needs a `image-gallery`-html-element to render
         *   It also needs the images to be defined as a array value,
         *     for a `images`-attribute.
         *   Example:
         *      <image-gallery images="['test.png','file.jpg']"></image-gallery>
         */
        .directive("imageGallery", function ($timeout) {
            return {
                restrict: "E",
                replace: true,
                scope: true,
                templateUrl: "/content/partials/image-gallery.html",
                link: function(scope, element, attrs) {
                    function applyAndSetActive (index) {
                        index = typeof index === "number" ? +index : null;
                        scope.$apply(function() {
                            scope.active = index;
                            if (index === null) {
                                unbind();
                            }
                        });
                    }
                    function bind() {
                        unbind();
                        body.addClass("show-image");
                        body.bind("click", applyAndSetActive);
                        body.bind("keydown", function(event){
                            var code, active, max;
                            code = event.keyCode;
                            if (!~keyCodes.indexOf(code)) {
                                return;
                            } else if (code === 27) {
                                applyAndSetActive();
                                return;
                            }
                            active = +scope.active;
                            max = scope.images.length -1;
                            if (code === 37) {
                                applyAndSetActive(active > 0 ? active -1 : 0);
                            } else if (code === 39) {
                                applyAndSetActive(active < max ? active +1 : max);
                            }
                        });
                    }
                    function unbind() {
                        body.removeClass("show-image");
                        body.unbind("click");
                        body.unbind("keydown");
                    }
                    var img, i, body, keyCodes;

                    scope.active = null;
                    scope.images = JSON.parse(attrs.images);

                    body = angular.element(stdlib.document).find("html");
                    keyCodes = [37,39,27];
                    i = scope.images.length;

                    while(i--) {
                        img = scope.images[i];
                        if (img.match(/(^\/)|(^http(s)\:\/\/)/i)) {
                            continue;
                        }
                        scope.images[i] = "/content/images/" + img;
                    }
                    img = null;
                    i = null;
                    scope.setActive = function(index) {
                        if (scope.active !== index) {
                            scope.active = index;
                            $timeout(bind, 50);
                        }
                    };
                }
            };
        });
})(window, angular, hljs, jQuery);