'use strict'
let header_links=document.getElementsByClassName("header-nav");
let prevActiveDiv=""
for(let i=0;i<header_links.length;i++){
    header_links[i].onclick=selectLink
    //let divName=header_links[i].href.split('#')[1];
    //console.log(divName)
    

}


function selectLink(event){
    changeColorOnClick(event)
    
    let curDiv=event.target.href.split('#')[1]
    //console.log(prevActiveDiv, curDiv)
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
    if(typeof activeDiv!=='undefined')
    {activeDiv.classList.remove('hidden')}
    if(typeof inactiveDiv!=='undefined')
    {inactiveDiv.classList.add('hidden')}
    //console.log(activeDiv.id);
}

