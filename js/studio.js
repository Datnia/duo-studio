$(function () {
  $("#services").mouseenter(function () {
    $(".cursor").addClass("bg__dark");
  });

  $("#services").mouseleave(function () {
    $(".cursor").removeClass("bg__dark");
  });
});

$(function () {
  let content = $("#intro .content:not(:first-of-type)");
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

$(function () {
  let trigger = $("#services").position().top - 70;
  let triggerEnd = trigger + $("#services").innerHeight();

  let nav = $(".viewport .nav");

  setInterval(() => {
    var matrix = $("#main")
      .css("transform")
      .replace(/[^0-9\-.,]/g, "")
      .split(",");
    var x = matrix[12] || matrix[4];
    var y = matrix[13] || matrix[5];

    if (y * -1 > trigger && y * -1 < triggerEnd) {
      nav.addClass("dark");
    } else {
      nav.removeClass("dark");
    }
  }, 100);
});

$(function () {
  let services = $("body.studio #services .major .wrapper");

  var video = document.getElementById("video");

  services.each(function () {
    let trigger = $(this);
    gsap.from(trigger, 1, {
      scrollTrigger: {
        trigger: trigger,
        start: "top 40%",
        onEnter: function () {
          video.currentTime = 1;
        },
        onLeaveBack: function () {
          video.currentTime = 0;
        },
      },
      opacity: 0,
      y: 20,
      ease: "Power1.easeIn",
    });
  });
});

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
