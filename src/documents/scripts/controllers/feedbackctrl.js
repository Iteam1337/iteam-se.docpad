(function() {

  'use strict';

  angular.module('iteamse').controller('FeedbackCtrl', function($scope, $http) {

    $scope.inView = 0;
    $scope.feedbackHeaders = ['Arbeta ihop me oss','Arbeta hos oss','Säg hej'];

    $scope.changeFeedback = function (index) {
      $scope.inView = index;
    };

    $scope.texts = ['testsetsetests','hejehejehejeheje','blalbalbla'];

  });

})();