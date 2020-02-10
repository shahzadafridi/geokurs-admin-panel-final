(function (window, $) {
	"use strict";
	var debug = false;
	var myScroll;
	var device = S_PATH.getWType();
	
	var _init = function(){
		var result = false;
		var ifCheck = false;
		var idName = ".cartFrame";
		var closeFun;
		
		$(document).ready(function(){
			pc();
			_refreshList();
			return;
			
			switch(device){
				case "pc":
					pc();
					break;
				case "mobile":
					mobile();
					break;
			}
		});
		
		_refreshList();
		
		function mobile(){
			$(".headFrame").css({height:"60px"});
		}
		
		function pc(){
			var btnObj = $(".cartFrame .cartBtn");
			var h = new Hammer(btnObj[0]);
			
			closeFun = function(){
				$(".cartFrame .cartListFrame").hide();
				ifCheck = false;
				btnObj.removeClass("showList");
			}
			
			h.on('tap',function(ev){
				var dom = ev.target;
				var obj = $(dom);
				
				if(!btnObj.hasClass("showList")){
					btnObj.addClass("showList");
					$(".cartFrame .cartListFrame").show(10,function(){
						ifCheck = true;
						_refreshList();
					});
				}
			});
		
			window.document.onclick= function(e){
				var obj = $(e.target);
				result = false;
				findParent(obj);
			};
		}
		
		function findParent(obj){
			var nowId = obj.attr("id");
			var nowClass = "." + obj.attr("class");
			var parObj = obj.parent();
			
			if(nowClass.indexOf(idName) >= 0){
				result = true;
				return;
			}
			if(nowId == idName){
				result = true;
				return;
			}
			
			if(parObj.length <= 0){
				return;
			}
			
			if(parObj[0].localName == 'body'){
				if(result == false){
					closeFun();
				}
				return;
			}else{
				findParent(parObj);
			}
		}
	};
	
	var _refreshList = function(){
		$(document).ready(function(){
			_showList();
			
			// $(".cartList .list .removeBtn").each(function(index){
			// 	var h = new Hammer(this);
			//
			// 	h.on('tap',function(ev){
			// 		var dom = ev.target;
			// 		var id = $(dom).attr("data-id");
			// 		cart.remove(id);
			// 	});
			// });
			
			$(".cartList .list .productName a").each(function(index){
				var productName = $(this).html();
				var maxNum = 70;
				var leg = productName.length;
				var newName = "";
				
				if(leg > maxNum){
					newName = productName.slice(0,maxNum);
					$(this).html(newName + "……");
				}
			});
			
			$.head({type:"loginback"});
			
		});
	};
	
	var _checkMax = function(product_id,quantity){
		var result = true;
		
		if(quantity == undefined || quantity == ""){
			quantity = 1;
		}
		$(".cartListFrame .list li").each(function(){
			var pid = $(this).data("id");
			var max = parseInt($(this).data("max"));
			var num = parseInt($(this).data("num"));
			if(pid == product_id){
				console.log(num,quantity,max)
				num = num + parseInt(quantity);
				
				if(num > max && max != 0){
					result = false;
					S_PATH.tips('This product has a Maximum quantity of '+ max);
				}else{
					result = true;
				}
			}
		});
		
		return result;
	};
	
	var _add = function(product_id,quantity){
		var ifPost = _checkMax(product_id,quantity);
		
		if(ifPost){
			post();
		}
		
		function post(){
			$.ajax({
				url: webPath + 'index.php?route=checkout/cart/add',
				type: 'post',
				data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
				dataType: 'json',
				beforeSend: function() {
					
				},
				complete: function() {
					
				},
				success: function(json) {
					if (json['redirect']) {
						location = json['redirect'];
					}
	
					if (json['success']) {
						// Need to set timeout otherwise it wont update the total
						setTimeout(function () {
						}, 100);
	
						$('.cartListFrame').load(webPath + 'index.php?route=common/cart/info .cartList',function(){
							_refreshList();
						});
						S_PATH.tips("add cart success！");
					}
				},
				error: function(xhr, ajaxOptions, thrownError) {
					console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
				}
			});
		}
		
	};
	
	var _addProducts = function(data,fun){
		var ifPass = true;
		
		for(var p in data.products){
			var ifPost = _checkMax(data.products[p].pid,1);
			
			console.log(data.products[p].pid)
			if(!ifPost){
				ifPass = false;
			}
		}
		
		if(ifPass){
			post();
		}
		
		function post(){
			$.ajax({
				url: webPath + 'index.php?route=checkout/cart/addCart',
				type: 'post',
				data: data,
				dataType: 'json',
				beforeSend: function() {
					
				},
				complete: function() {
					
				},
				success: function(json) {
					if (json['redirect']) {
						location = json['redirect'];
					}
	
					if (json['success']) {
						// Need to set timeout otherwise it wont update the total
						setTimeout(function () {
						}, 100);
	
						$('.cartListFrame').load(webPath + 'index.php?route=common/cart/info .cartList',function(){
							_refreshList();
						});
						S_PATH.tips("add cart success！");
						fun();
					}
				},
				error: function(xhr, ajaxOptions, thrownError) {
					console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
				}
			});	
		}
	};
	
	var _remove = function(key,fun){
		$.ajax({
			url: webPath + 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
			},
			complete: function() {
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
//					location = 'index.php?route=checkout/cart';
					fun(json);
				} else {
					$('.cartListFrame').load(webPath + 'index.php?route=common/cart/info .cartList',function(){
						_refreshList();
					});
					S_PATH.tips("remove cart success！");
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	};
	
	var _update = function(key,quantity,fun){
		var urls = 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1);
		
		$.ajax({
			url: webPath + 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: urls,
			dataType: 'json',
			beforeSend: function() {
			},
			complete: function() {
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
//					location = 'index.php?route=checkout/cart';
					fun(json);
				}
				$('.cartListFrame').load(webPath + 'index.php?route=common/cart/info .cartList',function(){
					_refreshList();
				});
				S_PATH.tips("update success！");
			},
			error: function(xhr, ajaxOptions, thrownError) {
				console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	};
	
	var _showList = function(){
		var id = ".cartList .list";
		var listObj = $(id);
		var btnNumObj = $(".cartBtn span");
		var num = $(".cartList").attr("data-r");
		
		btnNumObj.html(num);
		
		$(".shoppingCart .cartList .result .l").html(num + " items");
		
		if(listObj.length <= 0){
			return;
		}
		myScroll = new IScroll(id, {
			zoom: false,
			scrollX: false,
			scrollY: true,
			hScroll: true,
			vScroll: false,
			scrollbars: 'custom',
			mouseWheel: true,
			wheelAction: 'scroll',
		});
	};
	
	$.cart = function(options) {
		var type = options.type;
		var obj = options.obj;
		var fun = options.fun;
		var product_id = options.id;
		var quantity = options.num;
		var keys = options.keys;
		var data = options.data;
		
		if(typeof(fun) != 'function'){
			fun = function(){};
		}
		
		switch (type) {
			case 'init':
				_init();
				break;
			case 'add':
				_add(product_id,quantity);
				break;
			case 'addProducts':
				_addProducts(data,fun);
				break;
			case 'update':
				_update(keys,quantity,fun);
				break;
			case 'remove':
				_remove(keys,fun);
				break;
			case 'refresh':
				_refreshList();
				break;	
		}
	};
})(window, jQuery);

$.cart({type:"init"});
