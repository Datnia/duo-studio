//PRELOADER

$(document).ready(function() {
    
    function blink() {

        var r = Math.floor(Math.random() * 2) + 1;
        let gif = $("#preloader .animation img");
        let src = gif.attr("src");

        setTimeout(() => {
            gif.attr('src', src);
        }, r * 1000);

    }

    setInterval(() => {
        blink();
    }, 2000);


    function transition() {

        var text = $("#preloader .subtitle h1:not(.slide-off):not(:last-of-type)").first();
        var nextText = $("#preloader .subtitle h1:not(.slide-up):not(.slide-off)").first();

        nextText.addClass("slide-up");
        text.addClass("slide-off");

    }

    function initTransition () {
        setInterval(() => {
            transition();
        }, 1100);
    }

    setTimeout(() => {

        $("#preloader .subtitle").fadeTo("slow", 1);
        $("#preloader .letter.u h1").fadeTo(900, 1);

        setTimeout(() => {
            
            $("#preloader .letter h1").fadeTo(900, 1);

        }, 1000);

        setTimeout(() => {
            $("#preloader .subtitle h1:first-of-type").addClass("slide-up");
            initTransition();
        }, 2000);
    }, 1500);

    setTimeout(() => {

        gsap.timeline()
        .to("#preloader .letter.d h1", .7, {yPercent: -200}, 0)
        .to("#preloader .letter.o h1", .7, {yPercent: 200}, 0)
        .from("body", 0.5, {css:{className:'+=initialized'}})

        // $("body").addClass("initialized");



        // setTimeout(() => {

        //     gsap.to("#preloader .clone", {duration: .5, opacity: 1})
        //     

        // }, 1000);

    }, 7500);
});

