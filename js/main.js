function openNav() {
  var loadingSvg = Math.floor(Math.random() * 5) + 1;
  $("nav svg use").attr("xlink:href", "#" + loadingSvg);

  var tl = gsap.timeline();
  tl.set("nav", { display: "flex" });
  tl.to("nav", 1.3, {
    width: "100%",
    right: 0,
    ease: "Expo.easeInOut",
  });
  tl.from("nav .anim", {
    xPercent: 100,
    opacity: 0,
    stagger: 0.4,
    ease: "Power1.easeOut",
  });
  tl.set("nav .anim-wrap", { css: { pointerEvents: "initial" } });
  tl.from("nav aside", 0.7, { opacity: 0, ease: "Power1.easeOut" });
}

function closeMenu() {
  var loadingSvg = Math.floor(Math.random() * 5) + 1;
  $("nav svg use").attr("xlink:href", "#" + loadingSvg);
  var tl = gsap.timeline();
  tl.to("nav", 1, {
    width: "0",
    right: -230,
    ease: "Expo.easeInOut",
  });
  tl.to("nav .anim, nav aside", 1, { opacity: 0 }, "-=.8");
  tl.set("nav .anim, nav aside", { opacity: 1 });
  tl.set("nav .anim-wrap", { css: { pointerEvents: "none" } });
}

function initMenu() {
  $(".menu").click(function (e) {
    e.preventDefault();
    openNav();
  });

  $(".close-menu").click(function (e) {
    e.preventDefault();
    closeMenu();
  });

  $(".close-menu").mouseleave(function () {
    $(this).css("border-radius", "50%");
  });

  $(".close-menu").mouseover(function () {
    menuHover();
  });

  $("nav .anim-wrap").mouseenter(function () {
    var i = $(this).find("h1").attr("text");
    $("nav .img-wrapper." + i).addClass("active");
  });

  $("nav .anim-wrap").mouseleave(function () {
    $("nav .img-wrapper").removeClass("active");
  });
}
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

// START CURSOR

$(function () {
  var cursor = $(".cursor");
  var posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0;

  gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / 2;
      posY += (mouseY - posY) / 2;

      gsap.set(cursor, {
        css: {
          left: mouseX - 7,
          top: mouseY - 7,
        },
      });
    },
  });

  $("body").on("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
});
function initCursor() {
  var cursor = $(".cursor");

  $("a , .client, button, .cursor__hover").on("mouseenter", function () {
    cursor.addClass("active");
  });

  $("a , .client, button, .cursor__hover").on("mouseleave", function () {
    cursor.removeClass("active");
  });

  setTimeout(() => {
    $("#slider .draggable").on("mouseenter", function () {
      cursor.addClass("active__slider");
    });

    $("#slider .draggable").on("mouseleave", function () {
      cursor.removeClass("active__slider");
    });
  }, 1000);
}

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

// scroller

function initScroller() {
  const body = document.body,
    scrollWrap = document.getElementById("main"),
    speed = 0.03;

  var offset = 0;

  setTimeout(() => {
    $("body").height($(".viewport").innerHeight());
  }, 1000);

  function smoothScroll() {
    offset += (window.pageYOffset - offset) * speed;

    var scroll = "translateY(-" + offset + "px) translateZ(0)";
    scrollWrap.style.transform = scroll;

    callScroll = requestAnimationFrame(smoothScroll);
  }

  smoothScroll();
}

// page transitions

function screenTransitionLeave() {
  var loadingSvg = Math.floor(Math.random() * 5) + 1;
  $(".screen svg use").attr("xlink:href", "#" + loadingSvg);
  let screen = $(".screen");

  var tl = gsap.timeline({
    onStart: function () {
      screen.removeClass("enter");
    },
  });
  tl.set(screen, {
    clearProps: "all",
  });
  tl.to(screen, 1, {
    y: 0,
  });
}

function screenTransitionEnter() {
  var loadingSvg = Math.floor(Math.random() * 5) + 1;
  $(".screen svg use").attr("xlink:href", "#" + loadingSvg);
  let screen = $(".screen");

  var tl = gsap.timeline({
    onStart: function () {
      screen.addClass("enter");
    },
  });
  tl.to(screen, 1, {
    yPercent: -100,
    rotate: 180,
  });
}

function blobTransition() {
  var tl = gsap.timeline();

  let initialSvg = $("#projects .minor .initial");
  let followSvg = $("#projects .minor .follow");

  var initialBlobSvg = Math.floor(Math.random() * 3) + 10;
  var followBlobSvg = Math.floor(Math.random() * 3) + 20;

  initialSvg.find("use").attr("xlink:href", "#" + initialBlobSvg);
  followSvg.find("use").attr("xlink:href", "#" + followBlobSvg);

  tl.to(initialSvg, 1, {
    width: 7000,
    height: 7000,
    ease: "Power1.easeInOut",
  });
  tl.to(
    followSvg,
    1,
    {
      width: 7000,
      height: 7000,
      ease: "Power1.easeInOut",
    },
    "-=.5"
  );
  tl.to(".nav.menu", 0.3, { opacity: 0 });
}

function blobTransitionProject() {
  var tl = gsap.timeline();

  let initialSvg = $("body.project .initial");
  let followSvg = $("body.project .follow");

  var initialBlobSvg = Math.floor(Math.random() * 3) + 10;
  var followBlobSvg = Math.floor(Math.random() * 3) + 20;

  initialSvg.find("use").attr("xlink:href", "#" + initialBlobSvg);
  followSvg.find("use").attr("xlink:href", "#" + followBlobSvg);

  tl.to(initialSvg, 0.7, {
    width: 7000,
    height: 7000,
    ease: "Power1.easeInOut",
  });
  tl.to(
    followSvg,
    0.7,
    {
      width: 7000,
      height: 7000,
      ease: "Power1.easeInOut",
    },
    "-=.3"
  );
}

function projectLanding() {
  var tl = gsap.timeline({
    onStart: function () {
      $("#main").removeClass("loading");
      setTimeout(() => {
        $("#canvas").addClass("visible");
      }, 500);
    },
  });

  let banner = $("#banner");
  let header = banner.find("header");
  let img = banner.find(".minor img");
  let canvas = banner.find("aside");
  let nav = $("body.project .nav.menu");

  tl.to(nav, 0.3, { y: 0 });
  tl.from(img, 0.7, { width: 0, ease: Expo.easeInOut });
  tl.from(header, 1, { opacity: 0, y: 20 });
  tl.from(canvas, 1, { opacity: 0 }, "-=.5");
}

function hpProjectLanding() {
  $(function () {
    var tl = gsap.timeline({
      onComplete: function () {
        setTimeout(() => {
          $("#projects aside").slick("slickGoTo", 3);
        }, 1000);
        // initProjects();
      },
    });

    let scroller = $("#main");

    let pos = $("#projects").position().top;

    tl.set(scroller, {
      transform: "translateY(-" + pos + "px)",
      ease: "Power3.easeInOut",
    });
  });
}

$(function () {
  $("body").click(function () {
    // hpProjectLanding();
  });
});

$(function () {
  barba.init({
    sync: true,

    transitions: [
      {
        async leave(data) {
          const done = this.async();

          let nexthref = data.next.url.href;

          if (nexthref.indexOf("#projects") >= 0) {
            blobTransitionProject();
            await delay(1400);
          } else if (nexthref.indexOf("projects") >= 0) {
            blobTransition();
            await delay(1700);
          } else {
            screenTransitionLeave();
            await delay(1000);
          }

          done();
        },

        async afterEnter(data) {
          setTimeout(() => {
            $(".screen__project").addClass("hidden");
          }, 50);
          let nexthref = data.next.url.href;

          if (nexthref.indexOf("#projects") >= 0) {
            hpProjectLanding();
          } else if (nexthref.indexOf("projects") >= 0) {
            projectLanding();
          } else {
            screenTransitionEnter();
          }
        },

        async once(data) {
          setTimeout(() => {
            $(".screen__project").addClass("hidden");
          }, 50);

          let nexthref = data.next.url.href;

          if (nexthref.indexOf("projects") >= 0) {
            projectLanding();
          } else {
            // TRANSITION IN GOES HERE
          }
        },
      },
    ],

    views: [
      {
        namespace: "home",
        beforeEnter({ next }) {
          let script = document.createElement("script");
          let preloaderScript = document.createElement("script");
          preloaderScript.src = "/js/preloader.js";
          script.src = "/js/landing.js";
          next.container.appendChild(script);
          next.container.appendChild(preloaderScript);
        },
      },
      {
        namespace: "projects",
        beforeEnter({ next }) {
          let script = document.createElement("script");
          script.src = "/js/projects.js";
          next.container.appendChild(script);

          $(function () {
            initScroller();
          });
        },
      },
      {
        namespace: "studio",
        beforeEnter({ next }) {
          let script = document.createElement("script");
          script.src = "/js/studio.js";
          next.container.appendChild(script);

          $(function () {
            initScroller();
          });
        },
      },
      {
        namespace: "contact",
        beforeEnter({ next }) {
          let script = document.createElement("script");
          script.src = "/js/contact.js";
          next.container.appendChild(script);

          $(function () {
            initScroller();
          });
        },
      },
    ],
  });
  barba.hooks.afterLeave((data) => {
    var nextHtml = data.next.html;
    var response = nextHtml.replace(
      /(<\/?)body( .+?)?>/gi,
      "$1notbody$2>",
      nextHtml
    );
    var bodyClasses = $(response).filter("notbody").attr("class");
    $("body").attr("class", bodyClasses);
  });

  barba.hooks.beforeOnce((data) => {
    gsap.registerPlugin(ScrollTrigger);

    window.scrollTo(0, 0);
    initCursor();
    initMenu();
  });

  barba.hooks.enter((data) => {
    window.scrollTo(0, 0);
    initCursor();
    initMenu();
  });
});
