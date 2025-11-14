
function loadData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

let students = loadData("students");
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    if (students.some(s => s.email === email)) {
        alert("Email already registered! Please log in instead.");
        return;
    }

    const newStudent = {
        name,
        email,
        password,
        examsRegistered: [],
        results: []
    };

    students.push(newStudent);
    saveData("students", students);

    alert("Registration successful!");
    document.getElementById("registerForm").reset();
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const student = students.find(s => s.email === email && s.password === password);

    if (!student) {
        alert("Incorrect email or password!");
        return;
    }

    loggedInUser = student;
    localStorage.setItem("loggedInUser", JSON.stringify(student));

    alert("Login successful! Welcome " + student.name);
});

function takeExam() {
    if (!loggedInUser) {
        alert("Please log in first!");
        return;
    }

    const examName = prompt("Enter exam name to register (must match list above):");
    if (!examName) return;

    if (loggedInUser.examsRegistered.includes(examName)) {
        alert("You have already registered for this exam!");
        return;
    }

    loggedInUser.examsRegistered.push(examName);

    students = students.map(s => s.email === loggedInUser.email ? loggedInUser : s);
    saveData("students", students);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    alert("Exam registered successfully!");
}

function checkResults() {
    if (!loggedInUser) {
        alert("Please log in first!");
        return;
    }

    const display = document.getElementById("resultsDisplay");

    if (loggedInUser.results.length === 0) {
        display.innerText = "No results available yet.";
        return;
    }

    display.innerHTML = loggedInUser.results
        .map(r => `<p><strong>${r.exam}</strong>: ${r.score}%</p>`)
        .join("");
}

document.getElementById("profileForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (!loggedInUser) {
        alert("Please log in first!");
        return;
    }

    const newName = document.getElementById("updateName").value.trim();
    const newEmail = document.getElementById("updateEmail").value.trim();

    if (newEmail && students.some(s => s.email === newEmail && s.email !== loggedInUser.email)) {
        alert("Email already used by another account!");
        return;
    }

    if (newName) loggedInUser.name = newName;
    if (newEmail) loggedInUser.email = newEmail;


    students = students.map(s => s.email === loggedInUser.email ? loggedInUser : s);
    saveData("students", students);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    alert("Profile updated successfully!");
});


document.getElementById("resetForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("resetEmail").value.trim();
    const student = students.find(s => s.email === email);

    if (!student) {
        alert("No account found with that email!");
        return;
    }

    alert("Temporary password: 12345 (change it after login)");
    student.password = "12345";

    saveData("students", students);
});

function saveResult(exam, score) {
    if (!loggedInUser) return;

    loggedInUser.results.push({ exam, score });


    students = students.map(s => s.email === loggedInUser.email ? loggedInUser : s);
    saveData("students", students);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
}

if (!localStorage.getItem('users')) {
    const users = [
        { email: "student1@example.com", password: "123456" },
        { email: "student2@example.com", password: "abcdef" },
        { email: "student3@example.com", password: "password" }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}


document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === email && u.password === password);

    const messageEl = document.getElementById('loginMessage');
    if (user) {
        messageEl.style.color = 'green';
        messageEl.textContent = 'Login successful! Welcome, ' + email;

    } else {
        messageEl.style.color = 'red';
        messageEl.textContent = 'Invalid email or password!';
    }

    document.getElementById('loginForm').reset();
});

