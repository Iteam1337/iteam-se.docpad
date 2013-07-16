(function() {

  'use strict';

  angular.module('iteamse').controller('AboutCtrl', function($scope, $http) {

    var ctx, chart, data, options;

    data = {
      labels : ['2010-12','2011-12','2012-12'],
      datasets : [
        {
          fillColor : "rgba(255,189,9,0.5)",
          strokeColor : "rgba(255,189,9,1)",
          pointColor : "rgba(255,189,9,1)",
          pointStrokeColor : "#fff",
          data : [10, 11, 12]
        },
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : [10.048, 9.395, 11.719]
        }
      ]
    };

    var canvas = document.getElementById("financialNumbers");

    ctx = canvas.getContext("2d");
    new Chart(ctx).Line(data);
  });

})();