(function () {
  'use strict';

  var xmlHttp = null;
  var feed = document.getElementById('blog-feed');

  function stateChange() {
    if (xmlHttp.readyState !== 4 || xmlHttp.status !== 200) {
      return;
    }
    var res = JSON.parse(xmlHttp.responseText);
    if (res.error || res.status !== 200) {
      return;
    }
    res.data.forEach(function (data) {
      var a = document.createElement('a');
      a.setAttribute('target', '_blank');
      a.setAttribute('href', data.link);
      a.className = 'blog';
      a.innerHTML = data.title;
      feed.appendChild(a);
    });
  }

  function readRSS(path, count) {
    count = count || 3;
    var url = 'http://feed.insta-team.se/rss?url={url}&count={count}';
    url = url.replace('{url}', escape(path)).replace('{count}', count);
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = stateChange;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
  }

  if (feed) {
    var url = feed.getAttribute('data-url');
    if (!url) {
      return;
    }
    var numberOfImages = feed.getAttribute('data-count');
    var count = numberOfImages || 4;
    readRSS(url, count);
  }
})();