(function (window, $) {
	"use strict";
	var debug = false;
	var showLogoNameNum = 706;
	var device = S_PATH.getWType();
	
	var _init = function(){
		var topNum = 0;
		var ifHaveListner = false;
		var ifHaveBodyCategory = false;
		var oldST = -1;
		var sd = "";
		
		$(document).ready(function(){
			
			_setLoginBack();
			showWaring();
			
			// $('body,html').animate({ scrollTop: 0 }, 500);
			
			if($(".bodyFrame .categoryFrame").length > 0){
				ifHaveBodyCategory = true;
				$(".headFrame .arrow").hide();
			}else{
				ifHaveBodyCategory = false;
			}
			
			if(!ifHaveBodyCategory){
				$(".headFrame .logo").on('mouseenter',function(){
					_showPCNav();
				});
			}
			
			
			
			$(window).scroll(function(e) {
				var navPo = $(".headFrame .pc").css("position");
				var ifShow = $(".headFrame .pc").data("show");
				topNum = $(window).scrollTop();
				
				if(topNum > oldST){
					sd = "down";
				}else{
					sd = "up";
				}
				
				oldST = topNum;

                if(topNum > 0){
                    switch(sd){
                        case "down":
                            if(navPo != "fixed"){
                                $(".headFrame .pc").css({
                                    position:"fixed",
                                    opacity:0,
                                    transition: "height 0.5s",
                                });
                            }
                            if(ifShow != "on"){
                                $(".headFrame .pc").stop(true);
                                $(".headFrame .pc").addClass("small").css({
                                    transition: "height 0.3s",
                                    opacity: 1
                                });
                                $(".headFrame .pc").data("show","on");
                                $("#message").hide();
                            }
                            break;
                        case "up":

                            break;
                    }


                    if(ifHaveBodyCategory){
                        if(!ifHaveListner){
                            ifHaveListner = true;
                            $(".headFrame .logo").on('mouseenter',function(){
                                _showPCNav();
                            });
                        }
                        $(".headFrame .arrow").show();
                    }

                }else{
                    ifHaveListner = false;
                    if(ifHaveBodyCategory){
                        $(".headFrame .logo").off();
                        $(".headFrame .arrow").hide();
                    }

                    if(navPo == "fixed" && ifShow == "on"){
                        $(".headFrame .pc").data("show","off");
                        $(".headFrame .pc").stop(true);
                        $(".headFrame .pc").removeClass("small").css({
                            transition: "height 0.3s",
                            opacity: 1,
                            position: "static"
                        });
                        if(S_PATH.getWType() == "pc"){
                            $("#message").show();
                        }
                    }
                }
			});
		});

		function showWaring(){
			var str = $(".waring").data("str");
			
			if(str != undefined && str != ""){
				S_PATH.tips(str);
			}
		};
	};
	
	var _setLoginBack = function(){
		var tabName = "DFRobotBackUrl";
		var loginBtnObj = $(".headFrame .pc .loginInfo");
		var ifLogin = loginBtnObj.data("login");
		var nowUrl = window.location.href;
		var ifBackJump = localStorage.getItem(tabName);
		
		$(".savebackurl").each(function(){
			var lh = new Hammer($(this)[0]);
			
			lh.on('tap',function(e){
				var obj = $(e.target);
				
				if(!obj.hasClass("savebackurl")){
					obj = obj.parent();
				}
				
				var newUrl = obj.data("url");
				var jUrl = obj.data("jumpurl");
				
				if(newUrl != undefined && newUrl != ""){
					nowUrl = newUrl;
				}
				
				if(ifLogin == false){
					localStorage.setItem(tabName,nowUrl);
					if(jUrl != undefined && jUrl != ""){
						S_PATH.jumpUrl(jUrl);
					}
				}else{
					if(newUrl != undefined && newUrl != ""){
						S_PATH.jumpUrl(newUrl);
					}
				}
			});
		});
		
		if(ifLogin == true){
			if(ifBackJump != null){
				localStorage.removeItem(tabName);
				S_PATH.jumpUrl(ifBackJump);
			}else{
				var pageName = $(".bodyFrame").data("page");
				if(pageName == "login"){
					S_PATH.jumpUrl(webPath);
				}
			}
		}
	};
	
	var mobileNav = function(){
		var nbh = new Hammer($(".headFrame .navBtn")[0]);
		var nObj = $(".headFrame .mobile .navFrame");
		var closeBtn = new Hammer($(".headFrame .mobile .navFrame .closeBtn")[0]);
		var searchInput = $(".headFrame .mobile .navFrame .searchInput");
		var searchUrl = webPath + 'index.php?route=product/search&search=|key|&description=true';
		var miniCartObj = $(".mobile .visible-xs .cartBtn");
		var miniCartH = new Hammer(miniCartObj[0]);
		var ifMenuOpen = false;
		var hNum = S_PATH.getBH() + 200;
		var sfHNum = S_PATH.getBH() - parseInt(nObj.find(".login").outerHeight(true)) - parseInt(nObj.find(".search").outerHeight(true));
		var id = ".headFrame .navFrame .sf";
		var myScroll;
		
		$("#message").hide();
		
		//解决ios fixed BUG
		document.addEventListener('touchmove', function(e){ 
			if(ifMenuOpen){
				e.preventDefault();
			}
		});
		
		nbh.on('tap',function(e){
			open();
			ifMenuOpen = true;
		});
		
		closeBtn.on('tap',function(e){
			nObj.hide();
			ifMenuOpen = false;
		});
		
		miniCartH.on('tap',function(e){
			var urls = webPath + 'index.php?route=checkout/cart';
			S_PATH.jumpUrl(urls);
		});
		
		$(window).on("keydown",function(e){
			var keyCode = e.keyCode;
			
			if(keyCode == 13){
				var value = searchInput.val();
				if(value != ""){
					searchUrl = searchUrl.replace("|key|",value);
					S_PATH.jumpUrl(searchUrl);
				}
			}
		});
		
		myScroll = new IScroll(id, {
			preventDefault:false,
			zoom: false,
			scrollX: false,
			scrollY: true,
			hScroll: true,
			vScroll: false,
			scrollbars: 'custom',
			mouseWheel: true,
			wheelAction: 'scroll',
		});
		
		setNavigate();
		currency();
		// loginFun();
		resize();
		
		function loginFun(){
			var ifLogin = $(".pc .loginInfo").data("login");
			var obj = $(".mobile .mobile_account");
			var h = new Hammer(obj[0]);
			
			if(ifLogin){
				var userName = $(".pc .loginBtns").html();
				
				$(".mobile .accountNav").show();
				$(".mobile .login_user").html(userName);
			}
			
			h.on("tap",function(){
				var t = obj.data("type");
				
				if(t == "off"){
					$(".mobile .account_sub").show();
					obj.data("type","on");
				}else{
					$(".mobile .account_sub").hide();
					obj.data("type","off");
				}
				resize();
			});
		};
		
		function currency(){
			var nowCur = $("#currencySymbol").html();
			var listHtml = $(".pc .dropdown-menu").html();
			
			$(".cur_sub").html(listHtml).ready(function(){
				var obj = $(".mobile_cur");
				var h = new Hammer(obj[0]);
				
				h.on("tap",function(){
					var t = obj.data("type");
					
					if(t == "off"){
						$(".cur_sub").show();
						obj.data("type","on");
					}else{
						$(".cur_sub").hide();
						obj.data("type","off");
					}
					resize();
				});
				
				$(".cur_sub li").each(function(index){
					var sObj = $(this);
					var sH = new Hammer(sObj[0]);
					
					sH.on("tap",function(e){
						var ssObj = $(e.target);
						var name = ssObj.attr("name");
						
						$("#form-currency2 .c_code").val(name);
						document.getElementById("form-currency2").submit();
					});
				});
			});
		}
		
		function resize(){
			var hNum = S_PATH.getBH() + 200;
			var sfHNum = S_PATH.getBH() - parseInt(nObj.find(".login").outerHeight(true)) - parseInt(nObj.find(".search").outerHeight(true));
			var id = ".headFrame .navFrame .sf";
			
			nObj.css({height:hNum});
			nObj.find(".sf").css({height:sfHNum});
			
			myScroll.refresh();
		}
		
		function open(){
			var sfHNum;
			var cBtn = nObj.find(".sf .category");
			var ch = new Hammer(cBtn[0]);
			
			nObj.show(100);
			sfHNum = S_PATH.getBH() - parseInt(nObj.find(".login").outerHeight(true)) - parseInt(nObj.find(".search").outerHeight(true));
			nObj.find(".sf").css({height:sfHNum});
			
			ch.on("tap",function(){
				var type = cBtn.attr("data-t");
				
				if(type == "on"){
					nObj.find(".sn").hide();
					cBtn.attr("data-t","off");
				}else{
					nObj.find(".sn").show();
					cBtn.attr("data-t","on");
				}
				resize();
			});
		}
		
		function setNavigate(){
			var listObj = $(".headFrame .pc .fastCategory .list");
			var nameArr = [];
			var urlArr = [];
			var htmlStr = "";
			var sfHNum = S_PATH.getBH() - parseInt(nObj.find(".login").outerHeight(true)) - parseInt(nObj.find(".search").outerHeight(true));
			
			listObj.find(".subNaveBtn").each(function(){
				var obj = $(this);
				var nowUrl = obj.attr("href");
				var nowName = obj.html();
				
				if(obj.find(".l").length > 0){
					nowName = obj.find(".l").html();
				}
				
				htmlStr = htmlStr
				+'<li><a href="'+ nowUrl +'">'+ nowName +'</a></li>';
			});
			
			nObj.find(".sn").html(htmlStr).ready(function(){
				resize();
			});
		}
	};
	
	var _showPCNav = function(){
		var parObj = $(".headFrame .pc .fastCategory");
		var maxNum = 7;//控制产品图最大数量
		
		parObj.css({"display":"block"});
		parObj.on('mouseleave',function(){
			hideNav();
		});
		
		$(".bodyFrame").on('mouseenter',function(){
			hideNav();
		});
		
		$(".headFrame .searchFrame").on('mouseenter',function(){
			hideNav();
		});
		
		$(".headFrame .right").on('mouseenter',function(){
			hideNav();
		});
		
		parObj.find(".childData").each(function(){
			var childObj = $(this);
			
			childObj.find(".rc li").each(function(index){
				var obj = $(this);
				var nameObj = obj.find(".name");
				var nameStr = nameObj.html();
				
				if(index > (maxNum - 1)){
					obj.remove();
				}else{
					S_PATH.nameformat({obj:nameObj,str:nameStr,leg:20});
				}
			});
		});
		
		parObj.find(".list .subNaveBtn").on('mouseenter',function(){
			var obj = $(this).parent();
			var childObj = obj.find(".childData");
			var hNum = parseInt(parObj.height()) + 10;
			var childLeg = childObj.find(".rc li").length;
			
			parObj.find(".list .subNaveBtn").removeClass("hideBorder");
			obj.prev().find(".subNaveBtn").addClass("hideBorder");
			$(obj.find("a")[0]).addClass("hideBorder");
			
			parObj.find(".list li").removeClass("select");
			obj.addClass("select");
			parObj.find(".childData").hide();
			childObj.show();
			childObj.css({height:hNum});
			if(childLeg % 2 == 1){
				childObj.find(".rc li").eq(childLeg - 1).addClass("oddLast");
			}
		});
		
		function hideNav(){
			parObj.css({"display":"none"});
			parObj.off();
			parObj.find(".list .subNaveBtn").off();
			parObj.find(".list li").removeClass("select");
			parObj.find(".childData").hide();
			parObj.find(".rc li").removeClass("oddLast");
			parObj.find(".a").removeClass("hideBorder");
		}
	};
	
	$.head = function(options) {
		var type = options.type;
		var obj = options.obj;
		var fun = options.fun;
		
		if(typeof(fun) != 'function'){
			fun = function(){};
		}
		
		switch (type) {
			case 'init':
				_init();
				break;
			case 'mobileInit':
				mobileNav();
				break;
			case 'loginback':
				_setLoginBack();
				break;
		}
	};
})(window, jQuery);
$.head({type:"init"});
