_ilm_File_droper = {
    init: function (droper) {
        var $droperElem;
        $droperElem = droper ? $(droper) : $('.file-droper');
        $droperElem.find('input[type=file]').on("change", function (e) {
            var $droper = $(this).parent(),
                target_path = $droper.data("tp"),
                $fd_ti = $droper.find(".fd_ti"),
                defSort = ($fd_ti.val() != 0) ? $fd_ti.val().split("_-_") : [],
                file_data = $(this).prop('files'),
                form_data = new FormData(),
                oldTotalPrimgdyn = parseInt($fd_ti.attr("data-otd")),
                defSortVal, result, ajaxSubmit = false;

            $droper.addClass("elem-loader");
            target_path = (typeof target_path != 'undefined') ? target_path : "proimg/_tmp_upload/";

            form_data.append("primg_upload", 1);
            form_data.append("oldTotalPrimg", oldTotalPrimgdyn);
            form_data.append("target_path", target_path);
            for (var fd_i = 0; fd_i < file_data.length; fd_i++) {
                if (md.imageValidator(file_data[fd_i], $(this).data()) !== false) {
                    if (_ilm_File_droper.fieldValidator($droper.find(".droper-box"), fd_i, $(this).data())) {
                        form_data.append('pr_img[]', file_data[fd_i]);
                        ajaxSubmit = true;
                    } else {
                        md.showNotification("danger", "warning", "Maximum file limit exceed!");
                        break;
                    }
                }
            }
            if (ajaxSubmit) {
                _ilm_File_droper.ajaxUploadImage(form_data, function (data) {
                    $droper.removeClass("elem-loader");
                    result = IsJsonString(data) ? JSON.parse(data) : { "error": "Error in file upload ! Check selected files ! \n" + data };
                    if (result.success) {
                        oldTotalPrimgdyn += result.files.length;
                        defSortVal = _ilm_File_droper.defSortValue(defSort, result);
                        _ilm_File_droper.appendToDroperBox($droper, result);
                        _ilm_File_droper.initShowHide($droper);

                        $fd_ti.attr("data-otd", oldTotalPrimgdyn).val(defSortVal);
                    } else md.showNotification("danger", "warning", result.error);
                });
            } else $droper.removeClass("elem-loader");
        });

        $droperElem.on("click", ".dlblg a", function (e) {
            var $droper = $(this).closest(".file-droper"),
                $label = $(this).closest(".droper-label"),
                $input = $(document.createElement("input"));
            $input.attr({ "type": "file", "accept": "image/png", "data-file-type": "png" });

            $input.on("change", function (e) {
                var ajaxSubmit = false,
                    target_path = $droper.data("tp"),
                    file_data = $(this).prop('files'),
                    form_data = new FormData();

                $label.addClass("elem-loader tiny");
                form_data.append("primg_upload", 1);
                form_data.append("target_path", target_path);

                for (var fd_i = 0; fd_i < file_data.length; fd_i++) {
                    if (md.imageValidator(file_data[fd_i], $(this).data()) !== false) {
                        form_data.append('pr_img[]', file_data[fd_i]);
                        ajaxSubmit = true;
                    }
                }

                if (ajaxSubmit) {
                    _ilm_File_droper.ajaxUploadImage(form_data, function (data) {
                        $label.removeClass("elem-loader tiny");
                        var result = IsJsonString(data) ? JSON.parse(data) : { "error": "Error in file upload! Check selected files !" };
                        if (result.success) {
                            var texture = result.files[0] + '?rand=' + Math.random();
                            $label.find(".dlblg.top span").css({
                                "background": "url('" + texture + "') no-repeat center / 100% 100%"
                            });
                        }
                    });
                } else $label.removeClass("elem-loader tiny");
            });

            $input.trigger("click");
            e.preventDefault();
        });

        $droperElem.on("click", ".close", function () {
            var $fd_ti, $droper, $dropped_item, delImg, defSort;
            $droper = $(this).closest(".file-droper");
            $dropped_item = $(this).parent();
            $fd_ti = $(this).closest(".file-droper").find(".fd_ti");
            delImg = $(this).data("img");
            defSort = $fd_ti.val().split("_-_");
            defSort.splice($dropped_item.index(), 1);
            ajaxPost({ delImg: delImg }, function (result) {
                if (result == "1") {
                    $fd_ti.val(defSort.join("_-_"));
                    $dropped_item.fadeOut('slow', function () {
                        $dropped_item.remove();
                        _ilm_File_droper.initShowHide($droper);
                    });
                } else md.showNotification('danger', 'warning', result);
            })
        });
        md.sortElem(".droper-box");
    },

    ajaxUploadImage: function (form_data, successCallback) {
        ajaxPost(form_data, successCallback, null, {
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false
        });
    },

    appendToDroperBox: function ($droper, result) {
        var imgFullUrl, dri;
        for (dri = 0; dri < result.files.length; dri++) {
            imgFullUrl = projectfolder + '/' + result.files[dri];
            $droper.find(".droper-box").append(
                `<div class="dropped-item">
					<span class="close" data-img="${result.files[dri]}"><i class="material-icons">delete</i></span>
					<img src="${imgFullUrl}?rand=${Math.random()}"/>
				</div>`
            );
        }
    },

    defSortValue: function (defSort, result, tiny = false) {
        var dri;
        for (dri = 0; dri < result.files.length; dri++)
            defSort.push(result.files[dri].replace(/^.*[\\\/]/, ''));
        return tiny ? defSort : defSort.join("_-_");
    },

    initShowHide: function (droper) {
        var $droper, $droperBox;
        $droper = (typeof droper === 'object') ? droper : $(droper);
        $droperBox = $droper.find(".droper-box");
        if ($droperBox.children().length) {
            $droperBox.show();
            $droper.find(".droper-retry").show();
            $droper.find(".droper-intro").hide();
        } else {
            $droperBox.hide();
            $droper.find(".droper-retry").hide();
            $droper.find(".droper-intro").show();
        }
    },

    fieldValidator: function (droperBox, newImg_i, inlineSettings) {
        var $droperBox, defaults, settings, total_item;
        $droperBox = (typeof droperBox === 'object') ? droperBox : $(droperBox);
        defaults = { maxFileCount: 0 }
        settings = $.extend({}, defaults, inlineSettings);

        total_item = $droperBox.children().length + newImg_i + 1;
        if (settings.maxFileCount && total_item > settings.maxFileCount) return false;
        return true;
    },

    resetDropper: function ($droper) {
        $droper.find(".droper-box").html("");
        _ilm_File_droper.initShowHide($droper);
        $droper.find(".fd_ti").val("").attr("data-otd", 0);
    }
}