let currentQuiz = [];
let currentQuestion = 0;
let score = 0;

function startQuiz(level) {

    currentQuiz = quizData.filter(
        q => q.level === level
    );

    shuffle(currentQuiz);

    currentQuestion = 0;
    score = 0;

    showQuestion();
}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j =
        Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[j]] =
        [array[j], array[i]];
    }

    return array;
}

function showQuestion() {

    const q =
    currentQuiz[currentQuestion];

    document.querySelector(".app").innerHTML = `

    <div class="quiz-card">

        <h2>
            問題 ${currentQuestion + 1}
            / ${currentQuiz.length}
        </h2>

        img/signs/${q.image}

        <h3>
            この標識の意味は？
        </h3>

        <div id="choices"></div>

        <div id="result"></div>

    </div>
    `;

    const choicesDiv =
    document.getElementById("choices");

    const shuffledChoices =
    shuffle([...q.choices]);

    shuffledChoices.forEach(choice => {

        const btn =
        document.createElement("button");

        btn.className =
        "answer-btn";

        btn.textContent =
        choice;

        btn.onclick =
        () => checkAnswer(choice);

        choicesDiv.appendChild(btn);
    });
}

function checkAnswer(answer) {

    const q =
    currentQuiz[currentQuestion];

    const result =
    document.getElementById("result");

    const buttons =
    document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    if (answer === q.answer) {

        score++;

        result.innerHTML = `

        <div class="correct-box">

            <h3>✅ 正解</h3>

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

    } else {

        result.innerHTML = `

        <div class="wrong-box">

            <h3>❌ 不正解</h3>

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

function nextQuestion() {

    currentQuestion++;

    if (
        currentQuestion >=
        currentQuiz.length
    ) {

        showResult();
        return;
    }

    showQuestion();
}

function showResult() {

    const percent =
    Math.round(
        score /
        currentQuiz.length
        * 100
    );

    let rank = "C";
    let message = "もう少し頑張りましょう！";

    if (percent >= 95) {

        rank = "S";
        message = "素晴らしい！完璧です！";

    } else if (percent >= 85) {

        rank = "A";
        message = "とても良くできました！";

    } else if (percent >= 70) {

        rank = "B";
        message = "合格レベルです！";
    }

    document.querySelector(".app").innerHTML = `

    <div class="quiz-card">

        <h1>
        🏆 結果発表
        </h1>

        <h2>
        ${score}
        /
        ${currentQuiz.length}
        問正解
        </h2>

        <h2>
        正答率
        ${percent}%
        </h2>

        <h1>
        ランク ${rank}
        </h1>

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
