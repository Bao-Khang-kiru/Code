document.getElementById('start-quiz').addEventListener('click', generateQuiz);

const questions = {
    easy: [
        { question: "∫ x dx", options: ["x^2/2", "x^2", "1/x", "ln(x)"], answer: "x^2/2" },
        // Thêm các câu hỏi dễ khác tại đây
    ],
    medium: [
        { question: "∫ x^2 dx", options: ["x^3/3", "x^2/2", "2x", "1/x^2"], answer: "x^3/3" },
        // Thêm các câu hỏi trung bình khác tại đây
    ],
    hard: [
        { question: "∫ e^x dx", options: ["e^x", "x*e^x", "ln(x)", "1/x"], answer: "e^x" },
        // Thêm các câu hỏi khó khác tại đây
    ]
};

function generateQuiz() {
    const difficulty = document.getElementById('difficulty').value;
    const numQuestions = parseInt(document.getElementById('num-questions').value);
    const timeLimit = parseInt(document.getElementById('time-limit').value);

    let quiz = document.getElementById('quiz');
    quiz.innerHTML = '';

    let selectedQuestions = questions[difficulty].slice(0, numQuestions);

    selectedQuestions.forEach((q, index) => {
        let questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        let questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);

        q.options.forEach((option, i) => {
            let label = document.createElement('label');
            let input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = option;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));
        });

        quiz.appendChild(questionDiv);
    });

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', checkAnswers);
    quiz.appendChild(submitButton);

    startTimer(timeLimit);
}

function checkAnswers() {
    let questionsDiv = document.getElementsByClassName('question');
    let score = 0;
    let difficulty = document.getElementById('difficulty').value;
    let pointValues = { easy: 10, medium: 20, hard: 30 };

    for (let i = 0; i < questionsDiv.length; i++) {
        let inputs = questionsDiv[i].getElementsByTagName('input');
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].checked && inputs[j].value === questions[difficulty][i].answer) {
                score += pointValues[difficulty];
                break;
            }
        }
    }

    document.getElementById('results').textContent = `Score: ${score}`;
}

function startTimer(minutes) {
    let time = minutes * 60;
    let timer = document.createElement('p');
    document.body.appendChild(timer);

    let countdown = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        timer.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (time === 0) {
            clearInterval(countdown);
            checkAnswers();
        } else {
            time--;
        }
    }, 1000);
}