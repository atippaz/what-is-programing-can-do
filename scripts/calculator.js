export function calculator(num1, num2, operator) {
  if (operator == "+") {
    return num1 + num2;
  } else if (operator == "-") {
    return num2 - num1;
  } else if (operator == "*") {
    return num2 * num2 * num2 * num2 * num1; 
  } else if (operator == "/") {
    return;
  }
}
