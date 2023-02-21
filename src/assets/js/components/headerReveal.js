import {gsap} from "gsap"

const headerReveal = (function(){

    function init(){
        if (typeof window === "object") {
            document.addEventListener('DOMContentLoaded', function(){
                const headerNavEl = document.querySelectorAll('.header__nav-link a')
                const headerResourceNavEl = document.querySelectorAll(".header__resources-link a")
                const tl = gsap.timeline({delay: 0.5})
                // tl.set(headerEl, {transformOrigin: '50% 50%', perspective: 400, transformStyle: "preserve-3d", backfaceVisibility: "hidden"})
                tl.to(headerNavEl, {rotateX: 0, y: 0, autoAlpha: 1, duration: 1.3, scale: 1, stagger: 0.2, ease: "power1.out"}, 0)
                tl.to(headerResourceNavEl, {rotateX: 0, y: 0, autoAlpha: 1, duration: 2, scale: 1, stagger: 0.2, ease: "power1.out"}, "-=1.5")
                // tl.to(headerEl, { scale: 1, duration: 1, ease: "power0.none"}, 0)
                // tl.fromTo(headerEl, {scale: 0.7, rotateX: -86, transformOrigin: 'bottom'}, {scale: 1, rotateX: 0, duration: 3})

            })
        }
    }

    return {
        init
    }
})()

headerReveal.init()