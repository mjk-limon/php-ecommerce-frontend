_ilm_Cart_page = {
	init: function() {
		$('.fi-qty input').focus(function(e){
			$(this).find("+ p").show();
		}).blur(function(){
			$inp = $(this);
			if(!$inp.val()) $inp.val($inp.data("ogn"));
			setTimeout(function(){ $inp.find("+ p").hide() }, 500);
		}).on("keypress", function(e){
			if(e.keyCode === 13) {
				$(this).trigger("blur");
				$(this).find("+ p > .ucBtn").trigger("click");
			} else if(!e.key.match(/^([0-9]+)$/)) return false;
		});
		
		$(".ucBtn").on("click", function(){
			var $cSingle, $inp, itemKey, qtyVal, ajaxData;
			$cSingle = $(this).closest(".cart-single");
			$inp = $cSingle.find(".fi-qty input");
			
			itemKey = $cSingle.find(".remove").data("ckey");
			qtyVal = Math.max(1, Math.abs( $inp.val() ));
			ajaxData = {updateCartItem:1, index: itemKey, qty: qtyVal};
			
			_ilm.globLoader("show", ".col-md-8 .section-mb");
			ajaxPost(ajaxData, function(data){
				var result = IsJsonString(data) ? JSON.parse(data) : {error: data};
				
				if(result.success) {
					if(!$('#couponForm').length) _ilm_Cart_page.updateCartCoupons();
					_ilm_Cart_page.updateCartSummery();
				} else _ilm.showNotification(data);
				
				_ilm.globLoader("hide", ".col-md-8 .section-mb");
				
			});
		});
		
		$(".rcBtn").on("click", function(){
			var $cSingle, $inp;
			$cSingle = $(this).closest(".cart-single");
			$inp = $cSingle.find(".fi-qty input");
			$inp.trigger("blur");
			$inp.val($inp.data("ogn"));
		});
		
		$(".remove").on("click", function(e){
			var $env = $(this),
				$cSingle = $env.parent(),
				itemKey, ajaxData, result;
			
			_ilm.globLoader("show", $cSingle);
			itemKey = $env.data("ckey");
			ajaxData = {deleteItemFromCart: 1, index: itemKey};
			
			ajaxPost(ajaxData, function(data){
				result = IsJsonString(data) ? JSON.parse(data) : {error: data};
				
				_ilm.globLoader("hide", $cSingle);
				if(result.success) {
					$cSingle.slideUp('fast', function(){
						$cSingle.remove();
						_ilm_Cart_page.reSortCartIndex();
					});
					
					if(!$('#couponForm').length) _ilm_Cart_page.updateCartCoupons();
					_ilm_Cart_page.updateCartSummery();
				} else _ilm.showNotification(result.error, true);
			});
			e.preventDefault();
		});
		
		$("#couponForm").on("submit", function(e){
			var ajaxData = $(this).serialize(), result;
			
			_ilm.globLoader("show", ".coupon-area");
			ajaxPost(ajaxData, function(data){
				result = IsJsonString(data) ? JSON.parse(data) : {error: data};
				_ilm.globLoader("hide", ".coupon-area");
				
				if(result.success) {					
					_ilm_Cart_page.updateCartCoupons();
					_ilm_Cart_page.updateCartSummery();
				} else _ilm.showNotification(result.error, true);
			});
			e.preventDefault();
		});
		
		$(".coupon-area").on("click", "#removeCoupon", function(){
			ajaxPost({removeCoupon:1}, function(data){
				result = IsJsonString(data) ? JSON.parse(data) : {error: data};
				_ilm.globLoader("hide", ".coupon-area");
				
				if(result.success) {					
					_ilm_Cart_page.updateCartCoupons();
					_ilm_Cart_page.updateCartSummery();
				} else _ilm.showNotification(result.error, true);
			});
		});
	},
	
	reSortCartIndex: function() {
		if($(".cart-single").length) {
			$(".cart-single").each(function(key){
				var $rBtn = $(this).find(".remove");
				$rBtn.removeData("ckey");
				$rBtn.attr("data-ckey", key);
			});
			
		} else _ilm_Cart_page.updateCartPage(); 
	}, 
	
	updateCartCoupons: function() {
		_ilm.globLoader("show", ".cpm-area", true);
		_ilm_Router.init(location.search, ".cpm-area", function(){
			_ilm.globLoader("hide", ".cpm-area", true);					
		}, false);
	},
	
	updateCartSummery: function() {
		_ilm.globLoader("show", ".st-area");
		_ilm_Router.init(location.search, ".st-area", function(){
			_ilm.globLoader("hide", ".st-area");					
		}, false);
	},
	
	updateCartPage: function() {
		_ilm_Router.init(location.search);
	}
}

_ilm_Cart_page.init();
_ilm_Cart_floatingcart.hideCart();