;(function (angular, stdlib, $) {
  "use strict";
  angular.module(
    "iteamse.module.image-gallery",
    []
  )
  /*
   * @desc
   *   This is used to handle the pseudo-image-gallery
   *   This needs a `image-gallery`-html-element to render
   *   It also needs the images to be defined as a array value,
   *     for a `images`-attribute.
   *   Example:
   *      <image-gallery images="['test.png','file.jpg']"></image-gallery>
   */
  .directive("imageGallery", function () {
    return {
      restrict: "E",
      replace: false,
      scope: true,
      templateUrl: "/content/partials/lightbox.html",
      link: function (scope, element, attrs) {
        var i, img, images, lightbox, body;

        images = stdlib.JSON.parse(attrs.images);

        i = images.length;

        while (i--) {
          img = images[i];
          if (img.match(/(^\/)|(^http(s)\:\/\/)/i)) {
            continue;
          }
          images[i] = "/content/images/" + img;
        }
        i = null;
        img = null;
        scope.images = images;
        console.log(scope.images);

        body = $(stdlib.document).find("html");
        lightbox = $(element).find("#lightbox");
        lightbox.modal({
          show: false,
          dynamic: true
        });

        lightbox.appendTo(body);

        scope.activeImage = null;
        scope.open = function (index) {
          scope.activeImage = scope.images[index];
          lightbox.modal("show");
        };
      }
    };
  });
   /*
  .directive("imageGallery", function ($timeout) {
    return {
      restrict: "E",
      replace: true,
      scope: true,
      templateUrl: "/content/partials/image-gallery.html",
      link: function(scope, element, attrs) {
        function applyAndSetActive (index) {
          index = typeof index === "number" ? +index : null;
          scope.$apply( function () {
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
          body.bind("keydown", function (event) {
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
        scope.images = stdlib.JSON.parse(attrs.images);

        body = angular.element(stdlib.document).find("html");
        keyCodes = [37,39,27];
        i = scope.images.length;

        while (i--) {
          img = scope.images[i];
          if (img.match(/(^\/)|(^http(s)\:\/\/)/i)) {
            continue;
          }
          scope.images[i] = "/content/images/" + img;
        }
        img = null;
        i = null;
        scope.setActive = function (index) {
          if (scope.active !== index) {
            scope.active = index;
            $timeout(bind, 50);
          }
        };
      }
    };
  });
  */
})(angular, window, $);