let currentQuiz = [];
let currentQuestion = 0;
let score = 0;

function startQuiz(level){

    currentQuiz =
    quizData.filter(
        q => q.level === level
    );

    shuffle(currentQuiz);

    currentQuestion = 0;
    score = 0;

    showQuestion();
}

function shuffle(array){

    for(let i = array.length - 1; i > 0; i--){

        const j =
        Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[j]] =
        [array[j], array[i]];
    }

    return array;
}

function showQuestion(){

    const q =
    currentQuiz[currentQuestion];

    document.querySelector(".app").innerHTML = `

    <div class="quiz-card">

        <div class="question-number">
            問題 ${currentQuestion + 1}
            / ${currentQuiz.length}
        </div>

        <img
            src="img/signs/${q.image}"
            alt="${q.answer}"
            class="sign-image">

        <h3>
            この標識の意味は？
        </h3>

        <div id="choices"></div>

        <div id="result"></div>

        <button
            class="skip-btn"
            onclick="showAnswer()">

            ❓ わからない

        </button>

        <button
            class="home-btn"
            onclick="goHome()">

            🏠 タイトルへ戻る

        </button>

    </div>
    `;

    const choicesDiv =
    document.getElementById("choices");

    const shuffledChoices =
    shuffle([...q.choices]);

    shuffledChoices.forEach(choice=>{

        const btn =
        document.createElement("button");

        btn.className =
        "answer-btn";

        btn.textContent =
        choice;

        btn.onclick =
        ()=>checkAnswer(choice);

        choicesDiv.appendChild(btn);

    });

}

function checkAnswer(answer){

    const q =
    currentQuiz[currentQuestion];

    const buttons =
    document.querySelectorAll(
        ".answer-btn"
    );

    buttons.forEach(btn=>{
        btn.disabled = true;
    });

    const result =
    document.getElementById("result");

    if(answer === q.answer){

        score++;

        result.innerHTML = `

        <div class="correct-box">

            <h3>
            ✅ 正解
            </h3>

            <p>
            ${q.explanation}
            </p>

            <button
                class="next-btn"
                onclick="nextQuestion()">

                次の問題へ

            </button>

        </div>

        `;

    }else{

        result.innerHTML = `

        <div class="wrong-box">

            <h3>
            ❌ 不正解
            </h3>

            <p>
            正解：
            <strong>
            ${q.answer}
            </strong>
            </p>

            <p>
            ${q.explanation}
            </p>

            <button
                class="next-btn"
                onclick="nextQuestion()">

                次の問題へ

            </button>

        </div>

        `;
    }
}

function showAnswer(){

    const q =
    currentQuiz[currentQuestion];

    const buttons =
    document.querySelectorAll(
        ".answer-btn"
    );

    buttons.forEach(btn=>{
        btn.disabled = true;
    });

    document.getElementById("result")
    .innerHTML = `

    <div class="wrong-box">

        <h3>
        ❓ わからない
        </h3>

        <p>
        正解：
        <strong>
        ${q.answer}
        </strong>
        </p>

        <p>
        ${q.explanation}
        </p>

        <button
            class="next-btn"
            onclick="nextQuestion()">

            次の問題へ

        </button>

    </div>

    `;
}

function nextQuestion(){

    currentQuestion++;

    if(
        currentQuestion >=
        currentQuiz.length
    ){

        showResult();
        return;
    }

    showQuestion();
}

function showResult(){

    const percent =
    Math.round(
        score /
        currentQuiz.length
        * 100
    );

    let rank = "C";
    let message =
    "もう少し頑張りましょう";

    if(percent >= 95){

        rank = "S";
        message =
        "素晴らしい！完璧です！";

    }else if(percent >= 85){

        rank = "A";
        message =
        "とても良くできました！";

    }else if(percent >= 70){

        rank = "B";
        message =
        "合格レベルです！";
    }

    document.querySelector(".app")
    .innerHTML = `

    <div class="quiz-card">

        <h1>
        🏆 結果発表
        </h1>

        <div class="result-rank">
        ${rank}
        </div>

        <div class="result-score">

            ${score}
            /
            ${currentQuiz.length}

        </div>

        <h2>
        正答率
        ${percent}%
        </h2>

        <p>
        ${message}
        </p>

        <button
            class="next-btn"
            onclick="location.reload()">

            ホームへ戻る

        </button>

    </div>

    `;
}

function goHome(){

    location.reload();
}
