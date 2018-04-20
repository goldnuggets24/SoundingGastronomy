// MapBox API integration
L.mapbox.accessToken = 'pk.eyJ1IjoiZ29sZG51Z2dldHMyNCIsImEiOiJjaXZvOGxwN2swMWZ5Mm9wNWh6c28ya2QxIn0.2iRf87DRtYMGIYAPw0P5bg';
 
// color: examples.map-i86nkdio
// grey: examples.map-20v6611k
// satellite: examples.map-2k9d7u0c
// white: examples.map-8ced9urs'
// 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
// sets initial map view:
var map = L.map('map', {
    zoomControl: true
}).setView([-26.204407 + 8,28.037939 + 30], 4);

L.mapbox.styleLayer('mapbox://styles/mapbox/emerald-v8').addTo(map);

var scrollTop = 0;

// new L.Control.Zoom({ position: 'topright' }).addTo(map);

// Disable drag and zoom handlers.
// map.dragging.disable();
// map.touchZoom.disable();
// map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

// Disable tap handler, if present.
if (map.tap) map.tap.disable();

var pos_y = $(window).height() * 0.15 + 450;
$('#cityname').css("top", pos_y+"px");

var base_layer = L.mapbox.tileLayer('mapbox.streets');
base_layer.setOpacity(1);
base_layer.addTo(map);

queue()
  // .defer(d3.csv, "event2.csv") // Integrates with map and event scheduler
  .defer(d3.csv, "event_final2.csv")
  .defer(d3.json, "johannesburg.geojson")
  .await(ready);

var parseDate = d3.time.format("%m/%d/%y").parse;

var cityLayer = L.mapbox.featureLayer();
var centerLayer = L.mapbox.featureLayer();

var myIcon = L.icon({
      iconUrl: '/img/texture.png',
      iconSize: [13, 13]
});

var circleRadius = 170; //1200;
// Not sure where this is used... 
var tempMarker = L.circle([ -26.20192, 28.05097 ], circleRadius, {
    // color: 'rgba(255,0,0,1)',
    // color: '#F44336',
    color: '#FFEB3B',
    opacity: 1,
    weight: 0,
    fillOpacity: 0.0
}).addTo(cityLayer);

function ready(error, data, city) {
  data.forEach(function(d) {
    Init(d);
  });

  makeTimeline(data, city);

  var RADIUS = 280000;
  // var RADIUS = 3000;
  var filterCircle = L.circle([-26.1715215,28.0400245], RADIUS, {
      color: '#FFEB3B',
      opacity: 1,
      weight: 2,
      fillOpacity: 0
  }).addTo(centerLayer);

  L.circle([-26.1715215,28.0400245], RADIUS/8, {
      color: '#FFEB3B',
      opacity: 1,
      weight: 0,
      fillOpacity: 1
  }).addTo(centerLayer);

  var cityStyle = {
      fillColor: '#fff',
      fillOpacity:0,
      color: '#fff',
      opacity: 0,
      weight: 1
  };

  var center = L.geoJson(city, {
    style: cityStyle
  }).addTo(cityLayer); // boundary of city on the map

  centerLayer.addTo(map);
}

function Init(d) {
  var lat = d.start_lat;
  var lon = d.start_lon;

  // var marker = L.circle([ lat, lon ], circleRadius/8, {
  //     color: '#FFEB3B',
  //     opacity: 1,
  //     weight: 0,
  //     fillOpacity: 0.0
  // });

  // Define map icons per category
  var icon = '';
  if(d.category == 'Red') {var icon = 'car';}

  var marker = L.marker([lat, lon], {
    icon: L.mapbox.marker.icon({
      'marker-color': '#FFEB3B', //yellow markers
      'marker-size': 'small',
      'marker-symbol': icon
    })
  });

  var feature = marker.feature;
  var slideshowContent = '';
  var img = d.pic;

  if(d.type == 'pic') {
      var temp_pic = '\''+d.pic+'\'';
      slideshowContent = '<h3>' + d.event + '</h3>' + 
              '<img src="' + d.pic + '"'
                + ' style="cursor:pointer" '
                + 'onclick="showImage('+ temp_pic+');"'
              + ' />' 
              +'<div class="caption">' + '</div>';
    } else if(d.type == 'video') {
      slideshowContent = '<h3>' + d.event + '</h3>' + d.video;
    }

  var popupContent =      '<h2>' + d.event + '</h2>' +
                        '<div class="slideshow">' +
                            slideshowContent +
                      '</div>';

  marker.openPopup();
  marker.addTo(cityLayer);
  // marker.addTo(markerLayer);
// Adds content to sidebar area
  marker.bindPopup(slideshowContent,{
        closeButton: true,
        minWidth: 419,
        maxWidth: 800
    });

  marker.on('click', function(){
    marker.bindPopup(slideshowContent);

    var current_position = proj([ d.start_lon, d.start_lat ]); // lon, lat
        current.attr("transform", "translate("+ current_position +")");
        current2.attr("transform", "translate("+ current_position +")");
    $('#current_date').html('<span style="color:yellow">Date: <span><span style="color:white">'
          +d.date+"</span>");
  });

  var textMarker = L.marker([ lat, lon ], {
    icon: L.divIcon({
        className: 'label',
        // color: #fff,
        html: d.event,
        iconSize: [180, -5]
    })
  });
  

  textMarker.addTo(cityLayer);
// hide labels after zoom level 13
  map.on('zoomend', function () {
    zoomLevel = map.getZoom();
    if (zoomLevel >13) {
      textMarker.setOpacity(1);
    } else {
      textMarker.setOpacity(0);
    }
  });
}
var change = 0;

onscroll = function() {

  scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop < 80) {

    change = 0;

    base_layer.setOpacity(1);
    // hideTimeline();

    centerLayer.addTo(map);
    // map.removeLayer(markerLayer);
    // map.removeLayer(cityLayer);

    // map.setView([-26.204407 + 8,28.037939 + 30], 4);

    $('#h1').css({"visibility":"visible"});
    $('#h2').css({"visibility":"visible"});
    $('#intro').css({"visibility":"visible"});
    $('#scroll').css({"visibility":"visible"});
    // $('#bg_intro').css({'"visibility':"hidden"});
    $('#bg_intro').css({"visibility":"hidden"});

    $('#h1_2').css({"visibility":"hidden"});
    $('#h5').css({"visibility":"hidden"});
    $('.boundary').css({"visibility":"hidden"});
    $('.circle').css({"visibility":"hidden"});

    $('#image').css({"visibility":"hidden"});
    $('#pointing').css({"visibility":"hidden"});
    $('#southAftica').css({"visibility":"hidden"});

    $('#current_date').css({"visibility":"hidden"});
    $('#notes').css({"visibility":"hidden"});
    $('#cityname').css({"visibility":"hidden"});

    // tooltip.style("visibility", "hidden");
    // bg_city.style('visibility', 'hidden');
    // bg_timeline.style("visibility", "hidden");
    // stateLine.style('visibility', 'hidden');

    date.style("visibility", "hidden");
    eventname = 'test';

    if(scrollTop > 40) {
       updateTimeline(scrollTop);
    }

  } else if(scrollTop >= 80) {

    base_layer.setOpacity(0.8);

    if(change == 0) {
      tempMarker.setLatLng([-26.20192,28.05097 ]);
      // map.setView([-26.20192,28.05097], 13);  

      change = 1;
    }

    map.removeLayer(centerLayer);
    cityLayer.addTo(map);
    updateTimeline(scrollTop);
    stateLine.style('visibility', 'visible');
    
    // map.removeLayer(markerLayer);
    // map.removeLayer(centerLayer);

    bg_city.style('visibility', 'visible');
    bg_timeline.style("visibility", "visible");

    $('#cityname').css({"visibility":"visible"});

    $('#h1').css({"visibility":"hidden"});
    $('#h2').css({"visibility":"hidden"});
    $('#intro').css({"visibility":"hidden"});
    $('#scroll').css({"visibility":"hidden"});

    // $('#bg_intro').css({'"visibility':"visible"});
    $('#bg_intro').css({"visibility":"visible"});

    $('#h1_2').css({"visibility":"visible"});
    $('#h5').css({"visibility":"visible"});
    $('.boundary').css({"visibility":"visible"});
    $('.circle').css({"visibility":"visible"});

    $('#current_date').css({"visibility":"visible"});

    $('#notes').css({"visibility":"visible"});
    $('#image').css({"visibility":"visible"});
    $('#pointing').css({"visibility":"visible"});
    $('#southAftica').css({"visibility":"visible"});
  }
    if ($('.gm-style-iw').length > 0) {
      $('#h2').css({"visibility":"hidden"});
    } 
};

// Enlarge image
function showImage(imgName) {
    document.getElementById('largeImg').src = imgName;
    showLargeImagePanel();
    unselectAll();
}
function showLargeImagePanel() {
    document.getElementById('largeImgPanel').style.visibility = 'visible';
}
function unselectAll() {
    if(document.selection) document.selection.empty();
    if(window.getSelection) window.getSelection().removeAllRanges();
}
function hideMe(obj) {
    obj.style.visibility = 'hidden';
}