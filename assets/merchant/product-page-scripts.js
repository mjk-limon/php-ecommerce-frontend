_ilm_Product_page = {
    init: function () {

    },

    prInfoArrayInput: function (t) {
        var $t = $(t),
            $nrElem = $('.nrElem', $t).clone();

        $nrElem.removeClass("nrElem");
        $("input", $nrElem).attr("value", "");

        $(".nrBtn", $t).on('click', function (e) {
            e.preventDefault();
            $(".trElem", $t).append($nrElem.prop("outerHTML"));
            $(".rmvBtn", $t).show();
        });

        $(".rmvBtn", $t).on('click', function (e) {
            e.preventDefault();
            $(".trElem tr", $t).last().remove();
            if ($(".trElem tr", $t).length == 1) {
                $(".rmvBtn", $t).hide();
            }
        });
    },

    initAdvStk: function () {
        var snrElem, $snrElem;
        snrElem = $('#snrElem').wrap('<div>').parent().html();
        $("#snrElem").unwrap();

        $('#pr_colors, #pr_sizes').on('itemAdded itemRemoved', function (event) {
            var prevValues = [], allColors, allSizes, ci, si;
            $.map($("#strElem tr"), function (el) {
                var col, size, stk, prc;
                size = $(el).find(".stk_size").val();
                col = $(el).find(".stk_color").val();
                stk = $(el).find(".stk_amount").val();
                prc = $(el).find(".stk_price").val();
                $(el).remove();
                prevValues.push({ size: size, col: col, stk: stk, prc: prc });
            });
            allColors = $('#pr_colors').tagsinput('items').length ? $('#pr_colors').tagsinput('items') : [''];
            allSizes = $('#pr_sizes').tagsinput('items').length ? $('#pr_sizes').tagsinput('items') : [''];
            for (ci = 0; ci < allColors.length; ci++) {
                for (si = 0; si < allSizes.length; si++) {
                    var filteredVal = prevValues.filter(function (value) {
                        return value.size == allSizes[si] && value.col == allColors[ci];
                    });
                    $snrElem = $(snrElem).appendTo("#strElem");
                    $snrElem.attr({ 'id': null, 'data-colr': allColors[ci], 'data-size': allSizes[si] });
                    $snrElem.find(".stk_size").val(allSizes[si]);
                    $snrElem.find(".stk_color").val(allColors[ci]);
                    if (filteredVal.length) {
                        $snrElem.find(".stk_amount").val(filteredVal[0].stk);
                        $snrElem.find(".stk_price").val(filteredVal[0].prc);
                    }
                    $snrElem.find(".lblsizecolor").html(_ilm_Product_page.advStkLblHtml(allColors[ci], allSizes[si]));
                }
            }
        });
        $('#pr-stk').on('click', function () {
            $('#adv-stock').modal('show');
            return false;
        });
        $('#pr-stk').val("0");
        $('#pr-prs').prop('disabled', true);
    },

    advStkLblHtml: function (color, size) {
        if (!color && !size) return 'Default';
        else if (color) return size ? color + ' - ' + size : color;
        else return size;
    }
}

// tagsinput for color
_ilm_Tags_input = {
    init: function () {
        $('#pr_colors').tagsinput({
            onTagExists: function (item, $tag) { $tag.hide().fadeIn(); },
            trimValue: true,
            tagClass: function (item) { return md.restyleUrl(item) }
        });
        $('#pr_colors').on('beforeItemAdd itemAdded itemRemoved', function (event) {
            if (event.type == 'beforeItemAdd') {
                if (event.item !== event.item.toLowerCase()) {
                    event.cancel = true;
                    $(this).tagsinput('add', event.item.toLowerCase());
                }
            } else if (event.type == 'itemAdded') {
                var editPrid, backCol, splitCols;

                if (event.item.indexOf(' ') >= 0) {
                    splitCols = event.item.split(' ');
                    backCol = 'linear-gradient(to right,' + splitCols.join(' ,') + ')';
                } else backCol = event.item;

                editPrid = $(this).data("prid");
                $addedElem = $('.bootstrap-tagsinput .badge.' + md.restyleUrl(event.item));
                $addedElem.css({ "background": backCol });
                $(".file-droper:not(.colored)").remove();
                $(".colorPrimgDropers").append(_ilm_Tags_input.ndB(event.item, editPrid));
                _ilm_File_droper.init(".file-droper.colored." + md.restyleUrl(event.item));
            } else if (event.type == 'itemRemoved') {
                $(".file-droper[data-dcol='" + md.restyleUrl(event.item) + "']").remove();
                if (!$(this).tagsinput('items').length) {
                    $(".colorPrimgDropers").append(_ilm_Tags_input.ndB(""));
                    _ilm_File_droper.init();
                }
            }
        });
    },

    ndB: function (item, prid) {
        var resItem, label, fdtiName, adClass, target;

        resItem = md.restyleUrl(item, true);
        adClass = item ? " colored " + resItem : null;
        label = item ? item : "No color";
        fdtiName = item ? 'total_image_' + resItem : 'total_image';
        target = (typeof prid == 'undefined') ? '_tmp_upload' : prid;
        return (
            `<div class="file-droper${adClass}" data-dcol="${item}" data-tp="proimg/${target}/${resItem}">
				<div class="droper-label">
					<div class="dlblg top"><span style="background-color:${label}"></span> ${label}</div>
					<div class="dlblg"><a href="">Use Texture</a></div>
				</div>
				<div class="droper-box"></div>
				<div class="droper-intro">
					<div class="droper-text">Drag and drop image files or click here<i class="material-icons">backup</i></div>
					<div class="droper-helper">Upload different images for each color product</div>
				</div>
				<div class="droper-retry">Select Image</div>
				<input type="file" name="pr_img_${resItem}[]" required multiple />
				<input type="hidden" class="fd_ti" name="${fdtiName}" autocomplete="off" data-otd="0" value="0" />
			</div>`
        );
    }
}