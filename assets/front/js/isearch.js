(function (window, $) {
	"use strict";
	var debug = false;
	var myScroll;
	var device;
	var parObj;
	var inputObj;
	var productUrl = webPath + 'index.php?route=product/search&search=|key|&description=true';
	var blogUrl = webPath + 'index.php?route=DFblog/blogs&search=|key|';
	var ajaxUrl = webPath + 'index.php?route=module/isearch/ajaxget&k=|key|';
	var seoUrl = webPath + 'search-|key|.html';
	var minKeyLeg = 2;
	var hartNum = 0;
	var oneHart = 100;
	var delayNum = 3;
	var maxProduct = 3;
	var maxBlog = 3;
	
	var _init = function(obj){
		var timer = self.setInterval(checkFun,oneHart);
		var enterType = "end";
		var endHart = -1;
		var nowKey = "";
		var device = S_PATH.getWType();
		
		parObj = obj;
		device = S_PATH.getWType();
		
		inputObj = parObj.find(".searchInput");
		
		if(inputObj[0].localName != "input"){
			return;
		}
		
		var ch = new Hammer(parObj.find(".fa-remove")[0]);
		
		ch.on("tap",function(e){
			inputObj.val("");
			closeFun();
		});
		
		inputObj.on("keyup",function(e){
			var keyCode = e.keyCode;
			
			nowKey = inputObj.val();
			
			if(keyCode == 13){
				var jumpUrlStr = productUrl.replace("|key|",nowKey);
				var searchInputVal = $(".searchInput").data("url");
								
				if(device == "mobile"){
					return;
				}
				
				if(searchInputVal == "1"){
					jumpUrlStr = seoUrl.replace("|key|",nowKey);
				}
				
				if(nowKey.length >= minKeyLeg){
					S_PATH.jumpUrl(jumpUrlStr);
				}
			}
			
			if(nowKey.length < minKeyLeg){
				closeFun();
				return;
			}
			
			enterType = "start";
			endHart = hartNum + delayNum;
		});
		
		function checkFun(){
			hartNum = hartNum + 1;
			
			if(enterType == "end"){
				return;
			}
			
			if(hartNum >= endHart){
				endHart = -1;
				enterType = "end";
				fastSearch(nowKey);
			}
		}
		
		function fastSearch(keyStr){
			var urlStr = ajaxUrl.replace("|key|",keyStr);
			
			$.ajax({
				url: urlStr,
				type: 'get',
				dataType: 'json',
				beforeSend: function() {
				},
				complete: function() {
				},
				success: function(json) {
					// Need to set timeout otherwise it wont update the total
					setTimeout(function () {
					}, 100);
					
					var htmlStr = getListHtml(json);
					var fsfObj = parObj.find(".fastSearchFrame");
					
					if(fsfObj.length > 0){
						fsfObj.remove();
					}
					parObj.append(htmlStr).ready(function(){
						doFun(htmlStr);
					});
				},
				error: function(xhr, ajaxOptions, thrownError) {
					console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
				}
			});
		}
		
		function doFun(){
			var pl = parseInt(parObj.find(".product").data("pl"));
			var bl = parseInt(parObj.find(".blog").data("bl"));
			
			parObj.find(".fa-remove").show();
			
			if(pl <= 0 && bl <= 0){
				parObj.find(".product ul").html('<li>Not Find</li>');
				parObj.find("hr").remove();
				parObj.find(".blog").remove();
				return;
			}
			
			if(pl <= 0){
				parObj.find(".product").remove();
				parObj.find("hr").remove();
			}
			
			if(bl <= 0){
				parObj.find(".blog").remove();
				parObj.find("hr").remove();
			}
		}
		
		function closeFun(){
			parObj.find(".fa-remove").hide();
			parObj.find(".fastSearchFrame").remove();
		}
		
		function getListHtml(data){
			var htmlStr = ''
			+'<div class="fastSearchFrame">'
			+'	<div class="product" data-pl="|pl|">'
			+'		<ul>|productList|</ul>'
			+'	</div>'
			+'	<hr></hr>'
			+'	<div class="blog" data-bl="|bl|">'
			+'		<ul>|blogList|</ul>'
			+'	</div>'
			+'</div>';
			
			var productList = "";
			var blogList = "";
			var plData = data.product.products;
			var bData = data.blogs;
			var pu = productUrl.replace("|key|",nowKey);
			var bu = blogUrl.replace("|key|",nowKey);
			
			for(var p in plData){
				if(p >= maxProduct){
					break;
				}
				
				productList = productList
				+'<li>'
				+'	<a href="' + plData[p].href + '">' + plData[p].name + '</a>'
				+'</li>';
			}
			
			productList = productList
			+'<li class="all"><a href="' + pu + '">Search the Shop for "' + nowKey + '"</a></li>';
			
			for(var p2 in bData){
				if(p2 >= maxBlog){
					break;
				}
				
				blogList = blogList
				+'<li>'
				+'	<a href="' + bData[p2].href + '">' + bData[p2].name + '</a>'
				+'</li>';
			}
			
			blogList = blogList
			+'<li class="all"><a href="' + bu + '">Search the Blog for "' + nowKey + '"</a></li>';
			
			htmlStr = htmlStr.replace("|productList|",productList);
			htmlStr = htmlStr.replace("|blogList|",blogList);
			
			htmlStr = htmlStr.replace("|pl|",plData.length);
			htmlStr = htmlStr.replace("|bl|",bData.length);
			
			
			return htmlStr;
		}
	};
	
	$.search = function(options) {
		var type = options.type;
		var obj = options.obj;
		var fun = options.fun;
		
		if(typeof(fun) != 'function'){
			fun = function(){};
		}
		
		if(type == undefined){
			type = "init";
		}
		
		switch (type) {
			case 'init':
				_init(obj);
				break;
		}
	};
})(window, jQuery);
$(document).ready(function(){
	$.search({obj:$(".search")});
});