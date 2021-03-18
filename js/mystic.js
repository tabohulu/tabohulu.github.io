'use strict'
let text_container=document.getElementsByClassName('text-container')[0];
let options=Array.from(document.getElementsByClassName('options'));
let gal_nav=Array.from(document.getElementsByClassName('gal_nav'))
let gal_items=Array.from(document.getElementsByClassName('proj-item'));
let gallery_box=document.getElementsByClassName('gallery-box')[0]
let gal_num=document.getElementsByClassName('gal_number')[0];
let proj_index=0;
let divs=[]
let toDel=[]
let dd=[9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 30, 40, 48, 56, 63, 64, 65, 66, 67, 68, 69, 70, 71, 99, 100, 101, 102, 103, 112, 121, 129, 128, 127, 117, 108, 104, 105, 106, 107, 131, 132, 133, 134];
let main_divs=[document.getElementsByClassName('home')[0],document.getElementsByClassName('about-us')[0],document.getElementsByClassName('projects')[0]]


let observer_options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.9
  }

  function changeMenuColor(entries){
      entries.forEach(entry=>{
          if(entry.isIntersecting & entry.intersectionRatio >= 0.9){
              const index=main_divs.indexOf(entry.target)
              setColor(index)
            console.log(entry.target.id,entry.intersectionRatio,index)
          }
          
      })
  }

  
let observer= new IntersectionObserver(changeMenuColor,observer_options)
main_divs.forEach(div=>{
    observer.observe(div)
})


/*gal_items.forEach((div,i)=>{
    const rect=div.getBoundingClientRect()
    console.log(`left for project ${i} ${rect.left}`)
})*/

let proj_div_xCords=gal_items.map(div=>{
    const rect=div.getBoundingClientRect()
    return rect.left
})

let div_yCords=main_divs.map(div=>{
    const rect=div.getBoundingClientRect()
    return rect.top
})


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
    }
}

function setOnclickListeners(){
    options.forEach(option=>{
        option.onclick=scrollToDiv;
    })

    gal_nav.forEach(nav=>{
        nav.onclick=galleryScroll
    })

    gal_num.innerHTML=`<strong>1</strong> | ${gal_items.length}`  
}

function scrollToDiv(event){
const id=event.target.innerText.toLowerCase().replace(' ','-');
console.log(id)
const div=document.getElementById(id)
console.log(div===null)
div !==null?(window.scrollTo(0,div_yCords[main_divs.indexOf(div)] - div_yCords[0])):(console.log(`${id} div does not exist`))

}


function setColor(index){
    options.forEach((option,i)=>{
        option.classList.toggle('active',i===index)
    })
}

function galleryScroll(event){
    if(event.target.id==='left'){
        proj_index=proj_index-1>=0?proj_index-1:proj_index
    }else{
        proj_index=proj_index+1<gal_items.length?proj_index+1:proj_index
    }

    document.getElementsByClassName('proj-list')[0].scrollTo(proj_div_xCords[proj_index]-proj_div_xCords[0],div_yCords[2])
    gal_num.innerHTML=`<strong>${proj_index+1}</strong> | ${gal_items.length}` 

    console.log(proj_index)
}
