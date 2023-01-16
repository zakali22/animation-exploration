

const theme = (function(){
    const LIGHT_MODE = '"light"'
    const DARK_MODE = '"dark"'
    let theme;
    let themeToggler;

    let themeColors = {
        textColor: '#000',
        backgroundColor: '#f1ede7'
    }

    function getTheme(){
        theme = window.localStorage.getItem('color-mode')
        console.log(theme)

        if(theme === 'undefined' || !theme){
            theme = getComputedStyle(document.documentElement).getPropertyValue("--color-mode").toLowerCase().trim();
        }
    }

    function setTheme(){
        if(theme === DARK_MODE){
            themeColors = {
                textColor: '#fff',
                backgroundColor: '#0e1218'
            }
            themeToggler.classList.add('dark-mode')
            themeToggler.classList.remove('light-mode')
        } else if(theme === LIGHT_MODE) {
            themeColors = {
                textColor: '#000',
                backgroundColor: '#f1ede7'
            }
            themeToggler.classList.add('light-mode')
            themeToggler.classList.remove('dark-mode')
        }
        document.documentElement.style.setProperty('--text-color', themeColors['textColor'])
        document.documentElement.style.setProperty('--background-color', themeColors['backgroundColor'])
    }

    function initTheme(){
        getTheme()
        setTheme()
    }

    function persistTheme(theme){
        window.localStorage.setItem('color-mode', theme)
    }

    function toggleClass(theme){
        if(theme === LIGHT_MODE){
            themeToggler.classList.add('dark-mode')
            themeToggler.classList.remove('light-mode')
            return
        } else if(theme === DARK_MODE) {
            themeToggler.classList.add('light-mode')
            themeToggler.classList.remove('dark-mode')
            return
        }
    }

    function changeVariables(theme){
        // console.log(mode)
        if(theme === LIGHT_MODE){
            document.documentElement.style.setProperty('--text-color', themeColors['textColor'])
            document.documentElement.style.setProperty('--background-color', themeColors['backgroundColor'])
            document.documentElement.style.setProperty('--color-mode', DARK_MODE)
            persistTheme(DARK_MODE)
        } else {
            document.documentElement.style.setProperty('--text-color', themeColors['textColor'])
            document.documentElement.style.setProperty('--background-color', themeColors['backgroundColor'])
            document.documentElement.style.setProperty('--color-mode', LIGHT_MODE)
            persistTheme(LIGHT_MODE)
        }
    }



    function init(){
        document.addEventListener('DOMContentLoaded', function(){
            themeToggler = document.querySelector('.nav-theme-toggle')
            initTheme()

            themeToggler.addEventListener('click', function(e){
                initTheme()
                if(theme === LIGHT_MODE){
                    themeColors = {
                        textColor: '#fff',
                        backgroundColor: '#0e1218'
                    }
                } else if(theme === DARK_MODE) {
                    themeColors = {
                        textColor: '#000',
                        backgroundColor: '#f1ede7'
                    }
                }

                toggleClass(theme)
                changeVariables(theme)
            })

        })
    }

    return {
        init
    }
})()

theme.init()