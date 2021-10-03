_ilm_Paging = {
	init: function() {
		_ilm_Paging.noQvar = 'undefined';
		$(document).on("click", "._ilmPaging", function(e){
			var $el, selector, targetclass, $env = $(this); 
			
			$env.hide();
			$el = $('<div class="v2"></div>');
			if($env.data("tcls")) $el.addClass($env.data("tcls"));
			
			selector = $el.get(0);
			_ilm_Paging.noQvar = typeof $env.data("noqvar");
			$env.closest(".ilm-paging").find(".more-pr-by-ajax").append($el);
			_ilm_Paging.paging(selector);
			return false;
		});
	},
	
	paging: function(selector) {
		return _ilm_Paging.loadData(selector);
	},
	
	getQueryString: function() {
		var UrlObj, pagingIndex, oldPage, newPage, qS = null;
		
		if(_ilm_Paging.noQvar == 'undefined') {
			UrlObj = new URL(window.location.href);
			pagingIndex = _ilm_Paging.pgindex || "page";
			
			oldPage = UrlObj.searchParams.get(pagingIndex) || 1;
			newPage = parseInt(oldPage) + 1;
			
			UrlObj.searchParams.set(pagingIndex, newPage);
			qS = UrlObj.search
		}
		
		_ilm_Paging.noQvar = 'undefined';
		return qS;		
	},
	
	loadData: function(selector) {
		var queryString = _ilm_Paging.getQueryString();
		_ilm.globLoader("show", selector);
		
		_ilm_Router.init(queryString, selector, function(){
			$('span.stars').stars({starSize: 13});
			_ilm.globLoader("hide", selector);
			lazyLoadInstance.update();
		}, false);
	}
}