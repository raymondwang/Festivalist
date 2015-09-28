$(document).ready(function() {
  // now taking feedback on color schemes
  $('body').css({'background': 'linear-gradient(225deg, #f857a6 10%, #4776E6 33%, #B3FFAB 70%, #ff5858 90%)'});

  var artists = getArtists();
  var promises = callBands(artists);

  renderPromises(promises);

  enableLocationChange();

  $('body').on('click', function (e) {
    if ($(e.target).data('toggle') !== 'popover'
      && $(e.target).parents('.popover.in').length === 0 && !($(e.target).hasClass('fa-map-marker'))) {
      $('[data-toggle="popover"]').popover('hide');
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
  var location = $('#user-location').val();

  if (location === '') {
    location = 'use_geoip';
  }

  var call = 'https://api.bandsintown.com/events/search?location=' + location + '&api_version=2.0&format=json&app_id=Festivalist';

  var promises = [];

  // replaces spaces with %20, etc
  for (var i = 0; i < artists.length; i++) {
    for (var j = 0; j < artists[i].length; j++) {
      artists[i].splice(j, 1, encodeURIComponent(artists[i][j].trim()));
    }

    artists[i] = artists[i].join('&artists[]=');

    promises.push(new Promise(function (resolve) {
      $.ajax({
        type: 'get',
        dataType: 'jsonp',
        url: call.concat('&artists[]=' + artists[i])
      }).then(resolve, function () {
        resolve([]);
      });
    }));
  }

  return promises;
}

function renderPromises(promises) {
  Promise.all(promises).then(function(results) {
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
}

function enableLocationChange() {
  $('.location').popover().on('shown.bs.popover', function() {
    enableAutocomplete();
  });
}

function enableAutocomplete() {
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('location-input'), {types: ['(regions)']});

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    changeLocation(autocomplete);
  });
}

function changeLocation(autocomplete) {
  $('.popover').popover('hide');
  google.maps.event.clearInstanceListeners(autocomplete);
  var region = $('#location-input').val();

  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({'address': region}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var location = results[0].geometry.location.H + ',' + results[0].geometry.location.L;

      $.ajax({
        type: 'post',
        url: '/users/location',
        data: {location: location}
      });

      $('#user-location').val(location);

      $('#events').empty();
      $('#events').css('textAlign', 'center');
      $('#events').append($('<i>').addClass('fa fa-circle-o-notch fa-spin fa-5x'));

      renderPromises(callBands(getArtists()));

      $('.popover-title').css('color', '#333333');
    } else {
      $('.popover-title').html('Unknown location.').css('color', 'red');
    }
  });
}
