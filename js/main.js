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
    tl.set("nav .anim-wrap", {css:{pointerEvents: "initial"}})
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
    tl.set("nav .anim-wrap", {css:{pointerEvents: "none"}})

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


  
var html = document.documentElement;
var body = document.body;

var scroller = {
  target: document.querySelector("#main"),
  ease: 0.05, // <= scroll speed
  endY: 0,
  y: 0,
  resizeRequest: 1,
  scrollRequest: 0,
};

var requestId = null;

TweenLite.set(scroller.target, {
  rotation: 0.01,
  force3D: true
});

window.addEventListener("load", onLoad);

function onLoad() {    
  updateScroller();  
  window.focus();
  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll); 
}

function updateScroller() {
  
  var resized = scroller.resizeRequest > 0;
    
  if (resized) {    
    var height = scroller.target.clientHeight;
    body.style.height = height + "px";
    scroller.resizeRequest = 0;
  }
      
  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

  scroller.endY = scrollY;
  scroller.y += (scrollY - scroller.y) * scroller.ease;

  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
  }
  
  TweenLite.set(scroller.target, { 
    y: -scroller.y 
  });
  
  requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
  scroller.scrollRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

function onResize() {
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}
});

$(window).scroll(function() {
  
  var winScroll = $(this).scrollTop()
  var blkOffset = $(".bg__dark").offset().top - 50;
  var whtOffset = $(".bg__light").offset().top - 50;

  console.log(winScroll)

  if(winScroll > whtOffset) {
    $(".nav").removeClass("dark")
  } else if (winScroll > blkOffset) {
    $(".nav").addClass("dark")
  } else {
    $(".nav").removeClass("dark")
  }
})