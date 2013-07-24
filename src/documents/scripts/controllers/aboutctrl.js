(function() {

  'use strict';

  angular.module('iteamse').controller('AboutCtrl', function($scope, $http) {

    var ctx, chart, data, options;
    data = {
      labels : ['1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012'],
      datasets : [
        {
          fillColor : "rgba(155,189,9,0.5)",
          strokeColor : "rgba(151,187,85,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : [0.12, 0.2, 0.53, 1.1, 2.7, 3.7, 3.7, 2.7, 3.2, 3.9, 4.2, 7, 7.5, 7.5, 8.5, 10, 9.3, 11.6]
        }
      ]
    };
    options = {scaleOverride : true, scaleSteps : 15, scaleStepWidth : 1,scaleStartValue : 0,animationSteps : 160}
    var canvas = document.getElementById("turnoverNumbers");
    ctx = canvas.getContext("2d");
    new Chart(ctx).Bar(data,options);


    var ctx, chart, data, options;
    data = {
      labels : ['1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012'],
      datasets : [
        {
          fillColor : "rgba(255,189,9,0.5)",
          strokeColor : "rgba(255,189,9,1)",
          pointColor : "rgba(255,189,9,1)",
          pointStrokeColor : "#fff",
          data : [0,0,1,2,3,4,3,4,4, 4, 6, 7, 7, 8 ,9 ,10, 11, 12]
        },
      ]
    };
    options = {scaleOverride : true, scaleSteps : 15, scaleStepWidth : 1,scaleStartValue : 0,animationSteps : 200}
    var canvas = document.getElementById("employeeNumbers");
    ctx = canvas.getContext("2d");
<<<<<<< HEAD
    new Chart(ctx).Line(data,options);

    var ctx, chart, data, options;
    data = [
      {
        value: 30,
        color:"#F38630"
      },
      {
        value : 70,
        color : "#E0E4CC"
      },
      {
        value : 50,
        color : "#69D2E7"
      }     
    ]
    options = {animationSteps : 200}
    var canvas = document.getElementById("businessareaNumbers");
    ctx = canvas.getContext("2d");
    new Chart(ctx).Pie(data, options);
=======
    new Chart(ctx).Line(data);
>>>>>>> e4c27d3ffca0f8a46f62a386911fc1fae36d2943

  });

})();