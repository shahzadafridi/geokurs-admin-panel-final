(function (window, $) {
	"use strict";
	var debug = false;
	var device = "";
	var ifLoadMobile = false;
	var ifPCInfo = false;
	var ifAddListener = false;
	var nowViewType = "";
	
	var _checkViewMode = function(page){
		device = S_PATH.getWType();
		
		if(!ifAddListener){
			$(window).resize(function(){
				_checkViewMode(page);
			});
			ifAddListener = true;
		}
		
		if(device == "mobile"){
			if(nowViewType == device){
				return;
			}
			
			if(!ifLoadMobile){
				var oHead = document.getElementsByTagName('HEAD').item(0); 
				var oScript= document.createElement("script"); 
				
				ifLoadMobile = true;
				oScript.type = "text/javascript"; 
				oScript.src = mobileJSUrl; 
				$(oHead).append(oScript).ready(function(){
					$.mobile({type:"init",page:page});
				});
				
				$.head({type:"mobileInit"});
			}else{
				$.mobile({type:"init",page:page});
			}
			$(".headFrame").css({height:"60px"});
			nowViewType = "mobile";
			return;
		}else{
			if(nowViewType == device){
				return;
			}
			
			if(!ifPCInfo){
				_init(page);
				ifPCInfo = true;
			}else{
				
			}
			$(".headFrame").css({height:"auto"});
			nowViewType = "pc";
		}
	};
	
	var _init = function(page){
		_headfooteidt();
		$(window).resize(function(){
			_headfooteidt();
		});
		switch(page){
			case "home":
				_home();
				break;
			case "prduct":
				_prduct();
				break;
			case "prductlist":
				_prductlist();
				break;
			case "shopping":
				_shopping();
				break;
			case "bloglist":
				_bloglist("pc");
				break;
			case "isearch":
				_isearch();
				break;
			case "specialsList":
				_specialsList();
				break;
			case "checkout":
				_checkout();
				break;
			case "pcb":
				_pcb();
				break;
			case "emptyCart":
				_emptyCart();
				break;
		}
	};
	
	var _headfooteidt = function(){
		var nowWinHeight = $(window).width();
		
		if(nowWinHeight < 1200){
			$(".headFrame .con").css({width:"1200px",margin:"0 auto",position:"static",left:"0"});
			$(".headFrame .pc").css({width:"1200px"});
			$("footer .pc").css({width:"1200px"});
			$(".headFrame .currency").css({left:"890px"});
			
			
		}else{
			$(".headFrame .con").css({width:"1200px",margin:"0 0 0 -600px",position:"absolute",left:"50%"});
			$(".headFrame .pc").css({width:"100%"});
			$("footer .pc").css({width:"100%"});
			$(".headFrame .currency").css({left:"auto"});
		}
	}
	
	var _video = function(imgObj,num){
		var parObj = imgObj.parent();
		var videoUrl = imgObj.data("video");
		var imgSrc = imgObj.attr("src");
		var wNum = parObj.parent().width();
		var hNum = parObj.parent().height();
		if(videoUrl == undefined || videoUrl == ""){
			return;
		}
		var htmlStr =  ''
		+'<video id="pvideo_'+ num +'" poster="'+ imgSrc +'" loop="true" autoplay="true" width="'+ wNum +'" height="'+ hNum +'" controls="controls">'
		+'	 <source src="'+ videoUrl +'" type="video/mp4" />'
		+'</video>';
		
		imgObj.hide();
		
		if(parObj.find("video").length > 0){
			return;
		}
		
		parObj.append(htmlStr).ready(function(){
			var video=document.getElementById('pvideo_'+ num);
			video.controls=false;
			video.play();
		});
		parObj.data("video","");
	};
	
	var _specialsList = function(){
		$(".productList li .title a").each(function(index){
			var leg = 50;
			if(index == 0){
				leg = 90;
			}
			S_PATH.nameformat({
				obj:$(this),
				str:$(this).html(),
				leg:leg
			});
		});
		
		$(".tabNavFrame span").each(function(index){
			var obj = $(this);
			var h = new Hammer(obj[0]);
			
			h.on('tap',function(e){
				var obj = $(e.target);
				var num = obj.index();
				$(".tabConFrame").hide();
				$(".tabConFrame").eq(num).show();
				$(".tabNavFrame span").removeClass("select");
				$(".tabNavFrame span").eq(num).addClass("select");
			});
		});
		$(".tabConFrame").hide();
		$(".tabConFrame").eq(0).show();
		$(".tabNavFrame span").eq(0).addClass("select");
		
		
		$(".tabConFrame li").each(function(){
			var obj = $(this);
			
			new djs({
				obj:obj,
				endfun:function(){
					obj.find(".img a span").remove();
					obj.find(".img a .djs").remove();
					obj.find(".price-new").remove();
					obj.find(".price span").removeClass();
				}
			});
		});
		
		
		
		new djs({
			obj:$(".sdjs"),
			outputObj:$(".sdjs span"),
			endfun:function(){
			}
		});
		
		
		searchSubList($("#recommendList"));
		function searchSubList(parObj){
			if(parObj.length <= 0){
				return;
			}
			var onePageNum = 6;
			var leg = parObj.find(".list li").length;
			var listW = parObj.find(".list li").outerWidth(true)*leg;
			var nowPageNum = 0;
			var lBtn = new Hammer(parObj.find(".lBtn")[0]);
			var rBtn = new Hammer(parObj.find(".rBtn")[0]);
			var totPage = Math.ceil(leg/onePageNum);
			var moveNum = 985;
			
			parObj.find("ul").css({width:listW});
			parObj.find(".page").html("1/" + totPage);
			parObj.find(".title a").each(function(){
				var obj = $(this);
				var str = obj.html();
				var leg = 35;
				S_PATH.nameformat({
					obj:$(this),
					str:str,
					leg:leg
				});
			});
			
			lBtn.on('tap',function(e){
				nowPageNum = nowPageNum - 1;
				if(nowPageNum < 0){
					nowPageNum = 0;
				}
				
				parObj.find("ul").animate({marginLeft:-moveNum*nowPageNum});
				parObj.find(".page").html((nowPageNum+1) + "/" + totPage);
			});
			
			rBtn.on('tap',function(e){
				nowPageNum = nowPageNum + 1;
				if(nowPageNum >= totPage){
					nowPageNum = totPage - 1;
				}
				
				parObj.find("ul").animate({marginLeft:-moveNum*nowPageNum});
				parObj.find(".page").html((nowPageNum+1) + "/" + totPage);
			});
		}
	};
	
	var _checkout = function(){
		
		reload();
		
		S_PATH.addKeepRunFun("totalPriceSet",function(){
			totalPriceSet();
		});
		
		function totalPriceSet(){
			var resultObj = $(".summaryFrame");
			var sourceHtml = $("#total").html();
			var resultHtml = resultObj.html();
			var totNum = 0;
			
			$(".mathfortot").each(function(index){
				totNum = totNum + parseInt($(this).val());
			});
			
			$(".totPNum").html(totNum);
			
			if(sourceHtml != resultHtml){
				resultObj.html(sourceHtml);
			}
		}
		
		function hideAddress(parObj){
			var ifshow = parObj.attr("open");
			var ifAddListen = parObj.attr("lis");
			
			if(ifAddListen != "on"){
				var h = new Hammer(parObj.find(".moreAddress")[0]);
				
				console.log(h)
				
				h.on("tap",function(e){
					console.log(e.target)
				});
				
				parObj.attr("lis","on");
			}
			
			
			
			parObj.find(".list-group-item").each(function(index){
				var obj = $(this);
				if(ifshow == "on"){
					obj.show();
				}else{
					if(!obj.hasClass("active")){
						obj.hide();
					}
				}
			});
		}
		
		function reload(){
			var rightObj = $("#confirm_wrap");
			var scrollTopNum = 0;
			var pNavOT = rightObj.offset().top;
			var nowTopNum = 0;
			var footTN = 0;
			var minTopNum = 90;
			var ifTauchFoot = false;
			var tauchFootTop = 0;
			var ifListen = rightObj.attr("listen");
			
			rightObj.attr("locking","on");
			
			if(ifListen == "on"){
				return;
			}
			
			$(window).scroll(function(e) {
				movie();
			});
			
			S_PATH.addKeepRunFun("checkout_reload",function(){
				var ifReload = $("#confirm_wrap").attr("locking");
			
				if(ifReload != "on"){
					rightObj = $("#confirm_wrap");
					movie();
				}
			});
			
			function movie(){
				scrollTopNum = $(window).scrollTop();
				nowTopNum = -(scrollTopNum - pNavOT);
				footTN = $("footer").offset().top;
				ifTauchFoot = footTN - scrollTopNum - rightObj.outerHeight(true) - minTopNum;
				
				if(nowTopNum <= minTopNum){
					var wNum = $(window).width();
					
					if(wNum < 1200){
						rightObj.css({position:"fixed",left:"923px",top:minTopNum,width:"270px"});
					}else{
						rightObj.find("h3").show();
						rightObj.css({position:"fixed",left:"50%",marginLeft:"322px",top:minTopNum,width:"270px"});
					}
					
				}else{
					rightObj.find("h3").hide();
					rightObj.css({position:"absolute",left:"auto",marginLeft:0,top:0,width:"270px"});
				}
				
				if(ifTauchFoot < 0){
					tauchFootTop = footTN - rightObj.outerHeight(true) - pNavOT - 30;
					rightObj.css({position:"absolute",left:"auto",marginLeft:0,top:tauchFootTop,width:"270px"});
				}
			}
		}
	};
	
	var _isearch = function(){
		searchSubList($("#specialsList"));
		searchSubList($("#recommendList"));
		
		$(".simpleMode .img img").each(function(index){
			var obj = $(this);
			
			_video(obj,index);
		});
		
		function searchSubList(parObj){
			if(parObj.length <= 0){
				return;
			}
			var onePageNum = 6;
			var leg = parObj.find(".list li").length;
			var listW = parObj.find(".list li").outerWidth(true)*leg;
			var nowPageNum = 0;
			var lBtn = new Hammer(parObj.find(".lBtn")[0]);
			var rBtn = new Hammer(parObj.find(".rBtn")[0]);
			var totPage = Math.ceil(leg/onePageNum);
			var moveNum = 985;
			
			parObj.find("ul").css({width:listW});
			parObj.find(".page").html("1/" + totPage);
			parObj.find(".title a").each(function(){
				var obj = $(this);
				var str = obj.html();
				var leg = 35;
				S_PATH.nameformat({
					obj:$(this),
					str:str,
					leg:leg
				});
			});
			
			lBtn.on('tap',function(e){
				nowPageNum = nowPageNum - 1;
				if(nowPageNum < 0){
					nowPageNum = 0;
				}
				
				parObj.find("ul").animate({marginLeft:-moveNum*nowPageNum});
				parObj.find(".page").html((nowPageNum+1) + "/" + totPage);
			});
			
			rBtn.on('tap',function(e){
				nowPageNum = nowPageNum + 1;
				if(nowPageNum >= totPage){
					nowPageNum = totPage - 1;
				}
				
				parObj.find("ul").animate({marginLeft:-moveNum*nowPageNum});
				parObj.find(".page").html((nowPageNum+1) + "/" + totPage);
			});
		}
	};
	
	var _pcb = function(){
		pcbInit();
	};
	
	var _emptyCart = function(){
		recommend();
	};
	
	var _home = function(){
		var pcby = new bigeye(".bodyFrame .pc .bigeyeSource",".bodyFrame .pc .bigeye");
		
		navigate();
		
		$(".productList .simpleMode li").each(function(index){
			var obj = $(this);
			var tit = obj.find(".title a").html();
			
			S_PATH.nameformat({
				obj:obj.find(".title a"),
				str:tit,
				leg:70
			});
			
			_video(obj.find(".img img"),index);
			
			new djs({
				obj:obj,
				endfun:function(){
					obj.find(".img a span").remove();
					obj.find(".img a .djs").remove();
					obj.find(".price-new").remove();
					obj.find(".price span").removeClass();
				}
			});
		});
		
		function navigate(){
			var parObj = $(".categoryFrame");
			
			$(".categoryFrame .list .subNaveBtn").on("mouseenter",function(){
				var obj = $(this).parent();
				var childObj = obj.find(".childData");
				
				parObj.find(".childData").hide();
				parObj.find(".list li").removeClass("select");
				obj.addClass("select");
				parObj.find(".childData").hide();
				
				parObj.find("a").removeClass("hideBorder");
				obj.prev().find(".subNaveBtn").addClass("hideBorder");
				$(obj.find("a")[0]).addClass("hideBorder");
				
				if(childObj.length > 0){
					var hNum = parseInt(parObj.height()) + 10;
					var childLeg = childObj.find(".rc li").length;
					
					parObj.find(".subNaveBtn").removeClass("hideBorder");
					obj.prev().find(".subNaveBtn").addClass("hideBorder");
					$(obj.find("a")[0]).addClass("hideBorder");
					childObj.show();
					childObj.css({height:hNum});
					if(childLeg % 2 == 1){
						childObj.find(".rc li").eq(childLeg - 1).addClass("oddLast");
					}
				}
			});
			
			parObj.on('mouseleave',function(){
				parObj.find(".subNaveBtn").removeClass("hideBorder");
				parObj.find(".subNaveBtn a").removeClass("hideBorder");
				parObj.find(".list li").removeClass("select");
				parObj.find(".childData").hide();
			});
		}
	};
	
	var _prduct = function(){
		var scrollTopNum;
		var pNavObj = $(".productNavFrame")
		var pNavOT = pNavObj.offset().top;
		var minTopNum = 90;
		var nowTopNum;
		var footTN = $("footer").offset().top;
		var ifTauchFoot = false;
		var tauchFootTop = 0;
		
		qty();
		thumb();
		frequently();
		opations();
		fastDocument();
		recommend();
		cartFun();
		notify();
		
		$(window).scroll(function(e) {
			scrollTopNum = $(window).scrollTop();
			nowTopNum = -(scrollTopNum - pNavOT);
			footTN = $("footer").offset().top;
			ifTauchFoot = footTN - scrollTopNum - pNavObj.outerHeight(true) - minTopNum;
			
			if(nowTopNum <= minTopNum){
				var wNum = $(window).width();
				pNavObj.find("h3").show();
				if(wNum < 1200){
					pNavObj.css({position:"fixed",left:"950px",top:minTopNum});
				}else{
					pNavObj.css({position:"fixed",left:"50%",marginLeft:"350px",top:minTopNum});
				}
			}else{
				pNavObj.find("h3").hide();
				pNavObj.css({position:"absolute",left:"auto",marginLeft:0,top:0});
			}
			
			if(ifTauchFoot < 0){
				tauchFootTop = footTN - pNavObj.outerHeight(true) - pNavOT - 30;
				pNavObj.css({position:"absolute",left:"auto",marginLeft:0,top:tauchFootTop});
			}
		});
		
		function notify(){
			var notifyBtn = $("#notifyBtn");
			var hNBtn;
			var htmlStr = ''
			+'<div class="notifyFrame">'
			+'	<div class="conFrame">'
			+'		<div class="closeBtn"><i class="fa fa-remove"></i></div>'
			+'		<div class="img"><img src="'+ webPath +'image/v3/notify.png" alt="sorry"/></div>'
			+'		<h3>Sorry we are out of stock!</h3>'
			+'		<h4>Please enter your details below and we will send you an email when this item is back in stock. <br>You will only be emailed about this product!</h4>'
			+'		<div class="tit">Name</div>'
			+'		<div class="input"><input class="nameData" value="" type="text"/></div>'
			+'		<div class="tit">Email</div>'
			+'		<div class="input"><input required="required" class="emailData" value="" type="email"/></div>'
			+'		<div class="btnFrame"><button>NOTIFY ME</button></div>'
			+'	</div>'
			+'	<div class="maskBG"></div>'
			+'</div>';
			
			if(notifyBtn.length <= 0){
				return;
			}
			
			hNBtn = new Hammer(notifyBtn[0]);
			hNBtn.on('tap',function(e){
				$('body').prepend(htmlStr).ready(function(){
					var parObj = $(".notifyFrame");
					var closeBtn = parObj.find(".closeBtn");
					var maskObj = parObj.find(".maskBG");
					var btnObj = parObj.find("button");
					var cb = new Hammer(closeBtn[0]);
					var mb = new Hammer(maskObj[0]);
					var pb = new Hammer(btnObj[0]);
					
					cb.on('tap',function(e){
						parObj.remove();
					});
					
					mb.on('tap',function(e){
						parObj.remove();
					});
					
					pb.on('tap',function(e){
						var mailObj = parObj.find(".emailData");
						var name = parObj.find(".nameData").val();
						var mail = mailObj.val();
						var pid = notifyBtn.data("pid");
						var ifError = mailObj[0].validity.typeMismatch;
						
						if(mail == "" || ifError == true){
							mailObj[0].setCustomValidity("email error");
						}else{
							mailObj[0].setCustomValidity("");
							postData(pid,name,mail,parObj);
						}
					});
				});
			});
			
			function postData(pid,name,mail,parObj){
				$.ajax({
					url: webPath + 'index.php?route=product/notify',
					type: 'post',
					data: 'product_id=' + pid + '&name=' + name + '&email=' + mail,
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
		
							parObj.remove();
							S_PATH.tips("success！");
						}
					},
					error: function(xhr, ajaxOptions, thrownError) {
						console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
					}
				});
			}
		}
		
		function cartFun(){
			var addCartObj = $(".addCartBtn");
			var addCartBtn = new Hammer(addCartObj[0]);
			var buyBtnObj = $(".buyBtn");
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
		function fastDocument(){
			var parObj = $(".fastDoumentJump");
			
			parObj.find("a").each(function(){
				var h = new Hammer(this);
				var checkObj = $("." + $(this).data("id"));
				
				h.on('tap',function(e){
					var obj = $(e.target);
					var id = "." + obj.data("id");
					var targetObj = $(id);
					var topNum = 0;
					
					if(targetObj.length != 1){
						return;
					}
					topNum = targetObj.offset().top - 100;
					$('body,html').animate({ scrollTop: topNum }, 500);
				});
				
				if(checkObj.length <= 0){
					$(this).remove();
				}
			});
			
		}
		
		function opations(){
			var parObj = $(".productNavFrame .opations");
			var id = "";
			var feStr = $("#currencySymbolCode").html();
			
			if(parObj.find(".list a").length <= 0){
				return;
			}
			
			parObj.find(".list a").each(function(){
				var obj = $(this);
				var h = new Hammer(obj[0]);
				
				h.on("tap",function(e){
					var tarObj = $(e.target);
					doFun(tarObj);
				});
				
			});
			
			doFun(parObj.find(".list a").eq(0));
			
			function doFun(tarObj){
				var fix = tarObj.data("fix");
				var price = tarObj.data("price");
				var priceObj = $(".productNavFrame .price p");
				var nowPrice = 0;
				var newPrice = 0;
				var sNum = 0;
				var tempPriceArr = $(".productNavFrame .price").data('baseprice').split(feStr);
				var ova = tarObj.data("ova");
				var oid = tarObj.data("oid");
				
				for(var i=0;i<tempPriceArr.length;i++){
					if(tempPriceArr[i] != ""){
						nowPrice = tempPriceArr[i];
						sNum = i;
					}
				}
				
				parObj.find(".list a").removeClass("select");
				tarObj.addClass("select");
				parObj.find(".title").removeClass("error");
				newPrice = eval(nowPrice*100 + fix + price*100)/100;
				console.log(nowPrice + price)
				
				if(sNum == 0){
					newPrice = newPrice + feStr;
				}else{
					newPrice = feStr + newPrice;
				}
				priceObj.html(newPrice);
				$(".nowProductPrice .price").html(newPrice);
				$(".frequentlyFrame .totMoney").html(newPrice);
				$(".nowProductPrice .rpb").attr("data-ova",ova);
				$(".nowProductPrice .rpb").attr("data-oid",oid);
			}
		}
		
		function opationsCheck(){
			var parObj = $(".productNavFrame .opations");
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
				parObj.find(".title").addClass("error");
				result = false;
			}
			
			return result;
		}
		
		function qty(){
			var ipnutObj = $(".productQty");
			var min = parseInt(ipnutObj.data("min"));
			var max = parseInt(ipnutObj.data("max"));
			var value = ipnutObj.val();
			
			if(min < 1){
				min = 1;
			}
			
			ipnutObj.on('change',function(){
				doFun();
			});
			
			ipnutObj.on('keyup',function(){
				doFun();
			});
			
			function doFun(){
				value = parseInt(ipnutObj.val());
				if(value < min || isNaN(value) == true){
					ipnutObj.val(min);
				}
				if(value > max && max > 0){
					ipnutObj.val(max);
				}
			}
			
		}
		
		function frequently(){
			var myScroll;
			var totNum = $("#frequentlyCon li").length;
			var feStr = $("#currencySymbolCode").html();
			
			if(totNum <= 0){
				$(".frequentlyFrame").parent().append('<hr></hr>');
				$(".frequentlyFrame").remove();
				return;
			}
			var buyBtn = Hammer($("#frequentlyBuy")[0]);
			
			$(".frequentlyFrame .totMoney").html("0");
			
			buyBtn.on('tap',function(e){
				var data = {};
				data.products = [];
				
				$("#frequentlyCon .rpb").each(function(){
					var obj = $(this);
					var ifCheck = obj[0].checked;
					if(ifCheck){
						var pid = obj.data("id");
						var oid = obj.data("oid");
						var ova = obj.data("ova");
						
						if(oid == undefined){
							oid = "";
						}
						
						if(ova == undefined){
							ova = "";
						}
						
						data.products.push(
							{
								"pid":pid,
								"oid":oid,
								"ova":ova
							}
						);
					}
				});
				
				if(data.products.length <= 1){
					return;
				}
				
				$.cart({type:"addProducts",data:data,fun:function(){
					S_PATH.jumpUrl(webPath + 'index.php?route=checkout/cart');
				}});
			});
			
			$("#frequentlyCon li").eq(totNum-1).find(".icon").remove();
			$("#frequentlyCon ul").css({width:(totNum*184)});
			myScroll = new IScroll("#frequentlyCon", {
				zoom: false,
				scrollX: true,
				scrollY: false,
				hScroll: true,
				vScroll: false,
				scrollbars: 'custom',
				mouseWheel: true,
				wheelAction: 'scroll',
			});
			
			$("#frequentlyCon .rpb").on('change',function(){
				var obj = $(this);
				var ifCheck = obj[0].checked;
				
				mathResult()
			});
			
			$(".frequentlyFrame .pTitle").each(function(){
				S_PATH.nameformat({
					obj:$(this),
					str:$(this).html(),
					leg:30
				});
			});
			
			mathResult();
			
			function mathResult(){
				var resultObj = $(".frequentlyFrame .totMoney");
				var numObj = $(".frequentlyFrame .totNum");
				var listObj = $("#frequentlyCon");
				var result = 0;
				var totNum = 0;
				var sNum = 0;
				
				listObj.find(".rpb").each(function(index){
					var priceNum = S_PATH.trim($(this).parent().parent().find(".price").html());
					var ifSelect = $(this)[0].checked;
					var tempPriceArr = priceNum.split(feStr);
					
					for(var i=0;i<tempPriceArr.length;i++){
						if(tempPriceArr[i] != ""){
							priceNum = tempPriceArr[i];
							sNum = i;
						}
					}
					priceNum = Number(priceNum)*100;
					
					if(ifSelect){
						totNum = totNum + 1;
						result = result + priceNum;
					}
				});
				
				result = Math.floor(result);
				
				if(sNum == 0){
					result = result/100 + feStr;
				}else{
					result = feStr+result/100;
				}
				
				resultObj.html(result);
				numObj.html(totNum);
			}
		}
		
		function thumb(){
			var parObj = $(".thumbFrame");
			var lBtn = new Hammer($(".thumbNav .l")[0]);
			var rBtn = new Hammer($(".thumbNav .r")[0]);
			var listObj = $(".thumbList ul");
			var pageNum = 0;
			var maxNum = Math.ceil($(".thumbList li").length/5);
			var showBigBtn = new Hammer($(".thumbShow")[0]);
			
			showBigBtn.on('tap',function(e){
				S_PATH.imgBigShow($(".thumbShow"));
			});
			
			selectFun($(".thumbList li img").eq(0));
			
			parObj.find("li").each(function(){
				var obj = $(this);
				var h = new Hammer(obj[0]);
				
				h.on('tap',function(e){
					var tapObj = $(e.target);
					var type = tapObj[0].localName;
					
					if(type == "img"){
						selectFun(tapObj);
					}
				});
			});
			
			lBtn.on('tap',function(e){
				pageNum = pageNum - 1;
				
				if(pageNum < 0){
					pageNum = 0;
				}
				listObj.animate({left:-pageNum*420});
			});
			
			rBtn.on('tap',function(e){
				pageNum = pageNum + 1;
				
				if(pageNum >= maxNum){
					pageNum = (maxNum - 1);
				}
				
				listObj.animate({left:-(pageNum*420+15)});
			});
			
			function selectFun(selectObj){
				var showObj = $(".thumbShow");
				var wNum = showObj.width();
				var hNum = showObj.height();
				var imgUrl = selectObj.data("img");
				var sourceImg = selectObj.data("sourceimage");
				var imgAlt = selectObj.attr("alt");
				var imgTit = selectObj.attr("title");
				var videoUrl = selectObj.data("video");
				var num = selectObj.parent().parent().index();
				var videoHtml =  ''
				+'<video id="productThumb" poster="'+ imgUrl +'" loop="true" autoplay="true" width="'+ wNum +'" height="'+ hNum +'" controls="controls">'
				+'	 <source src="'+ videoUrl +'" type="video/mp4" />'
				+'</video>';
				var imgHtml = ''
				+'<img data-sourceimage="'+ sourceImg +'" alt="'+ imgAlt +'" title="'+ imgTit +'" src="'+ imgUrl +'">';
				
				if(videoUrl != "" && videoUrl != undefined){
					showObj.html(videoHtml);
				}else{
					showObj.html(imgHtml);
				}
						
				$(".thumbList li").removeClass("select");
				selectObj.parent().parent().addClass("select");
			}
		}
	};
	
	var _prductlist = function(){
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
			
			_video(obj.find(".img img"),index);
		});
		
		new pbl({
			parObj:$(".productList .fullmode"),
			totPage:2,
			loadurl:pblUrl,
			fun:function(){
				
			}
		});
	};
	
	var _shopping = function(){
		changeProductNum();
		
		$(".delectPrd").each(function(index){
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
		
		$(".cartFrame .list li .c .options").each(function(){
			S_PATH.nameformat({
				obj:$(this),
				str:$(this).html(),
				leg:180
			});
		});
		
		function changeProductNum(){
			var parObj = $(".cartFrame .list");
			
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
	
	var _bloglist = function(type){
		var parObj = $("#blog_lists");
		var lieNum = 4;
		var lieWNum = 18;
		var heightArr = [0,0,0,0];
		var tempCon = $("#blogTemp");
		var lBottomNum = 800;
		var nowPage = 1;
		var ifLoad = false;
		var navParObj = $(".pc");
		
		if(type == "mobile"){
			parObj = $("#mobile_blog_lists");
			lieNum = 2;
			lieWNum = "1%";
		}
		
		init();
		
		function init(){
			var htmlStr = '';
			var w = (parObj.width() - (lieNum - 1)*lieWNum)/lieNum + "px";
			var r = lieWNum + "px";
			var nowUrl = location.href;
			var ifTag = nowUrl.indexOf("tag");
			
			if(ifTag > 0){
				changeNav(1);
			}else{
				changeNav(0);
			}
			
			if(type == "mobile"){
				w = "48.5%";
				r = "3%";
				navParObj = $(".mobile");
			}
			
			navParObj.find(".blogNavClass a").each(function(){
				var obj = $(this);
				var h = new Hammer(obj[0]);
				
				h.on('tap',function(e){
					var obj = $(e.target);
					var type = obj.data("id");
					
					if(type == "tagTeam"){
						changeNav(1);
					}else{
						changeNav(0);
					}
				});
			});
			
			for(var i=0;i<lieNum;i++){
				if(i%lieNum == (lieNum - 1)){
					r = 0;
				}
				htmlStr = htmlStr
				+'<div id="pbl_'+i+'" class="pbllie" style="float:left;width:'+ w +';margin-right:'+ r +'"></div>';
			}
			parObj.html(htmlStr).ready(function(){
				add();
				listen();
			});
		}
		
		function changeNav(num){
			var obj = $(".blogNavClass a").eq(num);
			var type = obj.data("id");
			var nowUrl = location.href;
			var tagName = nowUrl.split("tag=")[1];
			
			navParObj.find(".blogNavClass a").removeClass();
			obj.addClass("select");
			navParObj.find(".blogNav").hide();
			$("."+type).show();
			
			if(tagName != undefined && $(".tagTeam").find(".c0select").length <= 0){
				tagName = decodeURI(tagName);
				$(".tagTeam").prepend('<a class="c0select" href="javascript:;" class="tag">'+ tagName +'</a>');
			}
		}
		
		function listen(){
			$(window).scroll(function(e) {
				var loadNum = $("body").height() - $(window).height() - lBottomNum;
				var scrollTopNum = $(window).scrollTop();
				
				if(scrollTopNum > loadNum){
					if(!ifLoad){
						ifLoad = true;
						nowPage = nowPage + 1;
						loadList(nowPage);
					}
				}
			});
		}
		
		function loadList(page){
			$.ajax({
                url: location.href,
                type: 'get',
                dataType: 'html',
                data: { ajax_request: 1, page: page },
                beforeSend: function() {
                    $('#load-more').button('loading');
                },
                complete: function() {
                    $('#load-more').button('reset');
                },
                success: function(data) {
                    if(data == ""){
                    	return;
                    }
                    
                    tempCon.html(data).ready(function(){
                    	ifLoad = false;
                    	add();
                    });
                }
            });
		}
		
		function add(){
			var dataObj = tempCon.find(".post");
			var html = "";
			var lieObj;
			if(dataObj.length <= 0){
				return;
			}else{
				lieObj = checkShort();
				dataObj = dataObj.eq(0);
				html = dataObj.prop("outerHTML");
				
				lieObj.append(html).ready(function(){
					dataObj.remove();
					add();
				});
			}
		}
		
		function checkShort(){
			var result = parObj.find(".pbllie").eq(0);
			var minNum = parObj.find(".pbllie").eq(0).height();
			parObj.find(".pbllie").each(function(i){
				var obj = $(this);
				var nowH = obj.height();
				
				if(nowH < minNum){
					result = obj;
					minNum = nowH;
				}
			});
			return result;
		}
	};
	
	function updataTotal(){
		$('.totleResult').load(webPath + 'index.php?route=checkout/cart .totleResult .con',function(){
			
		});
	}
	
	function recommend(){
		var parObj = $(".recommendFrame");
		if(parObj.length <= 0){
			return;
		}
		var onePageNum = 5;
		var leg = parObj.find(".list li").length;
		var listW = parObj.find(".list li").outerWidth(true)*leg;
		var nowPageNum = 0;
		var lBtn = new Hammer(parObj.find(".lBtn")[0]);
		var rBtn = new Hammer(parObj.find(".rBtn")[0]);
		var totPage = Math.ceil(leg/onePageNum);
		var moveNum = 889;
		
		parObj.find("ul").css({width:listW});
		
		parObj.find(".page").html("1/" + totPage);
		
		lBtn.on('tap',function(e){
			nowPageNum = nowPageNum - 1;
			if(nowPageNum < 0){
				nowPageNum = 0;
			}
			
			parObj.find("ul").animate({marginLeft:-moveNum*nowPageNum});
			parObj.find(".page").html((nowPageNum+1) + "/" + totPage);
		});
		
		rBtn.on('tap',function(e){
			nowPageNum = nowPageNum + 1;
			if(nowPageNum >= totPage){
				nowPageNum = totPage - 1;
			}
			
			parObj.find("ul").animate({marginLeft:-moveNum*nowPageNum});
			parObj.find(".page").html((nowPageNum+1) + "/" + totPage);
		});
		
		$(".recommendFrame .title a").each(function(){
			S_PATH.nameformat({
				obj:$(this),
				str:$(this).html(),
				leg:30
			});
		});
	}
	
	$.pc = function(options) {
		var type = options.type;
		var page = options.page;
		var obj = options.obj;
		var fun = options.fun;
		var blogConId = options.blogConId;
		
		if(typeof(fun) != 'function'){
			fun = function(){};
		}
		
		switch (type) {
			case 'init':
				_checkViewMode(page);
				break;
			case 'shoppingUpdataTotal':
				updataTotal();
				break;
			case 'bloglists':
				_bloglist("mobile");
				break;
			case 'video':
				_video(obj);
				break;
		}
	};
})(window, jQuery);
