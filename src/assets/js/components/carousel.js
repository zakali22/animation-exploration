import {gsap} from "gsap"
import {changeMapLocation} from "./customMap.js"

const carousel = (function(){
    const carousel = $('.carousel-wrapper')
    let location;

    function initCarouselSlides(){
        carousel.slick({
            dots: true,
            infinite: false,
            speed: 0,
            cssEase: 'ease-in-out',
            slidesToShow: 1,
            adaptiveHeight: true,
            appendDots: document.querySelector('.map-dots')
        });
    
        // Before changing slide - change location on map
        carousel.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            location = slick.$slides[nextSlide].dataset.location
            changeMapLocation(location)
            // slick.$slides[currentSlide].classList.remove('fade-in')
            // slick.$slides[nextSlide].classList.add('fade-in')

            gsap.fromTo(slick.$slides[currentSlide], {autoAlpha: 1}, {autoAlpha: 0, duration: 1})
            gsap.fromTo(slick.$slides[nextSlide], {autoAlpha: 0}, {autoAlpha: 1, duration: 1})
        })
    }

    function init(){
        document.addEventListener('DOMContentLoaded', function(){
            initCarouselSlides()
        })
    }


    return {
        init,
        carousel
    }
})();

export const slickCarousel = carousel.carousel

carousel.init()
