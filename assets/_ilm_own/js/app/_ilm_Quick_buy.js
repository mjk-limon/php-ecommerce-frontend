_ilm_Quick_buy = {
    init: function () {
        _ilm_Quick_buy.cInfo = {};
        _ilm_Quick_buy.pmntId = null;
        _ilm_Quick_buy.orderId = null;
        _ilm_Quick_buy.errors = [];
        _ilm_Quick_buy.initSelectMethod();

        $(".checkOutUserInfo").on("submit", function (e) {
            e.preventDefault();
            var $form = $(this);

            _ilm_Quick_buy.initFormData(this);

            if (!_ilm_Quick_buy.errors.length) {
                if ($form.hasClass("quickbuy")) {
                    $('#qc-user-info').hide();
                    $('#qc-payment-info').show();

                    _ilm.globLoader("show", "#qc-payment-info");
                    _ilm_Quick_buy.orderSubmit(function () {
                        _ilm.globLoader("hide", "#qc-payment-info");
                    });
                } else {
                    _ilm_Checkout_page.updateOrderSummery(_ilm_Quick_buy.cInfo);
                    _ilm_Quick_buy.orderSubmit();
                }
                return;
            }

            $("#menu1-btn").tab('show');
            _ilm.showNotification(_ilm_Quick_buy.errors.join("<br>"), true);
        });

        $(".mthd-select").on("click", function (e) {
            var methodName, ajaxData;
            _ilm.globLoader("show", "#co-payment-information, #qc-payment-info");

            methodName = $.trim($(this).data("mthd"));

            ajaxData = {
                openPaymentForm: 1,
                pmntAmount: 0,
                pmntMethod: methodName,
                pmntId: _ilm_Quick_buy.pmntId,
                orderNo: _ilm_Quick_buy.orderId
            };

            ajaxPost(ajaxData, function (data) {
                result = IsJsonString(data) ? JSON.parse(data) : { error: data };
                _ilm.globLoader("hide", "#co-payment-information, #qc-payment-info");

                if (result.success) _ilm.popupContent("show", result.content, 'md');
                else _ilm.showNotification(data, true);
            });
            e.preventDefault();
        });
    },

    initFormData: function (tform) {
        var $form = $(tform),
            unindexed_array = $form.serializeArray(),
            indexed_array = {};

        _ilm_Quick_buy.errors = []

        $.map(unindexed_array, function (n, i) {
            var validate = _ilm_Quick_buy.validateData(n['name'], n['value']);
            if (validate === true) {
                indexed_array[n['name']] = n['value'];
            } else {
                _ilm_Quick_buy.errors.push(validate);
            }
        });

        _ilm_Quick_buy.cInfo = indexed_array;
    },

    orderSubmit: function (successCallback = null) {
        var ajaxData;

        ajaxData = $.extend({}, { orderSubmit: 1, pmntMethod: 'Cash On Delivery' }, _ilm_Quick_buy.cInfo);

        ajaxPost(ajaxData, function (data) {
            var result = IsJsonString(data) ? JSON.parse(data) : { error: data };

            if (result.success) {
                _ilm_Quick_buy.pmntId = result.pmntId;
                _ilm_Quick_buy.orderId = result.orderId;

                if (isCallable(successCallback)) successCallback();
                return;
            }

            _ilm.showNotification(result.error, true);
        });
    },

    initSelectMethod: function () {
        $('#orderLoc').ddslick({
            selectText: "Select delivery location",
            onSelected: function (data) {
                var ajaxData = {
                    get_delivery_methods: 1,
                    loc: data.selectedData.text
                };

                setTimeout(function () {
                    _ilm.globLoader('show', '.shippingIdCont', true);
                    ajaxPost(ajaxData, function (data) {
                        result = IsJsonString(data) ? JSON.parse(data) : { error: data };
                        $('#shippingId').ddslick('destroy');

                        if (typeof result.error == 'undefined') {
                            $('#shippingId').ddslick({
                                data: result,
                                liveSearch: false,
                                imagePosition: "left",
                                selectText: "Select delivery method",
                                onSelected: function (data) {
                                    if ($('.dcosttotal').length) {
                                        var floatRegex = /[+-]?\d+(\.\d+)?/g,
                                            aprstotaltext = $('.aprstotal').text(),
                                            aprstotal = aprstotaltext.match(floatRegex).map(function (v) { return parseFloat(v); }),
                                            dcosttext = $(data.selectedItem[0]).find(".dd-desc span").text(),
                                            dcost = dcosttext.match(floatRegex).map(function (v) { return parseFloat(v); });

                                        $('.dcosttotal').text(dcosttext);
                                        $('.aprdcostsubtotal').text(Number(aprstotal) + Number(dcost));
                                    }
                                }
                            });
                        } else {
                            _ilm.showNotification(result.error, true);
                        }

                        _ilm.globLoader('hide', '.shippingIdCont', true);
                    });
                }, 100);
            }
        });
    },

    initPlaceOrderForm: function () {
        $("#placeOrderForm").on('submit', function (e) {
            var result;

            _ilm.globLoader("show", "#confirmBtn", true);
            ajaxPost($(this).serialize(), function (data) {
                result = IsJsonString(data) ? JSON.parse(data) : { error: data };

                if (result.success) {
                    _ilm_Router.init(result.redirectUrl);
                    $('.modal').modal("hide");
                } else _ilm.showNotification(result.error, true);

                _ilm.globLoader("hide", "#confirmBtn", true);
            });

            e.preventDefault();
        });
    },

    validateData: function (iKey, iVal) {
        switch (iKey) {
            case 'mobileNumber':
                var Validate = iVal.match(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/);
                if (!Validate) {
                    $('input[name="mobileNumber"]').css({ "border-color": "red" });
                    return 'Mobile number must be at least 11 characters long.<br> Country code (+88, 0088) can be used at the beginning !';
                }

                $('input[name="mobileNumber"]').css({ "border-color": "#ccc" });
                return true;
                break;

        }

        return true;
    }
}