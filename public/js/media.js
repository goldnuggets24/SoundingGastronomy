$(window).on("load", function(){
		var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  horizontalOrder: true,
  percentPosition: true,
  fitWidth: true,
  columnWidth: '.grid-sizer'
		});
	$('.slick-show').slick({ // Slick Slider initialization
		arrows: true,
		fade: false,
		slidesToShow: 1,
		autoplay: false
	});
	// $('.slick-show').on('afterChange', function(slick, currentSlide){
	// 		console.log(currentSlide.currentSlide);
	// });
    $("#menu-toggle").click(function(e) {
    	$('.slick-show')[0].slick.refresh(); // resizes photo on toggle
        $("#wrapper").toggleClass("toggled toggle");
    });
    $(".grid-item").click(function(){
		var index = $(".grid-item").index(this);
		console.log(index);
		$('.slick-show').slick('slickGoTo', index, false);
		// centerImage();
	});
	$(window).resize(function(){
		// centerImage();
	});
	// centerImage();
});