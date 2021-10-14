_ilm_Router = {
	init: function (targeturl = null, elem = null, successCallback = null, skeleton = true) {
		var curUri, reqUri, targetUrl, $elem, newUri, ajaxData;
		curUri = window.location.pathname + window.location.search;
		reqUri = targeturl || curUri;

		targetUrl = _ilm_Router.getRequestUriFromUrl(reqUri);
		$elem = elem ? $(elem) : $("#skmbcontent");

		if (!_ilm_Router.badUrl(targetUrl)) {
			if (skeleton) _ilm_Router.showSkeleton($elem);

			newUri = projectfolder + targetUrl;
			ajaxData = { skeleton_LOAD: 1, page: targetUrl };
			if (elem) ajaxData['dataOnly'] = (typeof elem == 'object') ? $(elem).attr("class") : elem;

			if (newUri != curUri) window.history.pushState("", "", newUri);

			ajaxPost(ajaxData, function (data) {
				var result = IsJsonString(data) ? JSON.parse(data) : { "error": data };

				_ilm_Router.dataLoadSkeleton(result, $elem);
				if (isCallable(successCallback)) successCallback();
			});

			_ilm_Router.refreshPage();
			return true;
		}
		return false;
	},

	getRequestUriFromUrl: function (reqUri) {
		var pathname = window.location.pathname;

		reqUri = reqUri.match(/^\?.*$/) ? pathname + reqUri : reqUri;
		return reqUri.replace(projectfolder, "");
	},

	badUrl: function (url) {
		var bad = ["", "#", "javascript:void(0)", "javascript:;"];
		if ($.inArray(url, bad) !== -1) return true;
		else if (url.match(/^#.*$/)) return true;
		else if (url.match(/^http(s)?:\/\/.*$/g)) return true;
		return false;
	},

	showSkeleton: function ($elem) {
		$.ilmScroll('body');

		if ($elem.attr("id") == 'skmbcontent') {
			$('#skeletenLoadActivity').addClass('showactivity');
			return;
		}
		$elem.addClass("skeleton");
	},

	dataLoadSkeleton: function (result, $elem) {
		if ($elem.attr("id") == 'skmbcontent') {
			$('#skeletenLoadActivity').removeClass('showactivity');
		} else {
			$elem.removeClass("skeleton").hide();
		}
		
		if (typeof result.error === 'undefined') {
			_ilm_Router.loadHeadData(result);

			$elem.fadeIn().html(result.content);
		} else {
			//_ilm.showNotification(result.error, true);
			$elem.fadeIn().html("<center><h3>Internal Server error</h3></center>");
			$elem.fadeIn().html(result.error);
		}
	},

	loadHeadData: function (result) {
		document.title = result.title;
		if (result.newurl) window.history.pushState(result.title, "", result.newurl);

		$('._ph_RegBtn').attr('href', '/register/?ref=' + encodeURIComponent(result.ref));
		$('._ph_LoginBtn').attr('href', '/login/?ref=' + encodeURIComponent(result.ref));
		$('._ph_LogoutBtn').attr('href', '/my-account/?logout=1&ref=' + encodeURIComponent(result.ref));
	},

	refreshPage: function () {
		if (mobileView) {
			$('#skmbcontent').show();
			$('#skmbcategories, #skmbcart').hide();
			$('.m-hb-grid.active').removeClass("active");
			$('.m-hb-grid.cntntTab').addClass("active");
			$('.search-area').removeClass("show");
		}
	}
}