/*====== Smooth Scroll =======*/
$.ilmScroll = function (elem = null) {
    elem = elem || 'body';
    return $('html, body').animate({
        scrollTop: $(elem).offset().top
    }, 800);
}
/*====== Rating =======*/
$.fn.stars = function (options) {
    var defaults = { starSize: 13 };
    options = $.extend(defaults, options);
    return $(this).each(function () {
        if (!$(this).hasClass("starloaded")) {
            var val = parseFloat($(this).html()),
                size = Math.max(0, (Math.min(5, val))) * options.starSize,
                $span = $('<span />').width(size),
                dynamicClass = "starloaded s" + options.starSize;

            $(this).addClass(dynamicClass).html($span);
        }
    });
}