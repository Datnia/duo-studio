//PRELOADER

// $(document).ready(function() {
    
//     function blink() {

//         var r = Math.floor(Math.random() * 2) + 1;
//         let gif = $("#preloader .animation img");
//         let src = gif.attr("src");

//         setTimeout(() => {
//             gif.attr('src', src);
//         }, r * 1000);

//     }

//     setInterval(() => {
//         blink();
//     }, 2000);

//     function transition() {

//         var text = $("#preloader .subtitle h1:not(.slide-off):not(:last-of-type)").first();
//         var nextText = $("#preloader .subtitle h1:not(.slide-up):not(.slide-off)").first();

//         nextText.addClass("slide-up");
//         text.addClass("slide-off");

//     }

//     function initTransition () {
//         setInterval(() => {
//             transition();
//         }, 900);
//     }

//     setTimeout(() => {

//         $("#preloader .subtitle").fadeTo("slow", 1);

//         setTimeout(() => {
            
//         }, 1000);

//         setTimeout(() => {
//             $("#preloader .subtitle h1:first-of-type").addClass("slide-up");
//             initTransition();
//         }, 700);
//     }, 1000);

//     setTimeout(() => {

//         gsap.to("#preloader .clone h1", {duration: 1, opacity: 1});
//         gsap.to("#preloader .u h1", {duration: 1, opacity: 1})


//     }, 4700);
// });