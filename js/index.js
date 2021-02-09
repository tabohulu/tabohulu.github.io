
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
    console.log(event.target.href)
    hideGrid(curDiv)

}

function changeColorOnClick(event){
    let prevActive=document.getElementsByClassName('active');
    prevActiveDiv=prevActive[0].href.split('#')[1];
    prevActive[0].classList.remove('active')
    event.target.classList.add('active')

}

function hideGrid(curDiv){
    console.log(curDiv)
    let activeDiv=document.getElementsByClassName(curDiv)[0];

    let inactiveDiv=document.getElementsByClassName('menu-divs')
    for(var i=0;i<inactiveDiv.length;i++){
        inactiveDiv[i].classList.add('hidden')
    }
    activeDiv.classList.remove('hidden')
    /*console.log(activeDiv!=='undefined',inactiveDiv!=='undefined')
    
    if(curDiv!=prevDiv){
        if(typeof activeDiv!=='undefined')
        {activeDiv.classList.remove('hidden')}
        if(typeof inactiveDiv!=='undefined')
        {inactiveDiv.classList.add('hidden')}
    }*/
    showMobileMenu()
    
}

function showMobileMenu(){
    let mobile_dropdown=document.getElementById('mobile-dropdown');
    console.log(mobile_dropdown.style.display)
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

