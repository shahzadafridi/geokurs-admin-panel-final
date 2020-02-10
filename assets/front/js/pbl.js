(function(window,document){
	
	var create = function(options){
		var parObj = options.parObj;
		var totPage = options.totPage;
		var loadurl = options.loadurl;
		var fun = options.fun;
		var tempObj;
		var scrollTopNum;
		var nowPage = 1;
		var ifLoad = false;
		
		if(typeof(fun) != 'function'){
			fun = function(){};
		}
		
		if(totPage < 2){
			return;
		}
		
		parObj.before('<div id="pblTemp" style="display:none;"></div>');
		parObj.after('<div class="pblLoading" style="display:none;"><div class="spinner"><div class="cube1"></div><div class="cube2"></div></div><div class="t">loading……</div></div>');
		
		$(window).scroll(function(e) {
			var leg = parObj.find("li").length;
			var loadNum = parObj.find("li").eq(leg-1).offset().top - $(window).height();
			
			scrollTopNum = $(window).scrollTop();
			
			if(scrollTopNum > loadNum){
				if(!ifLoad){
					ifLoad = true;
					nowPage = nowPage + 1;
					loadPage(nowPage);
					parObj.parent().find(".pblLoading").show();
				}
			}
		});
		
		function loadPage(pageNum){
			var loadUrl = loadurl + pageNum + '.productList .fullmode';
			
			tempObj = $("#pblTemp");
			
			if(tempObj.length <= 0){
				return;
			}
			
			tempObj.load(loadUrl,function(){
				var htmlStr = tempObj.find(".fullmode").html();
				
				htmlStr = S_PATH.trim(htmlStr);
				
				if(htmlStr == ""){
					parObj.parent().find(".pblLoading").hide();
					return;
				}
				
				parObj.append(htmlStr).ready(function(){
					$("#pblTemp").html("");
					ifLoad = false;
					parObj.parent().find(".pblLoading").hide();
					
					$(".productList li").each(function(index){
						var obj = $(this);
						
						new djs({
							obj:obj,
							endfun:function(){
								obj.find(".img a span").remove();
								obj.find(".img a .djs").remove();
			//					obj.find(".price-new").remove();
								obj.find(".price span").removeClass();
							}
						});
						$.pc({type:"video",obj:obj.find(".img img")});
					});
					
					fun();
				});
			});
		}
	};
	
	function pbl(options){
		this._init(options);
	}
	
	pbl.prototype = {
		_init:function(options){
			create(options);
		}
	};
	
	window.pbl = pbl;
})(window, document);
