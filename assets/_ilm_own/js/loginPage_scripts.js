_ilm_Login_page = {
    init: function () {
        var WinHash = window.location.hash;
        if (WinHash == '#forgotPassword') {
            $('#forgotPassword').modal('show');
        }

        $(".searchacc-btn").on("click", function (e) {
            var $env = $(this),
                userName = $env.parent().find("input").val();

            if (!userName) {
                _ilm.showNotification("Please fill user name field !", true);
                return false;
            }

            _ilm.globLoader('show', $env, true);
            ajaxPost({ forgotPasswordSendVerification: 1, username: userName }, function (data) {
                var result = IsJsonString(data) ? JSON.parse(data) : { error: data };
                if (result.success) {
                    $('.search-account').hide();
                    $('.verify-and-reset').show();
                } else _ilm.showNotification(result.error, true);

                _ilm.globLoader('hide', $env, true);
            });

            e.preventDefault();
        });

        $('#vcode').on('keyup', function (e) {
            var $VElem = $('.vcodelbl').find('span'),
                VVal = $(this).val();

            if (VVal.length > 6) {
                $(this).val(VVal.substring(0, 6));
                return false;
            }

            $VElem.text('');
            for (var i = 0; i < VVal.length; i++) {
                $VElem.eq(i).text(VVal.charAt(i));
            }
        });

        $('#forgotPassword').on('show.bs.modal', function () {
            $('.search-account').show();
            $('.verify-and-reset').hide();
        });
    }
}

_ilm_Login_page.init();