_ilm_home_page = {
    init: function () {
        var banner_slider,
            flash_trending_options,
            flash_slider,
            trend_slider;
        
        // lazyLoadInstance.update();

        /**
         * FrontPage Events
         */
        if ($('#fdl-timer').length) {
            var FdlEndTime = new Date($('#fdl-timer').data("endin")).getTime();
            var FldCountDownTimer = setInterval(function () {
                var now = new Date().getTime(),
                    distance = FdlEndTime - now;

                var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours = Pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + (days * 24), 2),
                    minutes = Pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)), 2),
                    seconds = Pad(Math.floor((distance % (1000 * 60)) / 1000), 2);

                $('#fdl-timer').html(`${hours}:${minutes}:${seconds}`);

                if (distance < 0) {
                    clearInterval(FldCountDownTimer);
                    $('#fdl-timer').html("EXPIRED");
                    $('#flashsale').css({ "opacity": "0.5", "pointer-events": "none" });
                }
            }, 1000);
        }

        /**
         * PreLoaded Functions
         */
        var ScaleSlider = function (jssorSlider) {
            var parentHeight,
                parentWidth = jssorSlider.$Elmt.parentNode.clientWidth;

            if (parentWidth) {
                jssorSlider.$ScaleWidth(Math.min(parentWidth, 1950));
                parentHeight = jssorSlider.$Elmt.parentNode.clientHeight;
                if ($(jssorSlider.$Elmt).hasClass("banner-slider")) {
                    $('#all-dept-menus .mainmenu > ul').height(parentHeight);
                }
            } else window.setTimeout(ScaleSlider(jssorSlider), 30);
        }

        var ScaleSlideAll = function () {
            if ($('#sliderb_container').length) {
                ScaleSlider(banner_slider);
            }

            if ($('#flashsale').length) {
                ScaleSlider(flash_slider);
            }

            if ($('#trendsale').length) {
                ScaleSlider(trend_slider);
            }
        }

        var Pad = function (num, size) {
            num = num.toString();
            while (num.length < size) num = "0" + num;
            return num;
        }

        /**
         * JSSOR Sliders Init
         */
        if ($('#sliderb_container').length) {
            banner_slider = new $JssorSlider$("sliderb_container", {
                $AutoPlay: true,
                $AutoPlayInterval: 4000,
                $PauseOnHover: 1,
                $SlideshowOptions: {
                    $Class: $JssorSlideshowRunner$,
                    $Transitions: [
                        { $Duration: 800, x: 0.3, $During: { $Left: [0.3, 0.7] }, $Easing: { $Left: $Jease$.$InCubic, $Opacity: $Jease$.$Linear }, $Opacity: 2, $Outside: true },
                        { $Duration: 800, $Zoom: 1.9, $Easing: { $Zoom: $Jease$.$InOutExpo }, $Opacity: 2, $Brother: { $Duration: 600, $Zoom: 11, $Easing: { $Zoom: $Jease$.$InOutExpo }, $Opacity: 2, $Shift: -100 } }
                    ],
                    $TransitionsOrder: 1,
                    $ShowLink: true
                },
                $BulletNavigatorOptions: {
                    $Class: $JssorBulletNavigator$,
                    $ChanceToShow: 2,
                }
            });
        }

        //Flash Sale/ Trending sliders
        flash_trending_options = {
            $AutoPlay: 1,
            $AutoPlaySteps: 5,
            $SlideDuration: 160,
            $FillMode: 1,
            $ArrowKeyNavigation: 3,
            $SlideWidth: slideSize.width,
            $SlideHeight: slideSize.height,
            $SlideSpacing: 9,
            $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$
            }
        };

        if ($('#flashsale').length) {
            flash_slider = new $JssorSlider$("flashsale", flash_trending_options);
        }

        if ($('#trendsale').length) {
            trend_slider = new $JssorSlider$("trendsale", flash_trending_options);
        }

        ScaleSlideAll();
        $(window).off("._ilmJsorWindowLoad").on("load._ilmJsorWindowLoad", ScaleSlideAll);
        $(window).off("._ilmJsorWindowResize").on("resize._ilmJsorWindowResize", ScaleSlideAll);
        $(window).off("._ilmJsorOrientationChange").on("orientationchange._ilmJsorOrientationChange", ScaleSlideAll);
    }
}

_ilm_home_page.init();