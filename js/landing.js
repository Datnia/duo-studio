sliders = $("#projects aside");

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

//Firefox
$("#projects").bind("DOMMouseScroll", function (e) {
  imgSlider = $("#projects .minor");
  contentSlider = $("#projects .major");
  if (e.originalEvent.detail > 0) {
    imgSlider.slick("slickPrev");
    contentSlider.slick("slickNext");
  } else {
    imgSlider.slick("slickNext");
    contentSlider.slick("slickPrev");
  }

  return false;
});

//IE, Opera, Safari
$("#projects").bind("mousewheel", function (e) {
  if (e.originalEvent.wheelDelta < 0) {
    imgSlider.slick("slickPrev");
    contentSlider.slick("slickNext");
  } else {
    imgSlider.slick("slickNext");
    contentSlider.slick("slickPrev");
  }

  return false;
});
