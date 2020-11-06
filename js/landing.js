$(function () {
  if ($(window).width() < 901) {
    $(".index #landing").height(window.innerHeight - 60);
    $(".index #projects, .index #contact").height(window.innerHeight);
  }
});

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

  if ($(window).width() < 901) {
    if (next.is("#contact")) {
      pos = $("#projects").height() * 2;
    }
  }

  console.log(pos);
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

  if ($(window).width() < 901) {
    if (prev.is("#landing")) {
      pos = 0;
    } else if (prev.is("#projects")) {
      pos = $("#projects").height();
    }
  }

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

// detect swipe

$(function () {
  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ); // jQuery
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    let active = $("body").find(".active");
    let slider = active.find(".slider");

    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/

      if (xDiff > 0) {
        /* left swipe */
      } else {
        /* right swipe */
      }
    } else {
      if ($("body").is(".index")) {
        if (yDiff > 0) {
          // swipe up
          if ($("body").hasClass("disable-scroll")) {
            return false;
          }
          if (
            $("body").hasClass("loaded") &&
            !$("body").hasClass("init__projects")
          ) {
            initProjects();
          } else if ($("body").hasClass("slide__last")) {
            nextSection();
          } else {
            if (slideIndex >= 4) {
              return false;
            } else {
              $("body").removeClass("slide__first");
              nextSlide();
            }
          }
        } else {
          // swipe down
          if ($("body").hasClass("disable-scroll")) {
            return false;
          }
          if ($("body").hasClass("slide__first")) {
            $("body").removeClass("init__projects");
            prevSection();
          } else if ($("#contact").hasClass("active")) {
            prevSection();
          } else {
            if (slideIndex <= 0) {
              return false;
            } else {
              $("body").removeClass("slide__last");
              prevSlide();
            }
          }
        }
      }
    }

    /* reset values */
    xDown = null;
    yDown = null;
  }
});

$(function () {
  $("a.projects").click(function () {
    initProjects();
  });
});
