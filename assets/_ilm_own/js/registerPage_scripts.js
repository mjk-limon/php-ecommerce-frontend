_ilm_Register_page = {
    init: function () {
        $(document).ready(function () {
            $("#id_state").trigger("change");
        });

        $("#id_state").on('change', function () {
            var selectedState = $(this).val();
            _ilm_Register_page.initAddressInput(selectedState);
        });

        $('.iFSubmitBtn').on('click', function (e) {
            e.preventDefault();

            if ($('#registrationForm').valid()) {
                grecaptcha.ready(function () {
                    grecaptcha.execute('6Lc0vykaAAAAAPPI-rqv0e20S-fNcKN0JOAWCdIx', { action: 'submit' }).then(function (token) {
                        ajaxPost({ reCaptchaValidation: token }, function (data) {
                            var result = IsJsonString(data) ? JSON.parse(data) : { error: data };
                            if (result.success) $('#registrationForm').submit();
                            else _ilm.showNotification(result.error, true);
                        });
                    });
                });
            }
        });
    },

    initAddressInput: function (selectedState) {
        $("#id_city").find("option").hide();
        $("#id_city").find("[data-city='" + selectedState + "']").show();
        $('#id_city').find('option:visible:first').prop('selected', true);
    }
}

_ilm_Register_page.init();