//Your quiz functionality goes here
import { quiz } from "./questions.js";

let question;
let current = -1;

let quiz_title;
let quiz_stats;
let quiz_prompt;
let quiz_choice_list;
let quiz_respond_button;
let quiz_results_list;
let quiz_start_button;
let quiz_score;
let quiz_retry_button;
let quiz_body;
let quiz_exit_button;
let quiz_build_button;

let responses = [];

function main()
{
    quiz_title = document.getElementById("quiztitle");
    quiz_stats = document.getElementById("stats");
    quiz_prompt = document.getElementById("prompt");
    quiz_choice_list = document.getElementById("choices");
    quiz_respond_button = document.getElementById("respond");
    quiz_results_list = document.getElementById("results");
    quiz_start_button = document.getElementById("start");
    quiz_score = document.getElementById("score");
    quiz_retry_button = document.getElementById("retry");
    quiz_body = document.getElementById("quizbody");
    quiz_exit_button = document.getElementById("exit");
    quiz_build_button = document.getElementById("build");

    quiz_respond_button.addEventListener("click", nextQuestion);

    quiz_start_button.addEventListener("click", startQuiz);

    quiz_retry_button.addEventListener("click", retryQuiz);

    quiz_exit_button.addEventListener("click", exitQuiz);

    quiz_build_button.addEventListener("click", console.log);

    quiz_title.innerHTML = "Lit Quiz!";

    render();
}

function startQuiz()
{
    current = 0;
    quiz_start_button.hidden = true;
    quiz_retry_button.hidden = true;
    quiz_build_button.hidden = true;
    quiz_exit_button.hidden = false;
    quiz_body.hidden = false;
    Array.from( quiz_body.children ).forEach(item=> item.hidden = false);

    shuffleArray(quiz);

    render();
}

function retryQuiz()
{
    responses = [];
    quiz_results_list.hidden = true;
    quiz_score.hidden = true;
    startQuiz();
}

function exitQuiz()
{
    current = -1;
    responses = [];
    quiz_results_list.hidden = true;
    quiz_score.hidden = true;
    quiz_exit_button.hidden = true;
    quiz_start_button.hidden = false;
    render();
}

function displayCurrentQuestion()
{
    quiz_prompt.innerHTML = question.prompt;
    quiz_choice_list.innerHTML = "";

    question.choices.forEach(item => {
        let label = document.createElement("label");
        label.innerHTML = item;
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "choice";
        label.appendChild(radio);
        quiz_choice_list.appendChild(label);
    });
}

function nextQuestion()
{
    let chosen = quiz_choice_list.querySelector("input:checked");
    
    if (chosen === null)
    {
        alert("Please enter an answer!");
    }
    else
    {
        responses.push(chosen.parentElement.innerText);
        current++;
        quiz_prompt.innerHTML = "";
        quiz_choice_list.innerHTML = "";
        render();
    }
}

function displayResults()
{
    let correct = 0;

    quiz_results_list.innerHTML = "";

    quiz.forEach((item, i)=> {
        let li = document.createElement("li");
        li.innerHTML = item.prompt;

        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        
        if (item.answer === responses[i])
        {
            correct++;
            p2.innerHTML = "Correct!";
            li.classList.add("correct");
        }
        else
        {
            p2.innerHTML = "Wrong!";
            li.classList.add("wrong");
        }

        p1.innerHTML = responses[i];

        li.appendChild(p1);
        li.appendChild(p2);
        quiz_results_list.appendChild(li);
    });
    
    let temp = parseFloat((correct) / quiz.length) * 100;
    quiz_score.innerHTML = `${temp}%`;
}

function render()
{
    if (current === -1)
    {
        quiz_body.hidden = true;
        quiz_retry_button.hidden = true;
        quiz_exit_button.hidden = true;
        quiz_build_button.hidden = false;
    }
    else if (current < quiz.length)
    {
        quiz_stats.innerHTML = `${current+1} / ${quiz.length}`;
        question = quiz[current];
        displayCurrentQuestion();
    }
    else
    {
        quiz_body.hidden = true;
        quiz_retry_button.hidden = false;
        quiz_results_list.hidden = false;
        quiz_score.hidden = false;
        displayResults();
    }
}

document.addEventListener("DOMContentLoaded", main);

// The following comes from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}