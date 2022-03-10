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

_ilm = {
    init: function () {
        _ilm_Cart.init();
        _ilm_Cart_floatingcart.init();
        _ilm_Form_handler.init();
        _ilm_Paging.init();

        $('span.stars').stars({ starSize: 13 });
        $(window).on("popstate", function (e) { location.reload() });

        /*======= Basic =========*/
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
                // $(".deskv-hm-movable").detach().appendTo(".deskv-hb");
                $('.sticky-wrapper, .site-branding-area').addClass("animated fadeInUp");
            } else {
                if (st + $(window).height() < $(document).height()) {
                    $('body').removeClass("fixed-menu-bar");
                    // $(".deskv-hm-movable").detach().appendTo(".deskv-hm");
                    $('.sticky-wrapper, .site-branding-area').removeClass("animated fadeInUp");
                }
            }

            lastScrollTop = st;
        });

        $("li.dropdown").each(function () {
            var hasSub = false,
                $Relative = $(this),
                $SubMenu = $(".sub-menu", this),
                $SubColGrp = $SubMenu.find(".sub-col-group");

            if ($SubMenu.find(".no-cathead").length && !mobileView) {
                $Relative.addClass("no-submenu");
                $SubMenu.remove();
                return;
            }

            $SubColGrp.each(function () {
                if ($(this).find(".no-catsub").length) {
                    $(".sub-cols", this).remove();
                    $(this).find("> a > i").remove();
                }
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
    },

    initSearchAndCompare: function () {
        var searchCompareSuggestions = {
            init: function () {
                $('.deskv .input-text').on('focus', function (e) {
                    $(this).parent().addClass("focussed");
                }).on('blur', function () {
                    $fld = $(this).parent();
                    setTimeout(function () {
                        $fld.removeClass("focussed");
                    }, 200)
                });


                searchCompareSuggestions.initSearchEvents();
                searchCompareSuggestions.initCompareEvents();
                searchCompareSuggestions.initSuggestion();
            },

            initSearchEvents: function () {
                $('.tsearch-icon').on('click', function (e) {
                    $(".search-area").toggleClass("show")
                    if ($(".search-area").hasClass("show")) $(".search-area input").focus();
                    e.preventDefault();
                });
            },

            initCompareEvents: function () {
                var compare = {
                    init: function () {
                        $(".compare-data").on("click", "a", function (e) {
                            var prid = $(this).data("prid");
                            
                            _ilm_Cart.initComparison(itemInfo, function () {
                                _ilm.globLoader("hide", env, true);
                            });

                            e.preventDefault();
                        });
                    }

                    // addToCompare
                }

                compare.init();
            },

            initSuggestion: function () {
                var suggestion = {
                    init: function () {
                        $('.search-q').on('keyup', function () {
                            var $env = $(this),
                                keyword = $env.val().toLowerCase(),
                                successFunction = suggestion.processAjaxSuccessFunction($env);

                            if (!keyword) return;
                            if (ajaxRequest) ajaxRequest.abort();

                            ajaxRequest = suggestion.getSuggestionData(keyword, successFunction);
                        });
                    },

                    getSuggestionData: function (keyword, successFunction) {
                        return ajaxPost({ searchSuggestion: keyword }, function (data) {
                            var result = IsJsonString(data) ? JSON.parse(data) : { error: data };
                            successFunction(result);
                        });
                    },

                    processAjaxSuccessFunction: function ($env) {
                        var keyword = $env.val(),
                            envData = $env.data(),
                            target = envData.svs || "#search-suggestions",
                            prId, prName, prCat, $ApHtml;

                        return (result) => {
                            if (result.success) {
                                $(target).html('');

                                for (var i = 0; i < result.content.length; i++) {
                                    prId = result.content[i].prid;
                                    prHref = result.content[i].href;
                                    prCat = result.content[i].category;
                                    prName = result.content[i].name.replace(new RegExp(keyword, "gi"), "<b>$&</b>");

                                    switch (target) {
                                        case "#searchset1":
                                        case "#searchset2":
                                            if (!prCat) continue;
                                            $ApHtml = `<li>
                                        <div class="single-srchdata">
                                            <a href="" data-prid="${prId}">${prName}</a>
                                        </div>
                                    </li>`;
                                            break;

                                        case "#search-suggestions":
                                            $ApHtml = '<li><div class="single-srchdata"><a href="' + prHref + '">' + prName;
                                            if (prCat) $ApHtml += '<span>' + prCat + '</span>';
                                            $ApHtml += '</a></div></li>';
                                            break;

                                        default:
                                            $ApHtml = '';
                                    }
                                    $(target).append($ApHtml)
                                }
                            } else {
                                $(target).html(result.error);
                            }
                        };
                    }
                };

                suggestion.init();
            }
        };

        searchCompareSuggestions.init();
    },

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
_ilm.init();
_ilm.initSearchAndCompare();

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
