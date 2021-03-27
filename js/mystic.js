'use strict'
// declare elements
let header_menu=Array.from(document.getElementsByClassName('menu-items'));
let header_menu_pc=Array.from(document.getElementsByClassName('pc'));
//console.log(header_menu.length)
let mobile_menu_button=document.getElementsByClassName('fa-bars')[0];
let text_container=document.getElementsByClassName('text-container')[0];
let dd=[9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 30, 40, 48, 56, 63, 64, 65, 66, 67, 68, 69, 70, 71, 99, 100, 101, 102, 103, 112, 121, 129, 128, 127, 117, 108, 104, 105, 106, 107, 131, 132, 133, 134];
let divs=[]
let main_divs=[document.getElementById('home'),document.getElementById('about-us'),
document.getElementById('projects'),document.getElementById('contact')]

let gal_nav=Array.from(document.getElementsByClassName('gal_nav'));
let gal_items=Array.from(document.getElementsByClassName('proj-item'));
let gallery_box=document.getElementsByClassName('gallery-box')[0];
let gal_num=document.getElementsByClassName('gal_number')[0];
let proj_index=0;

let project_descriptions=[{
    name:'Project 1',
    description:'project1 description that has many things written in here'
},{
    name:'Project 2',
    description:'project2 description that has many things written in here'
}]

let proj_div_xCords=gal_items.map(div=>{
    const rect=div.getBoundingClientRect()
    return rect.left
})

let div_yCords=main_divs.map(div=>{
    const rect=div.getBoundingClientRect()
    console.log('rectange: '+rect.top)
    return rect.top
})

console.log(div_yCords)

let observer_options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8
  }

let projects_observer={
    root:document.getElementsByClassName('proj-list')[0],
    rootMargin:'0px',
    threshold:0.6
}  

let observer= new IntersectionObserver(changeMenuColor,observer_options)
main_divs.forEach(div=>{
    observer.observe(div)
})  

let proj_observer=new IntersectionObserver(projChangeDeets,projects_observer)
gal_items.forEach(item=>{
    proj_observer.observe(item)
})

  function changeMenuColor(entries){
      entries.forEach(entry=>{
          if(entry.isIntersecting & entry.intersectionRatio >= 0.8){
              const index=main_divs.indexOf(entry.target)
              console.log(index)
              setColor(index)
              console.log(`${entry.target.id} ${entry.intersectionRatio} Index : ${index}`)
          }
          
      })
  }

  function projChangeDeets(entries){
      entries.forEach(entry=>{
          if(entry.isIntersecting && entry.intersectionRatio>=0.6){
            const index=gal_items.indexOf(entry.target)
            gal_num.innerHTML=`<strong>${index+1}</strong> | ${gal_items.length}`
            const temp=Array.from(document.querySelectorAll('ul.project-deets >li>p'))
            temp[0].innerHTML=`<strong>${project_descriptions[index].name}</strong>`
            temp[1].innerText=project_descriptions[index].description
            console.log(index)
          }
      })
  }

initialize();
stackDots(9,16);
setAnimation();



function initialize(){
    //set header menu onclicks
    header_menu.forEach(menu=>{
        menu.onclick=goToMenu
    })

    //set mobile menu onclick
    mobile_menu_button.onclick=toggleMenu

    gal_nav.forEach(nav=>{
        nav.onclick=galleryScroll
    })

    gal_num.innerHTML=`<strong>1</strong> | ${gal_items.length}`  

    gal_items.forEach(div=>{

        div.onmouseover=function(){
            gal_nav.forEach(nav=>{
                nav.style.opacity=0.2;
            })
        }

        div.onmouseout=function(){
            gal_nav.forEach(nav=>{
                nav.style.opacity=0;
            })
        }

    })

    gal_nav.forEach(navs=>{
        navs.onmouseover=()=>{
            navs.style.opacity=1
        }
    })
}

function stackDots(noOfDots,k){
    for(let j=0;j<k;j++){
    const temp=document.createElement('div')
    for(let i=0;i<noOfDots;i++){
        const box=document.createElement('div');
        box.classList.add('small-box');
        box.id=`${i}-${j}`;
        /*box.onclick=function(event){
            setHidden(event)
        };*/
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

function goToMenu(event){
    let div_name=event.target.innerText.toLowerCase().replace(' ','-');
    console.log(div_name)
    const target_div=document.getElementById(div_name);
    //target_div.scrollIntoView(true)
    target_div !==null?(window.scrollTo(0,div_yCords[main_divs.indexOf(target_div)] - div_yCords[0])):(console.log(`${id} div does not exist`))

    toggleMenu()
}

function toggleMenu(){
    document.getElementsByClassName('mobile-menu')[0].classList.toggle('hidden')

}

function galleryScroll(event){
    if(event.target.id==='left'){
        proj_index=proj_index-1>=0?proj_index-1:proj_index
    }else{
        proj_index=proj_index+1<gal_items.length?proj_index+1:proj_index
    }

    document.getElementsByClassName('proj-list')[0].scrollTo(proj_div_xCords[proj_index]-proj_div_xCords[0],div_yCords[2])
     

    console.log(proj_index)
}

function setColor(index){
    let lsm=Array.from(document.querySelectorAll('li.pc'));
    lsm.forEach((menu,i)=>{
        menu.classList.toggle('active',i===index);
    });
}