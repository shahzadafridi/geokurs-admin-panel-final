(function(window,document){
	var delayNum = 5000;
	var speed = 500;
	var resizeBeginNum = -1;
	var resizeDelayNum = 2;
	var ifAddListener = false;
	var timer;
	
	var create = function(id,toId){
		var parObj = $(id);
		var toObj = $(toId);
		var adHtml = "";
		var pointHtml = "";
		var htmlStr = "";
		
		if(parObj.length <= 0){
			return;
		}
		
		parObj.find("li").each(function(index){
			var obj = $(this);
			var nowUrl = obj.data("url");
			var nowImg = obj.data("img");
			var nowTit = obj.data("title");
			var nowVideo = obj.data("video");
			
			if(nowUrl == ""){
				nowUrl = "javascript:;";
			}
			adHtml = adHtml
			+'<li data-video="'+ nowVideo +'">'
			+'	<a href="'+ nowUrl +'"><img width="100%" src="'+ nowImg +'" alt="'+ nowTit +'"/></a>'
			+'</li>';
			
			pointHtml = pointHtml
			+'<a data-index="'+ index +'" href="javascript:;">'+ index +'</a>';
		});
		
		htmlStr = ''
		+'<div class="btns">'
		+'	<a class="left" href="javascript:;"><i class="iconfont icon-leftarrow"></i></a>'
		+'	<a class="right" href="javascript:;"><i class="iconfont icon-rightarrow"></i></a>'
		+'</div>'
		+'<div class="points">'
		+'	<span>'+ pointHtml +'</span>'
		+'</div>'
		+'<div class="list">'
		+'	<ul>'+ adHtml +'</ul>'
		+'</div>';
		
		toObj.html(htmlStr).ready(function(){
			_site(toObj);
		});
		
		if(!ifAddListener){
			ifAddListener = true;
			$(window).resize(function(){
				var nowHartNum = S_PATH.getHartNum();
				
				resizeBeginNum = nowHartNum;
				
				S_PATH.addKeepRunFun("delayResizeBigEye",function(){
					var num = S_PATH.getHartNum();
					
					if(num >= (resizeBeginNum + resizeDelayNum)){
						clearInterval(timer);
						timer = null;
						
						$(toId).html("").ready(function(){
							create(id,toId);
						});
						resizeBeginNum = -1;
						S_PATH.removeKeepRunFun("delayResizeBigEye");
					}
				});
			});
		}
	};
	
	var _site = function(parObj){
		var totNum = parObj.find(".list li").length;
		var btnHNum = parObj.find(".btns .left i").height();
		var pointWNum = 0;
		var liWNum = parObj.find(".list").width();
		var sizeArr = parObj.attr("data-size").split("_");
		var parWNum = parObj.width();
		var parHNum = sizeArr[1] * parWNum/sizeArr[0];
		
		parObj.css({position:"relative",height:parHNum});		
		parObj.find(".list").css({position:"relative",height:parHNum,width:"100%",overflow:"hidden"});
		parObj.find(".list ul").css({position:"absolute",height:parHNum,width:totNum*liWNum});
		parObj.find(".list li").css({float:"left",height:parHNum,width:liWNum,position:"relative"});
		
		parObj.find(".btns").css({position:"absolute",zIndex:4,width:"100%"});
		parObj.find(".btns a").css({display:"block",position:"absolute"});
		parObj.find(".btns i").css({fontSize:"3rem"});
		parObj.find(".btns .left").css({top:(parHNum - btnHNum)/2,left:5,color:"#ee6b00",width:"auto"});
		parObj.find(".btns .right").css({top:(parHNum - btnHNum)/2,right:5,color:"#ee6b00",width:"auto"});
		
		parObj.find(".points").css({position:"absolute",zIndex:3,width:"100%",bottom:"1rem",textAlign:"center"});
		parObj.find(".points span").css({display: "block",margin:"0 auto"});
		parObj.find(".points a").css({width:"1rem",height:"1rem",float:"left",display: "block",borderRadius:"2rem",textIndent: "-3rem",overflow:"hidden",background:"#c9c9c9",margin:"0 0.3rem"});
		pointWNum = parObj.find(".points a").outerWidth(true);
		parObj.find(".points span").css({width: pointWNum*totNum});
		_movie(parObj,totNum,liWNum);
	};
	
	var _movie = function(parObj,totNum,liWNum){
		var movieObj = parObj.find(".list ul");
		var hLB = new Hammer(parObj.find(".btns .left")[0]);
		var hRB = new Hammer(parObj.find(".btns .right")[0]);
		var oneHart = 100;
		timer = self.setInterval(checkFun,oneHart);
		var delayHart = delayNum/oneHart;
		var nowHart = 0;
		var nextMovieNum = nowHart + delayHart;
		
		parObj.attr("data-num",0);
		m(0);
		
		hLB.on('tap',function(e){
			var nowNum = parseInt(parObj.attr("data-num"));
			
			nowNum = nowNum - 1;
			if(nowNum < 0){
				nowNum = 0;
			}
			parObj.attr("data-num",nowNum);
			nextMovieNum = nowHart + delayHart;
			m(nowNum);
		});
		
		hRB.on('tap',function(e){
			var nowNum = parseInt(parObj.attr("data-num"));
			
			nowNum = nowNum + 1;
			if(nowNum >= totNum){
				nowNum = (totNum - 1);
			}
			parObj.attr("data-num",nowNum);
			nextMovieNum = nowHart + delayHart;
			m(nowNum,"manual");
		});
		
		parObj.find(".points a").each(function(index){
			var obj = $(this);
			var h = new Hammer(obj[0]);
			
			h.on('tap',function(e){
				var dom = e.target;
				var num = $(dom).data("index");
				parObj.attr("data-num",num);
				m(num);
			});
		});
		
		function checkFun(){
			var nowNum = parseInt(parObj.attr("data-num"));
			
			endX = -nowNum * liWNum;
			nowHart = nowHart + 1;
			
			if(nowHart == nextMovieNum){
				nowNum = nowNum + 1;
				if(nowNum >= totNum){
					nowNum = 0;
				}
				nextMovieNum = nowHart + delayHart;
				parObj.attr("data-num",nowNum);
				m(nowNum);
			}
		}
		
		function m(num,type){
			var xNum = -num * parObj.width();
			
			parObj.find(".points span a").css({background:"#c9c9c9"});
			parObj.find(".points span a").eq(num).css({background:"#ee6b00"});
			movieObj.animate({marginLeft:xNum},function(){
				checkVideo(num);
			});
		}
		
		function checkVideo(num){
			var nowObj = parObj.find(".list li").eq(num);
			var video = nowObj.data("video");
			var htmlStr = nowObj.find("a").html();
			var hNum = nowObj.height();
			var wNum = nowObj.width();
			var img = nowObj.find("a img").attr("src");
			
			
			if(video != undefined && video != ""){
				htmlStr =  ''
				+'<video id="byvideo_'+ num +'" poster="'+ img +'" loop="true" autoplay="true" width="'+ wNum +'" height="'+ hNum +'" controls="controls">'
				+'	 <source src="'+ video +'" type="video/mp4" />'
				+'</video>';
				
				nowObj.find("a img").hide();
				nowObj.append(htmlStr).ready(function(){
					var video=document.getElementById('byvideo_'+ num);
					video.controls=false;
					video.play();
					nowObj.find("a").css({position:"absolute",left:"0",top:"0",zIndex:"2",display:"block",height:hNum,width:wNum});
					nowObj.find("video").css({position:"absolute",left:"0",top:"0",zIndex:"1"});
				});
				
				nowObj.data("video","");
			}
		}
	};
	
	function bigeye(id,toId){
		this._init(id,toId);
	}
	
	bigeye.prototype = {
		_init:function(id,toId){
			create(id,toId);
		}
	};
	
	window.bigeye = bigeye;
})(window, document);
