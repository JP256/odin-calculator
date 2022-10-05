class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  clear() {
    this.operation = "";
    this.prevOpe = "";
    this.currOpe = "";
  }

  del() {
    this.currOpe = this.currOpe.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currOpe.includes(".")) return;
    this.currOpe = this.currOpe.toString() + number.toString();
  }

  display() {
    this.currentOperandText.innerText = this.currOpe;
    this.previousOperandText.innerText = `${this.prevOpe.toString()}  ${this.operation.toString()}`;
  }

  compute() {
    if (this.currOpe === "" || this.prevOpe === "") return;
    let total = 0;
    const prev = parseFloat(this.prevOpe);
    const curr = parseFloat(this.currOpe);

    switch (this.operation.toString()) {
      case "+":
        total = prev + curr;
        break;
      case "-":
        total = prev - curr;
        break;
      case "x":
        total = prev * curr;
        break;
      case "/":
        total = prev / curr;
        break;
      default:
        return;
    }
    this.currOpe = total.toString();
    this.prevOpe = "";
    this.operation = "";
  }

  chooseOperation(operation) {
    if (this.prevOpe !== "" && this.currOpe === "") {
      this.operation = operation;
    }
    if (this.currOpe === "") return;
    if (this.prevOpe !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOpe = this.currOpe;
    this.currOpe = "";
  }
}

let nums = document.querySelectorAll(".num");
let operations = document.querySelectorAll(".ope");
let equal = document.querySelector(".equal");
let del = document.querySelector(".del");
let clear = document.querySelector(".clear");
let previousOperandText = document.querySelector(".prev");
let currentOperandText = document.querySelector(".curr");

let calculator = new Calculator(previousOperandText, currentOperandText);

nums.forEach((a) => {
  a.addEventListener("click", () => {
    calculator.appendNumber(a.innerText);
    calculator.display();
  });
});

del.addEventListener("click", () => {
  calculator.del();
  calculator.display();
});

clear.addEventListener("click", (a) => {
  calculator.clear();
  calculator.display();
});

operations.forEach((a) => {
  a.addEventListener("click", () => {
    calculator.chooseOperation(a.innerText);
    calculator.display();
  });
});

equal.addEventListener("click", () => {
  calculator.compute();
  calculator.display();
});
