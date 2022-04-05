_ilm_Details_page = {
    init: function () {
        _ilm_Details_page.prid = $('#tPrId').text();
        _ilm_Details_page.outStockInit($('#tStock').text());

        $('.flexslider').flexslider({
            animation: "fade",
            controlNav: "thumbnails",
            autoplay: true
        });
        lazyLoadInstance.update();
        $('span.stars').stars({ starSize: 13 });

        $(".cs-btn").on("click", function () {
            var prid, colr;

            prid = _ilm_Details_page.prid;
            colr = $.trim($(this).text());
            _ilm_Details_page.refreshProimg(prid, colr);
        });

        $(".ss-btn, .cs-btn").on("click", function () {
            var $env = $(this), cartkey, cartval;
            cartkey = $env.hasClass("ss-btn") ? 'size' : 'colr';
            catval = $.trim($env.text());
            $env.parent().find(".active").removeClass("active");
            $env.addClass("active");

            _ilm_Details_page.setCartData(cartkey, catval);
            _ilm_Details_page.refreshProductPrice(this);
        });

        $(".item_plus, .item_minus").on("click", function (e) {
            var $env = $(this), $qtybox, prQty;

            $qtybox = $(".item_qty_input input");
            prQty = parseInt($qtybox.val());

            $env.hasClass("item_plus") ? prQty++ : prQty--;

            _ilm_Details_page.quantityChange(prQty);
            e.preventDefault();
        });

        $(".item_qty_input input").on("change", function (e) {
            var prQty = parseInt($(this).val()) || 1;
            _ilm_Details_page.quantityChange(prQty);
            e.preventDefault();
        });

        $("#checkDeliveryCost").on("submit", function (e) {
            _ilm.globLoader("show");
            ajaxPost($(this).serialize(), function (data) {
                var i, html,
                    result = IsJsonString(data) ? JSON.parse(data) : { error: data };

                if (!result.error) {
                    html = '<h4>Available Shipping Methods</h4>';
                    html += '<table class="table"><thead><tr><th>Method Name</th>';
                    html += '<th>Description</th></tr></thead><tbody>'
                    for (i = 0; i < result.length; i++) {
                        html += '<tr><td>' + result[i].text + '</td>';
                        html += '<td>' + result[i].description + '</td></tr>';
                    }
                    html += '</tbody></table>';

                    _ilm.popupContent("show", html);
                }
                _ilm.globLoader("hide");
            });

            e.preventDefault();
        });

        $("[data-toggle=DRtab]").on("click", function (e) {
            var $selected_inv = $(this),
                $selected_target = $($selected_inv.data("target")),
                $active_inv = $('[data-toggle=DRtab].active')
            $active_target = $($active_inv.data("target"));

            $active_inv.removeClass("active");
            $active_target.hide();

            $selected_inv.addClass("active");
            $selected_target.fadeIn();
            e.preventDefault();
        });

        $(".new-rev-btn").on("click", function () {
            var env = this;
            _ilm.globLoader("show", env, true);
            ajaxPost({ new_review: 1, prid: _ilm_Details_page.prid }, function () {
                _ilm.globLoader("hide", env, true);
                _ilm.popupContent("show", "sampleContent");
            });
            e.preventDefault();
        });

        $(".replyRvwForm").on("submit", function (e) {
            var $form = $(this), $target, env, result;
            $target = $(this).closest("._nrp").find("> ._nrt");
            env = $(this).find("button").get(0);

            _ilm.globLoader("show", env, true);
            ajaxPost($(this).serialize(), function (data) {
                result = IsJsonString(data) ? JSON.parse(data) : { error: data };

                if (result.success) {
                    $form.find("[name='message']").val('');
                    $target.find(".media.no-comment").remove();
                    $target.append(result.content);
                    $('span.stars').stars({ starSize: 13 });
                }
                else _ilm.showNotification(result.error, true);

                _ilm.globLoader("hide", env, true);
            });

            e.preventDefault();
        });
    },

    quantityChange: function (newQty) {
        var $qtybox = $(".item_qty_input input"),
            prLimit = parseInt($("#tStock").text()),
            minOrder = parseInt($qtybox.attr("value")),
            itemPrice = parseInt($(".pr-price").data("prs"));

        if (newQty < minOrder) {
            $qtybox.val(minOrder);
            $("#pramqty").html(itemPrice * minOrder);
            _ilm.showNotification(`Minimmum quantity selection is ${minOrder}.` , true);
        } else if (newQty > prLimit) {
            $qtybox.val(prLimit);
            $("#pramqty").html(prLimit * itemPrice);
            _ilm.showNotification("Stock limited!", true);
        } else {
            $qtybox.val(newQty);
            $("#pramqty").html(newQty * itemPrice);
            _ilm_Details_page.setCartData("qty", newQty);
        }

        return null;
    },

    setCartData: function (key, value) {
        var $cartEm = document.querySelector('.bnav-btns > em');
        $cartEm.dataset[key] = value;
    },

    refreshProductPrice: function (env) {
        var $cartEm = $('.bnav-btns > em').get(0),
            cD = $cartEm.dataset, pD,
            ajaxData, ajaxCallback;

        if (!_ilm_Details_page.priceChart) {
            _ilm.globLoader("show", env, true);

            ajaxData = {
                get_product_priceChart: 1,
                prid: cD.prid
            };

            ajaxCallback = function (data) {
                result = IsJsonString(data) ? JSON.parse(data) : { error: data };

                if (result.success) {
                    _ilm_Details_page.priceChart = result.pricechart;
                } else _ilm.showNotification(result.error, true);

                _ilm.globLoader("hide", env, true);
            };

            ajaxPost(ajaxData, ajaxCallback, null, { async: false });
        }

        pD = _ilm_Details_page.priceChart;
        pD.forEach(function (item) {
            if (item.i_s == cD.size && item.i_c == cD.colr) {
                var $PriceElem = $(".pr-price"),
                    $StockElem = $("#tStock"),
                    prDis = parseInt($PriceElem.data("dis")),
                    prDisPrice = item.s_p.replace(/[0-9]{1,}/g, function (prPrice) {
                        return Math.round(prPrice - (prPrice * (prDis / 100)));
                    }), priceLbl;

                priceLbl = prDis
                    ? prDisPrice + '<span class="pre-price">' + item.s_p + '</span>'
                    : item.s_p;

                $PriceElem.html(priceLbl);
                $StockElem.html(item.s_a);
                _ilm_Details_page.outStockInit(item.s_a);
                return;
            }
        });

        return;
    },

    outStockInit: function (stockVal) {
        if (parseInt(stockVal) == 0) {
            $('.entl-data.ava').addClass("notava").text("Out Of Stock");
            $('.thumb-image').addClass("no-stock");
            $('.pr-buy-navs').hide();
            return;
        }

        $('.entl-data.ava').removeClass("notava").text("In Stock");
        $('.thumb-image').removeClass("no-stock");
        $('.pr-buy-navs').show();
    },

    refreshProimg: function (prid, colr) {
        var $flexElem = $(".flexslider"), $flexSlideElem, result;
        _ilm.globLoader("show", ".single-top-left");

        ajaxPost({ get_product_image: 1, prid: prid, colr: colr }, function (data) {
            result = IsJsonString(data) ? JSON.parse(data) : { error: data };

            if (result.images && result.images.length) {
                $flexSlideElem = $('<ul class="slides"></ul>');
                $flexElem.html($flexSlideElem);

                $.each(result.images, function (index, image) {
                    var newHtml = "";
                    newHtml += '<li data-thumb="' + image + '">';
                    newHtml += '	<div class="thumb-image detail_images">';
                    newHtml += '		<img src="' + image + '" data-imagezoom="true" class="img-responsive">';
                    newHtml += '	</div>';
                    newHtml += '</li>';
                    $flexSlideElem.append(newHtml);
                });
                $flexSlideElem.append('<div class="clearfix"></div>');

                $("#flexslider").removeData("flexslider");
                $('.flexslider').flexslider({
                    animation: "fade",
                    controlNav: "thumbnails",
                    autoplay: true
                });
            } else _ilm.showNotification(result.error, true);
            _ilm.globLoader("hide", ".single-top-left");
        });
    }
}

_ilm_Details_page.init();