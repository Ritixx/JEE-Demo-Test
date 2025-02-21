let questions = []; 

// Load questions from JSON file
fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        displayQuestions();
    });

function displayQuestions() {
    let quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; 

    questions.forEach((q, index) => {
        let questionHTML = `
            <div>
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map(option => 
                    `<input type="radio" name="q${index}" value="${option}"> ${option}<br>`
                ).join("")}
            </div>
        `;
        quizContainer.innerHTML += questionHTML;
    });
}

function submitTest() {
    let score = 0;
    questions.forEach((q, index) => {
        let selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });

    document.getElementById("result").innerText = `You scored: ${score} / ${questions.length}`;
}
