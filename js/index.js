'use strict'
let header_links=document.getElementsByClassName("header-nav");
let mobile_menu= document.getElementById('mobile-menu')
let prevActiveDiv=""
for(let i=0;i<header_links.length;i++){
    header_links[i].onclick=selectLink
}

mobile_menu.onclick=showMobileMenu


function selectLink(event){
    changeColorOnClick(event)
    
    let curDiv=event.target.href.split('#')[1]
    hideGrid(curDiv,prevActiveDiv)

}

function changeColorOnClick(event){
    let prevActive=document.getElementsByClassName('active');
    prevActiveDiv=prevActive[0].href.split('#')[1];
    prevActive[0].classList.remove('active')
    event.target.classList.add('active')

}

function hideGrid(curDiv,prevDiv){
    let activeDiv=document.getElementsByClassName(curDiv)[0];
    let inactiveDiv=document.getElementsByClassName(prevDiv)[0]
    console.log(activeDiv!=='undefined',inactiveDiv!=='undefined')
    
    if(curDiv!=prevDiv){
        if(typeof activeDiv!=='undefined')
        {activeDiv.classList.remove('hidden')}
        if(typeof inactiveDiv!=='undefined')
        {inactiveDiv.classList.add('hidden')}
    }
    showMobileMenu()
    
}

function showMobileMenu(){
    let mobile_dropdown=document.getElementById('mobile-dropdown');
    console.log(mobile_dropdown.style.display)
    mobile_dropdown.style.display==='block'?mobile_dropdown.style.display='none':mobile_dropdown.style.display='block'
}

