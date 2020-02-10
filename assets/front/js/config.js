var menu = null,main = null,showMenu = false;
var S_PATH = new serverPathFun();

//基础配置[心跳][退出软件][返回顶部]
function serverPathFun(){
	var oneHart = 100;
	var timer = self.setInterval(_hartOne,oneHart);
	var funNameArr = [];
	var funArr = [];
	var hartNum = 0;
	var st;
	
	try{
		st = parseInt(serverTime)*1000;
	}catch(e){
		st = new Date().getTime();
	}
	
	this.getBW = function(){
		var BWNum = $(window).width();
		return BWNum;
	};

	this.getBH = function(){
		var BHNum = $(window).height();
		return BHNum;
	};
	
	this.getWType = function(){
		var BWNum = $(window).width();
		var result = "";
		
		if(BWNum < 767){
			result = "mobile";
		}else{
			result = "pc"
		}
		return result;
	};

	this.jumpUrl = function(urlStr){
		document.location.href=urlStr;
	};

	this.trim = function(str){ //删除左右两端的空格
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};
	
	this.nameformat = function(options){
		var obj = options.obj;
		var str = options.str;
		var leg = options.leg;
		var result = "";
		
		if(obj.length <= 0 || str == undefined){
			return;
		}
		result = str.replace(/(^\s*)|(\s*$)/g, "");
		if(str.length > leg){
			result = result.slice(0,leg) + "……";
		}
		obj.html(result);
		return result;
	};
	
	//Loading插件
	this.loading = function(type,str){
		var htmlStr;
		
		if(str == undefined){
			str = "";
		}

		htmlStr = ''
		+'<div id="loadingFrame" style="height:' + S_PATH.getBH() + 'px">'
		+'	<div class="loading">'
		+'		<div class="title">Loading</div>'
		+'		<div class="spinner">'
		+'			<div class="rect1"></div>'
		+'			<div class="rect2"></div>'
		+'			<div class="rect3"></div>'
		+'			<div class="rect4"></div>'
		+'			<div class="rect5"></div>'
		+'		</div>'
		+'		<div class="loadInfo">'+ str +'</div>'
		+'	</div>'
		+'	<div class="maskBG" style="height:' + S_PATH.getBH() + 'px"></div>'
		+'</div>'

		switch(type){
			case "on":
				if($("#loadingFrame").length > 0){
					$("#loadingFrame .loadInfo").html(str);
				}else{
					$("body").prepend(htmlStr).ready(function(){
						$("#loadingFrame").css('opacity',0);
						$("#loadingFrame").animate({opacity:1});
					});
				}
				break;
			case "off":
				$("#loadingFrame").remove();
				break;
		}
	};
	
	//对话插件
	this.dialog = function(options){
		var title = options.title;
		var trueStr = options.trueStr;
		var falseStr = options.falseStr;
		var trueFun = options.trueFun;
		var falseFun = options.falseFun;
		var showClose = options.showClose;
		var htmlStr = ''
		+'<div id="dialogFrame">'
		+'	<div class="box">'
		+'		<div class="close"><i class="iconfont icon-quxiao"></i></div>'
		+'		<div class="text">' + title + '</div>'
		+'		<div class="btn">'
		+'			<a class="yes" href="javascript:;"><span></span>' + trueStr + '</a><a class="no" href="javascript:;"><span></span>' + falseStr + '</a>'
		+'		</div>'
		+'	</div>'
		+'	<div class="maskBG"></div>'
		+'</div>';
		
		if(typeof(trueFun) != "function"){
			trueFun = function(){};
		}
		
		if(typeof(falseFun) != "function"){
			falseFun = function(){};
		}
		
		$('body').prepend(htmlStr).ready(function(){
			var yesHammer = new Hammer($("#dialogFrame .yes")[0]);
			var noHammer = new Hammer($("#dialogFrame .no")[0]);
			var yesBtn = $("#dialogFrame .yes");
			var noBtn = $("#dialogFrame .no");
			
			if(trueStr == undefined){
				yesBtn.hide();
				noBtn.css({width:"100%",border:"none"});
			}
			
			if(falseStr == undefined){
				noBtn.hide();
				yesBtn.css({width:"100%",border:"none"});
			}
			
			if(showClose == true){
				var closeBtn = $("#dialogFrame .close");
				var closeHammer = new Hammer(closeBtn[0]);
				closeBtn.show();
				closeHammer.on("tap", function(ev) {
					close();
				});
				
				var maskHammer = new Hammer($("#dialogFrame .maskBG")[0]);
				
				maskHammer.on('tap',function(){
					close();
				});
			}
			
			yesHammer.on("tap", function(ev) {
				trueFun();
				close();
			});
			
			noHammer.on("tap", function(ev) {
				falseFun();
				close();
			});
			
			site();
			$(window).resize(function(){
				site();
			});
		});
		
		function close(){
			$("#dialogFrame").remove();
		}
		
		function site(){
			var maskObj = $("#dialogFrame .maskBG");
			var boxObj = $("#dialogFrame .box");
			var topNum = (S_PATH.getBH() - boxObj.height())/2;
			
			boxObj.css({top:topNum});
			maskObj.css({height:S_PATH.getBH()});
		}
		
	};
	
	//简单提示
	this.tips = function(str,type){
		var htmlStr = "";
		var icon = "info-circle";
		var nowType = S_PATH.getWType();
		
		if(str == "" || str == undefined){
			return;
		}
		
		if(type != undefined){
			icon = type;
		}
		
		htmlStr = ''
		+'<div id="tipsFrame" class="'+nowType+'_tips">'
		+'	<span class="icon"><i class="fa fa-'+ icon +'"></i></span>'
		+'	<span class="text">'+ str +'</span>'
		+'</div>';
		
		$("body").prepend(htmlStr).ready(function(){
			var tipWNum = $("#tipsFrame").outerWidth();
			var lNum = (tipWNum)/2;
			
			$("#tipsFrame").css({marginLeft:-lNum,opacity:1});
			$("#tipsFrame").delay(800).animate({opacity:0},500,function(){
				$("#tipsFrame").remove();
			});
		});
	};
	
	//照片放大
	this.imgBigShow = function(obj){
		var parObj = obj;
		var imgUrl = "";
		var videoUrl = "";
		
		if($(".thumbShow img").length > 0){
			img();
		}else{
			return;
		}
		
		function img(){
			var sorceImg = parObj.find("img").data("sourceimage");
			var html = "";
			
			if(sorceImg == "" || sorceImg == undefined){
				return;
			}
			html = '<img src="'+ sorceImg +'" alt="productphoto">'
			html = setHtml(html);
			
			$('body').append(html).ready(function(){
				listener();
			});
		}
		
		function listener(){
			var frameObj = $(".imgshowFrame");
			var conObj = frameObj.find(".imgCon");
			var maskObj = frameObj.find(".maskBG");
			var closeBtn = new Hammer(maskObj[0]);
			var contop = (S_PATH.getBH() - conObj.height())/2;
			
			frameObj.css({height:S_PATH.getBH()});
			maskObj.css({height:S_PATH.getBH()});
			conObj.css({top:contop});
			
			closeBtn.on("tap",function(e){
				frameObj.remove();
			});
		}
		
		function setHtml(str){
			var htmlStr = ''
			+'<div class="imgshowFrame">'
			+'	<div class="imgCon">'+ str +'</div>'
			+'	<div class="maskBG"></div>'
			+'</div>';
			
			return htmlStr;
		}
	};

	this.getHartNum = function(){
		return hartNum;
	};
	
	this.getSt = function(){
		return st;
	};
	
	this.addKeepRunFun = function(funName,fun){
		funNameArr.push(funName);
		funArr.push(fun);
	};

	this.removeKeepRunFun = function(funName){
		var num = getIndex(funName);
		
		funNameArr.splice(num,1);
		funArr.splice(num,1);
		function getIndex(funName){
			var backNum;
			for(var i=0;i<funNameArr.length;i++){
				if(funName == funNameArr[i]){
					backNum = i;
				}
			}
			return backNum;
		}
	};

	function _hartOne(){
		hartNum = hartNum + 1;
		st = st + oneHart;
		
		for(var i=0;i<funArr.length;i++){
			funArr[i]();
		}
	}
}