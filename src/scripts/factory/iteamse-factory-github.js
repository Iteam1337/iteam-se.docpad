;(function () {
  "use strict";
  angular.module(
    "iteamse.factory.github",
    []
  )
  .factory("$GHEvents", [
    "$http",
    function ($http) {
      return function (options, callback) {
        var url, maxTake;

        if (typeof options !== "object") {
          return callback([]);
        }

        url = "https://api.github.com/users/{user}/events";
        url = url.replace("{user}", options.user);

        maxTake = options.maxTake ? options.maxTake : 6;

        $http.get(url).success(function (data) {
          var i, max, inner, git, returnContent, payload;
          max = data.length;
          git = [];
          for (i = 0; i < max; i++) {
            inner = data[i];
            payload = inner.payload;
            returnContent = {
              name: inner.repo.name,
              url: "https://github.com/" + inner.repo.name,
              created_at: moment(inner.created_at).fromNow(),
              type: "",
              message: ""
            };
            switch (inner.type) {
            case "PushEvent":
              returnContent.type = "Push";
              returnContent.message = payload.commits[0].message;
              returnContent.url =  payload.commits[0].url;
              break;
            case "PullRequestEvent":
              returnContent.type = "Pull request / " + payload.action;
              returnContent.message = payload.pull_request.title + ", " + payload.pull_request.body;
              returnContent.url = payload.pull_request.html_url;
              break;
            case "PublicEvent":
              returnContent.type = "Public";
              returnContent.message = inner.repo.name + " got opensourced.";
              break;
            case "MemberEvent":
              returnContent.type = "Member added";
              returnContent.message = payload.member.name + " added as a collaborator.";
              returnContent.url = payload.member.url;
              break;
            case "IssuesEvent":
              returnContent.type = "Issue / " + payload.action;
              returnContent.message = payload.issue.title + ", " + payload.issue.body;
              returnContent.url = payload.issue.html_url;
              break;
            case "IssueCommentEvent":
              returnContent.type = "Issue / Comment";
              returnContent.message = payload.action + ", " + payload.comment.body;
              returnContent.url = payload.comment.html_url;
              break;
            case "GollumEvent":
              returnContent.type = "Page got updated";
              returnContent.message = payload.pages[0].title + ", " + payload.pages[0].action;
              returnContent.url = payload.pages[0].html_url;
              break;
            case "GistEvent":
              returnContent.type = "Gist " + payload.action;
              returnContent.message = payload.gist.description;
              returnContent.url = payload.gist.url;
              break;
            case "ForkApplyEvent":
              returnContent.type = "Fork / Apply";
              returnContent.message = payload.head;
              break;
            case "ForkEvent":
              returnContent.type = "Fork";
              returnContent.message = payload.forkee.name;
              returnContent.url = payload.forkee.url;
              break;
            case "FollowEvent":
              returnContent.type = "Follow";
              returnContent.message = payload.target.name;
              returnContent.url = payload.target.url;
              returnContent.name = null;
              break;
            case "DeleteEvent":
              returnContent.type = "Delete";
              returnContent.message = payload.ref_type;
              returnContent.name = null;
              break;
            case "DownloadEvent":
              returnContent.type = "Download created";
              returnContent.message = payload.download.name;
              returnContent.url = payload.download.url;
              break;
            case "CreateEvent":
              returnContent.type = "Create / " + payload.ref_type;
              returnContent.message = payload.description;
              break;
            case "CommitCommentEvent":
              returnContent.type = "Commit / Comment";
              returnContent.message = payload.comment.body;
              returnContent.url = payload.comment.url;
              break;
            default:
              returnContent = null;
            }
            if (!!returnContent) {
              git.push(returnContent);
            }
            if (i >= options.maxTake ? options.maxTake : 6) {
              break;
            }
          }
          return callback(git);
        });
      };
    }
  ])
  .factory("$GHRepos", [
    "$http",
    function ($http) {
      return function (options, callback) {
        var url, maxTake;

        if (typeof options !== "object") {
          return callback([]);
        }

        url = "https://api.github.com/users/{user}/repos";
        url = url.replace("{user}", options.user);

        maxTake = options.maxTake ? options.maxTake : 6;

        $http.get(url).success(function (data) {
          var i, max, git, inner, returnContent;
          max = data.length;
          git = [];
          max = max <= maxTake ? max : maxTake;
          for (i = 0; i < max; i++) {
            inner = data[i];
            returnContent = {
              url: inner.html_url,
              created_at: moment(inner.created_at).fromNow(),
              name: inner.name,
              description: inner.description,
              language: inner.language
            };
            git.push(returnContent);
          }
          return callback(git);
        });
      };
    }
  ]);
})();