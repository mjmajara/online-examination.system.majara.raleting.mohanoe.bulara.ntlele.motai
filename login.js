(function initializeDefaultAccounts() {

  let existingUsers = JSON.parse(localStorage.getItem("users")) || [];


  if (existingUsers.length > 0) return;

  const defaultUsers = [
    {
      name: "Admin User",
      email: "admin@system.com",
      password: "admin123",
      role: "admin"
    },
    {
      name: "Examiner User",
      email: "examiner@system.com",
      password: "examiner123",
      role: "examiner"
    },
    {
      name: "Student User",
      email: "student@system.com",
      password: "student123",
      role: "student"
    }
  ];

  localStorage.setItem("users", JSON.stringify(defaultUsers));
  console.log("✔ Default accounts created.");

})();


document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let role = document.getElementById("loginRole").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let foundUser = users.find(u => u.email === email && u.password === password && u.role === role);

    if (!foundUser) {
        alert("Invalid login details or role!");
        return;
    }

    localStorage.setItem("activeUser", JSON.stringify(foundUser));

    if (role === "admin") window.location.href = "admin.html";
    if (role === "examiner") window.location.href = "examiner.html";
    if (role === "student") window.location.href = "student.html";
});
