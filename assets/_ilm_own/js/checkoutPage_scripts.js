_ilm_Checkout_page = {
    init: function () {
        $('.qchk-logchk-toggle').on("click", function () {
            $('.not-logged-in').toggle();
            $('.quick-checkout').fadeToggle('fast');
        });

        $('.swaplogin').click(function (e) {
            e.preventDefault();

            if ($(this).hasClass("email")) {
                $(".opt-login-form").hide();
                $(".email-login-form").show();
            } else {
                $(".opt-login-form").show();
                $(".email-login-form").hide();
            }
        });

        $('.shippingChangeBtn').on('click', function (e) {
            var $env = $(this),
                $envPanel = $('.logged-in-userdata'),
                $inputs = $(".login-success").find("td input, td textarea");

            if ($envPanel.hasClass("editing")) {
                if ($('#saveUserData').prop('checked') === true) {
                    _ilm.globLoader('show', '.loggedindata-edit');
                    ajaxPost({
                        updadeMyAccount: 1,
                        id: _ilm_Checkout_page.getUserDataField('#user-id'),
                        first_name: _ilm_Checkout_page.getUserDataField('#full-name'),
                        city: $("#orderLoc").data('ddslick').selectedData.description,
                        state: $("#orderLoc").data('ddslick').selectedData.text,
                        address_line_1: _ilm_Checkout_page.getUserDataField('#shipping-address')
                    }, function (data) {
                        var Result = IsJsonString(data) ? JSON.parse(data) : {success: false};
    
                        if (Result.success) {
                            $('.logged-in').removeClass('noAddress');
                        }

                        _ilm.globLoader('hide', '.loggedindata-edit');
                    });
                }

                $inputs.prop("readonly", true);
            } else {
                $inputs.prop("disabled", false);
                $inputs.prop("readonly", false);
            }

            $('.logged-in-userdata').toggleClass("editing");
            e.preventDefault();
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
    },

    initEmptyAddress: function () {
        if ($('.noAddress').length) {
            $('.shippingChangeBtn').click();
            _ilm.showNotification("Some information is missing! <br/> Please complete your profile.", true)
        }
    },

    getUserDataField: function (type) {
        return $(type).length ? $(type).val() : '';
    }
}

_ilm_Quick_buy.init();
_ilm_Checkout_page.init();
_ilm_Checkout_page.initEmptyAddress();
_ilm_Cart_floatingcart.hideCart();