/*! iteamse - v0.0.1 - 2013-08-10 18:08 */
(function (stdlib, stdang, stdhighlight, query) {
    "use strict";

    stdang.module("iteamse", [])

        .config(function ($compileProvider) {
            $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension|spotify):/);
        })

        /**
         * Makes code blocks pretty on blog
         */
        .directive("makePretty", function () {
            return {
                link: function () {
                    query("pre code").each(function (i, element) {
                        stdhighlight.highlightBlock(element);
                    });
                }
            };
        })

        /**
         * Make anchor tags for headers on type page
         */
        .directive("makeAnchors", function () {
            return {
                link: function () {
                    query(":header").each(function () {
                        query(this).append('<a id="' + query(this).text().replace(/ /g, "-") + '"></a>');
                    });
                }
            };
        })

        /**
         * Mobile nav
         */
        .directive("mobileNav", function () {
            return {
                link: function (scope, elm) {
                    var arrow, link, subpage, url;

                    link = elm.find("a");
                    arrow = elm.find("div");

                    subpage = elm.attr("data-subpage");
                    url = link.attr("data-url");

                    arrow.bind("click", function () {
                        scope.subpages = subpage;
                        scope.$apply();
                    });
                    link.bind("click", function () {
                        stdlib.location = url;
                        scope.$apply();
                    });
                }
            };
        })

        /*
         * @desc
         *   this is used to render the instagram-elements
         */
        .directive("instagram", function ($http) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/content/partials/instagram.html",
                link: function (scope, element, attrs) {
                    var name, url, options, max;

                    name = attrs.name;
                    max = attrs.max ? +attrs.max : 3;
                    url = "http://insta-team.se/user/" + name + "?count=" + max;

                    options = {
                        url: url,
                        method: "GET"
                    };

                    scope.instagramFeed = [];

                    $http(options).success(function (content) {
                        if (!content && !content.data && !(content.data instanceof Array)) {
                            return;
                        }
                        scope.instagramFeed = content.data;
                        stdlib.console.log(content.data);
                    }).error(function (data) {
                        stdlib.console.error(data);
                    });
                }
            };
        });

})(window, angular, hljs, $);
(function (stddoc, stdang, LibChart) {
    "use strict";

    stdang.module("iteamse").controller("AboutCtrl", function () {

        var canvas, ctx, data, options, scaleOverride, scaleSteps, scaleStepWidth, scaleStartValue;

        scaleOverride = true;
        scaleSteps = 15;
        scaleStepWidth = 1;
        scaleStartValue = 0;

        if (!stddoc.getElementById("turnoverNumbers")) {
            return;
        }

        /**
         * Chart of turnover growth
         */
        data = {
            labels: ['1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'],
            datasets: [
                {
                    fillColor: "rgba(155,189,9,0.5)",
                    strokeColor: "rgba(151,187,85,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    data: [0.12, 0.2, 0.53, 1.1, 2.7, 3.7, 3.7, 2.7, 3.2, 3.9, 4.2, 7, 7.5, 7.5, 8.5, 10, 9.3, 11.6]
                }
            ]
        };

        options = {
            scaleOverride: scaleOverride,
            scaleSteps: scaleSteps,
            scaleStepWidth: scaleStepWidth,
            scaleStartValue: scaleStartValue,
            animationSteps: 160
        };

        canvas = stddoc.getElementById("turnoverNumbers");
        ctx = canvas.getContext("2d");
        new LibChart(ctx).Bar(data, options);

        /**
         * Chart of employee growth
         */
        data = {
            labels: ['1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'],
            datasets: [
                {
                    fillColor: "rgba(255,189,9,0.5)",
                    strokeColor: "rgba(255,189,9,1)",
                    pointColor: "rgba(255,189,9,1)",
                    pointStrokeColor: "#fff",
                    data: [0, 0, 1, 2, 3, 4, 3, 4, 4, 4, 6, 7, 7, 8, 9, 10, 11, 12]
                }
            ]
        };

        options = {
            scaleOverride: scaleOverride,
            scaleSteps: scaleSteps,
            scaleStepWidth: scaleStepWidth,
            scaleStartValue: scaleStartValue,
            animationSteps: 200
        };

        canvas = stddoc.getElementById("employeeNumbers");
        ctx = canvas.getContext("2d");
        new LibChart(ctx).Line(data, options);

        /**
         * Chart of work areas
         */
        data = [
            {
                value: 30,
                color: "#F38630"
            },
            {
                value: 70,
                color: "#E0E4CC"
            },
            {
                value: 50,
                color: "#69D2E7"
            }
        ];

        options = {
            animationSteps: 200
        };

        canvas = stddoc.getElementById("businessareaNumbers");
        ctx = canvas.getContext("2d");
        new LibChart(ctx).Pie(data, options);
    });

})(document, angular, Chart);
(function (stdlib, stdang) {
    "use strict";

    stdang.module("iteamse").controller("ContactCtrl", function ($scope) {

        $scope.inView = 0;

        $scope.changeContact = function (index) {
            stdlib.console.log("index?", "hey", index);
            $scope.inView = index;
        };

    });

})(window, angular);
(function (stddoc, stdang, stdmoment) {
    "use strict";

    stdang.module("iteamse").controller("CoworkerCtrl", function ($scope, $http) {

        var github, githubUser, githubUserUrl, maxTake;

        github = "https://api.github.com/users/{user}/";
        maxTake = 6;

        $scope.github = undefined;

        if (!stddoc.getElementById("github")) {
            return;
        }
        githubUser = stddoc.getElementById("github").innerHTML;
        githubUserUrl = github.replace("{user}", githubUser);
        $scope.github = {};

        $http.get(githubUserUrl + "events").success(function (data) {
            var i, max, inner, git, returnContent, payload;
            max = data.length;
            git = [];
            for (i = 0; i < max; i++) {
                inner = data[i];
                payload = inner.payload;
                returnContent = {
                    name: inner.repo.name,
                    url: "https://github.com/" + inner.repo.name,
                    created_at: stdmoment(inner.created_at).fromNow(),
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
                if (i >= maxTake) {
                    break;
                }
            }
            $scope.github.events = git;
        });

        $http.get(githubUserUrl + "repos").success(function (data) {
            var i, max, git, inner, returnContent;
            max = data.length;
            git = [];
            for (i = 0; i < max; i++) {
                inner = data[i];
                returnContent = {
                    url: inner.html_url,
                    created_at: stdmoment(inner.created_at).fromNow(),
                    name: inner.name,
                    description: inner.description,
                    language: inner.language
                };
                git.push(returnContent);
            }
            $scope.github.repos = git;
        });
    });

})(document, angular, moment);
(function (stdang, LibCodebird, stdmoment) {
    "use strict";

    stdang.module("iteamse").controller("MainCtrl", function ($scope) {
        $scope.mobileNav = false;
        $scope.allTags = [];
        $scope.subpages = null;
        $scope.twitter = null;

        /**
         * Searches Twitter for a given twitter hashtag, mention or other
         */
        $scope.$watch("twitter", function () {
            var cb, query;
            if (!$scope.twitter) {
                return;
            }
            cb = new LibCodebird();
            query = $scope.twitter.replace(",", " OR ");

            cb.setConsumerKey("bvqOzAMz10CWGfcWOfow", "DYYE1S4jWeTX3rp4P5uJQ62a1AhlqxGRPTnkGYGx7M");

            cb.__call(
                "search_tweets",
                "q=" + query,
                function (reply) {
                    var tweets, tweet, text;
                    $scope.tweets = [];

                    tweets = reply.statuses;

                    Object.keys(tweets).map(function (i) {

                        text = tweets[i]
                            .text
                            .replace(/(@)(\w*)/ig, '<a href="http://twitter.com/$2" target="_blank">$&</a>')
                            .replace(/(#)(\w*)/ig, '<a href="http://twitter.com/search/$2" target="_blank">$&</a>');
                        tweet = {
                            "text": text,
                            "created_at": stdmoment(tweets[i].created_at).fromNow(),
                            "user": tweets[i].user.name
                        };

                        $scope.tweets.push(tweet);
                    });

                    $scope.$apply();
                },
                true
            );
        }, true);

    });

})(angular, Codebird, moment);
(function (stdang) {
    "use strict";

    stdang.module("iteamse").controller("WejayCtrl", function ($scope, $http) {

        var lastfmKey, lastfmUser, lastfmUrl;
        lastfmKey = "59a34f30f3c5163f936e755463780ad2";
        lastfmUser = "iteam1337";
        lastfmUrl = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + lastfmUser + "&api_key=" + lastfmKey + "&format=json";

        /**
         * Gets now playing music from Last.fm
         * @param  {string} music URL to Last.fm recent tracks
         */
        $http.get(lastfmUrl).success(function (music) {
            var np, spotifyUrl;
            if (!music || !music.hasOwnProperty("recenttracks") || !(music.recenttracks.track instanceof Array)) {
                return;
            }
            np = music.recenttracks.track[0];
            spotifyUrl = "http://ws.spotify.com/search/1/track.json?q=";

            $scope.nowplaying =  {
                "artist": np.artist['#text'],
                "track": np.name
            };

            spotifyUrl = spotifyUrl + np.artist["#text"].replace(/ /g, "+") + "+" + np.name.replace(/ /g, "+");

            $http.get(spotifyUrl).success(function (spotify) {
                spotify = spotify.tracks[0];

                $scope.nowplaying.artistUrl = spotify.artists[0].href;
                $scope.nowplaying.trackUrl  = spotify.href;
            });
        });

    });

})(angular);