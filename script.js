
const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");
const suggestion = document.getElementById("suggestion");

const togglePassword = document.getElementById("togglePassword");

const commonPasswords = [
    "password",
    "12345678",
    "qwerty123",
    "admin123",
    "password123"
];

const checks = {
    length: document.getElementById("length"),
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};

passwordInput.addEventListener("input", checkPassword);

togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }
});

function checkPassword() {
    const password = passwordInput.value;

    const results = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    let score = 0;

    for (const key in results) {
        if (results[key]) {
            score++;
            checks[key].classList.add("valid");
        } else {
            checks[key].classList.remove("valid");
        }
    }

    if (password.length === 0) {
        resetAnalyzer();
        return;
    }

    const isCommon = commonPasswords.includes(
        password.toLowerCase()
    );

    if (isCommon) {
        showStrength("Very Weak", 20, "#e53935");
        suggestion.textContent =
            "This is a commonly used password. Choose a unique password.";
        return;
    }

    if (score <= 2) {
        showStrength("Weak", 25, "#e53935");
        suggestion.textContent =
            "Add more characters, numbers, uppercase letters and symbols.";
    } 
    else if (score <= 4 || password.length < 12) {
        showStrength("Medium", 60, "#f39c12");
        suggestion.textContent =
            "Good start! Use at least 12 characters and include all requirements.";
    } 
    else {
        showStrength("Strong", 100, "#159447");
        suggestion.textContent =
            "Great! Your password meets all five basic requirements.";
    }
}

function showStrength(text, width, color) {
    strengthText.textContent = text;
    strengthText.style.color = color;
    strengthBar.style.width = width + "%";
    strengthBar.style.background = color;
}

function resetAnalyzer() {
    strengthText.textContent = "Not checked";
    strengthText.style.color = "#777";
    strengthBar.style.width = "0";
    suggestion.textContent =
        "Enter a sample password to begin.";

    Object.values(checks).forEach(function (item) {
        item.classList.remove("valid");
    });
}
