describe('get now playing', function () {
  it('fetches now playing track', function (done) {
    var lastfmKey = '59a34f30f3c5163f936e755463780ad2',
    lastfmUser    = 'hpbeliever',
    lastfmUrl     = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + lastfmUser + '&api_key=' + lastfmKey + '&format=json',
    spotifyUrl    = 'http://ws.spotify.com/search/1/track.json?q=';

    httpBackend.expectGET(lastfmUrl).respond(state);
  });
});