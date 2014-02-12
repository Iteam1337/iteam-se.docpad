var xmlHttp = null;

function GetInstagramPhotos() {
  var Url = "http://insta-team.se/user/iteam1337?count=4";

  xmlHttp = new XMLHttpRequest(); 
  xmlHttp.onreadystatechange = ProcessRequest;
  xmlHttp.open( "GET", Url, true );
  xmlHttp.send( null );
}

function ProcessRequest() {
  if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) {
    var res = JSON.parse(xmlHttp.responseText);
    var list = document.getElementById('instagram-feed');

    for (var i = 0; i < res.data.length; i++) {
      var a = document.createElement('a');
      var img = new Image();

      img.src = res.data[i].image.low_resolution.url;

      a.appendChild(img);
      list.appendChild(a);
    }
  }
}

GetInstagramPhotos();