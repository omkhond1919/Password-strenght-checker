function togglePassword() {
  const input = document.getElementById("password");
  const toggle = document.getElementById("toggle");

  if (input.type === "password") {
    input.type = "text";
    toggle.textContent = "Hide";
  } else {
    input.type = "password";
    toggle.textContent = "Show";
  }
}

// Generate strong password
function generatePassword() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";

  for (let i = 0; i < 14; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById("password").value = password;
  checkStrength();
}

// Calculate entropy
function calculateEntropy(password) {
  let pool = 0;

  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^A-Za-z0-9]/.test(password)) pool += 32;

  return password.length * Math.log2(pool || 1);
}

// Estimate crack time
function estimateCrackTime(entropy) {
  const guessesPerSecond = 1e9;
  const seconds = Math.pow(2, entropy) / guessesPerSecond;

  if (seconds < 60) return "Seconds";
  if (seconds < 3600) return "Minutes";
  if (seconds < 86400) return "Hours";
  if (seconds < 31536000) return "Days";
  return "Years+";
}

// Strength checker
function checkStrength() {
  const password = document.getElementById("password").value;
  const strengthLevel = document.getElementById("strengthLevel");
  const strengthText = document.getElementById("strengthText");

  document.getElementById("length").textContent =
    password.length >= 8 ? "✔ At least 8 characters" : "❌ At least 8 characters";
  document.getElementById("lowercase").textContent =
    /[a-z]/.test(password) ? "✔ Lowercase letter" : "❌ Lowercase letter";
  document.getElementById("uppercase").textContent =
    /[A-Z]/.test(password) ? "✔ Uppercase letter" : "❌ Uppercase letter";
  document.getElementById("number").textContent =
    /[0-9]/.test(password) ? "✔ Number" : "❌ Number";
  document.getElementById("special").textContent =
    /[^A-Za-z0-9]/.test(password)
      ? "✔ Special character"
      : "❌ Special character";

  if (!password) {
    strengthLevel.style.width = "0%";
    strengthText.textContent = "Strength: —";
    document.getElementById("entropyText").textContent = "Entropy: —";
    document.getElementById("crackText").textContent =
      "Estimated crack time: —";
    return;
  }

  const entropy = calculateEntropy(password);
  document.getElementById("entropyText").textContent =
    "Entropy: " + entropy.toFixed(1) + " bits";
  document.getElementById("crackText").textContent =
    "Estimated crack time: " + estimateCrackTime(entropy);

  let percent = Math.min(entropy, 100);
  strengthLevel.style.width = percent + "%";

  if (entropy < 30) {
    strengthLevel.style.background = "red";
    strengthText.textContent = "Strength: Weak";
  } else if (entropy < 50) {
    strengthLevel.style.background = "orange";
    strengthText.textContent = "Strength: Medium";
  } else if (entropy < 70) {
    strengthLevel.style.background = "#f1c40f";
    strengthText.textContent = "Strength: Good";
  } else {
    strengthLevel.style.background = "green";
    strengthText.textContent = "Strength: Strong";
  }
}
