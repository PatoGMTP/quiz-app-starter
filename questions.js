//Your quiz questions array of objects goes here

class questionC
{
    prompt;
    choices;
    answer;

    constructor(p, c, a)
    {
        this.prompt = p;
        this.choices = c;
        this.answer = a;
    }
}

let p1 = "At the beginning of the poem, the 'Odyssey', which Greek god is angry with Odysseus?";
let p2 = "In the novel 'To Kill a Mockingbird', the main character's father, Atticus Finch, has a key role as a:";
let p3 = "In the novel, 'Brave New World', everyone is dependent on a special happiness-producing drug called:";
let p4 = "In the novel, 'A Christmas Carol', which ghost does Scrooge not face?";
let p5 = "In the novel, 'The Death of Arthur', King Arthur is betrayed and killed by:";
let prompts = [p1, p2, p3, p4, p5];

let c1 = ["Poseidon", "Athena", "Zeus", "Circe"];
let c2 = ["Soldier", "Teacher", "Lawyer", "Sheriff"];
let c3 = ["Allevio", "Soma", "Pase", "Limbo"];
let c4 = ["Ghost of Christmas Past", "Ghost of Christmas Yet to Come", "Ghost of Christmas Spirit", "Ghost of Christmas Present"];
let c5 = ["Lancelot", "Merlin", "Bedivere", "Mordred"];
let choices = [c1, c2, c3, c4, c5];

let a1 = "Poseidon";
let a2 = "Lawyer";
let a3 = "Soma";
let a4 = "Ghost of Christmas Spirit";
let a5 = "Mordred";
let answers = [a1, a2, a3, a4, a5];

let starter_questions = [];

for (let i = 0; i < 5; i++)
{
    starter_questions.push(new questionC(prompts[i], choices[i], answers[i]));
}

// starter_questions = [new questionC("A", ["A", "B", "C"], "A"), new questionC("B", ["X", "Y", "Z", "0"], "0")];

let storage = localStorage.getItem("questionCs");

let quiz;

if (storage === null)
{
    quiz = starter_questions;
}
else
{
    quiz = JSON.parse(storage);
}

console.log(quiz);

export {quiz, questionC};