// get home div from DOM
const homeDiv=document.getElementsByClassName('home')[0];
const divWidth=Number(window.getComputedStyle(homeDiv).width.split('px')[0]);
const divHeight=Number(window.getComputedStyle(homeDiv).height.split('px')[0]);
const companyName=document.getElementsByClassName('company-name')[0];
console.log(`${Math.floor(divHeight/2)}`)
companyName.style.top=`${Math.floor((divHeight-(Number(window.getComputedStyle(companyName).height.split('px')[0])))/2)}px`;
companyName.style.left=`${Math.floor((divWidth-(Number(window.getComputedStyle(companyName).width.split('px')[0])))/2)}px`
const smallBoxWidth=10
const boxInterval=2.5;
const animationDuration=3;
const totalNoBoxes=Math.floor(divWidth/(smallBoxWidth+boxInterval))

let divArray=[];
setTimeout(showBoxes,500)
//showBoxes()

function showBoxes(){
    for(let j=0;j<44;j++){
    const tempContainer=document.createElement('div')
    tempContainer.classList.add('small-box-container')
    const temArr=[];
    for(let i=0;i<totalNoBoxes;i++){
        const randomDelay=Math.floor(Math.random()*animationDuration*500)
        const box=document.createElement('div');
        box.classList.add('small-box')
        box.id=`${j}-${i}`
        box.style.animation=`fadeInOut ${animationDuration}s ease-in ${randomDelay}ms backwards`
        tempContainer.appendChild(box);
    }
    homeDiv.appendChild(tempContainer)
}

console.log(divHeight/2)
}

/*for(let j=0;j<44;j++){
    const tempContainer=document.createElement('div')
    tempContainer.classList.add('small-box-container')
    const temArr=[];
    for(let i=0;i<totalNoBoxes;i++){
        const randomDelay=Math.floor(Math.random()*animationDuration*500)
        const box=document.createElement('div');
        box.classList.add('small-box')
        box.id=`${j}-${i}`
        box.style.animation=`fadeInOut ${animationDuration}s ease-in ${randomDelay}ms backwards`
        tempContainer.appendChild(box);
    }
    homeDiv.appendChild(tempContainer)
}

console.log(divHeight/2)*/

window.onload=function(){
    console.log('document loaded')
}
// create boxes to fill the screen with equal separation between them
// display boxes