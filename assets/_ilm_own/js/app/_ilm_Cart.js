_ilm_Cart = {
    init: function () {
        $(document).on('click', '.cAddBuyNav', function (e) {
            if ($(this).hasClass("add-cart")) {
                var itemInfo, env = this, $cartEm;
                _ilm.globLoader("show", env, true);
                $cartEm = $(this).parent().find("em").get(0);
                itemInfo = $cartEm.dataset;

                return _ilm_Cart.addToCart(itemInfo, function () {
                    if ($(env).hasClass("mb-details")) {
                        _ilm.jumpToSection(".pr-size-color", function () {
                            $(".pr-size-color").addClass("animated flash");
                            setTimeout(function () {
                                $(".pr-size-color").removeClass("animated flash");
                            }, 1000);
                        })
                    }
                    _ilm.globLoader("hide", env, true);
                });
            }

            _ilm_Cart.quickBuy(this);

            e.preventDefault();
        });

        $(document).on('click', '.cAddWishNav', function () {
            var itemInfo, env = this;
            _ilm.globLoader("show", env, true);
            itemInfo = $(this).parent().parent().find("em").data();

            _ilm_Cart.addToWishlist(itemInfo, function () {
                _ilm.globLoader("hide", env, true);
            });
        });

        $(document).on('click', '.cCompareNav', function () {
            var itemInfo, optType, env = this;
            _ilm.globLoader("show", env, true);
            
            optType = $(env).hasClass("cmpadd") ? { addItemToCompare: true} : { removeItemFromCompare: true};
            itemInfo = $.extend($(this).parent().parent().find("em").data(), optType);   
            
            _ilm_Cart.initComparison(itemInfo, function () {
                _ilm.globLoader("hide", env, true);
            });
        });
    },

    addToCart: function (itemInfo, successCallback = null) {
        var ajaxData, ajaxCallback;

        if (!_ilm_Cart.validateItemInfo(itemInfo)) {
            _ilm.showNotification("Please select size and color.", true);
            if (isCallable(successCallback)) successCallback();
            return false;
        }

        ajaxData = {
            addItemToCart: 1,
            prId: itemInfo.prid,
            prSize: itemInfo.size,
            prColr: itemInfo.colr,
            prQty: itemInfo.qty
        };

        ajaxCallback = function (data) {
            var result = IsJsonString(data) ? JSON.parse(data) : { error: data };
            if (result.success) {
                _ilm.showNotification("Product successfully added to cart.");
                _ilm.popupContent("hide");

                _ilm_Cart_floatingcart.updateCartData();
                _ilm_Cart_floatingcart.showCart();
            } else if (result.openpop) {
                _ilm.popupContent("show", result.content);
            } else {
                _ilm.showNotification(result.error, true);
                _ilm.popupContent("hide");
            }

            if (isCallable(successCallback)) successCallback();
            return true;
        }

        ajaxPost(ajaxData, ajaxCallback);
    },

    updateCartItem: function (itemIndex, newQty, successCallback = null) {
        var ajaxData, ajaxCallback;

        ajaxData = {
            updateCartItem: 1,
            index: itemIndex,
            qty: newQty
        }

        ajaxCallback = function (data) {
            _ilm_Cart_floatingcart.updateCartData();

            if (isCallable(successCallback)) successCallback();
        }

        ajaxPost(ajaxData, ajaxCallback);
    },

    deleteFromCart: function (itemIndex, successCallback = null) {
        var ajaxData, ajaxCallback;

        ajaxData = {
            index: itemIndex,
            deleteItemFromCart: 1
        }

        ajaxCallback = function (data) {
            _ilm_Cart_floatingcart.updateCartData();

            if (isCallable(successCallback)) successCallback();
        }

        ajaxPost(ajaxData, ajaxCallback);
    },

    validateItemInfo: function (k) {
        if (k.page3) {
            var cs = $('.size-selection').length ? k.size : true;
            var cc = $('.color-selection').length ? k.colr : true;
            return cs && cc;
        }

        return true;
    },

    quickBuy: function (env) {
        var itemInfo, ajaxData, ajaxCallback;

        itemInfo = $(env).parent().find("em").data();
        ajaxData = {
            quickBuyModal: 1,
            prId: itemInfo.prid,
            prSize: itemInfo.size,
            prColr: itemInfo.colr,
            prQty: itemInfo.qty
        };

        _ilm.globLoader('show', env, true);

        ajaxCallback = function (data) {
            var result = IsJsonString(data) ? JSON.parse(data) : { error: data };
            if (result.success) {
                _ilm.popupContent("show", result.content, 'lg');
            } else _ilm.showNotification(result.error, true);

            _ilm.globLoader("hide", env, true);
        }
        ajaxPost(ajaxData, ajaxCallback);
    },

    addToWishlist: function (itemInfo, successCallback = null) {
        var ajaxData, ajaxCallback;

        ajaxData = {
            addItemToWishlist: 1,
            prId: itemInfo.prid
        };

        ajaxCallback = function (data) {
            var result = IsJsonString(data) ? JSON.parse(data) : { error: data };
            if (result.success)
                _ilm.showNotification("Product added to wishlist.");
            else
                _ilm.showNotification(result.error, true);

            if (isCallable(successCallback)) successCallback();
            return true;
        }

        ajaxPost(ajaxData, ajaxCallback);
    },

    initComparison: function (ajaxData, successCallback = null) {
        ajaxPost(ajaxData, function (data) {
            var result = IsJsonString(data) ? JSON.parse(data) : { error: data };
            if (result.success) {
                if (result.optType == 'add') {
                    _ilm.showNotification("Product added to compare.");
                } else {
                    location.reload();
                }
            } else {
                _ilm.showNotification(result.error, true);
            }

            if (isCallable(successCallback)) successCallback();
            return true;
        });
    }
}

var _ilm_Cart_floatingcart = {
    init: function () {
        _ilm_Cart_floatingcart.cart_total = _ilm_Cart_floatingcart.cartTotal();

        $(".sc-btn").on("click", function () {
            _ilm_Cart_floatingcart.updateCartData();
            _ilm_Cart_floatingcart.showCart();
        });

        $(".floating-sc, .mbl-tab-sc").on("click", ".floating-sc-close", function () {
            _ilm_Cart_floatingcart.hideCart();
        });

        $(".floating-sc, .mbl-tab-sc").on("click", ".rmv-crt-btn", function () {
            var dynamic_value = $(this).data("dynamic");

            $(this).closest('tr').fadeOut('slow', function () {
                _ilm.globLoader("show", '.scb-cart-area');

                _ilm_Cart.deleteFromCart(dynamic_value, function () {
                    _ilm.globLoader("hide", '.scb-cart-area');
                });
            });
        });

        $(".floating-sc, .mbl-tab-sc").on("click", "[data-ciup]", function (e) {
            var dynamic_value, new_qty;
            _ilm.globLoader("show", ".scb-cart-area");

            dynamic_value = $(this).closest('tr').find('.rmv-crt-btn').data('dynamic');
            new_qty = Math.abs(parseInt($(this).parent().find("strong").text()));

            if ($(this).data("ciup") == '+') new_qty++;
            else new_qty--;

            new_qty = Math.max(1, new_qty);

            _ilm_Cart.updateCartItem(dynamic_value, new_qty, function () {
                _ilm.globLoader("hide", '.scb-cart-area');
            });
        });
    },

    cartTotal: function () {
        var ct = $("#fcTot").text();
        return parseInt(ct);
    },

    updateCartData: function () {
        var ajaxCallback;
        _ilm.globLoader("show", '#fsc-content');

        ajaxCallback = function (data) {
            var result = IsJsonString(data) ? JSON.parse(data) : { error: data };
            if (result.success) {
                _ilm.globLoader("hide", '#fsc-content');
                $("#fsc-content").html(result.content);
                $("#fcTot").html(result.ctotal);
            } else _ilm.showNotification(result.error, true);
        }
        ajaxPost({ update_cart_data: 1 }, ajaxCallback);
    },

    showCart: function () {
        $(".sc-body").addClass("open");
        //$(".main-body").addClass("sc-cart-open");
    },

    hideCart: function () {
        $(".sc-body").removeClass("open");
        //$(".main-body").removeClass("sc-cart-open");
    }
}