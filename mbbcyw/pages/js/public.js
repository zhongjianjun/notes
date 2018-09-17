
(function (doc,win) {
    //font size
	var docEl = doc.documentElement;
	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var recalc = function () {
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		docEl.style.fontSize = (clientWidth / 320 * 10).toFixed(1) + 'px';
	};
	recalc();
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
    //nav show and hide
    window.onload = function(){
        var menu_tag = document.getElementById("menu_tag");
        var nav_menu = document.getElementById("nav_menu");
        var header_main = document.getElementById("header_main");
        var header_mark = document.getElementById("header_mark");
        var falg = true;
        if(menu_tag){
            menu_tag.onclick = function(){
                if(falg){
                    nav_menu.style.display="block";
                    if(header_main){
                        header_main.className = 'header-main header-fixed';
                    }
                    falg=false;
                }else{
                    nav_menu.style.display="none";
                    if(header_main){
                        header_main.className = 'header-main';
                    }
                    falg=true;
                }
            }
        }
        if(header_mark){
            header_mark.onclick = function(){
                nav_menu.style.display="none";
                header_main.className = 'header-main';
                falg=true;
            }            
        }

    }

})(document, window);
	



// $.fn.navShow = function(options){
//     var options = $.extend({
//         eventType: "click",
//         menu_tag: ".menu_tag",
//         nav_menu: ".nav_menu",
//         header_main: ".header-main",
//         header_fixed: "header-fixed",
//         header_mark: ".header-mark",
//     },options||{});
//     return this.each(function(){
//         var _this = $(this);
//         _this.find(options.menu_tag).bind(options.eventType, function(){
//             _this.find(options.nav_menu).toggle();
//             _this.find(options.header_main).toggleClass(options.header_fixed);
//         });
//         _this.find(options.header_mark).bind(options.eventType, function(){
//         	_this.find(options.header_main).removeClass(options.header_fixed);
//         	_this.find(options.nav_menu).hide();
//         });
//     });
// }

// $(function(){
// 	$(".header-box").navShow();	
// });
