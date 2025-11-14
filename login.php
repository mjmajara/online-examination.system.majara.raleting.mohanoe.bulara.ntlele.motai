<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login-info"; //database name that you have created in your xampp mysql


// Creating a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failure: " 
        . $conn->connect_error);
} 




if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $role = $_POST['role'];



    // Check if email already exists
    $checkEmailStmt = $conn->prepare("SELECT email FROM loginn WHERE email = ?");
    $checkEmailStmt->bind_param("s", $email);
    $checkEmailStmt->execute();
    $checkEmailStmt->store_result();

    if ($checkEmailStmt->num_rows > 0) {
        $message = "Account already exists";
        $toastClass = "#007bff"; // Primary color
    } else {
        // Prepare and bind insert the collected information on the form into the table
        $stmt = $conn->prepare("INSERT INTO loginn (role, email, password)VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $role, $email, $password);

        if ($stmt->execute()) {
            $message = "Account created successfully";
            $toastClass = "#28a745"; // Success color
        } else {
            $message = "Error: " . $stmt->error;
            $toastClass = "#dc3545"; // Danger color
        }

        $stmt->close();
    }

    $checkEmailStmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>System Login</title>
<link rel="stylesheet" href="login.css">
</head>

<body>

<div class="login-container">
    <h2>Login</h2>

    <?php if (!empty($error)) : ?>
        <p style="color:red;"><?= $error ?></p>
    <?php endif; ?>

    <form method="POST" action="login.php">
        <label>Email</label>
        <input type="email" name="email" placeholder="Enter email" required id="email">

        <label>Password</label>
        <input type="password" name="password" placeholder="Enter password" required id="password">

        <label>Select Role</label>
        <select name="role" required id="role">
            <option value="">Choose role</option>
            <option value="admin">Admin</option>
            <option value="examiner">Examiner</option>
            <option value="student">Student</option>
        </select>

        <button type="submit">Login</button>
    </form>
</div>

</body>
</html>
