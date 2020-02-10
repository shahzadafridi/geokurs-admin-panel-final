(function (window, $) {
	"use strict";
	var debug = false;
	var device = S_PATH.getWType();
	
	var _init = function(page){
		if(device == "pc"){
			return;
		}
		
		switch(page){
			case "home":
				_home();
				break;
			case "prductlist":
				_prductlist();
				break;
			case "prduct":
				_prduct();
				break;
			case "shopping":
				_shopping();
				break;
			case "login":
				_login();
				break;
			case "register":
				_register();
				break;
			case "isearch":
				_isearch();
				break;
			case "bloglist":
				_bloglist();
				break;
			case "blog":
				_blog();
				break;
			case "editaccount":
				_editaccount();
				break;
			case "password":
				_password();
				break;
			case "addresslist":
				_addresslist();
				break;
			case "accountInfo":
				_accountInfo();
				break;
			case "wishlist":
				_wishlist();
				break;
			case "orderlist":
				_orderlist();
				break;
			case "orderinfo":
				_orderinfo();
				break;
			case "returnform":
				_returnform();
				break;
			case "returnlist":
				_returnlist();
				break;
			case "returninfo":
				_returninfo();
				break;
			case "expressConfirm":
				_expressConfirm();
				break;
			case "specialsList":
				_specialsList();
				break;
			case "pcb":
				_pcb();
				break;
			case "emptyCart":
				_emptyCart();
				break;
		}
		
		$(".backTop").css({right:"5px",bottom:"5px"});
	};
	
	var _home = function(){
		var sObj = $(".bodyFrame .pc");
		var parObj = $(".bodyFrame .mobile");
		
		setBigeye();
		setSubNav();
		setProduct();
		
		$(".newaproductd").hide();
		
		function setBigeye(){
			var bigeyeHtml = sObj.find("#column-right").html();
			var ifCreate = parObj.find(".bigeye");
			
			if(ifCreate.length > 0){
				return;
			}
			
			console.log(bigeyeHtml)
			
			parObj.find(".byFrame").html(bigeyeHtml).ready(function(){
				var by = new bigeye(".bodyFrame .pc .bigeyeSource",".bodyFrame .mobile .bigeye");
			});
		}
		
		function setSubNav(){
			var subNavHtml = sObj.find(".subNav").html();
			parObj.find(".subNav").html(subNavHtml);
		}
		
		function setProduct(){
			var subNavHtml = sObj.find(".pl").html();
			parObj.find(".pl").html(subNavHtml);
		}
	};
	
	var _prductlist = function(){
		var sObj = $(".bodyFrame .pc");
		var parObj = $(".bodyFrame .mobile");
		var tagHtml = sObj.find(".tags").prop("outerHTML");
		var catTitHtml = sObj.find(".ctgInfo .title").prop("outerHTML");
		var listHtml = sObj.find(".productList .fullmode").prop("outerHTML");
		
		tagHtml = tagHtml + '<div class="clear"></div>';
		parObj.find(".tagFrame").html(tagHtml);
		parObj.find(".ctgInfo").html(catTitHtml);
		parObj.find(".productList").html(listHtml).ready(function(){
			var pblUrl = top.location.href + '&page=';
			
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
				
				editListStyle();
			});
			
			new pbl({
				parObj:$(".productList .fullmode"),
				totPage:2,
				loadurl:pblUrl,
				fun:function(){
					editListStyle();
				}
			});
		});
		
		function editListStyle(){
			$(".mobile .fullmode li").each(function(){
				var nObj = $(this).find(".addcart");
				var htmlStr = nObj.html();
				
				htmlStr = htmlStr.replace("Add to Cart","");
				nObj.html(htmlStr);
			});
		}
	};
	
	var _prduct = function(){
		thumb();
		pInfo();
		
		function thumb(){
			var htmlStr = "<ul>";
			var wNum = $(".byFrame").width();
			
			$(".bigeye").css({width:wNum});
			$(".thumbList a").each(function(index){
				var obj = $(this);
				var imgObj = obj.find("img");
				var urls = obj.attr("href");
				var alt = imgObj.attr("alt");
				var src = imgObj.data("img");
				var video = imgObj.data("video");
				htmlStr = htmlStr + '<li data-video="'+ video +'" data-url="'+ urls +'" data-img="'+ src +'" data-title="'+ alt +'"></li>';
			});
			htmlStr = htmlStr + '</ul>';
			$(".bigeyeSource").html(htmlStr).ready(function(){
				var by = new bigeye(".bodyFrame .mobile .bigeyeSource",".bodyFrame .mobile .bigeye");
			});
		}
		
		function pInfo(){
			var sObj = $(".info");
			var pName = sObj.find("h1").prop("outerHTML");
			var squ = sObj.find(".info_sku").html();
			var reward = sObj.find(".info_reward").html();
			var stock = $(".pc .productNavFrame .info_stock").prop("outerHTML");
			var price = $(".pc .productNavFrame .price").prop("outerHTML");
			var parObj = $(".mobile .infoFrame");
			var qtyNum = $(".pc .qtyNum").prop("outerHTML");
			var buyBtn = $(".pc .productNavFrame .buyBtn").prop("outerHTML");
			var addCartBtn = $(".pc .productNavFrame .addCartBtn").prop("outerHTML");
			var opations = $(".pc .productNavFrame .opations").prop("outerHTML");
			var quantity = $(".pc .quantity").prop("outerHTML");
			var wishList = $(".pc .addwish").html();
			var notify = $(".pc .notify").prop("outerHTML");
			var productCon = $(".pc .productCon").html();
			var tutorial = $(".pc .tutorial").html();
			var recommend = $(".pc .recommendFrame").html();
			var destroy = $(".pc .destroy").prop("outerHTML");
			var htmlStr = "";
			
			if(notify == undefined){
				notify = "";
			}
			
			if(tutorial == undefined){
				tutorial = "";
			}
			
			if(recommend == undefined){
				recommend = "";
			}
			
			htmlStr = htmlStr + pName;
			htmlStr = htmlStr + '<div class="li"><span>'+squ+'</span><span>'+reward+'</span></div>';
			htmlStr = htmlStr + '<div class="li">'+price+'<div class="info_stock">'+stock+'</div></div>';
			htmlStr = htmlStr + '<div class="li">'+qtyNum+'</div>';
			htmlStr = htmlStr + '<div class="li">'+opations+'</div>';
			if(destroy == undefined){
				htmlStr = htmlStr + '<div class="li">'+buyBtn+addCartBtn+'</div>';
			}else{
				htmlStr = htmlStr + '<div class="li">'+destroy+'</div>';
			}
			htmlStr = htmlStr + '<div class="li">'+quantity+notify+'<div class="addwish">'+wishList+'</div></div>';
			htmlStr = htmlStr + '<div class="clear"></div>';
			
			parObj.html(htmlStr).ready(function(){
				$(".infoFrame .quantity .qtyNum").hide();
				qty();
				
				if(destroy == undefined){
					cartFun();
				}
				
				if($(".infoFrame .quantity .list").length <= 0){
					$(".mobile .addwish").css({width:"100%"});
				}
				
				$(".mobile .opations .list a").each(function(index){
					var obj = $(this);
					var h = new Hammer(obj[0]);
					
					h.on('tap',function(e){
						var hObj = $(e.target);
						$(".mobile .opations .list a").removeClass("select");
						hObj.addClass("select");
					});
				});
				
			});
			
			$(".mobile .productCon").html(productCon).ready(function(){
				$(".mobile .productCon img").css({width:"100%",height:"auto"});
				$(".mobile .productCon iframe").css({width:"100%",height:"auto"});
			});
			$(".mobile .tutorial").html(tutorial);
			$(".mobile .recommendFrame").html(recommend).ready(function(){
				var titHtml = '';
				
				$(".mobile .recommendFrame .tit span").remove();
				titHtml = '<h4>' +$(".mobile .recommendFrame .tit").html() + "</h4>";
				$(".mobile .recommendFrame .tit").html(titHtml);
			});
			
			function qty(){
				var obj = $(".mobile .productQty");
				var max = obj.data("max");
				var min = obj.data("min");
				var val;
				
				obj.val(min);
				
				obj.on('change',function(){
					val = parseInt(obj.val());
					
					if(val < min){
						obj.val(min);
					}
					
					if(max > 0 && val > max){
						obj.val(max);
					}
				});
			}
		}
		
		function cartFun(){
			var addCartObj = $(".mobile .addCartBtn");
			var addCartBtn = new Hammer(addCartObj[0]);
			var buyBtnObj = $(".mobile .buyBtn");
			var buyBtn = new Hammer(buyBtnObj[0]); 
			
			buyBtn.on('tap',function(){
				var r = opationsCheck();
				var pid = addCartObj.data("pid");
				var qty = $(".productQty").val();
				var sObj = $(".opations .list .select");
				var oid = sObj.data("oid");
				var ova = sObj.data("ova");
				var data = {};
				
				if(!r){
					return;
				}
				
				data.products = [];
				data.products.push(
					{
						"pid":pid,
						"oid":oid,
						"ova":ova,
						"qty":qty
					}
				);
				
				$.cart({type:"addProducts",data:data,fun:function(){
					S_PATH.jumpUrl(webPath + 'index.php?route=checkout/cart');
				}});
			});
			
			
			addCartBtn.on('tap',function(){
				var r = opationsCheck();
				var pid = addCartObj.data("pid");
				var qty = $(".productQty").val();
				var sObj = $(".opations .list .select");
				var oid = sObj.data("oid");
				var ova = sObj.data("ova");
				var data = {};
				
				if(!r){
					return;
				}
				
				data.products = [];
				data.products.push(
					{
						"pid":pid,
						"oid":oid,
						"ova":ova,
						"qty":qty
					}
				);
				
				$.cart({type:"addProducts",data:data});
			});
		}
		
		function opationsCheck(){
			var parObj = $(".mobile .opations");
			var id = "";
			var nowSelectObj;
			var result = true;
			
			if(parObj.find(".list a").length <= 0){
				return true;
			}
			
			if(parObj.find(".list .select").length > 1){
				parObj.find(".list a").remove("select");
			}
			
			nowSelectObj = parObj.find(".list .select");
			
			id = nowSelectObj.data("oid");
			
			if(id == "" || id == undefined){
				S_PATH.tips("opations not select")
				parObj.find(".title").addClass("error");
				result = false;
			}
			
			return result;
		}
	};
	
	var _shopping = function(){
		var parObj = $(".mobile .leftFrame");
		var left = $(".pc .leftFrame").html();
		
		parObj.html(left).ready(function(){
			parObj.find(".d").before('<div class="clear"></div>');
			parObj.find(".g").after('<div class="clear"></div>');
			parObj.find(".buttons .shopping").remove();
			parObj.find(".buttons .checkout").remove();
			
			changeProductNum();
			
			$(".mobile .delectPrd").each(function(index){
				var h = new Hammer(this);
				
				h.on('tap',function(e){
					var obj = $(e.target);
					var parObj = obj.parent().parent().parent();
					var pid;
					
					if(parObj[0].localName != "li"){
						parObj = parObj.parent();
					}
					
					pid = parObj.data("pid");
					
					$.cart({
						type:"remove",
						keys:pid,
						fun:function(json){
							parObj.remove();
							S_PATH.tips("delect success！");
							$(".weight").html(json.weight);
							updataTotal();
							$('.cartListFrame').load(webPath + 'index.php?route=common/cart/info .cartList',function(){
								$.cart({type:"refresh"});
							});
						}
					});
				});
			});
			
			
		});
		
		function changeProductNum(){
			var parObj = $(".mobile .list");
			
			parObj.find("li .less").each(function(){
				var lObj= $(this);
				var lessH = new Hammer(lObj[0]);
				
				lessH.on('tap',function(e){
					var obj = $(e.target);
					var parObj = obj.parent().parent();
					var inputObj = obj.parent().find("input");
					var pid = parObj.data("pid");
					var qty = parseInt(inputObj.val());
					var min = parseInt(inputObj.data("min"));
					var max = parseInt(inputObj.data("max"));
					
					qty = qty - 1;
					
					if(qty < min){
						qty = min;
					}
					
					mathSubTot(lObj,qty);
					inputObj.val(qty);
					updata(pid,qty,function(json){
						console.log(json)
					});
				});
				
			});
			
			parObj.find("li .add").each(function(){
				var rObj= $(this);
				var addH = new Hammer(rObj[0]);
				
				addH.on('tap',function(e){
					var obj = $(e.target);
					var parObj = obj.parent().parent();
					var inputObj = obj.parent().find("input");
					var pid = parObj.data("pid");
					var qty = parseInt(inputObj.val());
					var min = parseInt(inputObj.data("min"));
					var max = parseInt(inputObj.data("max"));
					
					qty = qty + 1;
					
					if(qty > max && max != 0 && max != undefined && max != ""){
						qty = max;
					}
					
					mathSubTot(rObj,qty);
					inputObj.val(qty);
					updata(pid,qty);
				});
			});
			
			function mathSubTot(obj,qty){
				var priceObj = obj.parent().parent().find(".d");
				var subTotObj = obj.parent().parent().find(".f");
				var fu = $("#currencySymbolCode").html();
				var price = priceObj.html();
				var tempArr = price.split(fu);
				var tempStr;
				var tempArr2;
				
				if(tempArr.length == 2){
					if(tempArr[0] == ""){
						price = tempArr[1];
					}else{
						price = tempArr[0];
					}
				}
				
				price = Number(price)*100;
				price = Math.floor(price) * qty / 100;
				tempStr = price + "";
				tempArr2 = tempStr.split(".");
				
				if(tempArr2.length == 1){
					price = price + ".00";
				}else if(tempArr2.length == 2){
					if(tempArr2[1].length == 1){
						price = price + "0";
					}
				}
				
				if(tempArr.length == 2){
					if(tempArr[0] == ""){
						price = fu + price;
					}else{
						price = price + fu;
					}
				}
				
				subTotObj.html(price);
			};
			
			function updata(pid,qty){
				$.cart({
					type:"update",
					keys:pid,
					num:qty,
					fun:function(json){
						$(".weight").html(json.weight);
						updataTotal();
					}
				});
			}
		}
	};
	
	var _login = function(){
		var html = $(".pc .signin").html();
		
		$(".mobile .signin").html(html).ready(function(){
			$(".mobile .otherSign").after('<div class="clear"></div>');
		});
	};
	
	var _register = function(){
		var html = $(".pc .signin").html();
		
		$(".mobile .signin").html(html).ready(function(){
			$(".pc .signin").remove();
			$(".mobile .otherSign").after('<div class="clear"></div>');
		});
	};
	
	var _isearch = function(){
		var tit = $(".pc .blogTit").html();
		var subTit = $(".pc .subTitle").html();
		var tagNav = $(".pc .blogNav").html();
		var searchSort = $(".pc .searchSort").html();
		var productList = $(".pc .productList").html();
		var pagination = $(".pc .pagination").prop("outerHTML");
		
		$(".mobile .blogTit").html(tit);
		$(".mobile .subTitle").html(subTit);
		$(".mobile .blogNav").html(tagNav);
		$(".mobile .productList").html(productList).ready(function(){
			$(".mobile .productList li").each(function(){
				var obj = $(this);
				
				obj.attr("style","");
				obj.find("div").attr("style","");
				obj.find("button").attr("style","");
			});
		});
		$(".mobile .paginationFrame").html(pagination);
	};
	
	var _bloglist = function(){
		var tit = $(".pc .blogTit").html();
		var blogNavClass = $(".pc .blogNavClass").html();
		var catTeam  = $(".pc .catTeam").html();
		var tagTeam  = $(".pc .tagTeam").html();
		
		$(".mobile .blogTit").html(tit);
		$(".mobile .blogNavClass").html(blogNavClass);
		$(".mobile .catTeam").html(catTeam);
		$(".mobile .tagTeam").html(tagTeam);
		
		$.pc({type:"bloglists",blogConId:"mobile"});
	};
	
	var _blog = function(){
		var tit = $(".pc .blogTitle").html();
		var author = $(".pc .blogAuthor").html();
		var tag = $(".pc .blogTag").html();
		var con = $(".pc .blogCon").html();
		var rlist = $(".pc .rproductFrame").html();
		
		$(".mobile .blogTitle").html(tit);
		$(".mobile .blogAuthor").html(author);
		$(".mobile .blogTag").html(tag);
		$(".mobile .blogCon").html(con).ready(function(){
			$(".mobile .blogCon iframe").each(function(){
				var obj = $(this);
				var w = obj.width();
				var h = obj.height();
				var nw = $(".mobile .blogCon").width();
				var nh = nw * (h/w);
				
				obj.css({width:nw,height:nh});
			});
			
			$(".mobile .blogCon img").each(function(){
				var obj = $(this);
				
				obj.css({width:"100%",height:"auto"});
			});
		});
		
		$(".mobile .rproductFrame").html(rlist).ready(function(){
			$(".blog_lists .post").each(function(index){
				var obj = $(this);
				var m = "";
			
				if(index%2 == 0){
					m = "1% 2% 1% 0";
				}else{
					m = "1% 0";
				}
				
				obj.css({width:"49%",margin:m});
			});
		});
	};
	
	var _editaccount = function(){
		var info = $(".accountFrame .myName").html();
		var con = $(".rightFrame").html();
		
		$(".mobile .myName").html(info);
		$(".mobile .con").html(con);
	};
	
	var _password = function(){
		var info = $(".accountFrame .myName").html();
		var con = $(".rightFrame").html();
		
		$(".mobile .myName").html(info);
		$(".mobile .con").html(con);
	};
	
	var _addresslist = function(){
		var info = $(".accountFrame .myName").html();
		var con = $(".rightFrame").html();
		
		$(".mobile .myName").html(info);
		$(".mobile .con").html(con);
	};
	
	var _accountInfo = function(){
		var info = $(".accountFrame .myName").html();
		var con = $(".rightFrame").html();
		
		$(".mobile .myName").html(info);
		$(".mobile .con").html(con).ready(function(){
			addressOpationsFun();
		});
	};
	
	var _wishlist = function(){
		var info = $(".accountFrame .myName").html();
		var con = $(".rightFrame").html();
		
		$(".mobile .myName").html(info);
		$(".mobile .con").html(con);
	};
	
	var _orderlist = function(){
		var info = $(".accountFrame .myName").html();
		var con = $(".rightFrame").html();
		
		$(".mobile .myName").html(info);
		$(".mobile .con").html(con);
	};
	
	var _orderinfo = function(){
		var info = $(".accountFrame .myName").html();
		var con = $(".rightFrame").html();
		
		$(".mobile .myName").html(info);
		$(".mobile .con").html(con);
	};
	
	var _returnform = function(){
		var info = $(".accountFrame .myName").html();
		var con = $(".rightFrame").html();
		
		$(".mobile .myName").html(info);
		$(".mobile .con").html(con).ready(function(){
			$('.date').datetimepicker({
				pickTime: false
			});
		});
	};
	
	var _returnlist = function(){
		var info = $(".accountFrame .myName").html();
		var con = $(".rightFrame").html();
		
		$(".mobile .myName").html(info);
		$(".mobile .con").html(con).ready(function(){
			$('.date').datetimepicker({
				pickTime: false
			});
		});
	};
	
	var _returninfo = function(){
		var info = $(".accountFrame .myName").html();
		var con = $(".rightFrame").html();
		
		$(".mobile .myName").html(info);
		$(".mobile .con").html(con);
	};
	
	var _expressConfirm = function(){
		var pcObj = $(".bodyFrame .pc");
		var wNum = $(window).width();
		
		$(".bodyFrame .mobile").removeClass("visible-xs");
		$(".bodyFrame .mobile").hide();
		$(".bodyFrame .pc").removeClass("hidden-xs")
		$(".bodyFrame .pc").show();
		
		pcObj.css({width:wNum});
		pcObj.find(".lineFrame").css({width:wNum,"minHeight":"auto"});
		pcObj.find(".breadcrumb").hide();
		pcObj.find(".cartTitle h3 span").css({width:"100%"});
		
		pcObj.find(".panel-group .coupon").css({padding:"0 20px 20px 20px",width:"100%"});
		pcObj.find(".panel-group .coupon input").css({width:"80%"});
		pcObj.find(".panel-group .coupon button").css({width:"20%"});
		
		pcObj.find(".panel-group .gift").css({padding:"0 20px 20px 20px",width:"100%"});
		pcObj.find(".panel-group .gift input").css({width:"80%"});
		pcObj.find(".panel-group .gift button").css({width:"20%"});
	};
	
	var _specialsList = function(){
		var specials = $(".specials_b").html();
		var todayTit = $(".todayTit").html();
		var todayCon = $(".todayCon").html();
		
		var sTit = $(".sTit").html();
		var sNav = $(".sNav").html();
		var sCon = $(".sCon").html();
		
		$(".mobile .specials_b").html(specials);
		$(".mobile .todayTit").html(todayTit).ready(function(){
			new djs({
				obj:$(".mobile .sdjs"),
				outputObj:$(".mobile .sdjs span"),
				endfun:function(){
				}
			});
		});
		$(".mobile .todayCon").html(todayCon);
		$(".mobile .sTit").html(sTit);
		$(".mobile .sNav").html(sNav).ready(function(){
			$(".mobile .sNav span").eq(0).addClass("select");
			$(".mobile .sCon .tabConFrame").eq(0).show();
			
			$(".mobile .sNav span").each(function(index){
				var obj = $(this);
				var h = new Hammer(obj[0]);
				
				h.on('tap',function(e){
					var obj = $(e.target);
					var num = obj.index();
					$(".mobile .tabConFrame").hide();
					$(".mobile .tabConFrame").eq(num).show();
					$(".mobile .sNav span").removeClass("select");
					$(".mobile .sNav span").eq(num).addClass("select");
				});
			});
			
			
		});
		$(".mobile .sCon").html(sCon);
	};
	
	var _pcb = function(){
		var pcbTit = $(".pc .pcbTit").html();
		var accordion = $(".pc #accordion").html();
		var menuFrame = $(".pc .menuFrame").html();
		
		$(".mobile .pcbTit").html(pcbTit);
		$(".mobile .pcbSelect").html(accordion).ready(function(){
			$(".mobile .pcbSubmit").html(menuFrame).ready(function(){
				
				$(".pc").html("");
				pcbInit();
			});
		});
	};
	
	var _emptyCart = function(){
		var errinfo = $(".pc .errinfo").html();
		var recommendFrame = $(".pc .recommendFrame").html();
		
		$(".mobile .errinfo").html(errinfo);
		$(".mobile .recommendFrame").html(recommendFrame);
	};
	
	function updataTotal(){
		$('.totleResult').load(webPath + 'index.php?route=checkout/cart .totleResult .con',function(){
			
		});
	}
	
	$.mobile = function(options) {
		var type = options.type;
		var page = options.page;
		var obj = options.obj;
		var fun = options.fun;
		
		if(typeof(fun) != 'function'){
			fun = function(){};
		}
		
		switch (type) {
			case 'init':
				_init(page);
				break;
		}
	};
})(window, jQuery);