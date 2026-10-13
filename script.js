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

    const q =
        currentQuiz[currentQuestion];

    document.querySelector(".app").innerHTML = `

    <div class="quiz-card">

        <h2>
        問題 ${currentQuestion + 1}
        /
        ${currentQuiz.length}
        </h2>

        <h3>
        この標識の意味は？
        </h3>

        <div id="choices"></div>

        <div id="result"></div>

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

        btn.onclick = () => {

            checkAnswer(choice);

        };

        choicesDiv.appendChild(btn);

    });

}

function checkAnswer(answer){

    const q =
        currentQuiz[currentQuestion];

    const result =
        document.getElementById("result");

    if(answer === q.answer){

        result.innerHTML =
        `
        <p style="color:#22c55e;">
        ✅ 正解
        </p>

        <p>
        ${q.explanation}
        </p>
        `;

    }else{

        result.innerHTML =
        `
        <p style="color:#ef4444;">
        ❌ 不正解
        </p>

        <p>
        正解：${q.answer}
        </p>

        <p>
        ${q.explanation}
        </p>
        `;
    }

    setTimeout(() => {

        currentQuestion++;

        if(
            currentQuestion <
            currentQuiz.length
        ){

            showQuestion();

        }else{

            finishQuiz();

        }

    }, 2000);

}

function finishQuiz(){

    document.querySelector(".app").innerHTML = `

    <div class="quiz-card">

        <h1>
        🎉
        </h1>

        <h2>
        クイズ終了
        </h2>

        <button onclick="location.reload()">
        ホームへ戻る
        </button>

    </div>
    `;
}
