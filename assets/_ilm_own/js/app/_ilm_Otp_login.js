_ilm_Otp = {
    OtpForm: $('#otpLoginForm'),

    init: function () {
        _ilm_Otp.OtpForm.find('.reset').click(function (e) {
            e.preventDefault();
            if ($(this).hasClass("disabled")) {
                return;
            }
            _ilm_Otp.initSlider();
        });

        _ilm_Otp.OtpForm.find("#verify-slider button").click(function (e) {
            e.preventDefault();

            var mobile_number = _ilm_Otp.OtpForm.find('.verf-input').val(),
                number_regex = new RegExp(/^(01){1}[3456789]{1}(\d){8}$/i),
                t_i = 20,
                timer;

            if (number_regex.test(mobile_number)) {
                _ilm_Otp.sendOtp(mobile_number)
                _ilm_Otp.OtpForm.find('.verification-section').addClass("verified");

                if (timer) {
                    clearInterval(timer);
                }

                timer = setInterval(function () {
                    t_i--;
                    $('.reset span').html(t_i);

                    if (t_i < 1) {
                        _ilm_Otp.OtpForm.find('.reset').removeClass("disabled");
                        clearInterval(timer);
                    }
                }, 1000);
                return;
            }

            _ilm.showNotification("Mobile number is not valid!", true);
            _ilm_Otp.initSlider();
        });

        _ilm_Otp.initSlider();
    },

    initSlider: function () {
        _ilm_Otp.OtpForm.find('.reset').addClass("disabled");
        _ilm_Otp.OtpForm.find('.verification-section').removeClass("verified");
    },

    sendOtp: function (mobile_number) {
        ajaxPost({
            sendVerifyOtp: mobile_number
        }, function (data) {
            var Result = IsJsonString(data) ? JSON.parse(data) : {
                success: false,
                error: data
            };

            if (!Result.success) {
                _ilm.showNotification(Result.error, true);
                _ilm_Otp.initSlider();
            }
        });
    }
}

_ilm_Otp.init();