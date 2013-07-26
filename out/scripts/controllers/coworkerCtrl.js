(function() {

  'use strict';

  angular.module('iteamse').controller('CoworkerCtrl', function($scope, $http) {

    var github, githubUser;

    $scope.github = undefined;

    if (document.getElementById('github')) {
      githubUser = document.getElementById('github').innerHTML;
      github     = 'https://api.github.com/users/{user}/events';

      $http.get(github.replace('{user}', githubUser))
        .success(function (data) {
          $scope.github = data.slice(0,10);

          $scope.github.map(function (push) {
            push.created_at = moment(push.created_at).fromNow();
          });
        });
    }
  });

})();