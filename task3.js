"use strict";
//initialize variables
let questions_card_container = document.getElementsByClassName("card-div")[0];
let questions_card_container_bb =
  questions_card_container.getBoundingClientRect();
let questions_nav = Array.from(document.getElementsByClassName("nav"));
let results_button = document.getElementsByClassName("results-button")[0];
let question_number_para = document.getElementsByClassName("index")[0];

let gg = 0;
let no_of_quotes = 5;
let question_index = 0;

let series_quotes_divs = [];
let series_quotes_bb = [];
let selected_answers = [];
let is_question_answered = [];
let series_quotes = [];

function initialize() {
  //Initial Actions
  results_button.disabled = true;
  results_button.onclick = getResults;

  questions_nav.forEach((card) => {
    card.onclick = myscrollToDiv;
  });

  for (let i = 0; i < no_of_quotes; i++) {
    series_quotes.push({ quote: "", author: "" });
    selected_answers.push({ answer: "", isCorrect: false });
    is_question_answered.push(0);
  }
}

function createCards() {
  series_quotes.forEach((quote) => {
    let para = document.createElement("p");
    para.classList.add("quote");
    para.innerText = quote.quote;
    let temp = document.createElement("div");
    temp.classList.add("card");

    temp.appendChild(para);
    series_quotes_divs.push(temp);
    questions_card_container.appendChild(temp);
  });

  //Get bounding box for individual quotes
  let sa = Array.from(document.getElementsByClassName("card"));
  sa.forEach((s) => {
    series_quotes_bb.push(s.getBoundingClientRect());
  });
}

function createOptionsList(quotes, ii) {
  let quote_authors = [];
  for (let i = 0; i < quotes.length; i++) {
    if (!quote_authors.includes(quotes[i].author)) {
      quote_authors.push(quotes[i].author);
    }
  }
  //shuffle answer order
  quote_authors = shuffle(quote_authors);

  //create unordered list
  let ul = document.createElement("ul");
  ul.classList.add("authors");
  for (let i = 0; i < quote_authors.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `<input type="radio" name="quote${ii}" id="${ii}-quote${i}" value="${quote_authors[i]}"><label for="${ii}-quote${i}">${quote_authors[i]}</label>`;
    ul.appendChild(li);
  }

  return ul;
}

function getSelected(event) {
  let index = Number(event.target.id[0]);

  selected_answers[index] = {
    answer: event.target.value,
    isCorrect: event.target.value === series_quotes[index].author,
  };

  //move to next question
  question_index =
    question_index + 1 < series_quotes_bb.length
      ? question_index + 1
      : question_index;
  scrollAction();
  is_question_answered[index] = 1;

  //make button active if all questions answered
  if (!is_question_answered.includes(0)) {
    results_button.disabled = false;
    results_button.style.backgroundColor = "blueviolet";
  }
}

function shuffle(array) {
  var m = array.length,
    t,
    i;

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

function myscrollToDiv(event) {
  if (event.target.id === "left") {
    question_index =
      question_index - 1 >= 0 ? question_index - 1 : question_index;
  } else {
    question_index =
      question_index + 1 < series_quotes_bb.length
        ? question_index + 1
        : question_index;
  }
  questions_card_container.scrollTo(
    series_quotes_bb[question_index].x - series_quotes_bb[0].x,
    questions_card_container_bb.y
  );
  question_number_para.innerText = `${question_index + 1}/${
    series_quotes_bb.length
  }`;
}

function scrollAction() {
  questions_card_container.scrollTo(
    series_quotes_bb[question_index].x - series_quotes_bb[0].x,
    questions_card_container_bb.y
  );
  question_number_para.innerText = `${question_index + 1}/${
    series_quotes_bb.length
  }`;
}

async function getResults(event) {
  if (results_button.innerText === "Check Answers" && !event.target.disabled) {
    let points = 0;
    let resultsDiv = document.getElementsByClassName("results")[0];
    const h2 = document.createElement("h2");
    h2.innerText = "Your Results";
    h2.style.textDecoration = "underline";

    resultsDiv.append(h2);

    for (var i = 0; i < selected_answers.length; i++) {
      let para = document.createElement("p");
      para.innerHTML = `${i + 1}. You selected <strong>${
        selected_answers[i].answer
      }</strong>, the correct answer is <strong>${
        series_quotes[i].author
      }</strong>: Points ${selected_answers[i].isCorrect ? 1 : 0}`;
      resultsDiv.append(para);
      points += selected_answers[i].isCorrect ? 1 : 0;
    }
    let para = document.createElement("p");
    para.innerText = `Final Score is ${points}`;
    resultsDiv.append(para);
    results_button.innerText = "Play Again";
  } else if (results_button.innerText === "Play Again") {
    location.reload();
  }
}

async function getQuotes() {
  try {
    let res = await fetch(
      "https://breaking-bad-quotes.herokuapp.com/v1/quotes/5"
    );
    series_quotes = await res.json();
    let paras = Array.from(document.getElementsByClassName("quote"));
    let quote_cards = Array.from(document.getElementsByClassName("card"));
    series_quotes.forEach((quote, i) => {
      paras[i].innerHTML = quote.quote;
      quote_cards[i].appendChild(createOptionsList(series_quotes, i));
    });

    let radios = Array.from(document.querySelectorAll("input[type=radio]"));
    radios.forEach((radio) => {
      radio.onclick = getSelected;
    });
  } catch (error) {
    console.log(error);
  }
}

initialize();
createCards();
getQuotes();
