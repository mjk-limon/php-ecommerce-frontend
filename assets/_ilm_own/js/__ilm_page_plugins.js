/*====== Smooth Scroll =======*/
$.ilmScroll = function(elem = null) {
	elem = elem || 'body';
	return $('html, body').animate({
		scrollTop: $(elem).offset().top
	}, 800);
}
/*====== Rating =======*/
$.fn.stars = function(options) {
	var defaults = {starSize: 13};
	options = $.extend(defaults, options);
	return $(this).each(function() {
		if(!$(this).hasClass("starloaded")) {			
			var val = parseFloat($(this).html());
			var size = Math.max(0, (Math.min(5, val))) * options.starSize;
			var $span = $('<span />').width(size);
			$(this).addClass("starloaded").html($span);
		}
	});
}