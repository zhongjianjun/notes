(function($){
	//自适应
	changewin = function(){
		changew();
		$(window).resize(function(){
			changew();
		});
		function changew(){
			var currWin_w = $(window).width();
			if(currWin_w>=1500){
				$("body").attr({"class":"page_1500"});
				return false;
			}else if(currWin_w<1500 && currWin_w>=1200 ){
				$("body").attr({"class":"page_1200"});
				return false;
			}else{
				$("body").attr({"class":"page_640"});
				return false;
			}
		}
	};
	/*导航*/
	$.fn.menuShow = function(options){
		var options = $.extend({
			menuList: ".menu-list",
			select: "select",
			contList: ".cont-list",
			menuListBox: ".menu-list-box",
		},options||{});
		return this.each(function(){
			var _this = $(this);
			var dataType = _this.attr("data-type");
			if(dataType == "false"){
				_this.find(options.menuListBox).removeClass(options.select);
				_this.hover(function(){
					_this.find(options.menuListBox).addClass(options.select);
				},function(){
					_this.find(options.menuListBox).removeClass(options.select);
				});
			}else{
				_this.find(options.menuListBox).addClass(options.select);
			}
			_this.hover(function(){},function(){
				_this.find(options.contList).removeClass(options.select);
				_this.find(options.menuList).removeClass(options.select);
			});
			_this.find(options.menuList).hover(function(){
				var _index = $(this).index();
				$(this).addClass(options.select).siblings(options.menuList).removeClass(options.select);
				_this.find(options.contList).eq(_index).addClass(options.select).siblings(options.contList).removeClass(options.select);
			});
		});
	};
	$.fn.navShow = function(options){
		var options = $.extend({
			navItem: ".nav-item",
			select: "select"
		},options||{});
		return this.each(function(){
			var _this = $(this);
			_this.find(options.navItem).mouseover(function(){
				$(this).addClass(options.select).siblings(options.navItem).removeClass(options.select);
			}).mouseout(function(){
				$(this).removeClass(options.select);
			});
		});
	};
	//
	$.fn.slider = function(options){
		var options = $.extend({
			imgList: ".img-list",
			btnList: ".btn-list",
			select: "select"
		},options||{});
		return this.each(function(){
			var _this = $(this);
			_this.find(options.imgList).eq(0).show().siblings(options.imgList).hide();
			var btnNum = _this.find(options.btnList).length;
			_this.find(options.btnList).hover(function(){
				clearInterval(timer);
				var _index = $(this).index();
				$(this).stop().addClass(options.select).siblings(options.btnList).removeClass(options.select);
				_this.find(options.imgList).eq(_index).stop().fadeIn(500).siblings(options.imgList).fadeOut(500);
			},function(){
				autoplay();
			});
			var _index = 0;
			var timer = null;
			function autoplay(){
			timer=setInterval(function(){
				_index++;
				if(_index < btnNum){
					if(_index == (btnNum-1)){_index = -1;}
					_this.find(options.btnList).eq(_index).addClass(options.select).siblings(options.btnList).removeClass(options.select);
					_this.find(options.imgList).eq(_index).fadeIn(500).siblings(options.imgList).fadeOut(500);
				}else{
					_index = -1;
				}
				},4000); 
			};
			autoplay();
		});
	};
	//动态
	liPlay = function(lh,speed,delay,el){
	  var ssyyinfo; 
	  var p=false; 
	  var o=document.getElementById(el); 
	  o.innerHTML+=o.innerHTML; 
	  o.onmouseover=function(){p=true;} 
	  o.onmouseout=function(){p=false} 
	  o.scrollTop = 0; 
	  function start(){ 
	    ssyyinfo = setInterval(scrolling,speed); 
	    if(!p){ o.scrollTop += 1;} 
	  }
	  function scrolling(){ 
	    if(o.scrollTop%lh!=0){ 
	      o.scrollTop += 1; 
	      if(o.scrollTop>=o.scrollHeight/2) o.scrollTop = 0; 
	    }else{ 
	      clearInterval(ssyyinfo); 
	      setTimeout(start,delay); 
	    } 
	  }
	  setTimeout(start,delay); 
	};
	//返回顶部
	$.fn.returnTop = function(options){
		var options = $.extend({
			eventType: "click",
			toolbarItem: ".toolbar-item"
		},options||{});
		return this.each(function(){
			var _this = $(this);
			$(window).scroll(function(){
				var sTop = $(document).scrollTop();
				if(sTop > 300){
					_this.addClass("show");
				}else{
					_this.removeClass("show");
				}
			});
			_this.find(options.toolbarItem).last().bind(options.eventType, function(){
				$('body,html').animate({
					scrollTop: 0,
				},500);
			});
		});
	};
	/*导航固定*/
	$.fn.fixedCont = function(options){
		var options = $.extend({
			eventType: "click",
			boxLeft: "#boxleft",
			outerPage: ".outer_page",
			totalPage: ".total-page",
			pagePrev: ".page-prev",
			pageNext: ".page-next",
			selectPage: ".select-page",
			zoomInButton: "#zoomInButton",
			zoomOutButton: "#zoomOutButton",
			frscreen: "#frscreen",
			boxRight: "#boxright",
			leftWidth: "left-width",
			fixed: "fixed"
		},options||{});
		return this.each(function(){
			var _this = $(this);
			var pageNum = $(options.boxLeft).find(options.outerPage).length;
			_this.find(options.totalPage).html("/"+pageNum);
			var selectPageVal=1;
			var fixedOffTop = _this.offset().top;
			$(window).scroll(function(){
				if(selectPageVal <= 1){
					$(options.pagePrev).attr("disabled", true);
					$(options.pageNext).attr("disabled",false);
				}
				var scrollTop = $(document).scrollTop();
				for(var i = 1; i <= pageNum; i++){
					var pageTop = $("#outer_page_" + i).offset().top;
					if(scrollTop > pageTop -100){
						selectPageVal= i;
					}
				}
				_this.find(options.selectPage).val(selectPageVal);
				if(scrollTop > fixedOffTop){
					_this.addClass(options.fixed);
				}else{
					_this.removeClass(options.fixed);
				}
			});
			_this.find(options.pagePrev).bind(options.eventType, function(){
				$(options.pageNext).attr("disabled",false);
				selectPageVal--;
				if(selectPageVal <= 1){
					$(options.pagePrev).attr("disabled", true);
				}
				pageMove();
			});
			_this.find(options.pageNext).bind(options.eventType, function(){
				$(options.pagePrev).attr("disabled", false);
				selectPageVal++;
				if(selectPageVal >= pageNum){
					$(options.pageNext).attr("disabled",true);
				}
				pageMove();
			});
			function pageMove(){
				_this.find(options.selectPage).val(selectPageVal);
				var top = $("#outer_page_" + selectPageVal).offset().top;
				$(window).scrollTop(top);
			};
			_this.find(options.zoomInButton).bind(options.eventType, function(){
				showHide();
			});
			_this.find(options.zoomOutButton).bind(options.eventType, function(){
				showHide();
			});
			_this.find(options.frscreen).bind(options.eventType, function(){
				showHide();
			});
			function showHide(){
				if($(options.boxRight).is(":hidden")){
					$(options.boxRight).show();
					$(options.boxLeft).removeClass(options.leftWidth);
					$(options.frscreen).html("&#xe826;");
				}else{
					$(options.boxRight).hide();
					$(options.boxLeft).addClass(options.leftWidth);
					$(options.frscreen).html("&#xe60e;");
				}
			};

		});
	};
	$.fn.tabSwitch = function(options){
		var options = $.extend({
			eventType: "hover",
			switchNav: ".switchNav",
			switchCont: ".switchCont",
			active: "active"
		},options||{});
		return this.each(function(){
			var _this = $(this);
			_this.find(options.switchNav).bind(options.eventType, function(){
				var _index = $(this).index();
				$(this).addClass(options.active).siblings(options.switchNav).removeClass(options.active);
				_this.find(options.switchCont).eq(_index).addClass(options.active).siblings(options.switchCont).removeClass(options.active);
			});
		});
	};
	$.fn.personalNav = function(options){
		var options = $.extend({
			eventType: "click",
			active: "select"
		},options||{});
		return this.each(function(){
			var _this = $(this);
			_this.bind(options.eventType, function(){
				var _index = $(this).index();
				_this.siblings().removeClass(options.active);
				_this.toggleClass(options.active);
			});
		});
	}	

})(jQuery);




/*

$.fn.fixedCont = function(options){
	var options = $.extend({
		eventType: "hover",
	},options||{});
	return this.each(function(){
		var _this = $(this);

	});
}

*/


(function($){$.fn.bxCarousel=function(options){var defaults={move:4,display_num:4,speed:500,margin:0,auto:false,auto_interval:5000,auto_dir:'next',auto_hover:false,next_text:'next',next_image:'',prev_text:'prev',prev_image:'',controls:true};var options=$.extend(defaults,options);return this.each(function(){var $this=$(this);var li=$this.find('li');var first=0;var fe=0;var last=options.display_num-1;var le=options.display_num-1;var is_working=false;var j='';var clicked=false;li.css({'float':'left','listStyle':'none','marginRight':options.margin});var ow=li.outerWidth(true);wrap_width=(ow*options.display_num)-options.margin;var seg=ow*options.move;$this.wrap('<div class="bx_container"></div>').width(999999);if(options.controls){if(options.next_image!=''||options.prev_image!=''){var controls='<a href="" class="prev"><img src="'+options.prev_image+'"/></a><a href="" class="next"><img src="'+options.next_image+'"/></a>';}
else{var controls='<a href="" class="prev">'+options.prev_text+'</a><a href="" class="next">'+options.next_text+'</a>';}}
$this.parent('.bx_container').wrap('<div class="bx_wrap"></div>').css({'position':'relative','width':wrap_width,'overflow':'hidden'}).before(controls);var w=li.slice(0,options.display_num).clone();var last_appended=(options.display_num+options.move)-1;$this.empty().append(w);get_p();get_a();$this.css({'position':'relative','left':-(seg)});$this.parent().siblings('.next').click(function(){slide_next();clearInterval(j);clicked=true;return false;});$this.parent().siblings('.prev').click(function(){slide_prev();clearInterval(j);clicked=true;return false;});if(options.auto){start_slide();if(options.auto_hover&&clicked!=true){$this.find('li').live('mouseenter',function(){if(!clicked){clearInterval(j);}});$this.find('li').live('mouseleave',function(){if(!clicked){start_slide();}});}}
function start_slide(){if(options.auto_dir=='next'){j=setInterval(function(){slide_next()},options.auto_interval);}else{j=setInterval(function(){slide_prev()},options.auto_interval);}}
function slide_next(){if(!is_working){is_working=true;set_pos('next');$this.animate({left:'-='+seg},options.speed,function(){$this.find('li').slice(0,options.move).remove();$this.css('left',-(seg));get_a();is_working=false;});}}
function slide_prev(){if(!is_working){is_working=true;set_pos('prev');$this.animate({left:'+='+seg},options.speed,function(){$this.find('li').slice(-options.move).remove();$this.css('left',-(seg));get_p();is_working=false;});}}
function get_a(){var str=new Array();var lix=li.clone();le=last;for(i=0;i<options.move;i++){le++
if(lix[le]!=undefined){str[i]=$(lix[le]);}else{le=0;str[i]=$(lix[le]);}}
$.each(str,function(index){$this.append(str[index][0]);});}
function get_p(){var str=new Array();var lix=li.clone();fe=first;for(i=0;i<options.move;i++){fe--
if(lix[fe]!=undefined){str[i]=$(lix[fe]);}else{fe=li.length-1;str[i]=$(lix[fe]);}}
$.each(str,function(index){$this.prepend(str[index][0]);});}
function set_pos(dir){if(dir=='next'){first+=options.move;if(first>=li.length){first=first%li.length;}
last+=options.move;if(last>=li.length){last=last%li.length;}}else if(dir=='prev'){first-=options.move;if(first<0){first=li.length+first;}
last-=options.move;if(last<0){last=li.length+last;}}}});}})(jQuery);



var win_width= window.innerWidth || document.documentElement.clientWidth;
if(win_width>=1500) var camera_margin=33;
if(win_width<1500) var camera_margin=0;

$(function(){
	var Windows_c = new changewin();
	$("#sort-box").menuShow();
	$("#nav-list").navShow();
	$("#toolbar").returnTop();

	$('#botton-scroll').bxCarousel({
		display_num: 10,
		move: 10,
		margin: camera_margin
	});

});




