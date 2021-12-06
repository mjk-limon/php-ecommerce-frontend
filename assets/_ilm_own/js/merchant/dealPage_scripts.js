_ilm_Mer_deals = {
    init: function () {
        $('.dealdata-toggle-input').click(function (e) {
            e.preventDefault();
            var target = $(this).data("t"),
                isInvalid = false;

            $(".product-tab-1 :input").each(function () {
                console.log(this);
                if (!this.checkValidity()) {
                    isInvalid = true;
                    _ilm_mer.showNotification("danger", "warning", $(this).attr("title"));
                }
            });

            if (isInvalid) {
                return false;
            }

            $('.ptoggletab').hide();
            $('.' + target).fadeIn();
        });

        if ($('.pr_status_switch').length) {
            $('.pr_status_switch').bootstrapToggle({
                on: 'Active',
                off: 'Inactive',
                onstyle: 'success',
                offstyle: 'danger'
            });

            $('.pr_status_switch').change(function () {
                var $env = $(this),
                    $tdElem = $env.closest(".td-actions"),
                    prId = $env.data("id"),
                    status = $env.prop("checked") ? 2 : 0;

                _ilm_mer.globLoader('show', $tdElem);
                _ilm_mer.ajaxPost('updatePrStatus', { status: status, prId: prId }, function (data) {
                    _ilm_mer.globLoader('hide', $tdElem);
                });
            });
        }
    },

    categorySelectInit: function (AllCats) {
        $.each(AllCats, function (i, v) { 
            $('.maincat').append($('<option>', {
                value: i,
                text: i
            }));
        });

        $('.maincat').change(function () { 
            $('.subcatgroup').html('');
            $('.subcat').html('');

            var m = $(this).val();
            $.each(AllCats, function (i, v) {
                if (i == m) {
                    $.each(v, function (i1, v1) { 
                        $('.subcatgroup').append($('<option>', {
                            value: i1,
                            text: i1
                        }));
                    });
                }
            });

            $('.subcatgroup').trigger("change");
        });

        $('.subcatgroup').change(function (e) {
            $('.subcat').html('');
            var m = $('.maincat').val(),
                h = $(this).val();
            $.each(AllCats, function (i, v) {
                if (i == m) {
                    $.each(v, function (i1, v1) {
                        if (i1 == h) {
                            $.each(v1, function (i2, v2) {
                                console.log(v2);
                                $('.subcat').append($('<option>', {
                                    value: v2.id,
                                    text: v2.lbl
                                }));
                            });
                        }
                    });
                }
            });
        });
    }
}

_ilm_Mer_deals.init();