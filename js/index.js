
let header_links=document.getElementsByClassName("header-nav");
let mobile_menu= document.getElementById('mobile-menu')
let project_menu= document.getElementsByClassName("proj_nav")
let prevActiveDiv="home"

window.onload=function(){
    const h1=document.querySelector('.home h1');
    const para=document.querySelector('.home p');
    const img=document.querySelector('.home img');

    h1.style.animation='fadeIn 1s ease-in 1s backwards';
    para.style.animation='fadeIn 1s ease-in 2s backwards';
    img.style.animation='fadeIn 3s ease-in';

    setTimeout(removeAni,3000)
    
}

function removeAni(){
    const h1=document.querySelector('.home h1');
    const para=document.querySelector('.home p');
    const img=document.querySelector('.home img');

    h1.style.animation='';
    para.style.animation='';
    img.style.animation='';
}

for(let i=0;i<header_links.length;i++){
    header_links[i].onclick=selectLink
}

for(let i=0;i<project_menu.length;i++){
    project_menu[i].onclick=selectLinkProjs
}

mobile_menu.onclick=showMobileMenu


function selectLink(event){
    changeColorOnClick(event)
    
    let curDiv=event.target.innerText.toString().toLowerCase()
    if (curDiv.indexOf(" ")!==-1){
        curDiv=curDiv.split(' ')[0]+'-'+curDiv.split(' ')[1]
        

    }
    const prevDiv=document.getElementsByClassName(prevActiveDiv)[0];
    prevDiv.style.animation='zoomAndRotate 1s ease-in forwards'
    console.log(curDiv)
    showMobileMenu()
    setTimeout(function(){
      prevDiv.style.animation=''
      prevActiveDiv=curDiv;
      hideGrid(curDiv,'menu-divs')
    },1000)
    

}

function selectLinkProjs(event){
    
    let curDiv=event.target.innerText.toString().toLowerCase()
    if (curDiv.indexOf(" ")!==-1){
        curDiv=curDiv.split(' ')[0]+'-'+curDiv.split(' ')[1]
        

    }
    document.getElementById(curDiv).scrollIntoView({behaviour:"smooth"})
    console.log(curDiv)

}

function changeColorOnClick(event){
    let prevActive=document.getElementsByClassName('active');
    prevActive[0].classList.remove('active')
    event.target.classList.add('active')

}

function changeColorOnClickProj(event){
    let prevActive=document.getElementsByClassName('active-proj');
    prevActive[0].classList.remove('active-proj')
    event.target.classList.add('active-proj')

}

function hideGrid(curDiv, divClass){
    let activeDiv=document.getElementsByClassName(curDiv)[0];

    let inactiveDiv=document.getElementsByClassName(divClass)
    for(var i=0;i<inactiveDiv.length;i++){
        inactiveDiv[i].classList.add('hidden')
    }
    activeDiv.classList.remove('hidden')
    
}



function showMobileMenu(){
    let mobile_dropdown=document.getElementById('mobile-dropdown');
    //console.log(mobile_dropdown.style.display)
    mobile_dropdown.style.display==='block'?mobile_dropdown.style.display='none':mobile_dropdown.style.display='block'
}



// references to DOM elements
const list = document.querySelector('.list');
const items = Array.from(document.querySelectorAll('.item'));
const indicators = Array.from(document.querySelectorAll('.proj_nav'));

// create an observer with the list as intersection root
const observer = new IntersectionObserver(onIntersectionObserved, {
  root: list,
  threshold: 0.6
});

// observe each item
items.forEach(item => {
  observer.observe(item);
});

// when the observer detects an entry changing 
// (item entering or exiting  list)
// and the entry is intersecting
// get the intersecting item’s index
// set the correct indicator to active
function onIntersectionObserved(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const intersectingIndex = items.indexOf(entry.target);
      activateIndicator(intersectingIndex);
    }
  });
}

// toggle an `active` class on the indicators
function activateIndicator(index) {
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
}