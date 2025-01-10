import { calculator } from "./calculator.js";
import { gradeCalculator } from "./grade.js";
function getElement(key) {
  return document.getElementById(key);
}

const element = {
  answerGrade: "answer-grade",
  gradeInput: "grade-input",
  number1: "number1",
  number2: "number2",
  gradeButton: "grade-button",
  plus: "+",
  minus: "-",
  multiple: "*",
  divide: "/",
  result: "result",
};

const number1 = getElement(element.number1);
const number2 = getElement(element.number2);
const result = getElement(element.result);

const plus = getElement(element.plus);
plus.addEventListener("click", (e) => {
  result.innerText = calculator(+number1.value, +number2.value, element.plus);
});

const minus = getElement(element.minus);
minus.addEventListener("click", (e) => {
  result.innerText = calculator(+number1.value, +number2.value, element.minus);
});

const divide = getElement(element.divide);
divide.addEventListener("click", (e) => {
  result.innerText = calculator(+number1.value, +number2.value, element.divide);
});

const multiple = getElement(element.multiple);
multiple.addEventListener("click", (e) => {
  result.innerText = calculator(
    +number1.value,
    +number2.value,
    element.multiple
  );
});

const gradeButton = getElement(element.gradeButton);
const gradeInput = getElement(element.gradeInput);
const answerGrade = getElement(element.answerGrade);

gradeButton.addEventListener("click", (e) => {
  answerGrade.innerText = gradeCalculator(+gradeInput.value);
});
