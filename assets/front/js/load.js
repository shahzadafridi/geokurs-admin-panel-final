var cthickness = "option[131]";
var slayer = "option[134]";
var scopy = "option[129]";
var shickness = "option[128]";
var quantity = "option[124]";

//quantity
function hideallquantity(arr) {
	$("select[name='" + quantity + "']").children().each(function() {
		var name = $(this).val();

		if (name != 780) {
			$(this).hide();
		}

		if (arr != undefined || arr != null) {
			name = Number(name);
			if ($.inArray(name, arr) >= 0) {
				$(this).show();
			}
		}

	});

	var sed = $("select[name='" + quantity + "']").find("option:selected");

	if (sed.val() != 780) {
		var one = $("select[name='" + quantity + "'] option:eq(0)");
		one.attr("selected", true);
		total(one);
	}
}

function removeAllSpace(str) {
	return str.replace(/\s+/g, "");
}

function shicknessHideAndShow(hors) {

	var dim = $("select[name='" + cthickness + "']").find("option:selected").text();
	dim = removeAllSpace(dim);

	//20z 小于1.6mm 隐藏
	if (dim.indexOf("2oz") == -1) {
		var first = $("select[name='" + shickness + "'] option:eq(0)");
		var second = $("select[name='" + shickness + "'] option:eq(1)");
		var selected = $("select[name='" + shickness + "']").find("option:selected").text();
		selected = removeAllSpace(selected);

		if (hors == "hide") {
			first.hide();
			if (selected == "0.6MM(+$8.00)") { //选0.6是改变默认值
				second.attr("selected", true);
				total(second);
			}
		} else if (hors == "show") {
			first.show();
			//                    total(first);
		}
	}
}

function cthicknessHideAndShow(hors) {
	$("select[name='" + shickness + "']").children().each(function() {
		var copy = $(this).text();
		if (copy.indexOf('1.6') == -1) {
			if (hors == "show") {
				$(this).show();
			} else {
				$(this).hide();
			}
		} else {
			$(this).attr("selected", true);
			total($(this));
		}

	});
}

function scopyHideAndShow(hors) {
	$("select[name='" + scopy + "']").children().each(function() {
		var copy = $(this).text();
		if (copy.indexOf('1') >= 0) {
			if (hors == "hide") {
				$(this).hide();
			} else {
				$(this).show();
			}
		}
	});
}

function total(tt) {
	var selected = tt.text();
	var price = tt.attr("data-price");
	var id = tt.attr("data-id");
	$("#total-price-" + id).html(price);
	$("#laber-" + id).html(selected);
	Result();
}

function Result() {
	$.ajax({
		url: 'index.php?route=product/pcb/total',
		type: 'post',
		data: $('#product_id,select.PcbAttrib'),
		success: function(json) {
			//alert(json);
			$("#total-price").html(json);
		}
	});
}

function pcbInit(){
	
	$("select").each(function(i, item) {
		$("select[name='" + item.name + "'] option:eq(0)").attr("selected", true);
	});

	//默认
	var dim = $("select[name='" + slayer + "']").find("option:selected").text();
	dim = removeAllSpace(dim);

	//大于 5x5 10×10 隐藏 2，3copy
	if (dim.indexOf("5cmx5cm") >= 0 || dim.indexOf("10cmx10cm") >= 0) {
		scopyHideAndShow("show");
	} else {
		scopyHideAndShow("hide");
	}

	//4layer 没有选择0.6mm
	if (dim.indexOf("2LayerPCB") != 0) {
		shicknessHideAndShow("hide");
	}

	//quantity
	if (dim.indexOf("5cmx5cm") >= 0) {
		var arr = [836, 837, 838];
		hideallquantity(arr);
	}

	//20z 小于1.6mm 隐藏
	var dim = $("select[name='" + cthickness + "']").find("option:selected").text();
	dim = removeAllSpace(dim);
	if (dim.indexOf("2oz") >= 0) {
		cthicknessHideAndShow("hide");
	}

	$("select[name='" + shickness + "'] option:eq(2)").attr("selected", true);
	total($("select[name='" + shickness + "'] option:eq(2)"));

	//动态选择
	$("select[name='" + slayer + "']").change(function(e) {
		var dim = $(this).find("option:selected").text();
		dim = removeAllSpace(dim);
		
		//大于 5x5 10×10 隐藏 2，3copy
		if (dim.indexOf("5cmx5cm") >= 0 || dim.indexOf("10cmx10cm") >= 0) {
			scopyHideAndShow("show");
		} else {
			scopyHideAndShow("hide");
		}

		//4layer 没有选择0.6mm
		if (dim.indexOf("2LayerPCB") >= 0) {
			shicknessHideAndShow("show");

			//quantity
			if (dim.indexOf("5cmx5cm") >= 0) {
				var arr = [836, 837, 838];
				hideallquantity(arr);
			} else if (dim.indexOf("10cmx10cm") >= 0) {
				var arr = [782, 779, 781];
				hideallquantity(arr);
			} else if (dim.indexOf("10cmx15cm") >= 0) {
				var arr = [839, 840, 841];
				hideallquantity(arr);
			} else {
				hideallquantity();
			}

		} else {
			shicknessHideAndShow("hide");
		}

		//quantity
		if (dim.indexOf("4LayerPCB") >= 0) {
			if (dim.indexOf("5cmx5cm") >= 0) {
				var arr = [842, 843, 844];
				hideallquantity(arr);
			} else {
				hideallquantity();
			}
		}

	});

	$("select[name='" + cthickness + "']").change(function(e) {

		var dim = $(this).find("option:selected").text();
		dim = removeAllSpace(dim);

		//20z 小于1.6mm 隐藏
		if (dim.indexOf("2oz") >= 0) {
			cthicknessHideAndShow("hide");
		} else {
			cthicknessHideAndShow("show");
		}

	});
	
	
	
	$('.button-cart').bind('click', function() {
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: $('#product_id,select.PcbAttrib'),
			dataType: 'json',
			success: function(json) {
				$('.success, .warning, .attention, .error').remove();
	
				if (json['error']) {
					if (json['error']['option']) {
						for (i in json['error']['option']) {
							$('#option-' + i).after('<span class="error">' + json['error']['option'][i] + '</span>');
						}
					}
	
					if (json['error']['profile']) {
						$('select[name="profile_id"]').after('<span class="error">' + json['error']['profile'] + '</span>');
					}
				}
	
				if (json['success']) {
					$('.cartListFrame').load(webPath + 'index.php?route=common/cart/info .cartList',function(){
						$.cart({type:"refresh"});
					});
				}
			}
		});
	});
	
	$(".form-group select").change(function(e) {
		var id = $(this).find("option:selected").attr("data-id");
	
		var selected = $(this).find("option:selected").text();
		var price = $(this).find("option:selected").attr("data-price");
		$("#total-price-" + id).html(price);
		$("#laber-" + id).html(selected);
		
		Result();
	});
}

