function getArtists(){var e=[],o=0;e[o]=[];for(var t=0;t<$(".artist-name").length;t++)e[o].push($(".artist-name").eq(t).val()),e[o].length>=50&&(o++,e[o]=[]);return e}function callBands(e){var o=$("#user-location").val();""===o&&(o="use_geoip");for(var t="https://api.bandsintown.com/events/search?location="+o+"&api_version=2.0&format=json&app_id=Festivalist",n=[],a=0;a<e.length;a++){for(var r=0;r<e[a].length;r++)e[a].splice(r,1,encodeURIComponent(e[a][r].trim()));e[a]=e[a].join("&artists[]="),n.push(new Promise(function(o){$.ajax({type:"get",dataType:"jsonp",url:t.concat("&artists[]="+e[a])}).then(o,function(){o([])})}))}return n}function renderPromises(e){Promise.all(e).then(function(e){for(var o=e[0],t=1;t<e.length;t++)e[t].length>0&&$.merge(o,e[t]);o.length<1?noEvents():createEvents(o)})}function enableLocationChange(){$(".location").popover().on("shown.bs.popover",function(){enableAutocomplete()})}function enableAutocomplete(){var e=new google.maps.places.Autocomplete(document.getElementById("location-input"),{types:["(regions)"]});google.maps.event.addListener(e,"place_changed",function(){changeLocation(e)})}function changeLocation(e){$(".popover").popover("hide"),google.maps.event.clearInstanceListeners(e);var o=$("#location-input").val(),t=new google.maps.Geocoder;t.geocode({address:o},function(e,o){if(o===google.maps.GeocoderStatus.OK){var t=e[0].geometry.location.H+","+e[0].geometry.location.L;$.ajax({type:"post",url:"/users/location",data:{location:t}}),$("#user-location").val(t),$("#events").empty(),$("#events").css("textAlign","center"),$("#events").append($("<i>").addClass("fa fa-circle-o-notch fa-spin fa-5x")),renderPromises(callBands(getArtists())),$(".popover-title").css("color","#333333")}else $(".popover-title").html("Unknown location.").css("color","red")})}$(document).ready(function(){$("body").css({background:"linear-gradient(225deg, #f857a6 10%, #4776E6 33%, #B3FFAB 70%, #ff5858 90%)"});var e=getArtists(),o=callBands(e);renderPromises(o),enableLocationChange(),$("body").on("click",function(e){"popover"===$(e.target).data("toggle")||0!==$(e.target).parents(".popover.in").length||$(e.target).hasClass("fa-map-marker")||$('[data-toggle="popover"]').popover("hide")})});