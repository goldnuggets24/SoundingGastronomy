function CoordMapType(tileSize) {
  this.tileSize = tileSize;
}
// customize satellite image background color
CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
  var div = ownerDocument.createElement('div');
//  div.innerHTML = coord;
  div.style.width = this.tileSize.width + 'px';
  div.style.height = this.tileSize.height + 'px';
  // div.style.backgroundColor = '#333333';
  $(div).css('background','rgba(128,128,128,.4)');
  div.style.fontSize = '10';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '0px';
  div.style.borderColor = '#AAAAAA';
  return div;
};

function myMap() {
  window.bounds = new google.maps.LatLngBounds();
  var mapCanvas = document.getElementById("gmap-list");
  var mapOptions = {
    center: new google.maps.LatLng(35.9120,-79.0537,7),
    scaleControl: true,
    scrollwheel: true,
    mapTypeControl: false,
    overviewMapControl: false,
    rotateControl: true,
    mapTypeId: 'satellite',
    styles: styles
  };
  window.googleMap = new google.maps.Map(mapCanvas, mapOptions);

  // Loop through our array of markers & place each one on Google map  
  for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    markers[i] = new google.maps.Marker({
        position: position,
        map: googleMap,
        title: markers[i][0],
        label: markers[i][0],
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png', // yellow markers
        labelOrigin: new google.maps.Point(markers[i][3], markers[i][4]) // label condition (remove or keep?)
        },
        label: {
          text: markers[i][0],
          color: 'white',
          fontSize: '12px'
        }
    });

    markers[i].index = i;

  var infoWindow = new google.maps.InfoWindow(), marker, i;
  // Allow each marker to have an info window on click
  google.maps.event.addListener(markers[i], 'click', (function(marker, i) {
    return function() {
      infoWindow.setContent(infoWindowContent[i][0]);
      infoWindow.open(map, markers[i]);
    }
  })(marker, i));
  // Local Government Elections Workshop
  google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
    $("#" + markers[0].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
      $('.mdl-mini-footer').fadeTo('slow', 1);
      var local = new google.maps.StreetViewPanorama(
        document.getElementById(markers[0].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
        position: {lat: markers[0].position.lat(), lng: markers[0].position.lng()}, 
        pov: {
            heading: 66,
            pitch: 10
        },
        disableDefaultUI: true,
        enableCloseButton: false
      });
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('apconference030610', 0);
      $('#close').one('click', function(){
        backToMap(0, 88);
      });

    });
  });

  // Orlando East March
  google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');
    var iwBackground = iwOuter.prev();
    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'border':'1px solid #000', 'background': 'rgba(0,0,0,0.45)', 'box-shadow': 'rgba(0,0,0,0.45) 0px 1px 6px', 'z-index' : '1'});
    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();
    iwOuter.css({background: 'rgba(0,0,0,0.45)', color: '#fff'});
    // Apply the desired effect to the close button
    iwCloseBtn.css({opacity: '1', width: '23px', height: '23px', right: '38px', top: '3px', border: '5px solid rgba(0,0,0,0.45)', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});
    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });

    $("#" + markers[1].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
      $('.mdl-mini-footer').fadeTo('slow', 1);
      var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
      var orlando = new google.maps.StreetViewPanorama(
        document.getElementById(markers[1].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
        position: {lat: markers[1].position.lat(), lng: markers[1].position.lng()}, 
        pov: {
            heading: 34,
            pitch: 10
        },
        disableDefaultUI: true,
        enableCloseButton: false
      });
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('orlandoeastmarch111309', 1);
      $('#close').one('click', function(){
        backToMap(1, 250);
      });

    });
  });

  googleMap.setZoom(20);
  }
  // SCRR  and SECC left off for now, pending media
  googleMap.overlayMapTypes.insertAt(
      0, new CoordMapType(new google.maps.Size(256, 256))
  );
}
