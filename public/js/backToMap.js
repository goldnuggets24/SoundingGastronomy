function backToMap(marker, position) {
  $('#close, #carousel, #title').fadeOut(500);
  $('#alex-peoples-inspection-pano').html('').removeAttr('style');
  $('#local-government-elections-workshop-pano').html('').removeAttr('style');
  $('#orlando-east-march-pano').html('').removeAttr('style');
  $('#protea-south-march-pano').html('').removeAttr('style');
  $('#alex-peoples-inspection-pano').html('').removeAttr('style');
  $('#src-march-pano').html('').removeAttr('style');
  $('#vaal-march-pano').html('').removeAttr('style');
  $('#heroes-day-pano').html('').removeAttr('style');
  $('#abahlali-solidarity-march-pano').html('').removeAttr('style');
  $('#nersa-hearings-pano').html('').removeAttr('style');
  $('#dennis-brutus-memorial-pano').html('').removeAttr('style');
  $('#visit-to-itereleng-pano').html('').removeAttr('style');
  $('#vaal-march-two-pano').html('').removeAttr('style');
  $('#sharpeville-memorial-pano').html('').removeAttr('style');
  $('#powa-book-launch-pano').html('').removeAttr('style');
  $('#vaal-march-to-arcelor-mittal-pano').html('').removeAttr('style');
  $('#visit-to-cdp-pano').html('').removeAttr('style');
  $('#world-cup-march-pano').html('').removeAttr('style');
  $('#youth-day-pano').html('').removeAttr('style');
  $('#jozi-regional-housing-march-pano').html('').removeAttr('style');
  $('#schubart-park-anti-xenophobia-event-pano').html('').removeAttr('style');
  $('#quagga-evictions-pano').html('').removeAttr('style');
  $('#soweto-march-pano').html('').removeAttr('style');
  $('#silent-march-pano').html('').removeAttr('style');
  $('#scr-meeting-pano').html('').removeAttr('style');
  $('#secc-march-pano').html('').removeAttr('style');

  setTimeout(function(){
    google.maps.event.trigger(markers[marker], 'click');
    $('body').scrollTop(position); // Updates Timeline
    googleMap.setCenter(markers[marker].position);
  }, 500);
}