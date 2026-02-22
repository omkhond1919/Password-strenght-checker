function togglePassword() {
  const password = document.getElementById("password");
  const toggle = document.getElementById("toggle");

  if (password.type === "password") {
    password.type = "text";
    toggle.textContent = "Hide";
  } else {
    password.type = "password";
    toggle.textContent = "Show";
  }
}

function checkStrength() {
  const password = document.getElementById("password").value;

  const strengthLevel = document.getElementById("strengthLevel");
  const strengthText = document.getElementById("strengthText");

  let strength = 0;

  // Checklist elements
  const length = document.getElementById("length");
  const lowercase = document.getElementById("lowercase");
  const uppercase = document.getElementById("uppercase");
  const number = document.getElementById("number");
  const special = document.getElementById("special");

  // Length check
  if (password.length >= 8) {
    length.textContent = "✔ At least 8 characters";
    strength++;
  } else {
    length.textContent = "❌ At least 8 characters";
  }

  // Lowercase
  if (/[a-z]/.test(password)) {
    lowercase.textContent = "✔ Lowercase letter";
    strength++;
  } else {
    lowercase.textContent = "❌ Lowercase letter";
  }

  // Uppercase
  if (/[A-Z]/.test(password)) {
    uppercase.textContent = "✔ Uppercase letter";
    strength++;
  } else {
    uppercase.textContent = "❌ Uppercase letter";
  }

  // Number
  if (/[0-9]/.test(password)) {
    number.textContent = "✔ Number";
    strength++;
  } else {
    number.textContent = "❌ Number";
  }

  // Special character
  if (/[^A-Za-z0-9]/.test(password)) {
    special.textContent = "✔ Special character";
    strength++;
  } else {
    special.textContent = "❌ Special character";
  }

  // Strength output
  if (password.length === 0) {
    strengthLevel.style.width = "0%";
    strengthText.textContent = "Strength: —";
    return;
  }

  if (strength <= 2) {
    strengthLevel.style.width = "25%";
    strengthLevel.style.background = "red";
    strengthText.textContent = "Strength: Weak";
  } 
  else if (strength === 3) {
    strengthLevel.style.width = "50%";
    strengthLevel.style.background = "orange";
    strengthText.textContent = "Strength: Medium";
  } 
  else if (strength === 4) {
    strengthLevel.style.width = "75%";
    strengthLevel.style.background = "#f1c40f";
    strengthText.textContent = "Strength: Good";
  } 
  else {
    strengthLevel.style.width = "100%";
    strengthLevel.style.background = "green";
    strengthText.textContent = "Strength: Strong";
  }
}