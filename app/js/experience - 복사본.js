(function($){// clickToggle
	$.fn.clickToggle = function(func1, func2){
		var funcs = [func1, func2];
		this.data('toggleclicked', 0);
		this.click(function(){
			var data = $(this).data();
			var tc = data.toggleclicked;
			$.proxy(funcs[tc], this)();
			data.toggleclicked = (tc + 1) % 2;
		});
		return this;
	};
}(jQuery));

$(function(){
	var Visual_count = 2;
	var VCount = Math.ceil( Math.random() * Visual_count );
	$(".visual_wrapper").slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: (VCount-1),
		arrows: false,
		dots: false,
		fade:true,
		speed:1000
	});
	/**
	* Scroll
	*/
	var Scroll_T = $(window).scrollTop();
	$(".bg_visual").css('top',parseInt(-Scroll_T / 3) + 'px');
	if((location.href.split("/")[3]).split("#")[0] == "main"){
		var pass_t = $(".pass_txt").offset().top;
		var ex_article = $(".ex_article").offset().top;
		var pass_app = $(".pass_app").offset().top;
		var Visual = $(".visual").height();
		var pass_info = Visual/2;
	}

	// chrome history back and scroll top move refresh bug.
	if((location.href.split("/")[3]).split("#")[1] != "ex_article"){
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'auto';
			if($(window).scrollTop() == 0){
				history.scrollRestoration = 'manual';
			}else{
				history.scrollRestoration = 'auto';
			}
		}
	}

	if($(window).scrollTop() > pass_info){
		$("#header").removeClass("beactive").addClass("active");
	}else{
		$("#header").removeClass("active").addClass("beactive");
	}
	if($(window).scrollTop() > pass_info && $(window).scrollTop() < pass_app){
		$(".pass_txt_visual").animate({
			bottom:"-3.7%"
		},1000);
		setTimeout(function(){
			$(".pass_txt_inner h3").stop().animate({
				top:0,
				opacity:1
			},600,'linear');
		},1000);
		setTimeout(function(){
			$(".pass_txt_inner .pass_txt01").stop().animate({
				top:0,
				opacity:1
			},600,'linear');
		},1600);
		setTimeout(function(){
			$(".pass_txt_inner .pass_txt02").stop().animate({
				top:0,
				opacity:1
			},600,'linear');
		},2200);
	}else{
		$(".pass_txt_visual").stop().animate({
			bottom:"-103.7%"
		},100);
		$(".pass_txt_inner h3").stop().animate({
			top:"25%",
			opacity:0
		},100);
		$(".pass_txt_inner .pass_txt01").stop().animate({
			top:"25%",
			opacity:0
		},100);
		$(".pass_txt_inner .pass_txt02").stop().animate({
			top:"25%",
			opacity:0
		},100);
		//$(".pass_txt_visual").removeClass("active").addClass("beactive");
		//$(".pass_txt_inner").removeClass("active").addClass("beactive");
	}
	
	$(window).scroll(function(){
		var Scroll_m = $(window).scrollTop();
		$(".bg_visual").css('top',parseInt(-Scroll_m / 3) + 'px');
		Scroll_ani(Scroll_m);
	});
	
	$(".gotop").click(function(){
		$("html,body").stop().animate({ scrollTop : 0 } , 800, "easeInOutQuart");
		//e.preventDefault();
	});
	
	$(".btn_goservice").click(function(){
		$("html,body").stop().animate({ scrollTop : ex_article } , 800, "easeInOutQuart");
		//e.preventDefault();
	});
	
	/**
	* 체험 slide
	*/
	$(".ex_wrapper").slick({
		draggable: false,
		swipeToSlide: false,
		touchMove: false,
		adaptiveHeight: true, /* 201223 추가 */
		swipe: false,
		arrows: true,
		dots: true,
		customPaging : function(slider, i) {
			var thumb = $(slider.$slides[i]).find("h4").text();
			if(thumb == "PASS 로그인"){
				thumb = "로그인";
			}
			return '<a>'+thumb+'</a>';
		}
	});
	$(".swiper-wrapper").slick({
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		dots: true,
		speed: 300
	});
	$(".btn_slide").each(function(){
		$(this).clickToggle(function(){
			$(this).addClass("play").prev(".swiper-wrapper").slick('slickPause');
		}, function(){
			$(this).removeClass("play").prev(".swiper-wrapper").slick('slickPlay');
		});
	});
	
	$(window).resize(function(){
		if((location.href.split("/")[3]).split("#")[0] == "main"){
			pass_t = $(".pass_txt").offset().top;
			ex_article = $(".ex_article").offset().top;
		}
		Scolling = true;

		BtnSlide();
		PlaceHolder();
		PassLoginImg();
	});
	
	/**
	/* 성별 radio Design
	*/
	$(".radio_ds input").each(function(){
		var $radio = $(this);
		if($radio.is(":checked")){
			$radio.parent("label").addClass("on");
		}else{
			$radio.parent("label").removeClass().addClass("radio");
		}
	});
	$(".radio_ds label").click(function(){
		var $RLabel = $(this);
		var Sex_val = $(this).children("input").attr("name");

		$("input[name=" + Sex_val + "]").parent("label").removeClass("on");
		$RLabel.addClass("on").css("outline","none");
	});
	$(".radio_ds input").focus(function(){
		$(this).parent("label").css("outline","1px dashed #1ab7ea");
	});
	$(".radio_ds input").focusout(function(){
		$(this).parent("label").css("outline","none");
	});
	if($(".radio_ds input").is(":checked")){
		$(this).parent("label").addClass("on");
	}else{
		$(this).parent("label").removeClass("on");
	}
	
	/**
	* Faq
	*/
	$(".faq_tab li").eq(0).children("a").addClass("on");
	$(".faq_box").show();
	$(".faq_tab a").on("click",function(){
		var idx = $(this).parent("li").index();
		$(".faq_tab a").removeClass("on");
		$(this).addClass("on");
		$(".faq_list a").parent("dt").removeClass("active").next().stop().slideUp(1);
		if(idx == 0){
			$(".faq_box").show();
		}else{
			$(".faq_box").hide();
			$(".faq_box").eq(idx-1).show();
		}
	});
	//$(".faq_list li").eq(0).find("dt").addClass("active").next("dd").slideDown();
	$(".faq_list a").on("click", function(){
		$(this).closest("div").siblings().find("dt").removeClass("active").next().stop().slideUp();
		$(this).closest("li").siblings().find("dt").removeClass("active").next().stop().slideUp();
		$(this).parent("dt").toggleClass("active").siblings("dd").slideToggle();
	});
	
	// Init
	setSelectBox();
	setCheckBox();
	BtnSlide();
	PlaceHolder();
	PassLoginImg();
	getOS();
});


/**
/* Web / Mobile check /App Downloas
*/
function getOS() {
	var userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		iosPlatforms = ['iPhone', 'iPad', 'iPod'];

	if (iosPlatforms.indexOf(platform) !== -1) {//iOS
		//alert("iOS");
		$(".app_skt").attr("href","https://itunes.apple.com/kr/app/pass-by-sk-telecom-%EA%B5%AC-t%EC%9D%B8%EC%A6%9D/id1141258007?mt=8");
		$(".app_kt").attr("href","https://itunes.apple.com/kr/app/pass-by-kt-%EA%B5%AC-kt-%EC%9D%B8%EC%A6%9D/id1134371550?mt=8");
		$(".app_lg").attr("href","https://itunes.apple.com/kr/app/pass-by-u-u-%EC%9D%B8%EC%A6%9D/id1147394645?mt=8");
	} else if (/Android/.test(userAgent)) {//Android
		//alert("Android");
		$(".app_skt").attr("href","https://play.google.com/store/apps/details?id=com.sktelecom.tauth");
		$(".app_kt").attr("href","https://play.google.com/store/apps/details?id=com.kt.ktauth");
		$(".app_lg").attr("href","https://play.google.com/store/apps/details?id=com.lguplus.smartotp");
	}
}

/**
* Btn Slide
*/
function BtnSlide(){
	$(".btn_slide").each(function(){
		var dot_W = $(this).prev(".swiper-wrapper").children(".slick-dots").width();
		if($(window).width() > 1080){
			$(this).css("margin-left",(dot_W/2)+20);
		}else{
			var W_w = $(window).width();
			var M_dot = (dot_W/2)+20;
			$(this).css("margin-left",(M_dot/W_w)*100+"%");
		}
	});
}
/**
* PlaceHolder
*/
function PlaceHolder(){
	if($(window).width() > 1080){
		$(".form_alliance input[type=text], .form_alliance textarea").removeAttr("placeholder");
	}else{
		$("#email").attr("placeholder","e-mail을 입력해주세요.");
		$("#title").attr("placeholder","제목을 입력해주세요.");
		$("#alliance").attr("placeholder","문의내용을 입력해주세요.");
	}
}
/**
* PASS Login img
*/
function PassLoginImg(){
	if($(window).width() > 1080){
		$(".ex_pass_login img").attr("src","/images/pass_login_web.png");
	}else{
		$(".ex_pass_login img").attr("src","/images/pass_login_mobile.png");
	}
}

/**
 * scroll function
 */
var Animate = false;
function Scroll_ani(val){
	var Visual = $(".visual").height();
	var pass_info = Visual/2;
	if((location.href.split("/")[3]).split("#")[0] == "main"){
		var pass_app = $(".pass_app").offset().top;
	}
	if(val > pass_info){
		$("#header").removeClass("beactive").addClass("active");
	}else{
		$("#header").removeClass("active").addClass("beactive");
	}

	if(val > pass_info && val < pass_app){
		//console.log(Animate);
		if(Animate == false){
			Animate = true;
			$(".pass_txt_visual").stop().animate({
				bottom:"-3.7%"
			},1000);
			setTimeout(function(){
				$(".pass_txt_inner h3").stop().animate({
					top:0,
					opacity:1
				},600,'linear');
			},1000);
			setTimeout(function(){
				$(".pass_txt_inner .pass_txt01").stop().animate({
					top:0,
					opacity:1
				},600,'linear');
			},1600);
			setTimeout(function(){
				$(".pass_txt_inner .pass_txt02").stop().animate({
					top:0,
					opacity:1
				},600,'linear');
			},2200);
		}
	}else{
		Animate = false;
		$(".pass_txt_visual").stop().animate({
			bottom:"-103.7%"
		},100);
		$(".pass_txt_inner h3").stop().animate({
			top:"25%",
			opacity:0
		},100);
		$(".pass_txt_inner .pass_txt01").stop().animate({
			top:"25%",
			opacity:0
		},100);
		$(".pass_txt_inner .pass_txt02").stop().animate({
			top:"25%",
			opacity:0
		},100);
	}
}

/**
/* Form design
 * setSelectBox = select
 * setCheckBox = checkbox
*/
function setSelectBox(){
	$("select").each(function(){
		var select = $(this);
		var selected_txt = $(this).children("option:selected").text();
		var Dissel = select.attr("disabled");
		$(this).parent().find("span").text(selected_txt);

		if(select.children("option:selected")){
			var sel_text = $(this).children("option:selected").text();
			$(this).parent().find("span").text(sel_text);
		}

		if(Dissel == "disabled"){
			$(this).parents(".select").addClass("disable");
		}
	});

	$("select").change(function(){
		var select_txt = $(this).children("option:selected").text();
		var person = $(this).children("option:selected").val();
		//직접입력 Input
		if(person == "person"){
			$(this).parent(".select").next(".person_inp").show();
		}else{
			$(this).parent(".select").next(".person_inp").hide();
		}
		$(this).parent().find("span").text(select_txt);
	});

	$("select").focus(function(){
		$(".select").removeClass("on");
		$(this).parent(".select").addClass("on");
	});

	$("select").focusout(function(){
		$(this).parent(".select").removeClass("on").find("ul").remove();
	});
}
function setCheckBox(){
	/* Checkbox */
	$(".checkbox input").each(function(){
		var $check = $(this);
		if(!$check.is(":disabled")){
			if($check.is(":checked")){
				$check.parent().addClass("on");
			}else{
				$check.parent().removeClass().addClass("checkbox");
			}
		}else{
			if($check.is(":checked")){
				$check.parent().addClass("on_disabled");
			}else{
				$check.parent().addClass("disabled");
			}
		}
		$check.change(function(){
			if($check.is(":checked")){
				$check.parent().addClass("on").css("outline","none");
			}else{
				$check.parent().removeClass("on").css("outline","none");
			}
		});
	});
	$(".checkbox").click(function(){
		if(!$(this).children("input:disabled")){
			if( $(this).hasClass('on') ){
				$(this).removeClass("on");
				$(this).children("input").prop("checked",false);
				return false;
			}else{
				$(this).addClass("on");
				$(this).children("input").prop("checked",true);
				return false;
			}
		}
	});
	$(".checkbox input").focusin(function() {
			$(this).parent(".checkbox").css("outline","1px dashed #1ab7ea");
	});
	$(".checkbox input").focusout(function(){
		$(this).parent(".checkbox").css("outline","none");
	});
}
/**
/* Layer popup
/* fnLayerPop : 전체 사이즈 레이어 , fnOptionPop : 스몰 사이즈 레이어
*/
function fnLayerPop(layer){
	var LayerH1 = $("." + layer +" h1");
	$("." + layer).show();
	$("." + layer +" h1").attr("tabindex",0).focus();
	layer_open();
	FocusKeyDown(LayerH1);
}

function fnClose(){
	$(".layer").hide();
	layer_close();
	$(".bg_bx").hide();
	$(".sec3 .layer").hide();
}
function fnSignClose(){
	$(".layer").hide();
	layer_close();
}
function FocusKeyDown(target) {
	target.keydown(function(e) {
		if (e.keyCode == 9 && e.shiftKey) {
			return false;
		}
	});
	target.keydown(function(e) {
		if (e.keyCode == 9 && e.shiftKey) {
			return false;
		}
	});
	$(".layer_close").keydown(function(e) {
		if (e.keyCode == 9 && !e.shiftKey) {
			return false;
		}
	});
}

/**
/* layer dimmed 처리용
*/
function layer_open(){
	$("body").css("overflow","hidden");
	$(".dimmed").show();
}
function layer_close(){
	pageInit();
	$("body").css("overflow","auto");
	$(".dimmed").hide();
}