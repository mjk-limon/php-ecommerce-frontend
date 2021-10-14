_ilm_Product_page = {
    init: function () {
        lazyLoadInstance.update();
        _ilm_Product_page.initMenuBar();
        $('span.stars').stars({ starSize: 13 });

        $(".fpCbox").on("change", function () {
            _ilm_Product_page.refreshProducts();
        });

        $("#priceSort-form").on("submit", function (e) {
            var $form = $(this), formDataArr, imploadedMinMax, priceSortData;

            formDataArr = $(this).serializeArray();
            imploadedMinMax = formDataArr.map(function (input) {
                return input.value
            }).join("-");

            $('.fpCbox[name=price]:checked').prop("checked", false);
            if ($('[name=price][value="' + imploadedMinMax + '"]').length) {
                $('[name=price][value="' + imploadedMinMax + '"]').prop("checked", true);
            }

            priceSortData = (imploadedMinMax != '-') ? { price: [imploadedMinMax] } : null;
            _ilm_Product_page.refreshProducts(true, priceSortData);
            e.preventDefault();
        });

        $("#pp-main-area").on("click", ".ttf-close", function () {
            var $env = $(this),
                fKey = $env.data("fkey"),
                fVal = $env.data("fval");

            if (fKey == 'price') {
                $('#priceSort-form').find('input').val('').submit();
                return;
            }

            $(".fpCbox[name='" + fKey + "'][value='" + fVal + "']")
                .prop("checked", false)
                .trigger("change");
        });

        $("#pp-main-area, #pp-mbl-srt-area").on("click", ".sort-options a", function () {
            var Sort = $(this).data("sv");
            $("#sortVal").val(Sort);
            $(".sort-options li.active").removeClass("active");
            $(this).closest("li").addClass("active");

            _ilm.jumpToSection('#pp-main-area');
            _ilm_Product_page.refreshProducts(false, { sort: [Sort] });
            return false;
        });
    },

    getBuildQueryFromFilter: function (extra_query) {
        var queryString, queryValue, inpName, urlParams, queryStringObject = {};

        // Parse Filters 
        $.each($(".filter-form"), function () {
            inpName = $(".fpCbox", this).first().attr("name");
            queryStringObject[inpName] = [];

            $.each($(".fpCbox:checked", this), function () {
                queryStringObject[inpName].push($(this).val());
            });

            if (!queryStringObject[inpName].length) delete queryStringObject[inpName];
        });
        // Parse Additional Url Parameters 
        urlParams = new URLSearchParams(window.location.search);
        $.each(['q', 'a_s_t', 'astval'], function (key, val) {
            if (urlParams.get(val)) {
                queryStringObject[val] = [];
                queryStringObject[val].push(urlParams.get(val));
            }
        });

        if (extra_query) queryStringObject = $.extend({}, queryStringObject, extra_query);

        // Built query
        queryString = "";
        for (var key in queryStringObject) {
            if (queryString == '') queryString += "?" + key + "=";
            else queryString += "&" + key + "=";

            queryValue = "";
            for (var i in queryStringObject[key]) {
                if (queryValue == "") queryValue += encodeURIComponent(queryStringObject[key][i]);
                else queryValue += "_-_" + encodeURIComponent(queryStringObject[key][i]);
            }
            queryString += queryValue;
        }
        return queryString;
    },

    refreshProducts: function (skeleton = true, extra_query = null) {
        var queryString, selector;
        if (!skeleton) {
            selector = ".product-page-products";
            _ilm.globLoader("show", selector);
            $(".product-page-products .row:not(.product-page-products .row:first-child)").remove();
        } else selector = "#pp-main-area";

        queryString = _ilm_Product_page.getBuildQueryFromFilter(extra_query) || "?";

        _ilm_Router.init(queryString, selector, function () {
            $('span.stars').stars({ starSize: 13 });
            _ilm.globLoader("hide", selector);
            lazyLoadInstance.update();
        }, skeleton);
        return true;
    },
    
    initMenuBar: function () {
        var trimmedUrl = window.location.pathname.replace(projectfolder, "");
        var escapeRegExp = function (string) {
            return string.replace(/[.*+?^${ }()|[\]\\]/g, "\\\$&");
        }

        $(".site-nav-area a.active").removeClass("active");
        $(".site-nav-area .dropdown.show").removeClass("show");

        $(".site-nav-area a").each(function () {
            var navLinkHref = $(this).attr("href");
            var RegStr = escapeRegExp(navLinkHref) + "(\\?.*)?$";
            var re = new RegExp(RegStr);

            if (trimmedUrl.match(re)) {
                $(this).addClass("active");
                if ($(this).closest(".dropdown").length) {
                    $(this).closest(".dropdown").addClass("show");
                }
            }
        });
    }
}

_ilm_Product_page.init();