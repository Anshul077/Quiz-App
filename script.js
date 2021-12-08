const QuizQuestionArray = [
  {
    question: "What is full form of HTML?",
    a: "HighText Machine Language",
    b: "HyperText and links Markup Language",
    c: "HyperText Markup Language",
    d: "None of these",
    ans: "option3",
  },
  {
    question: "The <hr> tag in HTML is used for?",
    a: "new line",
    b: "vertical ruler",
    c: "new paragraph",
    d: "horizontal ruler",
    ans: "option4",
  },
  {
    question: "What is full form of CSS?",
    a: "Cascade style sheets",
    b: "Color and style sheets",
    c: "Cascading style sheets",
    d: "None of the above",
    ans: "option3",
  },
  {
    question: "How to insert an image in HTML?",
    a: "<img href = 'jtp.png' />",
    b: "<img url = 'jtp.png' />",
    c: "<img link = 'jtp.png' />",
    d: "<img src = 'jtp.png' />",
    ans: "option4",
  },
];

const quizCont = document.getElementById("quizContainer");
const question = document.getElementById("question");
const option1 = document.getElementById("opt1");
const option2 = document.getElementById("opt2");
const option3 = document.getElementById("opt3");
const option4 = document.getElementById("opt4");
const submitBtn = document.getElementById("submit");
const playAgainBtn = document.getElementById("playAgain");
const result = document.getElementById("result");
const questNo = document.getElementById("questionNo");
const proBar = document.getElementById("pro");
const options = document.querySelectorAll(".options");
const sec = document.getElementById("sec");

let questionCount = 0,optCheck,scores = 0,t = 20,c = 0,progWidth= 6,progWidth2 = 6;
let w=14,z=14;

function style(){
  quizCont.style.height = "65vh";
  submitBtn.style.top = "22vh";
  result.style.top = "46vh";
  result.style.width = "26vh";
  result.style.height = "11vh";
  playAgainBtn.style.width="20vw"
  playAgainBtn.style.height="4vh"
}


function displayResult(score){
  result.classList.remove("displayBox");
  document.getElementById("YScore").innerText = ` Your Score: ${score}/4 `;
  var mq = window.matchMedia("(max-width: 480px)");
  if (mq.matches) {
      style()
}else{quizCont.style.height = "88vh";
submitBtn.style.top = "40vh";
result.style.top = "63vh";
}
}

function timeLimit() {
  var myVar = setInterval(() => {
    t -= 1;
    if (t >= 0) {
      sec.innerText = `${t}`;
      if (questionCount === 4) {
        document.getElementById("sec").innerText = `${t}`;
        clearInterval(myVar);
      }
      else if(t<=10){
        document.getElementById("time").style.borderColor="#f12d17"
      }
    } else {
      submitBtn.disabled=true
      displayResult()
      clearInterval(myVar);
    }
  }, 1000);
}

const QuestionLoad = () => {
  question.innerText = QuizQuestionArray[questionCount].question;
  option1.innerText = QuizQuestionArray[questionCount].a;
  option2.innerText = QuizQuestionArray[questionCount].b;
  option3.innerText = QuizQuestionArray[questionCount].c;
  option4.innerText = QuizQuestionArray[questionCount].d;
};
QuestionLoad();
timeLimit();

function getId() {
  optCheck=null
  options.forEach((element) => {
    if (element.checked) {
      optCheck = element.id;
    }
  });
  return optCheck;
}

function checkAns(optId, questionCount) {
  if (QuizQuestionArray[questionCount].ans === optId) {
    scores++;
    optId=0
  }
  return scores;
}

function unCheckOption() {
  options.forEach((element) => {
    element.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  var mq = window.matchMedia("(max-width: 480px)");
  if (mq.matches) {
    if (w < 54 && c === 0) {
      proBar.style.width = `${(w += 14)}vw`;
      proBar.style.backgroundColor = "#2ecc71";
    } else if (z < 54 && c != 0) {
      proBar.style.width = `${(z += 14)}vw`;
      proBar.style.backgroundColor = "#2ecc71";
    }
  } else {
    if (progWidth < 24 && c === 0) {
      proBar.style.width = `${(progWidth += 6)}vw`;
      proBar.style.backgroundColor = "#2ecc71";
    } else if (progWidth2 < 24 && c != 0) {
      proBar.style.width = `${(progWidth2 += 6)}vw`;
      proBar.style.backgroundColor = "#2ecc71";
    }
  }
  
  let optId = getId();
  let score = checkAns(optId, questionCount);
  questionCount++;
  if(questionCount===3){
    submitBtn.innerText="Submit"}
  if (questionCount < 4) {
    questNo.innerText = `Question ${questionCount + 1}/4`;
    QuestionLoad();
    unCheckOption();
  } else {
    displayResult(score)
  }
});

playAgainBtn.addEventListener("click", () => {
  c += 1;
  progWidth2 = 6;
  t = 20
  s=20
  submitBtn.disabled=false
  submitBtn.innerText="Next"
  proBar.style.backgroundColor = "#2ecc71";
  document.getElementById("time").style.borderColor="#2ecc71"
  questNo.innerText = "Question 1/4";
  document.getElementById("sec").innerText = "20";
  progWidth = 0;
  scores = 0;
  questionCount = 0;
  result.classList.add("displayBox");
  var mq = window.matchMedia("(max-width: 480px)");
  if (mq.matches) {
    proBar.style.width = "14vw";
    quizCont.style.height = "50vh";
    submitBtn.style.top = "42vh";
  } else {
    proBar.style.width = "6vw";
    quizCont.style.height = "75vh";
    submitBtn.style.top = "55vh";
  }
  QuestionLoad();
  timeLimit()
  unCheckOption();
});
