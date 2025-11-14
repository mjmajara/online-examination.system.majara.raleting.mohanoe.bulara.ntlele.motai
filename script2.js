
function saveData(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function loadData(key) { return JSON.parse(localStorage.getItem(key)) || []; }

let exams = loadData('exams');
let submissions = loadData('submissions');

const examForm = document.getElementById('examForm');
const scheduleForm = document.getElementById('scheduleForm');
const examSelect = document.getElementById('examSelect');
const submissionsList = document.getElementById('submissionsList');
const submissionSelect = document.getElementById('submissionSelect');
const scoreForm = document.getElementById('scoreForm');

function populateExamSelect() {
  examSelect.innerHTML = '';
  exams.forEach((exam, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${exam.title} ${exam.date ? ` (Scheduled: ${exam.date} ${exam.time})` : ''}`;
    examSelect.appendChild(option);
  });
}


examForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('examTitle').value.trim();
  const questions = document.getElementById('examQuestions').value.trim().split('\n');
  const answers = document.getElementById('examAnswers').value.trim().split('\n');
  const duration = document.getElementById('examDuration').value.trim();
  
  exams.push({ title, questions, answers, duration, date: null, time: null });
  saveData('exams', exams);
  examForm.reset();
  populateExamSelect();
  alert('Exam created successfully!');
});

scheduleForm.addEventListener('submit', e => {
  e.preventDefault();
  const index = examSelect.value;
  exams[index].date = document.getElementById('examDate').value;
  exams[index].time = document.getElementById('examTime').value;
  saveData('exams', exams);
  alert('Exam scheduled successfully!');
  scheduleForm.reset();
  populateExamSelect();
});

function renderSubmissions() {
  submissionsList.innerHTML = '';
  submissions.forEach(sub => {
    const li = document.createElement('li');
    const scoreClass = sub.score >= 50 ? 'pass' : 'fail';
    li.innerHTML = `Student: ${sub.student} | Exam: ${sub.exam} | Score: <span class="score ${scoreClass}">${sub.score ?? 'Pending'}</span>`;
    submissionsList.appendChild(li);
  });

  submissionSelect.innerHTML = '';
  submissions.forEach((sub, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${sub.student} - ${sub.exam}`;
    submissionSelect.appendChild(opt);
  });
}

scoreForm.addEventListener('submit', e => {
  e.preventDefault();
  const idx = submissionSelect.value;
  const score = parseInt(document.getElementById('scoreInput').value);
  submissions[idx].score = score;
  saveData('submissions', submissions);
  renderSubmissions();
  scoreForm.reset();
  alert('Score updated successfully!');
});

populateExamSelect();
renderSubmissions();
