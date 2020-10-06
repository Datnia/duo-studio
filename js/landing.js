sliders = $("#projects aside");
slideIndex = 0;

sliders.each(function () {
  slider = $(this);

  slider.slick({
    arrows: false,
    vertical: true,
    centerMode: true,
    infinite: true,
    centerPadding: 0,
    cssEase: "ease-in-out",
    speed: 1000,
    draggable: false,
    rows: 0,
    slide: ".wrapper",
  });

  slider.find(".slick-current").addClass("allow-pointer");
  slider.on("afterChange", function () {
    $(".slick-slide").removeClass("allow-pointer");
    $("#projects .minor .slick-current").addClass("allow-pointer");
  });
});

function prevSlide() {
  imgSlider.slick("slickPrev");
  contentSlider.slick("slickNext");
}

function nextSlide() {
  imgSlider.slick("slickNext");
  contentSlider.slick("slickPrev");
}

imgSlider = $("#projects .minor");
contentSlider = $("#projects .major");

imgSlider.on("afterChange", function (event, slick, currentSlide, nextSlide) {
  slideIndex = currentSlide;
  if (slideIndex == 4) {
    $("body").addClass("slide__last");
  }
  if (slideIndex == 0) {
    $("body").addClass("slide__first");
  }
});

function initProjects() {
  var tl = gsap.timeline({
    onStart: function () {
      $("body").addClass("disable-scroll");
    },
    onComplete: function () {
      $("body").removeClass("disable-scroll");
    },
  });

  let scroller = $("#main");
  let pos = $("#projects").position().top;
  tl.to(scroller, 2, {
    transform: "translateY(-" + pos + "px)",
    ease: "Power3.easeInOut",
  });

  setTimeout(() => {
    $("body").addClass("init__projects slide__first");
    $(".active").removeClass("active");
    $("#projects").addClass("active");
  }, 500);

  return false;
}

function nextSection() {
  if ($("#contact").hasClass("active")) {
    return false;
  }
  var next = $(".active").next();
  let scroller = $("#main");
  let pos = next.position().top;

  var tl = gsap.timeline({
    onStart: function () {
      $("body").addClass("disable-scroll");
      if (next.is("#contact")) {
        setTimeout(() => {
          next.removeClass("uninit");
        }, 1000);
      }
    },
    onComplete: function () {
      $("body").removeClass("disable-scroll");

      $(".active").removeClass("active");
      next.addClass("active");
    },
  });
  tl.to(scroller, 2, {
    transform: "translateY(-" + pos + "px)",
    ease: "Power3.easeInOut",
  });

  return false;
}

function prevSection() {
  var prev = $(".active").prev();
  let scroller = $("#main");
  let pos = prev.position().top;

  var tl = gsap.timeline({
    onStart: function () {
      $("body").addClass("disable-scroll");
    },
    onComplete: function () {
      $("body").removeClass("disable-scroll");

      $(".active").removeClass("active");
      prev.addClass("active");
    },
  });

  tl.to(scroller, 2, {
    transform: "translateY(-" + pos + "px)",
    ease: "Power3.easeInOut",
  });

  return false;
}

$(function () {
  $("video").trigger("play");
  $("body").on("wheel", function (e) {
    if ($(this).is(".index")) {
      console.log("ran");

      if ($(this).hasClass("disable-scroll")) {
        return false;
      }

      if (e.originalEvent.deltaY < 0) {
        // up

        if ($(this).hasClass("slide__first")) {
          $(this).removeClass("init__projects");
          prevSection();
        } else if ($("#contact").hasClass("active")) {
          prevSection();
        } else {
          if (slideIndex <= 0) {
            return false;
          } else {
            $(this).removeClass("slide__last");
            prevSlide();
          }
        }
      } else {
        //down
        if ($(this).hasClass("loaded") && !$(this).hasClass("init__projects")) {
          initProjects();
        } else if ($(this).hasClass("slide__last")) {
          nextSection();
        } else {
          if (slideIndex >= 4) {
            return false;
          } else {
            $(this).removeClass("slide__first");
            nextSlide();
          }
        }
      }
    }
  });
});

$(function () {
  $("a.projects").click(function () {
    initProjects();
  });
});
