
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function loadData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
let users = loadData('users');

function renderUsers() {
  userList.innerHTML = '';
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.role}</td>
      <td><button class="remove-btn" data-type="user" data-index="${index}">Remove</button></td>
    `;
    userList.appendChild(row);
  });
}

if (userForm) {
  userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const role = document.getElementById('userRole').value;

    if (name && role) {
      users.push({ name, role });
      saveData('users', users);
      renderUsers();
      userForm.reset();
    }
  });
}

const subjectForm = document.getElementById('subjectForm');
const subjectList = document.getElementById('subjectList');
let subjects = loadData('subjects');

function renderSubjects() {
  subjectList.innerHTML = '';
  subjects.forEach((subject, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${subject}
      <button class="remove-btn" data-type="subject" data-index="${index}">Remove</button>
    `;
    subjectList.appendChild(li);
  });
}

if (subjectForm) {
  subjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('subjectName').value.trim();
    if (subject) {
      subjects.push(subject);
      saveData('subjects', subjects);
      renderSubjects();
      subjectForm.reset();
    }
  });
}

const questionForm = document.getElementById('questionForm');
const questionList = document.getElementById('questionList');
let questions = loadData('questions');

function renderQuestions() {
  questionList.innerHTML = '';
  questions.forEach((q, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${q.question} <em>(${q.answer})</em>
      <button class="remove-btn" data-type="question" data-index="${index}">Remove</button>
    `;
    questionList.appendChild(li);
  });
}

if (questionForm) {
  questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = document.getElementById('questionText').value.trim();
    const answer = document.getElementById('answerText').value.trim();

    if (question && answer) {
      questions.push({ question, answer });
      saveData('questions', questions);
      renderQuestions();
      questionForm.reset();
    }
  });
}

document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const type = e.target.dataset.type;
    const index = parseInt(e.target.dataset.index);
    if (type === 'user') {
      users.splice(index, 1);
      saveData('users', users);
      renderUsers();
    } else if (type === 'subject') {
      subjects.splice(index, 1);
      saveData('subjects', subjects);
      renderSubjects();
    } else if (type === 'question') {
      questions.splice(index, 1);
      saveData('questions', questions);
      renderQuestions();
    }
  }
});

renderUsers();
renderSubjects();
renderQuestions();

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

dropdowns.forEach(drop => {
  const btn = drop.querySelector('.dropbtn');
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    drop.classList.toggle('active');
    // Close others if open
    dropdowns.forEach(other => {
      if (other !== drop) other.classList.remove('active');
    });
  });
});

window.addEventListener('click', () => {
  dropdowns.forEach(drop => drop.classList.remove('active'));
});
