import MouseFollower from "mouse-follower";
import {gsap} from "gsap"
import Magnetic from "../vendors/magnetic.js";

// Assets
import arrowUp from "../../img/arrow.svg"


const customCursor = (function(){
    MouseFollower.registerGSAP(gsap);
    let cursor;

    function initMagneticCursor(){
        const magneticEl = document.querySelectorAll('[data-magnetic]')
        magneticEl.forEach(el => {
            new Magnetic(el, {
                s: 0.1,
                rs: 0.2,
                y: 0.1
            })
        })
    }

    function initExpandedCursor(){
        const mediaEl = document.querySelectorAll('[data-cursor-expand]')
        console.log(mediaEl)
        mediaEl.forEach(el => {
            const cursorSize = el.dataset.cursorSize ? el.dataset.cursorSize : 'sm'
            const arrowCursor = el.dataset.arrowCursor

            console.log(cursorSize)

            el.addEventListener('mouseenter', function(){
                if(arrowCursor){
                    cursor.setIcon('arrow-up')
                }

                cursor.addState(`-inverse -${cursorSize} -exclusion`);
            })

            el.addEventListener('mouseleave', function(){
                if(arrowCursor){
                    cursor.removeIcon()
                }
                cursor.removeState(`-inverse -${cursorSize} -exclusion`);
            })
        })
    }
    
    function init(){
        if (typeof window === "object") {
            document.addEventListener('DOMContentLoaded', function(){
                console.log("mouse follower init")
                cursor = new MouseFollower({
                    el: null,
                    container: document.body,
                    iconSvgSrc: arrowUp
                });

                initExpandedCursor()
                initMagneticCursor()
                
            })
        }
    }

    return {
        init
    }
})()

customCursor.init()