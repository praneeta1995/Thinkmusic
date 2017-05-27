jQuery(document).on("ready", function ($) {
    "use strict";
    $(".carousel-inner .item:first-child").addClass("active");
    /* ScrolltoTop Active*/
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
    /* PrettyPhoto Active */
    $("a[data-lightbox^='prettyPhoto']").prettyPhoto();
    /* JP Player Active */
    $(".jp-playlist ul").niceScroll({
        scrollspeed: 60,
        cursorborder: "0px solid #fff",
        mousescrollstep: 30,
        cursorwidth: "5px",
        cursorborderradius: "2px",
        autohidemode: false,
    });
    /*---Header text slider, About image slider, About testimonial slider > Active ---*/
    $(".news_slide,.feature_slide,.video_slide,.album_slide,.event_slide").owlCarousel({
        items: 1,
        loop: true,
        autoplayTimeout: 7000,
        center:true,
        margin: 30,
        smartSpeed: 500,
        animateIn: "fadeIn",
        animateOut: "fadeOut"
    });
    /*Bottom Player Toggle Active */
    $("button.player-toggle").on("click", function () {
        $(".footer-bottom").toggleClass("plshow");
    });

    $(".jp-list").on("click", function () {
        $(".jp-playlist").toggle();
    });
    $("button.player-toggle").on("click", function () {
        $(".jp-playlist").hide();
    });
    /* WoW JS Active */
    var wow = new WOW();
    wow.init();
    /*
        SLIDER ACTIVE
    ------------------------------*/
    var mySlider = $('.pogoSlider').pogoSlider({
        pauseOnHover: false
    }).data('plugin_pogoSlider');
    /* 3. Mainmenu sticky Js
    --------------------------------- */
    function sticky_relocate() {
        var window_top = $(window).scrollTop();
        var div_top = $('#sticky-helper').offset().top;
        if (window_top > div_top) {
            $('.mainmenu-area').addClass('stick');
        } else {
            $('.mainmenu-area').removeClass('stick');
        }
    }
    $(window).scroll(sticky_relocate);
    sticky_relocate();
}(jQuery));