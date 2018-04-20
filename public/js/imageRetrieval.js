// Grab images and place inside of the media crawl per event
function imageRetrieval(folder, number) {
	$('#title').slideUp( 300 ).html(markers[number].title).delay( 1000 ).fadeIn(900);
	var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
	var dir = "https://s3-us-west-2.amazonaws.com/" + folder + "/";
	var node = document.getElementsByClassName('flickity-slider');
	$.ajax({
	    type: "GET",
	    url: 'https://s3-us-west-2.amazonaws.com/' + folder + '/',
	    dataType: "xml",
	    success: function (data) {
	        $(data).find('Key').each(function(){
				var $cellElems = $("<div class='carousel-cell'><a href='" + dir + this.innerHTML + "'" + "data-fancybox='images' data-width='2048' data-height='1365'><img alt='nersa.JPG' class='carousel-cell-image' data-flickity-lazyload='" + dir + this.innerHTML + "'/></a></div>");
	        	$carousel.flickity( 'insert', $cellElems, 1 );
	        });
	    }
	});
}