document.addEventListener("DOMContentLoaded", function (event) {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Draggable, InertiaPlugin);

  gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

  var cursor = document.querySelector(".cursor");
  var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  var mouse = { x: pos.x, y: pos.y };
  var speed = 0.1;

  var fpms = 60 / 1000;

  var xSet = gsap.quickSetter(cursor, "x", "px");
  var ySet = gsap.quickSetter(cursor, "y", "px");

  document.body.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  gsap.ticker.add((time, deltaTime) => {
    var delta = deltaTime * fpms;
    var dt = 1.0 - Math.pow(1.0 - speed, delta);

    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
  });

  gsap.utils.toArray(".cursor__hide").forEach((el) => {
    el.addEventListener("mouseenter", function () {
      document.body.classList.add("cursor__hidden");
    });
    el.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor__hidden");
    });
  });

  document.querySelectorAll(".cursor__hover").forEach((hover) => {
    var text = hover.getAttribute("data-attribute-text");

    hover.addEventListener("mouseenter", function () {
      document.querySelector(".cursor span").textContent = text;
      document.body.classList.add("cursor__hover");
    });
    hover.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor__hover");
    });
  });
});

function loadGlobalScripts() {
  // SLIDERS

  const sliders = new Swiper(".slider", {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    speed: 1000,
    allowTouchMove: true,
    preloadImages: false,
    allowTouchMove: false,
    // loopPreventsSlide: false,
    effect: "creative",
    creativeEffect: {
      // prev: {
      //   translate: [0, "-50%", 0],
      //   // scale: 1.3,
      //   rotate: [0, 0, 0],
      //   origin: "right top",
      // },
      next: {
        translate: [0, "100%", 0],
        scale: 1.5,
        rotate: [0, 0, -15],
        origin: "right top",
      },
    },
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 3,
    },
    on: {
      // slideChangeTransitionStart: function () {
      //   console.log("Received slideChangeTransitionStart");
      // },
      // slideChangeTransitionEnd: function () {
      //   console.log("Received slideChangeTransitionEnd");
      // },
    },
  });

  if (sliders.length > 1) {
    sliders.forEach((slider) => {
      var clickable = slider.el;
      clickable.addEventListener("click", function () {
        slider.slideNext();
      });
    });
  } else {
    if (sliders.slides.length > 1) {
      var clickable = sliders.el;
      clickable.addEventListener("click", function () {
        sliders.slideNext();
      });
    }
  }
  const draggableSliders = new Swiper(".slider__draggable", {
    slidesPerView: "auto",
    allowTouchMove: true,
    spaceBetween: 50,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
      dragSize: 100,
    },
    freeMode: {
      enabled: true,
      sticky: false,
      momentumBounce: false,
    },
  });

  // PRE-SPLIT
  gsap.utils.toArray(".split__headline").forEach((headline) => {
    var split = new SplitText(headline, {
      type: "lines",
      linesClass: "line",
    });
  });

  // TEXT TRANSITIONS
  gsap.utils.toArray(".st__headline").forEach((headline) => {
    var splitInner = new SplitText(headline, {
      type: "lines",
      linesClass: "line__inner",
    });

    var splitOuter = new SplitText(headline, {
      type: "lines",
      linesClass: "line__outer",
    });

    if (headline.classList.contains("headline__footer")) {
      var tl = gsap.timeline({
        onComplete: function () {
          gsap.set(headline, { pointerEvents: "initial" });
        },
        scrollTrigger: {
          trigger: headline,
          start: "top 45%",
        },
      });
      tl.from(splitInner.lines, 0.8, {
        yPercent: 50,
        rotation: 5,
        opacity: 0,
        ease: "Power2.easeOut",
        stagger: 0.1,
      });
    } else {
      var tl = gsap.timeline({
        onComplete: function () {
          gsap.set(headline, { pointerEvents: "initial" });
        },
        scrollTrigger: {
          trigger: headline,
          start: "top 75%",
        },
      });
      tl.from(splitInner.lines, 0.8, {
        yPercent: 50,
        rotation: 5,
        opacity: 0,
        ease: "Power2.easeOut",
        stagger: 0.1,
      });
    }
  });

  gsap.utils.toArray(".st__text").forEach((headline) => {
    gsap.from(headline, 1, {
      y: 40,
      opacity: 0,
      ease: "Power2.easeOut",
      scrollTrigger: {
        trigger: headline,
        start: "top 90%",
      },
    });
  });

  // IMAGE TRANSITIONS

  gsap.utils.toArray(".st__image").forEach((image, i) => {
    var pos = image.getAttribute("data-attribute-pos");
    if (pos == "right") {
      var skew = -10;
      var y = "20";
    } else {
      var skew = 10;
      var y = "-20";
    }

    gsap.from(image, 1, {
      skewY: skew,
      yPercent: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: image,
        start: "top 100%",
        ease: "power3.In",
      },
    });

    //PARALLAX

    var plaxEl = image.closest(".st__image-container");

    gsap.to(plaxEl, {
      yPercent: y,
      scrollTrigger: {
        trigger: plaxEl,
        start: "top bottom",
        scrub: true,
      },
    });
  });

  // MAGNETIC BUTTON

  var buttons = document.querySelectorAll(".btn__circle");

  buttons.forEach((btn) => {
    var offsetHoverMax = 1;
    var offsetHoverMin = 1;
    var hover = false;

    window.addEventListener("mousemove", function (e) {
      var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

      var cursor = {
        x: e.clientX,
        y: e.clientY + this.window.scrollY,
      };

      var width = btn.clientWidth;
      var height = btn.clientHeight;

      function getOffset(element) {
        if (!element.getClientRects().length) {
          return { top: 0, left: 0 };
        }

        let rect = element.getBoundingClientRect();
        let win = element.ownerDocument.defaultView;
        return {
          top: rect.top + win.pageYOffset,
          left: rect.left + win.pageXOffset,
        };
      }
      var offset = getOffset(btn);

      var elPos = {
        x: offset.left + width / 2,
        y: offset.top + height / 2,
      };

      var x = cursor.x - elPos.x;
      var y = cursor.y - elPos.y;

      var dist = Math.sqrt(x * x + y * y);

      var mutHover = false;

      if (dist < width * hoverArea) {
        mutHover = true;
        if (!hover) {
          hover = true;
        }
        onHover(x, y);
      }

      if (!mutHover && hover) {
        onLeave();
        hover = false;
      }
    });

    var onHover = function (x, y) {
      document.body.classList.add("cursor__hidden");
      btn.classList.add("active");
      gsap.to(btn, 0.4, {
        x: x * 0.4,
        y: y * 0.4,
        ease: Power2.easeOut,
      });
      gsap.to(btn.querySelector("p"), 0.4, {
        x: x * 0.1,
        y: y * 0.1,
        ease: Power2.easeOut,
      });
    };
    var onLeave = function () {
      document.body.classList.remove("cursor__hidden");
      btn.classList.remove("active");
      gsap.to(btn, 1, {
        x: 0,
        y: 0,
        scale: 1,
        ease: Elastic.easeOut.config(1.2, 0.4),
      });
      gsap.to(btn.querySelector("p"), 1, {
        x: 0,
        y: 0,
        scale: 1,
        ease: Elastic.easeOut.config(1.2, 0.4),
      });
    };
  });

  // LINES

  gsap.utils.toArray(".st__line").forEach((line, i) => {
    gsap.from(line, 0.8, {
      width: 0,
      scrollTrigger: {
        trigger: line,
        start: "top bottom",
        ease: "Power2.easeIn",
      },
    });
  });

  // FOOTER

  var footerPin = document.querySelector(".footer-spacer");
  var h = window.innerHeight;
  gsap.from("footer", {
    yPercent: -50,
    opacity: 0,
    scrollTrigger: {
      trigger: footerPin,
      start: "top bottom",
      scrub: true,
      end: "+=" + h,
    },
  });

  gsap.utils.toArray(".bg__trigger").forEach((section) => {
    if (section.classList.contains("footer-spacer")) {
      var end = "95% 100%";
    } else {
      var end = "bottom 70%";
    }
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: end,
      toggleClass: { targets: "body, .bg__dark", className: "bg__light" },
    });
  });
}

function loadIndexScripts() {
  gsap.to(".promo-spacer", {
    height: 0,
    scrollTrigger: {
      trigger: "#banner .top",
      pin: true,
      scrub: true,
      end: "+=600",
      onLeave: function () {
        ScrollTrigger.refresh();
      },
    },
  });
  gsap.utils.toArray(".card").forEach((card, i) => {
    var video = card.querySelector("video");

    card.addEventListener("mouseenter", function () {
      video.play();
      video.loop = true;
    });

    card.addEventListener("mouseleave", function () {
      video.pause();
      video.loop = false;
    });
  });
}

function loadStudioScripts() {
  document.querySelectorAll(".accordion").forEach((accordion) => {
    accordion.addEventListener("click", function () {
      this.classList.toggle("active");
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);
    });
  });

  document.querySelectorAll("#clients .inner").forEach((client, i) => {
    client.addEventListener("mouseenter", function () {
      document.body.classList.add("cursor__image", "init__" + (i + 1));
    });
    client.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor__image", "init__" + (i + 1));
    });
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  function pageTransitionLeave() {}

  function pageTransitionEnter() {}

  function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }

  barba.hooks.beforeEnter((data) => {
    var scrollContainer = data.next.container;

    var fullHeight = document.querySelectorAll(".full-height");

    fullHeight.forEach((el) => {
      el.style.height = document.documentElement.clientHeight + "px";
    });

    imagesLoaded(scrollContainer, function () {
      window.scrollTo(0, 0);

      let scroller = ScrollSmoother.create({
        smooth: 0.4,
      });

      loadGlobalScripts();
    });
  });

  barba.init({
    transitions: [
      {
        name: "general-transition",
        async leave(data) {
          const done = this.async();
          pageTransitionLeave();
          await delay(1500);

          done();
        },

        async enter(data) {
          pageTransitionEnter();
        },

        async once(data) {},
      },
    ],

    views: [
      {
        namespace: "home",
        afterEnter({ next }) {
          var scrollContainer = next.container;
          imagesLoaded(scrollContainer, function () {
            loadIndexScripts();
            ScrollTrigger.refresh();
          });
        },
      },
      {
        namespace: "studio",
        afterEnter({ next }) {
          var scrollContainer = next.container;
          imagesLoaded(scrollContainer, function () {
            loadStudioScripts();
            ScrollTrigger.refresh();
          });
        },
      },
    ],
  });
});
