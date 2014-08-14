(function () {
  'use strict';

  var xmlHttp = null;
  var feed = document.getElementById('blog-feed');

  function truncate (text, length) {
    if (text == null || text.length < length || text.indexOf(" ", length) == -1) {
      return text;
    }

    return text.substr(0, text.indexOf(" ", length)) + "...";
  }

  function stateChange() {
    if (xmlHttp.readyState !== 4 || xmlHttp.status !== 200) {
      return;
    }
    var res = JSON.parse(xmlHttp.responseText);
    if (res.error || res.status !== 200) {
      return;
    }
    res.data.forEach(function (data) {
      var li      = document.createElement('li')
      ,   title   = document.createElement('a')
      ,   content = document.createElement('p');

      // Set title
      title.classList.add('title');
      title.href = data.link;
      title.target = "_blank";
      title.innerHTML = data.title;

      // Set content
      content.classList.add('content');
      content.innerHTML = truncate(data.content.replace(/(<([^>]+)>)/ig,""), 200);

      li.appendChild(title);
      li.appendChild(content);
      feed.appendChild(li);
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