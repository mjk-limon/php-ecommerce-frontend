_ilm_mer = {
    init: function () {
        //alert("Hi");
    },

    ajaxPost: function (key, data, success, url = null, addArg = {}) {
        var url = url || projectfolder + "/ajax",
            ajaxData = $.extend({ '_ilm_Mer_xml': key }, data), ajaxArg;
        ajaxArg = $.extend({}, { type: 'POST', url: url, dataType: "json", data: ajaxData, success: success }, addArg);
        return $.ajax(ajaxArg);
    },

    globLoader: function (cmd, elem = null, tiny = false) {
        var $elem, loaderClass;
        $elem = elem ? $(elem) : $('body');
        loaderClass = tiny ? "elem-loader tiny" : "elem-loader";
        if (cmd == 'show') $elem.addClass(loaderClass);
        else $elem.removeClass(loaderClass);
    }
}

function IsJsonString(str) {
    try { JSON.parse(str); }
    catch (e) { return false; }
    return true;
}

_ilm_mer.init();