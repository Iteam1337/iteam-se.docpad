function MainCtrl($scope, $http) {

  var lastfmKey = '59a34f30f3c5163f936e755463780ad2',
  lastfmUser    = 'iteam1337',
  lastfmUrl     = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + lastfmUser + '&api_key=' + lastfmKey + '&format=json';

  var np, time;

  $http.get(lastfmUrl).success(function (music) {
    np = music.recenttracks.track[0];
    time = np.date.uts;

    $scope.nowplaying =  {
      "artist": np.artist['#text'],
      "track": np.name,
      "timeSince": moment(time).fromNow()
    };
  });
}

function AboutCtrl($scope) {

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
  myNewChart = new Chart(ctx).Line(data);

}

var app = angular.module('iteam.se', []);
