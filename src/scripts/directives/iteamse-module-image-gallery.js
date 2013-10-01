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
        var i, img, images, modal, body;

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

        body = $("body");
        modal = $(element).find("#modal");

        modal.modal({
          show: false,
          dynamic: true
        });

        modal.appendTo(body);

        scope.index = null;
        scope.open = function (index) {
          scope.index = index;
          modal.modal("show");
        };

        scope.switch = function (index) {
          if (scope.index !== index) {
            scope.index = index;
          }
        };
      }
    };
  });
})(angular, window, $);