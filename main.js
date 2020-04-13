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

    var loadingSvg = Math.floor(Math.random() * 5) + 1;
    $("nav svg use").attr("xlink:href", "#" + loadingSvg)


    var tl = gsap.timeline();
    tl.set("nav", { display: "flex" });
    tl.to("nav", 1.3, {
      width: "100%",
      right: 0,
      ease: "Expo.easeInOut",
    })
    tl.from("nav .anim", {
      xPercent: 100,
      opacity: 0,
      stagger: .4,
      ease: "Power1.easeOut"
    })
    tl.set(".anim-wrap", {css:{pointerEvents: "initial"}})
    tl.from("nav aside", .7, {opacity: 0, ease: "Power1.easeOut"})
  }

  function closeMenu() {
    var loadingSvg = Math.floor(Math.random() * 5) + 1;
    $("nav svg use").attr("xlink:href", "#" + loadingSvg)
    var tl = gsap.timeline();
    tl.to("nav", 1, {
      width: "0",
      right: -230,
      ease: "Expo.easeInOut",
    })
    tl.to("nav .anim, nav aside", 1, {opacity: 0}, "-=.8")
    tl.set("nav .anim, nav aside", {opacity: 1})
    tl.set(".anim-wrap", {css:{pointerEvents: "none"}})

  }

  $(".menu").click(function (e){
    e.preventDefault();
    setTimeout(() => {
      $(".nav").addClass("dark__menu")
    }, 800);
    openNav();
  });

  $(".close-menu").click(function (e) {
    e.preventDefault();
    setTimeout(() => {
      $(".nav").removeClass("dark__menu")
    }, 400);
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

  });

  function projectAnimation() {
    var tl = gsap.timeline();
    tl.set("#contact .anim__project", {clearProps: "all"})
    tl.to("#contact .anim:not(.init), #contact .anim-wrap.tag .anim, .anim__return.init", {
      yPercent: -100,
      opacity: 0,
      stagger: .3,
      ease: "Power1.easeOut"
    })
    tl.set("#contact .major", {padding: "0"})
    tl.set(".anim-wrap.tag", {display: "none"})
    tl.set(".anim-wrap", {height: "85px"})
    tl.to("#contact .anim__project", {
      y: 0,
      opacity: 1,
      stagger: .3,
      ease: "Power1.easeOut"
    })
    tl.to("#contact .major aside", .5, {opacity: 0}, "-=1.5")
    tl.set("form.project", {display: "flex"})
    tl.set("#contact .major aside", {display: "none"})
    tl.to("form.project", .7, {opacity: 1})
    tl.set("#contact .anim", {className: "+=anim init"})
    tl.set("#contact .anim__project", {className: "+=anim__project init"})
    tl.set("#contact .anim, .anim__return", {clearProps: "all"})
    tl.set(".anim__return", {className: "+=anim__return init"})

  }

  function helloAnimation() {
    var tl = gsap.timeline();
    tl.set("#contact .anim__hello", {clearProps: "all"})
    tl.to("#contact .anim:not(.init), #contact .anim-wrap.tag .anim, .anim__return.init", {
      yPercent: -100,
      opacity: 0,
      stagger: .3,
      ease: "Power1.easeOut"
    })
    tl.set("#contact .major", {padding: "0"})
    tl.set(".anim-wrap.tag", {display: "none"})
    tl.set(".anim-wrap", {height: "85px"})
    tl.to("#contact .anim__hello", {
      y: 0,
      opacity: 1,
      stagger: .3,
      ease: "Power1.easeOut"
    })
    tl.to("#contact .major aside", .5, {opacity: 0}, "-=1.5")
    tl.set("form.hello", {display: "flex"})
    tl.set("#contact .major aside", {display: "none"})
    tl.to("form.hello", .7, {opacity: 1})
    tl.set("#contact .anim", {className: "+=anim init"})
    tl.set("#contact .anim__hello", {className: "+=anim__hello init"})
    tl.set("#contact .anim, .anim__return", {clearProps: "all"})
    tl.set(".anim__return", {className: "+=anim__return init"})


  }

  function prevAnimation() {

    var tl = gsap.timeline();
    tl.to("#contact .anim__project.init, #contact .anim__hello.init", {
      yPercent: -100,
      opacity: 0,
      stagger: .3,
      ease: "Power1.easeOut"
    })
    tl.set("#contact .major", {padding: "4em 0 0"})
    tl.set(".anim-wrap.tag", {display: "block", height: "unset"})
    tl.set(".anim-wrap:not(:first-of-type)", {height: "100px"})
    tl.to("#contact .major form, #contact .major aside", {clearProps: "display"})
    tl.to("#contact .anim__return, .anim-wrap.tag .anim", {
      y: 0,
      opacity: 1,
      stagger: .3,
      ease: "Power1.easeOut"
    }, "-=.5")
    tl.to("#contact .major form", .5, {opacity: 0}, "-=2")
    tl.to("#contact .major aside", {opacity: 1, stagger: .3, ease: "Power1.easeOut"})
    tl.set("#contact .anim__project", {className: "-=anim__project"})

    

  }

  $("button.project").click(function() {
    projectAnimation();
  })

  $("button.hello").click(function() {
    helloAnimation();
  })

  $(".prev").click(function() {
    prevAnimation();
  })

});

$(window).scroll(function() {
  
  var winScroll = $(this).scrollTop()
  var blkOffset = $(".bg__dark").offset().top - 50;
  var whtOffset = $(".bg__light").offset().top - 50;

  if(winScroll > whtOffset) {
    $(".nav").removeClass("dark")
  } else if (winScroll > blkOffset) {
    $(".nav").addClass("dark")
  } else {
    $(".nav").removeClass("dark")
  }
})