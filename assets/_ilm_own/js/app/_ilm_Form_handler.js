_ilm_Form_handler = {
    init: function () {
        $(document).on("submit", "._ilmForm", function (e) {
            var formId, refPage, ajaxData, ajaxCallback,
                env = $('.iFSubmitBtn', this);

            _ilm.globLoader("show", env, true);

            formId = $(this).attr("id");
            refPage = $('.refPage', this).val();

            ajaxData = $(this).serialize();
            ajaxCallback = function (data) {
                var result = IsJsonString(data) ? JSON.parse(data) : { error: data };

                if (result.success) _ilm_Form_handler.successHandler(result, formId, refPage);
                else _ilm.showNotification(result.error, true);

                _ilm.globLoader("hide", env, true);
            }

            ajaxPost(ajaxData, ajaxCallback);
            e.preventDefault();
        });
    },

    successHandler: function (result, formId, refPage) {
        switch (formId) {
            case 'updadeMyAccount':
            case 'updatePassword':
                _ilm.showNotification('User account updated successfully!');
                return _ilm_Router.init('/my-account/');
                break;
            case 'newslettersubmit':
                return _ilm.showNotification('Thanks for signing up.');
                break;
            case 'resetPasswordForm':
                _ilm.showNotification("Password updated successfully. Please login.");
                $('#forgotPassword').modal('hide');
                break;
            default:
                return window.location.href = projectfolder + refPage;
        }
    }
}