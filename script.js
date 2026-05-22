const questions=[

{
question:"Capital of India?",
options:["Mumbai","Delhi","Chennai","Bengaluru"],
answer:"Delhi"
},

{
question:"Python function keyword?",
options:["func","define","def","class"],
answer:"def"
}

];

let current=0;

function loadQuestion(){

document.getElementById("question").innerHTML=
questions[current].question;

let html="";

questions[current].options.forEach(option=>{

html += `
<input type="radio"
name="answer"
value="${option}">
${option}<br>
`;

});

document.getElementById("options").innerHTML=
html;

}

function nextQuestion(){

if(current<questions.length-1)
current++;

loadQuestion();

}

function previousQuestion(){

if(current>0)
current--;

loadQuestion();

}

loadQuestion();