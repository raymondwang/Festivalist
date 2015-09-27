$(document).ready(function() {
  var artists = getArtists();
  var promises = callBands(artists);

  // to do: catch errors here
  Promise.all(promises).then(function(results) {
    // probably have to start keeping this to change location
    $('.temp-data').remove();
    var data = results[0];
    for (var i = 1; i < results.length; i++) {
      if (results[i].length > 0) {
        $.merge(data, results[i]);
      }
    }
    if (data.length < 1) {
      noEvents();
    } else {
      createEvents(data);
    }
  });
});

function getArtists() {
  var artists = [], block = 0;
  artists[block] = [];

  for (var i = 0; i < $('.artist-name').length; i++) {
    artists[block].push($('.artist-name').eq(i).val());
    if (artists[block].length >= 50) {
      block++;
      artists[block] = [];
    }
  }

  return artists;
}

function callBands(artists) {
  var call = 'http://api.bandsintown.com/events/search?location=' + $('#user-location').val() + '&api_version=2.0&format=json&app_id=Festivalist';

  var promises = [];

  // replaces spaces with %20, etc
  for (var i = 0; i < artists.length; i++) {
    for (var j = 0; j < artists[i].length; j++) {
      artists[i].splice(j, 1, encodeURIComponent(artists[i][j].trim()));
    }

    artists[i] = artists[i].join('&artists[]=');

    promises.push( $.ajax({
      type: 'get',
      dataType: 'jsonp',
      url: call.concat('&artists[]=' + artists[i])
    }) );
  }

  return promises;
}
