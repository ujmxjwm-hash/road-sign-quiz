let currentQuestion = 0;
let currentQuiz = [];

function startQuiz(level){

    currentQuiz = quizData.filter(
        q => q.level === level
    );

    currentQuestion = 0;

    showQuestion();
}

function showQuestion(){

    const q = currentQuiz[currentQuestion];

    document.querySelector(".app").innerHTML = `

    <div class="quiz-card">

        <h2>
        問題 ${currentQuestion + 1}
        /
        ${currentQuiz.length}
        </h2>

        <h3 style="margin-top:20px;">
        この標識の意味は？
        </h3>

        <div id="choices"></div>

        <p id="result"></p>

    </div>
    `;

    const choicesDiv =
        document.getElementById("choices");

    q.choices.forEach(choice => {

        const btn =
            document.createElement("button");

        btn.className =
            "answer-btn";

        btn.textContent =
            choice;

        btn.onclick = () =>
            checkAnswer(choice);

        choicesDiv.appendChild(btn);
    });
}

function checkAnswer(answer){

    const q =
        currentQuiz[currentQuestion];

    const result =
        document.
