function preload() {
  $("body").addClass("disable-scroll");

  function blink() {
    var r = Math.floor(Math.random() * 2) + 1;
    let gif = $("#preloader .animation img");
    let src = gif.attr("src");

    setTimeout(() => {
      gif.attr("src", src);
    }, r * 1000);
  }

  setInterval(() => {
    blink();
  }, 2000);

  function getSVG() {
    var loadingSvg = Math.floor(Math.random() * 5) + 1;
    var loadedSvg = Math.floor(Math.random() * 5) + 1;

    $("#preloader .loading-screen svg use").attr(
      "xlink:href",
      "#" + loadingSvg
    );
    $("#preloader .loaded-screen svg use").attr("xlink:href", "#" + loadedSvg);
  }

  getSVG();

  function transition() {
    var text = $(
      "#preloader .subtitle h1:not(.slide-off):not(:last-of-type)"
    ).first();
    var nextText = $(
      "#preloader .subtitle h1:not(.slide-up):not(.slide-off)"
    ).first();

    nextText.addClass("slide-up");
    text.addClass("slide-off");
  }

  function initTransition() {
    setInterval(() => {
      transition();
    }, 900);
  }

  setTimeout(() => {
    $("#preloader .subtitle").fadeTo("slow", 1);

    setTimeout(() => {
      $("#preloader .subtitle h1:first-of-type").addClass("slide-up");
      initTransition();
    }, 700);
  }, 1000);

  setTimeout(() => {
    var tl = gsap.timeline({
      onComplete() {
        $("body").addClass("loaded").removeClass("disable-scroll");
      },
    });
    tl.to("#preloader .loading-screen", {
      duration: 2,
      bottom: 0,
      ease: "Expo.easeIn",
    });
    tl.to("#preloader", {
      duration: 1.2,
      height: 0,
      top: -430,
      ease: "Expo.easeOut",
    });
    tl.set("#preloader", { display: "none" });
    tl.from("#landing video", 0.7, { opacity: 0, ease: "Power1.easeOut" });
    tl.from(
      "#landing .anim",
      {
        yPercent: 100,
        opacity: 0,
        stagger: 0.3,
        ease: "Power1.easeOut",
      },
      "-=.2"
    );
    tl.from(
      "#landing aside",
      1,
      { opacity: 0, ease: "Power1.easeOut" },
      "+=.3"
    );
  }, 4500);
}

function hpTransition() {
  var tl = gsap.timeline({
    onComplete() {
      $("body").addClass("loaded");
    },
  });

  tl.from("#landing video", 0.5, { opacity: 0, ease: "Power1.easeOut" });
  tl.from(
    "#landing .anim",
    {
      yPercent: 100,
      opacity: 0,
      stagger: 0.3,
      ease: "Power1.easeOut",
    },
    "-=.2"
  );
  tl.from("#landing aside", 1, { opacity: 0, ease: "Power1.easeOut" }, "+=.3");
}

$(function () {
  if (sessionStorage.getItem("visited")) {
    return;
  } else {
    preload();
    sessionStorage.setItem("visited", true);
  }
});
