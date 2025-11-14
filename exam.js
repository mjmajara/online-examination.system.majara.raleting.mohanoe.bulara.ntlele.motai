
const correctAnswers = {
    q1: '8',
    q2: 'Paris',
    q3: 'Javascript',
    q4: 'HyperText Markup Language',
    q5: 'line break',
    q6: 'img src=""'
};

document.getElementById('submitBtn').addEventListener('click', submitExam);

function submitExam() {
    const studentName = document.getElementById('studentName').value.trim();
    if (!studentName) {
        alert('Please enter your name!');
        return;
    }

    let score = 0;

    for (let q in correctAnswers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === correctAnswers[q]) {
            score++;
        }
    }

    let results = JSON.parse(localStorage.getItem('examResults')) || [];
    results.push({ name: studentName, score: score, date: new Date().toLocaleString() });
    localStorage.setItem('examResults', JSON.stringify(results));

    document.getElementById('score').innerHTML = `Thank you, <b>${studentName}</b>! Your score: <b>${score} / 6</b>`;

    
    document.getElementById('examForm').reset();
}
