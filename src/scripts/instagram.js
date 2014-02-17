var xmlHttp = null;

var instagram = document.querySelector('.instagram');

if (instagram) {
  var user           = instagram.getAttribute('data-name');
  var numberOfImages = instagram.getAttribute('data-images');
  var count          = numberOfImages ? numberOfImages : 4;

  GetInstagramPhotos(user, count);
}

function GetInstagramPhotos(name, max) {
  var url = "http://insta-team.se/user/{name}?count={count}";
  url = url.replace('{name}', name).replace('{count}', count);

  xmlHttp = new XMLHttpRequest(); 
  xmlHttp.onreadystatechange = ProcessRequest;
  xmlHttp.open( "GET", url, true );
  xmlHttp.send( null );
}

function ProcessRequest() {
  if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) {
    var res = JSON.parse(xmlHttp.responseText);
    var list = document.getElementById('instagram-feed');

    for (var i = 0; i < res.data.length; i++) {
      var a = document.createElement('a');
      var img = new Image();

      a.setAttribute('target', '_blank');
      a.href = res.data[i].link;
      img.src = res.data[i].image.low_resolution.url;

      a.appendChild(img);
      list.appendChild(a);
    }
  }
}

