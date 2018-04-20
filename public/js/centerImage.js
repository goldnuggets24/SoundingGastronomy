function centerImage() {
	activeImage = $('.slick-active img');
	i = activeImage.height();
	w = $(window).height();
	marginTop = (w - i) / 2;
	activeImage.css('margin-top',marginTop);
}