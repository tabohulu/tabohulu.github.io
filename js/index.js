
let header_links=document.getElementsByClassName("header-nav");
let mobile_menu= document.getElementById('mobile-menu')
let project_menu= document.getElementsByClassName("proj_nav")
let prevActiveDiv=""
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
    console.log(curDiv)
    hideGrid(curDiv,'menu-divs')

}

function selectLinkProjs(event){
    changeColorOnClickProj(event)
    
    let curDiv=event.target.innerText.toString().toLowerCase()
    if (curDiv.indexOf(" ")!==-1){
        curDiv=curDiv.split(' ')[0]+'-'+curDiv.split(' ')[1]
        

    }
    //console.log(curDiv)
    hideGridProjs(curDiv,'projects-content')

}

function changeColorOnClick(event){
    let prevActive=document.getElementsByClassName('active');
    prevActiveDiv=prevActive[0].href.split('#')[1];
    prevActive[0].classList.remove('active')
    event.target.classList.add('active')

}

function changeColorOnClickProj(event){
    let prevActive=document.getElementsByClassName('active-proj');
    prevActiveDiv=prevActive[0].href.split('#')[1];
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
    showMobileMenu()
    
}

function hideGridProjs(curDiv, divClass){
    console.log(curDiv)
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

//var request = new XMLHttpRequest()
/*const proxyurl = "https://cors-anywhere.herokuapp.com/";
let url="https://bad-api-assignment.reaktor.com/v2/products/facemasks"
const url2="https://bad-api-assignment.reaktor.com/v2/availability/ippal"

const request = new XMLHttpRequest();
request.open("GET",proxyurl+ url);
request.setRequestHeader("x-force-error-mode","all");
request.send();
request.onload = ()=>{
    console.log(request);
    if(request.status == 200 && request.response!=='') {
        console.log(JSON.parse(request.response));
    }else{
        console.log('no response')
    }
}*/

