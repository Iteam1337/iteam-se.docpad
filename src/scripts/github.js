(function () {

  'use strict';

  // Get GitHub element and reset xmlHttp from Instagram request
  var github = document.getElementById('github');
  var xmlHttp = null;

  function ProcessGitHub () {
    if (xmlHttp.readyState !== 4 || xmlHttp.status !== 200) { return; }

    var res = JSON.parse(xmlHttp.responseText);
    var list = document.createElement('ul');

    res.forEach(function (data) {
      var repo = document.createElement('li')
      ,   a    = document.createElement('a')
      ,   p    = document.createElement('p');

      a.href = data.html_url;
      a.innerHTML = data.name;

      p.innerHTML = data.description;

      repo.appendChild(a);
      repo.appendChild(p);
      list.appendChild(repo);
    });


    github.appendChild(list);
  }

  function readRSS (username) {
    var url = 'https://api.github.com/users/{user}/repos';
    url = url.replace('{user}', username);

    console.log(url);

    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = ProcessGitHub;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
  }

  if (!!github) {
    var username = github.getAttribute('username');

    readRSS(username);
  }

})();