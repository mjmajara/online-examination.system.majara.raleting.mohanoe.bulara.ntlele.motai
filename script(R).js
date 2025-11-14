<script>
const DB = {

  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  init() {
    if (!this.load("users")) this.save("users", []);
    if (!this.load("exams")) this.save("exams", []);
    if (!this.load("results")) this.save("results", []);
  }
};
DB.init();

function createAccount(name, email, password) {
  const users = DB.load("users");
  if (users.find(u => u.email === email)) {
    return { success: false, message: "Email already registered." };
  }
  users.push({ name, email, password });
  DB.save("users", users);
  return { success: true, message: "Account created successfully." };
}

function login(email, password) {
  const users = DB.load("users");
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, message: "Login successful." };
  }
  return { success: false, message: "Invalid credentials." };
}

function logout() {
  localStorage.removeItem("currentUser");
}

function addExam(title, questions) {
  const exams = DB.load("exams");
  exams.push({ id: Date.now(), title, questions });
  DB.save("exams", exams);
}

function getExams() {
  return DB.load("exams");
}

function takeExam(examId, answers) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return { success: false, message: "Login required." };

  const exams = DB.load("exams");
  const exam = exams.find(e => e.id === examId);
  if (!exam) return { success: false, message: "Exam not found." };

 
  let score = 0;
  exam.questions.forEach((q, i) => {
    if (answers[i] === q.correct) score++;
  });

  const results = DB.load("results");
  results.push({
    user: currentUser.email,
    examId,
    score,
    total: exam.questions.length,
    date: new Date().toISOString()
  });
  DB.save("results", results);

  return { success: true, score, total: exam.questions.length };
}

console.log(createAccount("Alice", "alice@example.com", "pass123"));


console.log(login("alice@example.com", "pass123"));

addExam("Math Basics", [
  { question: "2+2=?", options: ["3","4","5"], correct: 1 },
  { question: "5-3=?", options: ["1","2","3"], correct: 1 }
]);


console.log(takeExam(getExams()[0].id, [1,1])); // both correct
</script>
