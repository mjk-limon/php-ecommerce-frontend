/*!
 =========================================================
 * I'lm Admin Panel v7.1.1
 =========================================================

 * Home Page: http://ilmtechpw.bongobuild.com/
 * Copyright 2019 Dhaka Solution

 * Designed & Created by Limon 

   ||     ||||  |||||         ||||
  ||||    ||||  ||||||       |||||
  ||||    ||||  |||||||     ||||||
  ||||    ||||  |||| |||||||| ||||
  ||||    ||||  ||||  ||||||  ||||
||||||||  ||||  ||||  |||||   ||||
  
 =========================================================
 */

console.log(`   ||     ||||  |||||         ||||
  ||||    ||||  ||||||       |||||
  ||||    ||||  |||||||     ||||||
  ||||    ||||  |||| |||||||| ||||
  ||||    ||||  ||||  ||||||  ||||
||||||||  ||||  ||||  |||||   ||||
  DONT SHARE ANYTHING FROM HERE`);

mobileView = $('body').hasClass("htmlformb");
lazyLoadInstance = new LazyLoad({ threshold: 0 });
lastScrollTop = 0;
ajaxRequest = null;

$(document).ready(function () {
    //_ilm_Router.init();
    _ilm_Cart.init();
    _ilm_Cart_floatingcart.init();
    _ilm_Form_handler.init();
    _ilm_Paging.init();

    $(window).on("popstate", function (e) { location.reload() });

    /*======= Basic =========*/
    $.scrollUp({ scrollText: '<i class="fa fa-arrow-up"></i>', zIndex: 2147483647 });

    $(document).on("click", "a, [data-href]", function (e) {
        var target = $(this).attr("href");
        target = (typeof target !== 'undefined') ? target : $(this).data("href");
        if ($(this).hasClass("noRoute")) return null;
        if (_ilm_Router.init(target)) {
            e.preventDefault();
        }
    });

    $(window).on("scroll", function () {
        var delta = 5,
            navbarHeight = 50,
            st = $(this).scrollTop();

        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        //if(st > lastScrollTop && st > navbarHeight){
        if (st > navbarHeight) {
            $('body').addClass("fixed-menu-bar");
            $(".deskv-hm-movable").detach().appendTo(".deskv-hb");
            $('.sticky-wrapper, .site-branding-area').addClass("animated fadeInUp");
        } else {
            if (st + $(window).height() < $(document).height()) {
                $('body').removeClass("fixed-menu-bar");
                $(".deskv-hm-movable").detach().appendTo(".deskv-hm");
                $('.sticky-wrapper, .site-branding-area').removeClass("animated fadeInUp");
            }
        }

        lastScrollTop = st;
    });

    $("li.dropdown").each(function () {
        var hasSub = false,
            $Relative = $(this),
            $SubMenu = $(".sub-menu", this),
            $SubCols = $SubMenu.find(".sub-cols:not(.view-all)");

        if ($SubMenu.find(".no-cathead").length && !mobileView) {
            $Relative.addClass("no-submenu");
            $SubMenu.remove();
            return;
        }

        $SubCols.each(function () {
            if (!$(this).find(".no-catsub").length)
                hasSub = true;
        });

        if (!hasSub)
            $SubMenu.addClass("tiny-sub-menu");
    });

    $('.deskv .input-text').on('focus', function (e) {
        $(".searchfld").addClass("focussed");
    }).on('blur', function () {
        setTimeout(function () {
            $(".searchfld").removeClass("focussed");
        }, 200)
    });

    $('.search-q').on('keyup', function () {
        var keyword = $(this).val().toLowerCase();

        if (!keyword) return;
        if (ajaxRequest) ajaxRequest.abort();
        ajaxRequest = ajaxPost({ searchSuggestion: keyword }, function (data) {
            var result, i, re, prId, prName, prCat, sLink, $ApHtml;

            result = IsJsonString(data) ? JSON.parse(data) : { error: data };

            if (result.success) {
                $('#search-suggestions').html('');
                for (var i = 0; i < result.content.length; i++) {
                    prHref = result.content[i].href;
                    prCat = result.content[i].category;
                    prName = result.content[i].name.replace(new RegExp(keyword, "gi"), "<b>$&</b>");

                    $ApHtml = '<li><div class="single-srchdata"><a href="' + prHref + '">' + prName;
                    if (prCat) $ApHtml += '<span>' + prCat + '</span>';
                    $ApHtml += '</a></div></li>';

                    $('#search-suggestions').append($ApHtml)
                }
            } else $('#search-suggestions').html(result.error);
        });
    });


    $(".dropdown-menu .dropdown > a > i.fa-angle-down").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $dropdownMenu_elem = $(".dropdown-menu");
        $list_elem = $(this).closest(".dropdown");
        $dropdownMenu_elem.find(".down").removeClass("down").slideUp();
        $list_elem.find(".sub-menu").addClass("down").slideToggle(function () {
            $('html,body').animate({ scrollTop: $list_elem.offset().top }, 400);
        });
    });

    $("#ajaxContents").on("hide.bs.modal", function () {
        $('#ajaxContents .modal-dialog').removeClass("modal-lg modal-md modal-sm");
    });

    /*======= Basic =========*/
    $('.m-hb-grid').on('click', function () {
        var target = $(this).data("target");
        $('.m-hb-grid.active').removeClass("active");
        $(this).addClass("active");
        $("#skmbcontent, #skmbcategories, #skmbcart").hide();
        $(target).show();
    });

    $('#skmbcategories').on('click', '.dropdown > a', function () {
        var $liElem = $(this).parent();
        $liElem.toggleClass("show");
        return false;
    });

    $('.tsearch-icon').on('click', function (e) {
        $(".search-area").toggleClass("show")
        if ($(".search-area").hasClass("show")) $(".search-area input").focus();
        e.preventDefault();
    });
});

_ilm = {
    globLoader: function (cmd, elem = null, tiny = false) {
        var $elem, loaderClass;
        $elem = elem ? $(elem) : $('body');
        loaderClass = tiny ? "elem-loader tiny" : "elem-loader";
        if (cmd == 'show') $elem.addClass(loaderClass);
        else $elem.removeClass(loaderClass);
    },

    showNotification: function (msg, emsg = false) {
        var $el = $('<div>' + msg + '</div>');
        $el.addClass("animated floatingNotification fadeInUp");
        if (emsg) $el.addClass("emsg");

        var length = $(".floatingNotification").length;
        $(".floatingNotification").each(function (index) {
            var bottom = (length - index) * 50 + 20;
            $(this).css({ 'bottom': bottom });
        });

        $("body").append($el);
        setTimeout(function () { $el.remove() }, 5000);
    },

    popupContent: function (cmd, content = null, modalSize = null) {
        var $Modal = $("#ajaxContents");
        if ($Modal.hasClass('in')) {
            $Modal = $Modal.clone();
            $Modal.attr("id", "tempModal");
            $Modal.appendTo("body");
            $Modal.on('hidden.bs.modal', function () {
                $Modal.remove();
            });
        }

        $Modal.find("#pop-content").html(content);
        $Modal.modal(cmd);

        if (modalSize) {
            var className = 'modal-' + modalSize;
            $Modal.find('.modal-dialog').removeClass("modal-lg modal-md modal-sm").addClass(className);
        }
    },

    jumpToSection: function (selector, callback = null) {
        var offsetTop = $(selector).offset().top - 120;
        $('html, body').animate({ scrollTop: offsetTop }, callback);
    }
}
function ajaxPost(data, success, url = null, addArg = {}) {
    var url = url || projectfolder + "/ajax", ajaxArg;
    ajaxArg = { type: 'POST', url: url, data: data, success: success };
    ajaxArg = $.extend({}, ajaxArg, addArg);
    return $.ajax(ajaxArg);
}
function IsJsonString(str) {
    try { JSON.parse(str); }
    catch (e) { return false; }
    return true;
}
function isInt(n) {
    return +n === n && !(n % 1);
}
function isSet(s) {
    return (typeof s !== 'undefined') ? true : false;
}
function isCallable(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
