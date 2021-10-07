_ilm_Checkout_page = {
    init: function () {
        $('.qchk-logchk-toggle').on("click", function () {
            $('.not-logged-in').toggle();
            $('.quick-checkout').fadeToggle('fast');
        });

        $('.swtT').on("click", function () {
            var $env = $(this),
                relative = $env.attr("data-relative"),
                target,
                isValid;

            if (typeof relative != 'undefined') {
                isValid = true;

                $(relative + ' :input[required]').each(function (i, $e) {
                    if (!$(this).val()) {
                        isValid = false;
                        return;
                    }
                });

                if (!isValid) return;
            }

            if ($env.hasClass("first-tab-btn")) target = "#menu1-btn";
            else if ($env.hasClass("second-tab-btn")) target = "#menu2-btn";
            else if ($env.hasClass("third-tab-btn")) target = "#menu3-btn";

            $(target).parent().removeClass('disabled');
            $(target).tab('show');
        });
    },

    updateOrderSummery: function (formData) {
        var ajaxData, result;
        _ilm.globLoader("show", "#co-order-summery");

        ajaxData = $.extend({}, { get_checkout_summery: 1 }, formData);
        ajaxPost(ajaxData, function (data) {
            result = IsJsonString(data) ? JSON.parse(data) : { error: data };
            if (result.success) {
                $("#_cart_dl").html(result.dl);
                $("#_cart_dc").html(result.dc);
                $("#_cart_odr_ttl, ._payment_total").html(result.t);
            } else {
                $("#menu1-btn").tab("show");
                _ilm.showNotification(data, true);
            }
            _ilm.globLoader("hide", "#co-order-summery");
        }, null, { async: false });
    }
}

_ilm_Quick_buy.init();
_ilm_Checkout_page.init();
_ilm_Cart_floatingcart.hideCart();