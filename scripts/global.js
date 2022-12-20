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
});

window.addEventListener("load", (event) => {
  // NAV
  navItems = document.querySelectorAll(".nav-item, .egg");
  containerItems = document.querySelectorAll(".nav-container__inner");

  navItems.forEach((item, i) => {
    var el = containerItems[i].querySelector(".nav-marquee"),
      container = el.querySelector(".nav-marquee__container"),
      marquee = el.querySelector(".nav-marquee__inner"),
      w = marquee.clientWidth,
      x = Math.round(window.innerWidth / w + 1),
      dur = 3;

    if (window.innerWidth < 768) {
      var dur = 3;
    }

    for (var y = 0; y < x; y++) {
      var clone = marquee.cloneNode(true);
      container.appendChild(clone);
    }

    var marqueeTl = gsap.timeline({ paused: true });
    marqueeTl.to(container, {
      duration: dur,
      ease: "none",
      x: "-=" + w,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x)),
      },
      repeat: -1,
    });
    item.addEventListener("mouseenter", function () {
      containerItems[i].classList.add("active");
      document.body.classList.add("init__nav");
      marqueeTl.play();
    });

    item.addEventListener("mouseleave", function () {
      containerItems[i].classList.remove("active");
      document.body.classList.remove("init__nav");
      marqueeTl.pause();
    });
  });
});

function loadGlobalScripts() {
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
  // SLIDERS

  const sliders = new Swiper(".slider", {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    speed: 1000,
    allowTouchMove: true,
    preloadImages: false,
    allowTouchMove: false,
    effect: "creative",
    creativeEffect: {
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
    spaceBetween: 30,
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
    breakpoints: {
      900: {
        spaceBetween: 50,
      },
    },
  });

  // PRE-SPLIT / GLOBAL TEXT LOAD
  gsap.utils.toArray(".split__headline").forEach((headline) => {
    var splitInner = new SplitText(headline, {
      type: "lines",
      linesClass: "line__inner",
    });

    var splitOuter = new SplitText(headline, {
      type: "lines",
      linesClass: "line__outer",
    });

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

  gsap.utils.toArray(".st__image").forEach((image) => {
    var pos = image.getAttribute("data-attribute-pos");
    var fade = image.getAttribute("data-attribute-fade");

    if (pos == "right") {
      var skew = -10;
      var y = "20";
    } else {
      var skew = 10;
      var y = "-20";
    }

    if (fade) {
      var opacity = 1;
    } else {
      var opacity = 0;
    }

    gsap.from(image, 0.8, {
      skewY: skew,
      yPercent: 50,
      opacity: opacity,
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

  if (h > 650) {
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
  }

  gsap.utils.toArray(".bg__trigger").forEach((section) => {
    if (section.classList.contains("footer-spacer")) {
      var end = "95% 100%";
    } else {
      var end = "bottom 50%";
    }

    if (section.classList.contains("is__light")) {
      ScrollTrigger.create({
        trigger: section,
        start: end,
        end: end,
        toggleClass: { targets: "body", className: "bg__dark" },
      });
    } else {
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: end,
        toggleClass: { targets: "body", className: "bg__dark" },
      });
    }
  });
}

function loadIndexScripts() {
  document.querySelector(".barba-container").classList.remove("loading");

  var loaderTl = gsap.timeline();
  loaderTl.from(".promo", {
    opacity: 0,
    delay: 0.2,
    ease: "Power2.easeIn",
  });

  // HEADER PIN

  var trigger = document.querySelector(".top"),
    end = document.querySelector("#banner").clientHeight - trigger.clientHeight;

  ScrollTrigger.create({
    trigger: trigger,
    start: "top top",
    end: end,
    pinnedContainer: trigger,
    pinType: "transform",
    pin: true,
  });

  // gsap.utils.toArray(".card").forEach((card, i) => {
  //   var video = card.querySelector("video");

  //   card.addEventListener("mouseenter", function () {
  //     video.play();
  //     video.loop = true;
  //   });

  //   card.addEventListener("mouseleave", function () {
  //     video.pause();
  //     video.loop = false;
  //   });
  // });
  document.querySelectorAll("#clients .inner").forEach((client, i) => {
    client.addEventListener("mouseenter", function () {
      document.body.classList.add("cursor__image", "init__" + (i + 1));
    });
    client.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor__image", "init__" + (i + 1));
    });
  });
  document.querySelectorAll("#clients header h1").forEach((headline, i) => {
    if (i > 0) {
      headline.addEventListener("click", function () {
        headline.closest("section").classList.add("init__clients");
      });
    } else {
      headline.addEventListener("click", function () {
        headline.closest("section").classList.remove("init__clients");
      });
    }
  });
}

function loadStudioScripts() {
  document.querySelector(".barba-container").classList.remove("loading");

  document.querySelectorAll(".accordion").forEach((accordion) => {
    var header = accordion.querySelector(".header"),
      end = accordion.clientHeight - header.clientHeight - 3;

    ScrollTrigger.create({
      trigger: header,
      start: "top top",
      end: () => "+=" + end,
      pinnedContainer: accordion,
      pinType: "transform",
      onRefreshInit: (self) => self.scroll(0),
      pin: true,
    });
  });
}

function loadContactScripts() {
  document.querySelector(".barba-container").classList.remove("loading");
  gsap.to("#banner .row", {
    yPercent: 30,
    scrollTrigger: {
      trigger: "#banner .row",
      start: "top bottom",
      scrub: true,
    },
  });

  document.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("focus", function () {
      var parent = this.closest(".input-wrapper");
      parent.classList.add("active");
    });

    input.addEventListener("focusout", function () {
      var parent = this.closest(".input-wrapper");
      parent.classList.remove("active");
    });
  });
  // TEXTAREA AUTOHEIGHT
  // source:https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      "style",
      "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
    );
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    ScrollTrigger.refresh();
  }
}

function loadWorkScripts() {
  document.querySelector(".barba-container").classList.remove("loading");
}

function loadProjectScripts() {
  document.querySelector(".barba-container").classList.remove("loading");
  ScrollTrigger.create({
    trigger: "#sec__001",
    start: "top 50%",
    end: "bottom 50%",
    onEnter: function () {
      document.body.classList.add("intro-leave");
    },
    onLeaveBack: function () {
      document.body.classList.remove("intro-leave");
    },
  });
  gsap.utils.toArray(".pin__sticky").forEach((pin, i) => {
    var trigger = pin.querySelector(".minor");
    var bar = pin.querySelector(".bar");
    ScrollTrigger.create({
      trigger: trigger,
      start: "top 125px",
      end: "80% top",
      pinnedContainer: trigger,
      pinType: "transform",
      onRefreshInit: (self) => self.scroll(0),
      onUpdate: (self) => (bar.style.width = self.progress * 100 + "%"),
      pin: true,
    });
  });
}

function loadEggScripts() {
  const eggSlider = new Swiper(".slider__egg", {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    speed: 1000,
    allowTouchMove: true,
    preloadImages: false,
    allowTouchMove: false,
    effect: "creative",
    creativeEffect: {
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
  });
  gsap.set(".cursor__egg", { xPercent: -50, yPercent: -50 });
  var cursor = document.querySelector(".cursor__egg");
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
  document.querySelector(".barba-container").classList.remove("loading");
  var loaderTl = gsap.timeline();
  loaderTl.from(".slider__egg", {
    opacity: 0,
    delay: 0.2,
  });

  var container = document.querySelector(".container"),
    headlines = container.querySelectorAll("h1"),
    h = headlines[0].clientHeight * 1.1;

  var headlineTl = gsap.timeline({
    repeat: -1,
    paused: true,
  });

  headlines.forEach((headline, i) => {
    var nextHeadline = headline.nextElementSibling;
    if (!nextHeadline) {
      var nextHeadline = headlines[0];
    }

    headlineTl.to(headline, 1, {
      y: -h,
      rotation: -5,
      opacity: 0,
      ease: "power2.inOut",
    });
    headlineTl.to(
      nextHeadline,
      1,
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        ease: "power2.inOut",
      },
      "<"
    );

    headlineTl.set(headline, {
      y: h,
      rotation: 5,
      opacity: 0,
    });
    headlineTl.addPause();
  });

  var display = document.querySelectorAll(".display");

  display.forEach((el, i) => {
    var inner = el.querySelectorAll(".display__inner");
    var innerHeight = inner[0].clientHeight;
    var displayTl = gsap.timeline({
      repeat: -1,
      paused: true,
    });
    inner.forEach((innerEl) => {
      var nextEl = innerEl.nextElementSibling;
      if (!nextEl) {
        var nextEl = inner[0];
      }
      console.log(nextEl);
      displayTl.to(innerEl, 1, {
        y: -innerHeight,
        ease: "power2.inOut",
      });
      displayTl.to(
        nextEl,
        1,
        {
          y: 0,
          ease: "power2.inOut",
        },
        "<"
      );

      displayTl.set(innerEl, {
        y: innerHeight,
      });
      displayTl.addPause();
    });

    container.addEventListener("click", function () {
      displayTl.play();
    });
  });

  container.addEventListener("click", function () {
    eggSlider.slideNext();
    headlineTl.play();
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  var nav = document.querySelector("nav"),
    navItems = document.querySelectorAll(".nav-item, .egg");
  function pageTransitionLeave() {
    var tl = gsap.timeline({
      onComplete: function () {
        nav.classList.add("no-pointer");
      },
    });
    tl.to(".page-transition", {
      skewX: 0,
      skewY: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      ease: "power3.InOut",
    });
  }

  function pageTransitionEnter(data) {
    var tl = gsap.timeline();
    tl.to(".page-transition", {
      opacity: 0,
      ease: "power3.Out",
    });
    tl.set(".page-transition", { clearProps: "all" });
    nav.classList.remove("no-pointer");
  }

  function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }
  barba.hooks.beforeEnter((data) => {
    var scrollContainer = data.next.container,
      fullHeight = document.querySelectorAll(".full-height"),
      namespace = data.next.namespace;

    fullHeight.forEach((el) => {
      el.style.height = document.documentElement.clientHeight + "px";
    });

    navItems.forEach((item) => {
      var attr = item.getAttribute("data-attribute-item");
      if (attr == namespace) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    imagesLoaded(scrollContainer, function () {
      window.scrollTo(0, 0);

      let scroller = ScrollSmoother.create({
        smooth: 0.3,
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
          pageTransitionLeave(data);
          await delay(1500);
          done();
        },

        async enter(data) {
          pageTransitionEnter(data);
        },

        async once(data) {
          var namespace = data.next.namespace;
          navItems.forEach((item) => {
            var attr = item.getAttribute("data-attribute-item");
            if (attr == namespace) {
              item.classList.add("active");
            }
          });
        },
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

      {
        namespace: "contact",
        afterEnter({ next }) {
          var scrollContainer = next.container;
          imagesLoaded(scrollContainer, function () {
            loadContactScripts();
            ScrollTrigger.refresh();
          });
        },
      },

      {
        namespace: "work",
        afterEnter({ next }) {
          var scrollContainer = next.container;
          imagesLoaded(scrollContainer, function () {
            loadWorkScripts();
            ScrollTrigger.refresh();
          });
        },
      },

      {
        namespace: "project",
        afterEnter({ next }) {
          var scrollContainer = next.container;
          imagesLoaded(scrollContainer, function () {
            loadProjectScripts();
            ScrollTrigger.refresh();
          });
        },
      },

      {
        namespace: "easter-egg",
        afterEnter({ next }) {
          var scrollContainer = next.container;
          imagesLoaded(scrollContainer, function () {
            loadEggScripts();
            ScrollTrigger.refresh();
          });
        },
      },
    ],
  });
});
