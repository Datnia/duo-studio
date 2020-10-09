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
  let anim = $(".img__service .img-wrapper .design");
  gsap.to(anim, { display: "block", stagger: 0.125 });
}

function playVideoDev() {
  let anim = $(".img__service .img-wrapper .dev");
  gsap.to(anim, { display: "block", stagger: 0.125 });
}

function playVideoBranding() {
  let anim = $(".img__service .img-wrapper .branding");
  gsap.to(anim, { display: "block", stagger: 0.125 });
}

function playVideoIllustration() {
  let anim = $(".img__service .img-wrapper .illustration");
  gsap.to(anim, { display: "block", stagger: 0.125 });
}

//start reverse

function revVideoDesign() {
  let anim = $(".img__service .img-wrapper .design");
  gsap.to(anim, { display: "none", stagger: -0.125 });
}

function revVideoDev() {
  let anim = $(".img__service .img-wrapper .dev");
  gsap.to(anim, { display: "none", stagger: -0.125 });
}

function revVideoBranding() {
  let anim = $(".img__service .img-wrapper .branding");
  gsap.to(anim, { display: "none", stagger: -0.125 });
}

function revVideoIllustration() {
  let anim = $(".img__service .img-wrapper .illustration");
  gsap.to(anim, { display: "none", stagger: -0.125 });
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

          if (isActive) {
            if (direction > 0) {
              if (init.is(":nth-child(1)")) {
                playVideoDesign();
              } else if (init.is(":nth-child(2)")) {
                playVideoDev();
              } else if (init.is(":nth-child(3)")) {
                playVideoBranding();
              } else if (init.is(":nth-child(4)")) {
                playVideoIllustration();
              }
            } else {
              if (init.is(":nth-child(1)")) {
                revVideoDev();
              } else if (init.is(":nth-child(2)")) {
                revVideoBranding();
              } else if (init.is(":nth-child(3)")) {
                revVideoIllustration();
              }
            }
          }
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
