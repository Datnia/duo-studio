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
  });

  slider.find(".slick-current").addClass("allow-pointer");
  slider.on("afterChange", function () {
    $(".slick-slide").removeClass("allow-pointer");
    $("#projects .minor .slick-current").addClass("allow-pointer");
  });
});

function nextSlide() {
  imgSlider.slick("slickPrev");
  contentSlider.slick("slickNext");
}

function prevSlide() {
  imgSlider.slick("slickNext");
  contentSlider.slick("slickPrev");
}

imgSlider = $("#projects .minor");
contentSlider = $("#projects .major");

contentSlider.on("afterChange", function (
  event,
  slick,
  currentSlide,
  nextSlide
) {
  slideIndex = currentSlide;
});

//Firefox
$("#projects").bind("DOMMouseScroll", function (e) {
  if (e.originalEvent.detail > 0) {
    if (slideIndex >= 4) {
      return false;
    } else {
      nextSlide();
    }
  } else {
    if (slideIndex <= 0) {
      return false;
    } else {
      prevSlide();
    }
  }

  return false;
});

//IE, Opera, Safari
$("#projects").bind("mousewheel", function (e) {
  if (e.originalEvent.wheelDelta < 0) {
    if (slideIndex >= 4) {
      return false;
    } else {
      nextSlide();
    }
  } else {
    if (slideIndex <= 0) {
      return false;
    } else {
      prevSlide();
    }
  }

  return false;
});
