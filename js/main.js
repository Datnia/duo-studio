$(window).on("load", function () {
  sessionStorage.setItem("visited", true);
});

$(function () {
  if ($(window).width() < 901) {
    $(".index #landing").height(window.innerHeight - 70);
  }
});

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

  $(".close-menu ,.return").click(function (e) {
    e.preventDefault();
    closeMenu();
  });

  $(".return__work").click(function (e) {
    e.preventDefault();
    closeMenu();
    if ($("#landing").hasClass("active")) {
      initProjects();
    } else if ($("#contact").hasClass("active")) {
      prevSection();
    }
  });

  $(".close-menu").mouseleave(function () {
    $(this).css("border-radius", "50%");
  });

  $(".close-menu").mouseenter(function () {
    menuHover();
  });

  $("nav .anim-wrap").mouseenter(function () {
    var i = $(this).find("h1").attr("text");
    $("nav .img-wrapper." + i).addClass("active");
  });

  $("nav .anim-wrap").mouseleave(function () {
    $("nav .img-wrapper").removeClass("active");
  });

  $("#projects aside.minor .wrapper a").mouseleave(function () {
    $(this).css("border-radius", "50%");
  });

  $("#projects aside.minor .wrapper a").mouseover(function () {
    goHover();
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

function goHover() {
  var n1 = Math.floor(Math.random() * 51) + 25;
  var n2 = Math.floor(Math.random() * 51) + 25;
  var n3 = Math.floor(Math.random() * 51) + 25;
  var n4 = Math.floor(Math.random() * 51) + 25;
  var n5 = 100 - n1;
  var n6 = 100 - n2;
  var n7 = 100 - n3;
  var n8 = 100 - n4;

  var borderRadius = `${n1}% ${n5}% ${n6}% ${n2}% / ${n3}% ${n4}% ${n8}% ${n7}%`;

  $("#projects aside.minor .wrapper.slick-current a").css(
    "border-radius",
    borderRadius
  );
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

  $("body.project #footer").on("mouseenter", function () {
    cursor.addClass("active__next-project");
  });

  $("body.project #footer").on("mouseleave", function () {
    cursor.removeClass("active__next-project");
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
    scrollWrap = document.getElementById("main");

  const speed = (() => {
    if ($(window).width() < 901) return 1;
    else return 0.04;
  })();

  var offset = 0;

  setTimeout(() => {
    $("body").height($(".viewport").innerHeight());
  }, 1000);

  function smoothScroll() {
    if ($("body").is(".stop-scroll")) {
      return;
    }

    offset += (window.pageYOffset - offset) * speed;

    var scroll = "translateY(-" + offset + "px) translateZ(0)";
    scrollWrap.style.transform = scroll;

    callScroll = requestAnimationFrame(smoothScroll);

    if ($(".page-indicator").length) {
      var width =
        offset / ($(".viewport").innerHeight() - $("#footer").outerHeight());

      $(".page-indicator").css("width", width * 100 + "%");
    }
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

function screenTransitionEnterToProjects() {
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
  $(function () {
    var tl = gsap.timeline({
      onComplete: function () {
        let url = window.location.href;

        var minorSlide = url.substr(url.length - 1) - 1;

        if (minorSlide == 0) {
          var majorSlide = 5;
        } else if (minorSlide == 1) {
          var majorSlide = 4;
        } else if (minorSlide == 2) {
          var majorSlide = 3;
        } else if (minorSlide == 3) {
          var majorSlide = 2;
        } else if (minorSlide == 4) {
          var majorSlide = 1;
        }

        setTimeout(() => {
          $("#projects .minor").slick("slickGoTo", minorSlide);
          $("#projects .major").slick("slickGoTo", majorSlide);
        }, 50);

        setTimeout(() => {
          $("body").addClass("init__projects");
          $(".active").removeClass("active");
          $("#projects").addClass("active");
          window.history.pushState({}, document.title, "/");
        }, 100);
      },
    });

    let scroller = $("#main");
    let pos = $("#projects").position().top;

    tl.set(scroller, {
      transform: "translateY(-" + pos + "px)",
    });
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

  tl.from(nav, 0.3, { yPercent: -100 });
  tl.from(img, 0.7, { width: 0, ease: Expo.easeInOut });
  tl.from(header, 1, { opacity: 0, y: 20 });
  tl.from(canvas, 1, { opacity: 0 }, "-=.5");
}

function nextProjectLanding() {
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

  tl.set(nav, { y: 0 });
  tl.set(banner, { opacity: 1 });
  gsap.set(header, { opacity: 1, y: 0 });
  tl.from(canvas, 1, { opacity: 0 });
}

function hpProjectLanding() {
  $(function () {
    var tl = gsap.timeline({
      onComplete: function () {
        let url = window.location.href;

        var minorSlide = url.substr(url.length - 1) - 1;

        if (minorSlide == 0) {
          var majorSlide = 5;
        } else if (minorSlide == 1) {
          var majorSlide = 4;
        } else if (minorSlide == 2) {
          var majorSlide = 3;
        } else if (minorSlide == 3) {
          var majorSlide = 2;
        } else if (minorSlide == 4) {
          var majorSlide = 1;
        }

        setTimeout(() => {
          $("#projects .minor").slick("slickGoTo", minorSlide);
          $("#projects .major").slick("slickGoTo", majorSlide);
        }, 50);

        setTimeout(() => {
          $("body").addClass("init__projects");
          $(".active").removeClass("active");
          $("#projects").addClass("active");
        }, 800);
      },
    });

    let scroller = $("#main");

    let pos = $("#projects").position().top;

    tl.set(scroller, {
      transform: "translateY(-" + pos + "px)",
    });
  });
}

function nextProject() {
  var pos = $("#footer").position().top;
  $("body").addClass("stop-scroll");
  let scroller = $("#main");
  gsap.to(scroller, 1, {
    transform: "translateY(-" + pos + "px)",
  });
  gsap.to("#footer .minor img:last-of-type", 1, { opacity: 1 });
  $("#footer").toggleClass("init bg__dark bg__light");
  gsap.to(".page-indicator", { width: 0 });
}

function contactLanding() {
  var tl = gsap.timeline({
    onComplete: function () {
      $("video")[0].play();
    },
  });

  tl.from("#contact .anim", {
    yPercent: 100,
    opacity: 0,
    stagger: 0.3,
    ease: "Power1.easeOut",
  });
  tl.from("#contact .container", { opacity: 0, ease: "Power1.easeOut" });
  tl.from("#contact .minor", 0.5, { opacity: 0, ease: "Power1.easeOut" });
}

$(function () {
  barba.init({
    sync: true,

    transitions: [
      {
        async leave(data) {
          const done = this.async();

          let nexthref = data.next.url.href;
          let currenthref = data.current.url.href;

          let dataTrigger = data.trigger;

          if (nexthref.indexOf("#project") >= 0) {
            if (currenthref.indexOf("projects") >= 0) {
              blobTransitionProject();
              await delay(1400);
            } else {
              screenTransitionLeave();
              await delay(1000);
            }
          } else if (nexthref.indexOf("projects") >= 0) {
            if (currenthref.indexOf("projects") >= 0) {
              if (
                dataTrigger == "back" ||
                dataTrigger == "forward" ||
                dataTrigger == "popstate"
              ) {
                screenTransitionLeave();
                await delay(1000);
              } else {
                nextProject();
                await delay(1500);
              }
            } else {
              blobTransition();
              await delay(1700);
            }
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
          let currenthref = data.current.url.href;

          let dataTrigger = data.trigger;

          if (nexthref.indexOf("#project") >= 0) {
            if (currenthref.indexOf("projects") >= 0) {
              hpProjectLanding();
            } else {
              screenTransitionEnterToProjects();
            }
          } else if (nexthref.indexOf("projects") >= 0) {
            if (currenthref.indexOf("projects") >= 0) {
              if (
                dataTrigger == "back" ||
                dataTrigger == "forward" ||
                dataTrigger == "popstate"
              ) {
                screenTransitionEnter();
                setTimeout(() => {
                  projectLanding();
                }, 700);
              } else {
                nextProjectLanding();
              }
            } else {
              projectLanding();
            }
          } else {
            screenTransitionEnter();
          }
          $(".cursor").removeClass(
            "active, active__slider, active__next-project"
          );
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
          preloaderScript.src = "/js/preloader.min.js";
          script.src = "/js/landing.min.js";
          next.container.appendChild(script);
          next.container.appendChild(preloaderScript);

          hpTransition();
        },
      },
      {
        namespace: "projects",
        beforeEnter({ next }) {
          let script = document.createElement("script");
          script.src = "/js/projects.min.js";
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
          script.src = "/js/studio.min.js";
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
          script.src = "/js/contact.min.js";
          next.container.appendChild(script);

          contactLanding();

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

    if (sessionStorage.getItem("visited")) {
      $("body").addClass("loaded");
    }
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
