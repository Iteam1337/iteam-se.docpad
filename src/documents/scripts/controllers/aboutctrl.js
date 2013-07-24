(function() {

  'use strict';

  angular.module('iteamse').controller('AboutCtrl', function($scope, $http) {

    var ctx, chart, data, options;

    data = {
      labels : ['2008','2009','2010','2011','2012'],
      datasets : [
        {
          fillColor : "rgba(255,189,9,0.5)",
          strokeColor : "rgba(255,189,9,1)",
          pointColor : "rgba(255,189,9,1)",
          pointStrokeColor : "#fff",
          data : [7, 8 ,9 ,10, 11, 12]
        },
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : [7.5, 8.5, 10, 9.3, 11.6]
        }
      ]
    };

    var canvas = document.getElementById("financialNumbers");

    ctx = canvas.getContext("2d");
    new Chart(ctx).Line(data);
  });

})();