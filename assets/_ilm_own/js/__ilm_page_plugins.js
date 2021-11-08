/*====== Smooth Scroll =======*/
$.ilmScroll = function (elem = null) {
    var $page = $('html, body'),
        elem = elem || 'body',
        offsetTop = $(elem).offset().top;
    

    $page.on("scroll.iss mousedown.ismd wheel.isw DOMMouseScroll.isdm mousewheel.ismw keyup.isk touchmove.ist", function () {
        $page.stop();
        $page.off("scroll.iss mousedown.ismd wheel.isw DOMMouseScroll.isdm mousewheel.ismw keyup.isk touchmove.ist");
    });
    
    $page.animate({ scrollTop: offsetTop }, 800, function () {
        $page.off("scroll.iss mousedown.ismd wheel.isw DOMMouseScroll.isdm mousewheel.ismw keyup.isk touchmove.ist");
    });

    return true;
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