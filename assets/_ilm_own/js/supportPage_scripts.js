_ilm_Support_page = {
    init: function () {
        $('.sqo-cat').on("click", "ul li a", function (e) {
            var qstn = $(this).text();

            $(".supportSubject").val(qstn).prop("readonly", true);
            $('#newSupport').modal('show');
            e.preventDefault();
        });

        $('.newLiveChat').on("click", function (e) {
            if (typeof Tawk_API !== 'undefined') Tawk_API.toggle();
            //else if(typeof FB !== 'undefined') Tawk_API.toggle();
            else alert("No live chat plugin installed");

            e.preventDefault();
        });

        $('.newFreeMessage').on("click", function (e) {
            $(".supportSubject").val("").prop("readonly", false);
            $('#newSupport').modal('show');
            e.preventDefault();
        });

        $('#supportTicketForm').on('submit', function (e) {
            var $env = $("button", this);

            _ilm.globLoader("show", $env, true);
            ajaxPost($(this).serialize(), function (data) {
                var result = IsJsonString(data) ? JSON.parse(data) : { error: data };

                if (result.success) _ilm.showNotification(result.success);
                else _ilm.showNotification(result.error, true);

                $('#newSupport').modal('hide');
                _ilm.globLoader("hide", $env, true);
            });

            e.preventDefault();
        });
    },
}

_ilm_Support_page.init();