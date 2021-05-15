 'use strict'
 // Task 3: using https://restcountries.eu/ API,
// get country where alpha3Code = col

let card_div=document.getElementsByClassName('card-div')[0];
let card_div_bb=card_div.getBoundingClientRect()
let card_nav=Array.from(document.getElementsByClassName('nav'));
let results=document.getElementsByClassName('results-button')[0];
let isAnswered=[];
results.disabled=true;
results.onclick= getResults;
let card_quote_bb=[];
card_nav.forEach(card=>{
    card.onclick=myscrollToDiv
});
let gg=0;
let theQuoteCards=[];

let no_of_quotes=5;
let selectedAnswer=[];

let quotes=[];
for(let i=0;i<no_of_quotes;i++){
    quotes.push({quote:'',author:''})
    selectedAnswer.push({answer:'',isCorrect:false})
    isAnswered.push(0)
}
let proj_index=0;

createCards()
getQuotes()

function createCards(){

    quotes.forEach(quote=>{
        let para= document.createElement('p');
        para.classList.add('quote')
        para.innerText=quote.quote;
        let temp=document.createElement('div');
        temp.classList.add('card')
        
        temp.appendChild(para);
        theQuoteCards.push(temp);
        card_div.appendChild(temp);
    });

    let sa=Array.from(document.getElementsByClassName('card'));
    sa.forEach(s=>{
        card_quote_bb.push(s.getBoundingClientRect())
    });
    console.log(card_div_bb, card_quote_bb)
    
}

function createList(quotes,ii){
    let aa=[];
    for (let i=0;i<quotes.length;i++){
        if(!aa.includes(quotes[i].author)){
            aa.push(quotes[i].author)
        }
    }

    aa=shuffle(aa);
    let ul=document.createElement('ul');
    
    ul.classList.add('authors');
    for (let i=0;i<aa.length;i++){
        let li=document.createElement('li');
        li.innerHTML=`<input type="radio" name="quote${ii}" id="${ii}-quote${i}" value="${aa[i]}"><label for="${ii}-quote${i}">${aa[i]}</label>`;
        ul.appendChild(li)
    }

    return ul
}

function getSelected(event){
    let index=Number(event.target.id[0]);

    selectedAnswer[index]={answer:event.target.value,
                       isCorrect:event.target.value===quotes[index].author
                    };

    console.log(selectedAnswer[index])
    proj_index=proj_index+1<card_quote_bb.length?proj_index+1:proj_index
    card_div.scrollTo(card_quote_bb[proj_index].x-card_quote_bb[0].x,card_div_bb.y);
    document.getElementsByClassName('index')[0].innerText=`${proj_index+1}/${card_quote_bb.length}`
    isAnswered[index]=1;
    if(!isAnswered.includes(0)){
        results.disabled=false;
        results.style.backgroundColor='blueviolet'
    }
}

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }


  function myscrollToDiv(event){
      if (event.target.id === 'left'){
        proj_index=proj_index-1>=0?proj_index-1:proj_index
    }else{
        proj_index=proj_index+1<card_quote_bb.length?proj_index+1:proj_index
    }
    console.log(proj_index)
        card_div.scrollTo(card_quote_bb[proj_index].x-card_quote_bb[0].x,card_div_bb.y);
        document.getElementsByClassName('index')[0].innerText=`${proj_index+1}/${card_quote_bb.length}`
  }

  async function getResults(event){
      if(results.innerText==='Check Answers'){
        if(!event.target.disabled){
            let points=0
           let resultsDiv=document.getElementsByClassName('results')[0];
           const h2=document.createElement('h2');
           h2.innerText='Your Results';
           h2.style.textDecoration='underline';

           resultsDiv.append(h2)
            
            for (var i=0;i<selectedAnswer.length;i++){
                let para= document.createElement('p');
                para.innerHTML=`${i+1}. You selected <strong>${selectedAnswer[i].answer}</strong>, the correct answer is <strong>${quotes[i].author}</strong>: Points ${selectedAnswer[i].isCorrect?1:0}`;
                  resultsDiv.append(para)  
                  points+=selectedAnswer[i].isCorrect?1:0;
            }
            let para= document.createElement('p');
            para.innerText=`Final Score is ${points}`
            resultsDiv.append(para)
            results.innerText='Play Again'
          }
      }else if(results.innerText==='Play Again'){
        location.reload()
      }
      
  }

async function getQuotes(){
    try{
        let res = await fetch("https://breaking-bad-quotes.herokuapp.com/v1/quotes/5");
        quotes = await res.json();
        let paras=Array.from(document.getElementsByClassName('quote'));
        let quote_cards=Array.from(document.getElementsByClassName('card'))
        quotes.forEach((quote,i)=>{
            paras[i].innerHTML=quote.quote;
            quote_cards[i].appendChild(createList(quotes,i));          
        });

        let radios=Array.from(document.querySelectorAll('input[type=radio]'));
        radios.forEach(radio=>{
            radio.onclick=getSelected;
        })
        
        //console.log(radios)
        
    }catch(error){
        console.log(error)
    }
}