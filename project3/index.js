"use strict"

let timer_element = document.getElementById("display");
let current_session = document.getElementById("session")
let current_round = document.getElementById("rounds_done")
let start_button = document.getElementById("button")

let learn_input=document.getElementById("learn");
let rest_input = document.getElementById("rest");
let reps = document.getElementById("rounds");

let body = document.body;
let timer_interface =document.getElementById("main");

let learn_limit =learn_input.value*60;
let rest_limit =rest_input.value*60
let rounds = Number(reps.options[reps.selectedIndex].text);

let rounds_done =0;
let pomo_state='learn';

//let pomoTimer = new Bomodoro(learn_limit,rest_limit,rounds)
//console.log(pomoTimer.updateMin(120))



let learn_audio = new Audio("time_is_now.mp3")
let rest_audio = new Audio("accomplished.mp3")


let start;
let limit=0;
let sec =0;
let min = 0;


let learn_interval 
let rest_interval

let ref_time

start_button.onclick = on_start_timer
reps.onchange = set_rounds_val
learn_input.onchange = set_learn_time
rest_input.onchange = set_rest_time

function on_start_timer(){
    if(start_button.innerText ==="Start"){
        start_button.innerText="Stop"
        reps.setAttribute('disabled','disabled')
        learn_input.setAttribute('disabled','disabled')
        rest_input.setAttribute('disabled','disabled')
        body.style.backgroundColor="darkgray"
        timer_interface.style.border='1px solid green'
        timer_interface.style.backgroundColor='white';
        //start_learn_timer()
        start_timer()
    }else if(start_button.innerText ==="Stop"){
        console.log("Timer stopped")
        reps.removeAttribute('disabled')
        learn_input.removeAttribute('disabled')
        rest_input.removeAttribute('disabled')
        start_button.innerText="Start"
        timer_element.innerHTML="00:00"
        current_round.innerHTML=""
        current_session.innerHTML=""
        window.clearInterval(learn_interval)
        rounds_done=0;
        if(rest_interval!==null){
            window.clearInterval(rest_interval)
        }
        pomo_state = 'learn'
        body.style.backgroundColor="white"
        timer_interface.style.border='1px solid red'
    }
   
 
}

function start_timer(){
    ref_time=new Date();
    if (pomo_state==='learn'){
        start_learn_timer();
    }else{
        start_rest_timer();
    }

}

function start_learn_timer(){
    
        limit = learn_limit
        learn_audio.play()
        console.log("Learn Timer started")
        //ref_time=new Date();
        learn_interval = window.setInterval(learn_timer,1000)
       
    
}

function start_rest_timer(){
        
        limit =rest_limit;
        rest_audio.play()
        console.log("Rest Timer started")
        //ref_time=new Date();
        rest_interval =window.setInterval(rest_timer,1000)
    
    
}

function learn_timer(){
    start=Math.floor((new Date() - ref_time)/1000)
    //sec = pomoTimer.updateMin(start)['sec']
    //min = pomoTimer.updateMin(start)['min']
    sec = start%60
    min = Math.floor(start/60)
    current_session.innerHTML="Study Session"
    timer_element.innerHTML = `${pad(min)}:${pad(sec)}`
    current_round.innerHTML = `Round ${rounds_done+1}`
    if(start>=limit){
        window.clearInterval(learn_interval)
        body.style.backgroundColor="gray"
        timer_interface.style.border='1px solid blueviolet'
        if(rounds_done+1<rounds){
            pomo_state = 'rest'
            start_timer()
        } if(rounds_done+1 === rounds){
            rest_audio.play()
            reps.removeAttribute('disabled')
            learn_input.removeAttribute('disabled')
            rest_input.removeAttribute('disabled')
            start_button.innerText="Start"
            rounds_done =0
            console.log(`rounds done reset to ${rounds_done}`)
            current_session.innerHTML="Session Complete"
            timer_element.innerHTML = `00:00`
            current_round.innerHTML = `Congratulations!`
            body.style.backgroundColor="white"
            timer_interface.style.border='1px solid red'
        }
        
        
    }
}

function rest_timer(){
    start=Math.floor((new Date() - ref_time)/1000)
    sec = start%60
    min = Math.floor(start/60)
    //sec = pomoTimer.updateMin(start)['sec']
    //min = pomoTimer.updateMin(start)['min']
    current_session.innerHTML="Short Break"
    timer_element.innerHTML = `${pad(min)}:${pad(sec)}`
    current_round.innerHTML = ""

    if(start>=limit){
        body.style.backgroundColor="darkgray"
        timer_interface.style.border='1px solid green'
        window.clearInterval(rest_interval)
        rounds_done++
        console.log(`round ${rounds_done} done, ${rounds-rounds_done} more to go`)
        if (rounds_done<rounds){
            pomo_state = 'learn'
            start_timer()
        }       
    }
}

function set_rounds_val(event){
    let elem =event.target
    rounds=Number(elem.options[elem.selectedIndex].text)
    console.log(rounds)
}

function set_learn_time(event){
    let elem =event.target
    learn_limit=Number(elem.value)*60;
    console.log(learn_limit/60)
}

function set_rest_time(event){
    let elem =event.target
    rest_limit=Number(elem.value)*60;
    console.log(rest_limit/60)
}

function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}