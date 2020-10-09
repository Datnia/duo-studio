$(function () {
  let logoSlider = $(".logo-carousel");

  logoSlider.slick({
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 2000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    rows: 0,
    infinite: true,
  });
});

$(function () {
  $("#services").mouseenter(function () {
    $(".cursor").addClass("bg__dark");
  });

  $("#services").mouseleave(function () {
    $(".cursor").removeClass("bg__dark");
  });
});

$(function () {
  let content = $("#intro .content:not(:first-of-type), #intro div.content");
  content.each(function () {
    let trigger = $(this);

    gsap.from(trigger, 1, {
      scrollTrigger: {
        trigger: trigger,
        start: "top 80%",
      },
      opacity: 0,
      y: 40,
      ease: "Power1.easeIn",
    });
  });
});

function playVideoDesign() {
  var video = document.getElementById("video");

  var tl = gsap.timeline();
  tl.to(video, 0.125, { currentTime: 0.125 });
  tl.to(video, 0.125, { currentTime: 0.25, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 0.375, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 0.5, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 0.625, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 0.75, delay: 0.125 });
}

function playVideoDev() {
  var video = document.getElementById("video");

  var tl = gsap.timeline();
  tl.to(video, 0.125, { currentTime: 0.875 });
  tl.to(video, 0.125, { currentTime: 1, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 1.125, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 1.25, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 1.375, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 1.5, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 1.625, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 1.75, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 1.875, delay: 0.125 });
  tl.to(video, 0.125, { currentTime: 2, delay: 0.125 });
}

$(function () {
  $("body").click(function () {
    playVideoDev();
  });
});

function playVideoBranding() {
  var video = document.getElementById("video");
  var fps = 8;
  video.currentTime += 1 / fps;

  if (video.currentTime <= 3.25) {
    setTimeout(playVideoBranding, 1000 / fps);
  }
}

function playVideoIllustration() {
  var video = document.getElementById("video");
  var fps = 8;
  video.currentTime += 1 / fps;

  if (video.currentTime <= 4.375) {
    setTimeout(playVideoIllustration, 1000 / fps);
  }
}

//start reverse

function revVideoDesign() {
  var video = document.getElementById("video");

  var fps = 8;
  var play = setInterval(() => {
    if (video.currentTime < 0) {
      video.currentTime = 0;
      clearInterval(play);
    }
    video.currentTime += -(1 / fps);
  }, 1000 / fps);
}

function revVideoDev() {
  var video = document.getElementById("video");

  var fps = 8;
  var play = setInterval(() => {
    if (video.currentTime <= 1) {
      clearInterval(play);
    }
    video.currentTime += -(1 / fps);
  }, 1000 / fps);
}

function revVideoBranding() {
  var video = document.getElementById("video");

  var fps = 8;
  var play = setInterval(() => {
    if (video.currentTime <= 2.125) {
      clearInterval(play);
    }
    video.currentTime += -(1 / fps);
  }, 1000 / fps);
}

function revVideoIllustration() {
  var video = document.getElementById("video");

  var fps = 8;
  var play = setInterval(() => {
    if (video.currentTime <= 3.375) {
      clearInterval(play);
    }
    video.currentTime += -(1 / fps);
  }, 1000 / fps);
}

$(function () {
  let services = $("body.studio #services .major .wrapper");

  services.each(function () {
    let trigger = $(this);
    var end = trigger.outerHeight();

    var i = trigger.index();
    let init = $(".content__service .major").children().eq(i);

    gsap.to(init, 1, {
      scrollTrigger: {
        trigger: trigger,
        start: "top 50%",
        end: "+=" + end,
        onToggle: function ({ isActive, direction }) {
          if (isActive) {
            init.addClass("active");
          } else {
            if ($(init).is(":first-of-type") && direction < 0) {
              return;
            } else if ($(init).is(":last-of-type") && direction > 0) {
              return;
            } else {
              init.removeClass("active");
            }
          }

          // if (isActive) {
          //   if (direction > 0) {
          //     if (init.is(":nth-child(1)")) {
          //       playVideoDesign();
          //     } else if (init.is(":nth-child(2)")) {
          //       playVideoDev();
          //     } else if (init.is(":nth-child(3)")) {
          //       playVideoBranding();
          //     } else if (init.is(":nth-child(4)")) {
          //       playVideoIllustration();
          //     }
          //   } else {
          //     if (init.is(":nth-child(1)")) {
          //       revVideoDev();
          //     } else if (init.is(":nth-child(2)")) {
          //       revVideoBranding();
          //     } else if (init.is(":nth-child(3)")) {
          //       revVideoIllustration();
          //     }
          //   }
          // }
        },
      },
    });
  });
});

// $(function () {
//   let trigger = $("#services").position().top - 70;
//   let triggerEnd = trigger + $("#services").height();

//   let nav = $(".viewport .nav");

//   setInterval(() => {
//     var matrix = $("#main")
//       .css("transform")
//       .replace(/[^0-9\-.,]/g, "")
//       .split(",");
//     var x = matrix[12] || matrix[4];
//     var y = matrix[13] || matrix[5];

//     if (y * -1 > trigger && y * -1 < triggerEnd) {
//       nav.addClass("dark");
//     } else {
//       nav.removeClass("dark");
//     }
//   }, 100);
// });

$(function () {
  let contact = $("#contact");

  gsap.to(contact, {
    scrollTrigger: {
      trigger: contact,
      start: "top 30%",
      onEnter: function () {
        contact.removeClass("uninit");
      },
    },
  });
});
