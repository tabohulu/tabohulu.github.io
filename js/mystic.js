'use strict'
let text_container=document.getElementsByClassName('text-container')[0];
let divs=[]
let toDel=[]
let dd=[9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 30, 40, 48, 56, 63, 64, 65, 66, 67, 68, 69, 70, 71, 99, 100, 101, 102, 103, 112, 121, 129, 128, 127, 117, 108, 104, 105, 106, 107, 131, 132, 133, 134];
setOnclickListeners()
stackDots(9,16);
setAnimation();


    

function stackDots(noOfDots,k){
    for(let j=0;j<k;j++){
    const temp=document.createElement('div')
    for(let i=0;i<noOfDots;i++){
        const box=document.createElement('div');
        box.classList.add('small-box');
        box.id=`${i}-${j}`;
        box.onclick=function(event){
            setHidden(event)
        };
        box.style.zIndex='1'
        divs.push(box)
        temp.appendChild(box)
    }
    text_container.appendChild(temp)
    
}
const width=window.getComputedStyle(text_container).top;
const height=window.getComputedStyle(text_container).bottom;
console.log(width,height)
}


function setHidden(event){
    event.target.style.backgroundColor='rgb(166,66,184)'
    toDel.push(divs.indexOf(event.target))
    console.log(toDel)
}

function setAnimation(){
    for(let i=0;i<divs.length;i++){
        const temp=Math.floor(Math.random()*1501);
        const rr=Math.floor(Math.random()*2)
        if(!dd.includes(i)){
            
            //divs[i].style.opacity='0'
            divs[i].style.animation=(rr===0)?`fadeAndShrink 3s steps(50) ${temp}ms forwards`:`fadeAndShrink2 3s steps(50) ${temp}ms forwards`
        }else{
            divs[i].style.animation=`shrink 3s steps(50) ${temp}ms forwards`
        }
        //document.getElementsByClassName('small-box')[i].hidden=dd.includes(i)?false:true
        //console.log(dd.includes(i)?false:true,i)
        //console.log(dd.includes(i))
    }
}

function setOnclickListeners(){
    const options=Array.from(document.getElementsByClassName('options'))
    options.forEach(option=>{
        option.onclick=scrollToDiv;
    })
    
}


function scrollToDiv(event){
const id=event.target.innerText.toLowerCase().replace(' ','-');
console.log(id)
const div=document.getElementById(id)
div.scrollTop=100
console.log(div===null)
div !==null?(div.scrollIntoView({behavior: "smooth", block: "start",inline:"nearest"})):(console.log(`${id} div does not exist`))

}
