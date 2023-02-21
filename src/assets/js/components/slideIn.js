import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/dist/ScrollTrigger.js"

gsap.registerPlugin(ScrollTrigger)

const slideIn = (function(){
    function init(){
        const slideInEls = document.querySelectorAll('.slideIn')
        slideInEls.forEach(slideInEl => {
            gsap.set(slideInEl, {visibility: "hidden"})
            gsap.fromTo(slideInEl, {y: 60, autoAlpha: 0}, {y: 0, autoAlpha: 1, duration: 1, scrollTrigger: {
                trigger: slideInEl,
                start: "top center"
            }})

            // new ScrollTrigger.create({
            //     trigger: slideInEl, 
            //     onEnter: function(){
            //         console.log("Slide in " + slideInEl)
            //     }
            // })
        })
    }

    return {
        init
    }
})()

slideIn.init()