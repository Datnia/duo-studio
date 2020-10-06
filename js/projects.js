$(function () {
  var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");

  var containerWidth = document.getElementById("canvas").getBoundingClientRect()
    .width;

  var containerHeight = document
    .getElementById("canvas")
    .getBoundingClientRect().height;

  var width = (canvas.width = containerWidth),
    hgt = (canvas.height = containerHeight);

  canvas.width = 250;
  canvas.height = 250;

  // window.addEventListener("resize", function () {
  //   width = canvas.width = containerWidth;
  //   hgt = canvas.height = containerHeight;
  // });

  document.getElementById("canvas").appendChild(canvas);

  var circ = (4 * (Math.sqrt(2) - 1)) / 3;
  var c = circ;

  var count = Math.PI;

  function drawBezierCircle(cx, cy, r) {
    var c;
    var offsetX = 10 * Math.sin(count);
    var offsetY = 5 * Math.cos(count * 2);

    count += 0.015;

    ctx.translate(cx, cy); // translate to centerpoint

    ctx.beginPath();

    // top right
    c = circ + 0.2 * Math.sin(count);
    ctx.moveTo(offsetX + 0, offsetY + -r);
    ctx.bezierCurveTo(
      offsetX + c * r,
      offsetY + -r,
      offsetX + r,
      offsetY + -c * r,
      offsetX + r,
      offsetY + 0
    );

    // bottom right
    c = circ + 0.2 * Math.cos(count);
    ctx.bezierCurveTo(
      offsetX + r,
      offsetY + c * r,
      offsetX + c * r,
      offsetY + r,
      offsetX + 0,
      offsetY + r
    );

    // bottom left
    c = circ + 0.2 * Math.sin(count * 2);
    ctx.bezierCurveTo(
      offsetX + -c * r,
      offsetY + r,
      offsetX + -r,
      offsetY + c * r,
      offsetX + -r,
      offsetY + 0
    );

    // top left
    c = circ + 0.2 * Math.cos(count + 1);
    ctx.bezierCurveTo(
      offsetX + -r,
      offsetY + -c * r,
      offsetX + -c * r,
      offsetY + -r,
      offsetX + 0,
      offsetY + -r
    );

    ctx.fill();
    ctx.fillStyle = "#070c14";
  }

  function render() {
    requestAnimationFrame(render);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, hgt);

    drawBezierCircle(125, 125, 110);
  }

  render();
});

$(function () {
  let slider = $("#slider .container");

  slider.each(function () {
    let carousel = $(this);
    carousel.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      rows: 0,
      variableWidth: true,
      cssEase: "ease-out",
      infinite: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            centerMode: true,
          },
        },
      ],
    });

    if (carousel.parent().hasClass("left") && $(window).width() > 767) {
      carousel.slick("slickGoTo", 4);
    }
  });

  $(".fgth #slider .container").slick(
    "slickSetOption",
    "centerMode",
    true,
    true
  );
});
// START SCROLLTRIGGER

$(function () {
  let video = $("video");

  video.each(function () {
    let trigger = $(this);
    gsap.from(trigger, 1, {
      scrollTrigger: {
        trigger: trigger,
        start: "top 75%",
        once: true,
        onEnter: function () {
          trigger[0].play();
        },
      },
      opacity: 0,
      y: 40,
    });
  });
});

$(function () {
  let anim = $(".st");

  anim.each(function () {
    let trigger = $(this);

    gsap.from(trigger, 1, {
      scrollTrigger: {
        trigger: trigger,
        start: "top 75%",
      },
      opacity: 0,
      y: 150,
    });
  });
});
