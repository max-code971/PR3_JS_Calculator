const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeBtn = document.getElementById("theme-btn");
const calculator = document.querySelector(".calculator");

let expression = "0";
const operators = ["+", "-", "*", "/", "%"];

function updateDisplay() {
    display.textContent = expression;
}

function addSymbol(value) {
    const lastChar = expression.slice(-1);

    if (operators.includes(value) && operators.includes(lastChar)) {
        expression = expression.slice(0, -1) + value;
        updateDisplay();
        return;
    }

    if (value === "." && lastChar === ".") {
        return;
    }

    if (expression === "0" || expression === "Error") {
        if (operators.includes(value) || value === ".") {
            expression = "0" + value;
        } else {
            expression = value;
        }
    } else {
        expression += value;
    }

    updateDisplay();
}

function clearAll() {
    expression = "0";
    updateDisplay();
}

function deleteLast() {
    if (expression.length === 1 || expression === "Error") {
        expression = "0";
    } else {
        expression = expression.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    try {
        if (operators.includes(expression.slice(-1))) {
            expression = expression.slice(0, -1);
        }

        const result = eval(expression);

        if (!isFinite(result)) {
            expression = "Error";
        } else {
            expression = String(result);
        }
    } catch (error) {
        expression = "Error";
    }
    updateDisplay();
}

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === "clear") {
            clearAll();
        } else if (action === "backspace") {
            deleteLast();
        } else if (action === "equal") {
            calculate();
        } else {
            addSymbol(value);
        }
    });
});

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if ((key >= "0" && key <= "9") || operators.includes(key) || key === ".") {
        addSymbol(key);
    } else if (key === ",") {
        addSymbol(".");
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearAll();
    }
});

if (localStorage.getItem("theme") === "light") {
    calculator.classList.add("light");
    themeBtn.textContent = "🌑";
}

themeBtn.addEventListener("click", function () {
    calculator.classList.toggle("light");

    if (calculator.classList.contains("light")) {
        themeBtn.textContent = "🌑";
        localStorage.setItem("theme", "light");
    } else {
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    }
});