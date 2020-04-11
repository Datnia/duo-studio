// //PRELOADER

// $(document).ready(function() {

//     function blink() {

//         var r = Math.floor(Math.random() * 2) + 1;
//         let gif = $("#preloader .animation img");
//         let src = gif.attr("src");

//         setTimeout(() => {
//             gif.attr('src', src);
//         }, r * 1000);

//     }

//     setInterval(() => {
//         blink();
//     }, 2000);

//     function getSVG() {
//         var loadingSvg = Math.floor(Math.random() * 5) + 1;
//         var loadedSvg = Math.floor(Math.random() * 5) + 1;

//         $("#preloader .loading-screen svg use").attr("xlink:href", "#" + loadingSvg)
//         $("#preloader .loaded-screen svg use").attr("xlink:href", "#" + loadedSvg)

//     }

//     getSVG();

//     function transition() {

//         var text = $("#preloader .subtitle h1:not(.slide-off):not(:last-of-type)").first();
//         var nextText = $("#preloader .subtitle h1:not(.slide-up):not(.slide-off)").first();

//         nextText.addClass("slide-up");
//         text.addClass("slide-off");

//     }

//     function initTransition () {
//         setInterval(() => {
//             transition();
//         }, 900);
//     }

//     setTimeout(() => {

//         $("#preloader .subtitle").fadeTo("slow", 1);

//         setTimeout(() => {

//         }, 1000);

//         setTimeout(() => {
//             $("#preloader .subtitle h1:first-of-type").addClass("slide-up");
//             initTransition();
//         }, 700);
//     }, 1000);

//     setTimeout(() => {

//         var tl = gsap.timeline();
//         tl.to("#preloader .clone h1, #preloader .u h1", {duration: 1, color: "#070c14"})
//         tl.to("#preloader .loading-screen", {duration: 2, bottom:0, ease: "Expo.easeIn"})
//         tl.set("body",{className: "+=loaded"})
//         tl.to("#preloader", {duration: 1.2, height: 0, top:-430, ease: "Expo.easeOut"})
//         tl.set("#preloader", {display: "none"})
//         tl.from("#landing video", 1, {opacity: 0, ease: "Power1.easeOut"})
//         tl.from("#landing .anim", {
//             yPercent: 100,
//             opacity: 0,
//             stagger: .4,
//             ease: "Power1.easeOut"
//         })
//         tl.from("#landing aside", 1, {opacity: 0, ease: "Power1.easeOut"},"+=.3")

//     }, 4700);
// });

$(document).ready(function () {
  function openNav() {
    var tl = gsap.timeline();
    tl.set("nav", { display: "flex" });
    tl.to("nav", 1.3, {
      width: "100%",
      right: 0,
      ease: "Expo.easeInOut",
    })
    tl.to(".nav.logo", 1, { css: { zIndex: 4 } }, "-=1.4")
    tl.from("nav .anim", {
      xPercent: 100,
      opacity: 0,
      stagger: .4,
      ease: "Power1.easeOut"
    })
    tl.from("nav aside", .7, {opacity: 0, ease: "Power1.easeOut"})
  }

  function closeMenu() {
    var tl = gsap.timeline();
    tl.to("nav", 1, {
      width: "0",
      right: -230,
      ease: "Expo.easeInOut",
    })
    tl.to("nav .anim", 1, {opacity: 0}, "-=.8")
    tl.to(".nav.logo", 1, { css: { zIndex: 1 } }, "-=2")
    tl.set("nav .anim", {opacity: 1})
  }

  $(".menu").click(function (e) {
    e.preventDefault();
    openNav();
  });

  $(".close-menu").click(function (e) {
    e.preventDefault();
    closeMenu();
  });

  function menuHover() {

    var n1 = Math.floor(Math.random() * 51) + 25;
    var n2 = Math.floor(Math.random() * 51) + 25;
    var n3 = Math.floor(Math.random() * 51) + 25;
    var n4 = Math.floor(Math.random() * 51) + 25;
    var n5 = 100 - n1;
    var n6 = 100 - n2;
    var n7 = 100 - n3;
    var n8 = 100 - n4;

    var borderRadius = `${n1}% ${n5}% ${n6}% ${n2}% / ${n3}% ${n4}% ${n8}% ${n7}%`;
  
    $(".close-menu").css("border-radius", borderRadius);

  }

  $(".close-menu").mouseleave(function() {
    $(this).css("border-radius", "50%")
  });
  
  $(".close-menu").mouseover(function() {
    menuHover();
  });


  $("nav .anim-wrap").mouseenter(function(){
    
    var i = $(this).find("h1").attr("text");
    $("nav .img-wrapper." + i).addClass("active");

  })

  $("nav .anim-wrap").mouseleave(function(){
    
    $("nav .img-wrapper").removeClass("active");

  })

});
