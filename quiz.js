//Your quiz functionality goes here
import { quiz, questionC } from "./questions.js";
import { displayExistingQuestions } from "./builder.js";

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
let existing_question_list;
let quiz_builder_body;
let builder_add_button;
let builder_add_form;
let builder_create_button;

let responses = [];

function main()
{
    console.log("LOADED!");

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
    existing_question_list = document.getElementById("existing");
    quiz_builder_body = document.getElementById("builder");
    builder_add_button = document.getElementById("addquestion");
    builder_add_form = document.getElementById("newquestion");
    builder_create_button = document.getElementById("submitnewquestion")

    quiz_respond_button.addEventListener("click", nextQuestion);

    quiz_start_button.addEventListener("click", startQuiz);

    quiz_retry_button.addEventListener("click", retryQuiz);

    quiz_exit_button.addEventListener("click", exitQuiz);

    quiz_build_button.addEventListener("click", evt => {
        builder_add_form.style.display = "none";
        if (evt.target.innerHTML !== "Close Edit Menu")
        {
            evt.target.innerHTML = "Close Edit Menu";
            quiz_start_button.hidden = true;
            displayExistingQuestions(quiz, existing_question_list)
        }
        else
        {
            evt.target.innerHTML = "EDIT!";
            quiz_builder_body.hidden = true;
            quiz_start_button.hidden = false;
        }
    });

    builder_add_button.addEventListener("click", evt =>{
        builder_add_form.style.display = "block";
        console.log("ADD!");
    });

    builder_create_button.addEventListener("click", evt =>{
        evt.preventDefault();
        let form = evt.target.parentElement;
        console.log(form);
        let newp = document.getElementById("newp");
        let newc1 = document.getElementById("newc1");
        let newc2 = document.getElementById("newc2");
        let newc3 = document.getElementById("newc3");
        let newc4 = document.getElementById("newc4");
        let newanswer = document.getElementById("newans");
        let arr = [newc1.value, newc2.value, newc3.value, newc4.value];
        if (arr.includes(newanswer.value))
        {
            if (arr.some(item=>item===""))
            {
                alert("Please fill in all fields!");
            }
            else
            {
                quiz.push(new questionC(newp.value, arr, newanswer.value));
                newp.value = "";
                newc1.value = "";
                newc2.value = "";
                newc3.value = "";
                newc4.value = "";
                newanswer.value = "";
            }
        }
        else
        {
            alert("Please make sure answer is one of the choices!");
        }

        arr.push(newp.value);
        arr.push(newanswer.value);
    });

    quiz_title.innerHTML = "Lit Quiz!";

    render();
}

function startQuiz()
{
    if (quiz.length > 0)
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
    else
    {
        alert("You deleted all the questions! Go and make some more!");
    }
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
        quiz_builder_body.hidden = true;
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