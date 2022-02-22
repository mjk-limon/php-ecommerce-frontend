_ilm_mer = {
    init: function () {
        //alert("Hi");
    },

    ajaxPost: (key, data, success, url = null, addArg = {}) => {
        var url = url || projectfolder + "/ajax", ajaxData = $.extend({ '_ilm_Mer_xml': key }, data), ajaxArg;
        ajaxArg = $.extend({}, { type: 'POST', url: url, dataType: "json", data: ajaxData, success: success }, addArg);
        return $.ajax(ajaxArg);
    },

    showNotification: function (type, icon, message) {
        $.notify({ icon: icon, message: message }, {
            type: type, timer: 3000, newest_on_top: true,
            placement: { from: "bottom", align: "right" }
        });
    },

    globLoader: (cmd, elem = null, tiny = false) => {
        var $elem, loaderClass;
        $elem = elem ? $(elem) : $('body');
        loaderClass = tiny ? "elem-loader tiny" : "elem-loader";
        if (cmd == 'show')
            $elem.addClass(loaderClass);
        else
            $elem.removeClass(loaderClass);
    }
}

function ajaxPost(data, success, url = null, addArg = {}) {
    var url = url || projectfolder + "/546_admin/ajax.php", ajaxArg;
    ajaxArg = { type: 'POST', url: url, data: data, success: success };
    ajaxArg = $.extend({}, ajaxArg, addArg);
    return $.ajax(ajaxArg);
}

function IsJsonString(str) {
    try { JSON.parse(str); }
    catch (e) { return false; }
    return true;
}

_ilm_mer.init();