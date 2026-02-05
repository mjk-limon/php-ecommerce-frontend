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

      ajaxData = {};
      if (elem) ajaxData['dataOnly'] = (typeof elem == 'object') ? $(elem).attr("class") : elem;

      if (newUri != curUri) window.history.pushState("", "", newUri);

      ajaxCreate(targetUrl, 'get', ajaxData, null, { headers: { 'X-Request-Skeleton': true }, dataType: "json" })
        .done(data => _ilm_Router.dataLoadSkeleton(data, $elem))
        .fail(jqXHR => {
          let error = jqXHR.responseText;

          if (jqXHR.responseJSON && 'content' in jqXHR.responseJSON) {
            error = jqXHR.responseJSON.content;
          }

          _ilm_Router.dataLoadSkeleton({ error: error }, $elem)
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
    NProgress.start();
  },

  dataLoadSkeleton: function (result, $elem) {
    if (typeof result.error === 'undefined') {
      _ilm_Router.loadHeadData(result);

      $elem.html(result.content);
    } else {
      //_ilm.showNotification(result.error, true);
      $elem.html("<center><h3>Internal Server error</h3></center>");
      $elem.html(result.error);
    }

    NProgress.done();
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