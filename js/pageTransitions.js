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
    // height = scrollWrap.getBoundingClientRect().height - 1,
    speed = 0.03;

  var offset = 0;

  // body.style.height = Math.floor(height) + "px";
  $(window).on("load", function () {
    $("body").height($(".viewport").innerHeight());
  });

  function smoothScroll() {
    offset += (window.pageYOffset - offset) * speed;

    var scroll = "translateY(-" + offset + "px) translateZ(0)";
    scrollWrap.style.transform = scroll;

    callScroll = requestAnimationFrame(smoothScroll);
  }

  smoothScroll();
}

// page transitions

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
  tl.from(canvas, 1, { opacity: 0 });
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

$(function () {
  barba.init({
    sync: true,

    transitions: [
      {
        async leave(data) {
          const done = this.async();

          blobTransition();
          await delay(1500);
          done();
        },

        async enter(data) {
          projectLanding();
        },

        async once(data) {
          projectLanding();
        },
      },
    ],
  });
  barba.hooks.afterLeave((data) => {
    // Set <body> classes for "next" page
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
    let nexthref = data.next.url.href;

    if (nexthref.indexOf("projects") >= 0) {
      $("script").remove();
      $.getScript("/js/projects.js");
      $(function () {
        initScroller();
      });
    } else {
      $("script").remove();
      $.getScript("/js/preloader.js");
      $.getScript("/js/landing.js");
    }
    $.getScript("/js/main.js");
  });

  barba.hooks.beforeEnter((data) => {
    let nexthref = data.next.url.href;

    if (nexthref.indexOf("projects") >= 0) {
      $("script").remove();
      $.getScript("/js/projects.js");
      $(function () {
        initScroller();
      });
    } else {
      $("script").remove();
      $.getScript("/js/preloader.js");
      $.getScript("/js/landing.js");
    }

    $.getScript("/js/main.js");
  });

  barba.hooks.enter((data) => {
    window.scrollTo(0, 0);
  });
});
