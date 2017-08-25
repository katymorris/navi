// //position mobile nav to the right
// function setMobileNav() {
//   if (windowWidth <= 980) {
//     var nav = $('.nav-wrapper nav');
//     var navWidth = nav.width();
//     $('.nav-wrapper nav').css({'right': navWidth * -1});
//   }
// }

// //Hamburger open and close animations
// function hamburgerOpenAni() {
//   $('.hamburger-line').css('transform', 'translate(0px, 0px)');
//   $('#line-1').stop().transition({x: "0px", y: '10px'}, {duration: 200, complete: function() {
//     $('#line-1').stop().transition({rotate: '45deg'}, {duration: 200});
//   }});
//   $('#line-3').stop().transition({x: "0", y: '-4px'}, {duration: 200, complete: function() {
//     $('#line-2').css("opacity", "0");
//     $('#line-3').stop().transition({rotate: '-45deg'}, {duration: 200});
//     $(".hamburger-box").removeClass('nav-click-running');
//   }});
// }
// function hamburgerCloseAni() {
//   $('#line-1').stop().transition({rotate: '0deg'}, {duration: 200});
//   $('#line-3').stop().transition({rotate: '0deg'}, {duration: 200, complete: function() {
//     $('#line-1').stop().transition({x: "0px", y: '0px'}, {duration: 200});
//     $('#line-3').stop().transition({x: "0px", y: '0px'}, {duration: 200});
//     $('#line-2').css("opacity", "1");
//     $(".hamburger-box").removeClass('nav-click-running');
//   }});
// }
// //close panel - runs on click outside and resize
// function closePanel() {
//     if (windowWidth <= 980) {
//       var navPanelWidth = $('.nav-wrapper nav').width();
//       $('.nav-wrapper nav').stop().transition({x: navPanelWidth}, {duration: 300, complete: function() {
//       }});
//       $(".hamburger-box").removeClass('panel-open');
//       hamburgerCloseAni();
//     } else {
//       $('nav').attr('style', '');
//       $(".hamburger-box").removeClass('panel-open');
//       hamburgerCloseAni();
//     }
// }
// //closes mobile nav if user clicks outside
// function outsideClickCloseNav(e) {
//     var thisObj = $(e.target);
//     if(!thisObj.is('.nav-wrapper nav, .hamburger-box, .mobile-menu-title, .nav-wrapper nav a, .hamburger-line') && $('.hamburger-box').hasClass('panel-open') ) {
//       closePanel();
//     }
// }
// function setMobileMenuHeaderHeight() {
//   if (windowWidth <= 980) {
//     var navHeight = $('.nav-wrapper').height();
//     $(".mobile-menu-title").css('height', navHeight)
//   }
// }