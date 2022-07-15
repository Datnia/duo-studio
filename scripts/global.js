document.addEventListener("DOMContentLoaded", function (event) {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Draggable, InertiaPlugin);

  let scroller = ScrollSmoother.create({
    smooth: 0.4,
    // effects: true,
  });

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

  gsap.utils.toArray(".hide-cursor").forEach((el) => {
    el.addEventListener("mouseenter", function () {
      document.body.classList.add("cursor__hidden");
    });
    el.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor__hidden");
    });
  });

  gsap.to(".promo-spacer", {
    height: 0,
    scrollTrigger: {
      trigger: "#banner .top",
      pin: true,
      scrub: true,
      end: "+=600",
      // anticipatePin: 1,
      onLeave: function () {
        ScrollTrigger.refresh();
      },
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
  gsap.utils.toArray(".st__headline .no-overflow").forEach((headline) => {
    var split = new SplitText(headline, {
      type: "lines",

      linesClass: "line",
    });

    gsap.from(split.lines, 0.8, {
      yPercent: 50,
      rotation: 5,
      opacity: 0,
      ease: "Power2.easeOut",
      stagger: 0.1,
      scrollTrigger: {
        trigger: headline,
        start: "top 80%",
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
      gsap.to(btn, 0.4, {
        x: x * 0.4,
        y: y * 0.4,
        // rotation: x * 0.05,
        ease: Power2.easeOut,
      });
    };
    var onLeave = function () {
      document.body.classList.remove("cursor__hidden");
      gsap.to(btn, 1, {
        x: 0,
        y: 0,
        scale: 1,
        // rotation: 0,
        ease: Elastic.easeOut.config(1.2, 0.4),
      });
    };
  });

  // FOOTER

  var pinText = document.querySelector("footer .split__headline .line");
  var pinTextParent = pinText.closest(".minor");
  gsap.to(pinText, {
    y: 0,
    rotation: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: pinTextParent,
      start: "top 80%",
      scrub: true,
      pin: true,
      end: "+=600",
    },
  });
});

// INDEX SCRIPTS ?

document.addEventListener("DOMContentLoaded", function (event) {
  gsap.utils.toArray(".card").forEach((card, i) => {
    var x = i + 1,
      y;

    if (x % 2 == 0) {
      y = "-6vw";
    } else {
      y = "6vw";
    }

    gsap.to(card, {
      y: y,
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        scrub: true,
      },
    });

    card.addEventListener("mouseenter", function () {
      document.body.classList.add("cursor__hover");
    });

    card.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor__hover");
    });
  });
});
