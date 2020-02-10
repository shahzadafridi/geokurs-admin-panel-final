(function(window,document){
	var delayNum = 3000;
	var speed = 500;
	
	var create = function(options){
		var parObj = options.obj;
		var endfun = options.endfun;
		var outputObj = options.outputObj;
		var endTime = parObj.data("djs");
		var ST = S_PATH.getSt();
		var totTime = -1;
		var oneHart = 1000;
		var timer;
		
		if(typeof(endfun) != 'function'){
			endfun = function(){};
		}
		
		if(parObj.length <= 0 || endTime == undefined || endTime == ""){
			return;
		}
		
		if(outputObj == undefined){
			outputObj = "off";
		}
		
		//解决IOS Safari 的兼容性问题
		endTime = iosFormat(endTime);
		
		if(endTime == false){
			return;
		}
		
		endTime = endTime.getTime();
		
		totTime = (endTime - ST)/1000;
		totTime = Math.ceil(totTime);
		timer = self.setInterval(boom,oneHart);
		
		function boom(){
			totTime = totTime - 1;
			
			if(totTime > 0){
				nowTime(totTime,parObj,outputObj);
			}else{
				endfun();
			}
		}
	};
	
	function iosFormat(str){
		var result = "";
		var arr = str.split("-");
		var y = arr[0];
		var m = parseInt(arr[1]) - 1;
		var arr2 = arr[2].split(" ");
		var d = arr2[0];
		
		if(parseInt(y) == 0){
			return false;
		}
		
		if(arr2.length == 1){
			result = new Date(y,m,d);
			return result;
		}
		
		var arr3 = arr2[1].split(":");
		var h = arr3[0];
		var mm = arr3[1];
		var s = arr3[2];
		
		result = new Date(y,m,d,h,mm,s);
		return result;
	}
	
	function nowTime(totleTime,obj,outputObj){
		var h = Math.floor(totleTime / 3600);
		var m = Math.floor((totleTime - h*3600)/60);
		var s = totleTime % 60;
		var d = Math.floor(h/24);
		var tStr = '<div class="text">Ends in ' + h + ":" + m + ":" + s + '</div>';
		var htmlStr = ''
		+'<b class="djs">'
		+	tStr
		+'	<div class="bg"></div>'
		+'</b>';
		
		if(outputObj == "off"){
			if(obj.find(".img a .djs").length > 0){
				obj.find(".img a .djs .text").html(tStr);
			}else{
				obj.find(".img a").append(htmlStr);
			}
		}else{
			outputObj.html(h + ":" + m + ":" + s);
		}
	}
	
	function djs(options){
		this._init(options);
	}
	
	djs.prototype = {
		_init:function(options){
			create(options);
		}
	};
	
	window.djs = djs;
})(window, document);
