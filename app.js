const display = document.getElementById("display");
const buttons = Array.from(document.querySelectorAll(".button"));
let currentInput = "";
let previousInput = "";
let operator = "";
let result = null;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.textContent;

    // Clear display
    if (value === "C") {
      currentInput = "";
      previousInput = "";
      operator = "";
      display.value = "";
      return;
    }

    // Decimal point
    if (value === "." && !currentInput.includes(".")) {
      currentInput += ".";
    }

    // Equals sign, calculate result
    if (value === "=") {
      if (previousInput && operator && currentInput) {
        currentInput = operate(
          parseFloat(previousInput),
          parseFloat(currentInput),
          operator
        );
        display.value = currentInput;
        previousInput = "";
        operator = "";
      }
      return;
    }

    // Operators
    if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput === "") return;
      if (previousInput) {
        currentInput = operate(
          parseFloat(previousInput),
          parseFloat(currentInput),
          operator
        );
        display.value = currentInput;
      }
      operator = value;
      previousInput = currentInput;
      currentInput = "";
      return;
    }

    // Handle numbers and pi
    if (value === "π") {
      currentInput = Math.PI.toString();
      display.value = currentInput;
      return;
    }

    if (value === "√") {
      if (currentInput) {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        display.value = currentInput;
      }
      return;
    }

    if (value === "x²") {
      if (currentInput) {
        currentInput = Math.pow(parseFloat(currentInput), 2).toString();
        display.value = currentInput;
      }
      return;
    }

    // Add number to current input
    if (!["C", "=", "/", "*", "-", "+", "√", "x²", "π"].includes(value)) {
      currentInput += value;
    }

    display.value = currentInput;
  });
});

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return b;
  }
}
