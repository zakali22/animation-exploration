import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const pinnedPanels = (function(){
    const panelsWrapper = document.querySelector('.panels')
    const contentList = document.querySelector('.panels-content__list')
    const contentSlides = document.querySelectorAll('.panels-content__list [data-slide]')
    const imagesList = document.querySelector('.panels-images')
    const imageSlides = document.querySelectorAll('.panels-images [data-slide]')
    const arrowsWrapper = document.querySelector('.panels-arrows')
    const prevArrow = arrowsWrapper.querySelectorAll('.panels__arrow')[0]
    const nextArrow = arrowsWrapper.querySelectorAll('.panels__arrow')[1]

    const mq = window.matchMedia('(min-width: 768px)')

    function hideAllSlides(){
        contentSlides.forEach(slide => {
            gsap.set(slide, {autoAlpha: 0.4})
        })

        imageSlides.forEach(slide => {
            gsap.set(slide, {autoAlpha: 0.1})
        })
    }

    function initPanels(){
        hideAllSlides()

        const vh = (coef) => window.innerHeight * (coef/100);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".panels",
                start: "top 50%",
                end: vh(300)+30,
                scrub: 2,
                markers: true
            }
        })

        let duration = 100

        tl.add("slide1Show")
        tl.to(contentSlides[0], {autoAlpha: 1, duration: duration+100}, "slide1Show")
        tl.to(imageSlides[0], {autoAlpha: 1, duration: duration+100}, "slide1Show")
        tl.add("slide1Hide")
        tl.to(imageSlides[0], {autoAlpha: 0, duration}, "slide1Hide+=10.5")
        tl.to(contentSlides[0], {autoAlpha: 0.4, duration: duration-20}, "slide1Hide")


        tl.add("slide2Show")
        tl.to(contentSlides[1], {autoAlpha: 1, duration: duration+100}, "slide2Show-=10")
        tl.fromTo(imageSlides[1], {autoAlpha: 0}, {autoAlpha: 1, duration: duration+100}, "slide2Show-=10")
        tl.add("slide2Hide")
        tl.to(imageSlides[1], {autoAlpha: 0, duration}, "slide2Hide+=10.5")
        tl.to(contentSlides[1], {autoAlpha: 0.4, duration: duration-20}, "slide2Hide")

        tl.add("slide3Show")
        tl.fromTo(imageSlides[2], {autoAlpha: 0}, {autoAlpha: 1, duration: duration+100}, "slide3Show-=10")
        tl.to(contentSlides[2], {autoAlpha: 1, duration: duration+100}, "slide3Show-=10")
    }

    function toggleDisableAttr(slideCount){
        prevArrow.toggleAttribute('disabled', slideCount === 0)
        nextArrow.toggleAttribute('disabled', slideCount === contentSlides.length-1)
    }

    function slideBack(slideCount){
        imagesList.style.transform = `translateX(-${slideCount}00%)`
        contentList.style.transform = `translateX(-${slideCount}00%)`
    }

    function slideForward(slideCount){
        imagesList.style.transform = `translateX(-${slideCount}00%)`
        contentList.style.transform = `translateX(-${slideCount}00%)`
    }

    function initPanelsCarousel(){
        let slideCount = 0;

        toggleDisableAttr(slideCount)

        prevArrow.addEventListener('click', function(e){
            if(slideCount > 0){
                slideCount--
            } 
            toggleDisableAttr(slideCount)
            panelsWrapper.setAttribute('data-current-slide', slideCount)
            slideBack(slideCount)
        })

        nextArrow.addEventListener('click', function(e){
            if(slideCount < contentSlides.length-1){
                slideCount++
            } 
            toggleDisableAttr(slideCount)
            panelsWrapper.setAttribute('data-current-slide', slideCount)
            slideForward(slideCount)
        })
    }

    function renderPanels(){
        if(mq.matches){
            initPanels()
            return
        } else {
            gsap.killTweensOf("*")
            initPanelsCarousel()
            return
        }
    }

    function handleViewportChange(mq){
        renderPanels()
    }

    function init(){
        mq.addEventListener('change', function(){
            handleViewportChange(mq)
        });

        renderPanels()
    }

    return {
        init
    }

})()

pinnedPanels.init()