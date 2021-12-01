_ilm_Mer_deals = {
    init: function () {
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
    }
}

_ilm_Mer_deals.init();