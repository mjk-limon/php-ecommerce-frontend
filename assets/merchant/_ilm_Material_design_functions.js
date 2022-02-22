md = {
	misc: { navbar_menu_visible: 0, active_collapse: true, disabled_collapse_init: 0, },

	showNotification: function (type, icon, message) {
		$.notify({ icon: icon, message: message }, {
			type: type, timer: 3000, newest_on_top: true,
			placement: { from: "bottom", align: "right" }
		});
	},

	sortElem: function (elem, target_path) {
		var SortByCol, srtI, dtP, tP, sortData;
		SortByCol = [].slice.call(document.querySelectorAll(elem));
		for (srtI = 0; srtI < SortByCol.length; srtI++) {
			new Sortable(SortByCol[srtI], {
				swapClass: 'swap-highlight', animation: 150,
				onEnd: function (evt) {
					var oldImgIndex = []
					dtP = $(evt.from).parent().data("tp");
					tP = (target_path) ? target_path : dtP;

					$.map($(evt.from).find('.dropped-item'), function (el) {
						var $img, imgSrc, newImgsrc, newImgdummy;
						$img = $(el).find("img");
						imgSrc = $img.attr("src").split('?', 1);
						oldImgIndex.push(imgSrc[0].replace(/^.*[\\\/]/, ''));
					});
					$(evt.from).parent().find(".fd_ti").val(oldImgIndex.join("_-_"));
				}
			});
		}
	},

	initTypeahead: function (elem, avaOpt = null) {
		$(elem).each(function () {
			var avaLocal = avaOpt || $(this).find("+ data").data("dt");

			var dataset = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.whitespace,
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				identify: function (obj) { return obj; },
				local: avaLocal
			});

			var datasetDefaults = function (q, sync) {
				if (q === '') sync(dataset.all());
				else dataset.search(q, sync);
			}

			$(this).typeahead({
				hint: true,
				highlight: true,
				minLength: 0
			}, {
				name: 'states',
				source: datasetDefaults
			});

			$(this).bind('typeahead:close typeahead:change', function (ev, suggestion) {
				if (ev.currentTarget.value) {
					$(ev.currentTarget).closest(".bmd-form-group").addClass('is-filled')
				} else {
					$(ev.currentTarget).closest(".bmd-form-group").removeClass('is-filled')
				}
			});
		});
	},

	initHtmlEditor: function (elem) {
		var uploadOptions, customizedButtonPaneTbwOptions;
		uploadOptions = {
			serverPath: 'https://api.imgur.com/3/image', fileFieldName: 'image', imageWidthModalEdit: true,
			headers: { 'Authorization': 'Client-ID 9e57cb1c4791cea' }, urlPropertyName: 'data.link'
		};
		customizedButtonPaneTbwOptions = {
			autogrow: true, imageWidthModalEdit: true, fixedBtnPane: true,
			btnsGrps: { test: ['strong', 'em'] },
			btnsDef: {
				align: { dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'], ico: 'justifyLeft' },
				image: { dropdown: ['insertImage', 'upload'], ico: 'insertImage' },
				lists: { dropdown: ['unorderedList', 'orderedList'], ico: 'unorderedList' }
			},
			btns: [
				['viewHTML'], ['formatting'], ['strong', 'em', 'underline', 'del'], ['align'], ['createLink', 'unlink'],
				['image', 'noembed', 'table'], ['foreColor', 'backColor'], ['lists', 'horizontalRule'], ['fullscreen']
			],
			plugins: { upload: uploadOptions }
		};
		$(elem).trumbowyg(customizedButtonPaneTbwOptions);
	},

	imageValidator: function (file, inlineSettings) {
		var defaults = {
			fileSize: null,
			minFileSize: 0.1, //KB
			maxFileSize: 16384, //KB
			fileType: '*'
		},
			settings = $.extend({}, defaults, inlineSettings),
			avfileType = settings.fileType.split(",");

		var methods = {
			init: function () {
				var file_type = methods.typeConverter(file.type);
				var file_size = file.size / 1000;

				if (settings.fileSize && file_size != settings.fileSize) return methods.error('4');
				if (settings.minFileSize && file_size < settings.minFileSize) return methods.error('5');
				if (settings.maxFileSize && file_size > settings.maxFileSize) return methods.error('6');
				if (avfileType[0] != '*' && $.inArray(file_type, avfileType) == -1) return methods.error('7');
			},
			typeConverter: function (mime) {
				switch (mime) {
					case 'image/jpeg': return 'jpg'; break;
					case 'image/png': return 'png'; break;
					case 'image/gif': return 'gif'; break;
					case 'image/x-icon': return 'ico'; break;
					case 'image/svg+xml': return 'svg'; break;
					case 'image/webp': return 'webp'; break;
					default: return null;
				}
			},
			error: function (type) {
				switch (type) {
					case '1': $emsg = 'Please select the required number of files !'; break;
					case '2': $emsg = 'Maximum required file limit exceed !'; break;
					case '3': $emsg = 'You have select fewer files than required !'; break;
					case '4': $emsg = 'Please select the required size of files !'; break;
					case '5': $emsg = 'File size requires minimmum!'; break;
					case '6': $emsg = 'File size limit exceed!'; break;
					case '7': $emsg = 'File type not acceptable !'; break;
					default: $emsg = type;
				}
				md.showNotification('danger', 'warning', $emsg);
				return false;
			}
		}
		return methods.init();
	},

	initSidebarsCheck: function () {
		if ($(window).width() <= 991) {
			if ($sidebar.length != 0)
				md.initRightMenu();
		}
	},

	initDashboardPageCharts: function (dataDailySalesChart, dataProductByDateChart, dataDailyOrdersChart) {
		if ($('#dailySalesChart').length) {
			optionsDailySalesChart = {
				lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }), low: 0,
				chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
			}
			var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
			md.startAnimationForLineChart(dailySalesChart);
			optionsProductByDateChart = {
				axisX: { showGrid: false }, low: 0,
				chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
			}
			var completedTasksChart = new Chartist.Bar('#productByDateChart', dataProductByDateChart, optionsProductByDateChart);
			md.startAnimationForLineChart(completedTasksChart);
			var optionsDailyOrdersChart = {
				lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }), low: 0,
				chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
			};
			var responsiveOptions = [
				['screen and (max-width: 640px)', {
					seriesBarDistance: 5,
					axisX: { labelInterpolationFnc: function (value) { return value[0]; } }
				}]
			];
			var websiteViewsChart = Chartist.Line('#dailyOrdersChart', dataDailyOrdersChart, optionsDailyOrdersChart, responsiveOptions);
			md.startAnimationForBarChart(websiteViewsChart);
		}
	},

	initRightMenu: debounce(function () {
		$sidebar_wrapper = $('.sidebar-wrapper');
		if (!mobile_menu_initialized) {
			$navbar = $('nav').find('.navbar-collapse').children('.navbar-nav');
			mobile_menu_content = '';
			nav_content = $navbar.html();
			nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + '</ul>';
			navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;
			$sidebar_nav = $sidebar_wrapper.find(' > .nav');

			$nav_content = $(nav_content);
			$navbar_form = $(navbar_form);
			$nav_content.insertBefore($sidebar_nav);
			$navbar_form.insertBefore($nav_content);
			$(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function (event) {
				event.stopPropagation();
			});

			window.dispatchEvent(new Event('resize'));
			mobile_menu_initialized = true;
		} else {
			if ($(window).width() > 991) {
				$sidebar_wrapper.find('.navbar-form').remove();
				$sidebar_wrapper.find('.nav-mobile-menu').remove();
				mobile_menu_initialized = false;
			}
		}
	}, 200),

	startAnimationForLineChart: function (chart) {
		chart.on('draw', function (data) {
			if (data.type === 'line' || data.type === 'area') {
				data.element.animate({
					d: {
						begin: 600, dur: 700,
						from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
						to: data.path.clone().stringify(),
						easing: Chartist.Svg.Easing.easeOutQuint
					}
				});
			} else if (data.type === 'point') {
				seq++;
				data.element.animate({ opacity: { begin: seq * delays, dur: durations, from: 0, to: 1, easing: 'ease' } });
			} else if (data.type === 'grid') {
				var pos1Animation = { begin: seq * delays, dur: durations, from: data[data.axis.units.pos + '1'] - 30, to: data[data.axis.units.pos + '1'], easing: 'easeOutQuart' };
				var pos2Animation = { begin: seq * delays, dur: durations, from: data[data.axis.units.pos + '2'] - 100, to: data[data.axis.units.pos + '2'], easing: 'easeOutQuart' };
				var animations = {};
				animations[data.axis.units.pos + '1'] = pos1Animation;
				animations[data.axis.units.pos + '2'] = pos2Animation;
				animations['opacity'] = { begin: seq * delays, dur: durations, from: 0, to: 1, easing: 'easeOutQuart' };
				data.element.animate(animations);
			}
		});
		seq = 0;
	},

	startAnimationForBarChart: function (chart) {
		chart.on('draw', function (data) {
			if (data.type === 'bar') {
				seq2++;
				data.element.animate({ opacity: { begin: seq2 * delays2, dur: durations2, from: 0, to: 1, easing: 'ease' } });
			}
		});
		seq2 = 0;
	},

	restyleUrl: function (url, tiny = false) {
		var from, to1, to2, to, restyle;

		from = ["\\-", "\\~", "\\!", "\\#", "\\^", "\\*", "\\(", "\\)", "\\'", "\\\"", "\\,", "\\%", "\\&", "\\$", "@", "/", "\\\\", "\\;", " "];
		to1 = ["-dash-", "-tide-", "-int-", "-hash-", "-caret-", "-star-", "-open-", "-close-", "-squote-", "-dquote-"];
		to2 = ["-comma-", "-percent-", "-amp-", "-dollar-", "-at-", "-slash-", "-backslash-", "-semicolon-", "-"];
		to = to1.concat(to2);

		restyle = url.trim();
		if (!tiny) {
			restyle = restyle.replaceArray(from, to);
			restyle = restyle.replace(/--/g, "~");
		} else restyle = restyle.replaceArray(from, '-');
		return restyle;
	}
}

function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	}
}
md.initSidebarsCheck();