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
        }, 900);
    }

    setTimeout(() => {

        $("#preloader .subtitle").fadeTo("slow", 1);

        setTimeout(() => {
            
        }, 1000);

        setTimeout(() => {
            $("#preloader .subtitle h1:first-of-type").addClass("slide-up");
            initTransition();
        }, 700);
    }, 1000);

    setTimeout(() => {

        var tl = gsap.timeline();
        tl.to("#preloader .clone h1, #preloader .u h1", {duration: 1, color: "#070c14"})
        tl.to("#preloader .loading-screen", {duration: 1, height: "100%", ease: "Expo.easeInOut"})
        tl.set("#preloader .loading-screen", {top: 0, bottom:"unset"})
        tl.set("body",{className: "+=loaded"})
        tl.to("#preloader .loading-screen, #preloader", {duration: 1, height: 0, ease: "Expo.easeInOut"})
        tl.set("#preloader", {display: "none"})

    }, 4700);
});



