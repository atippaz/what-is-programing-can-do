import rl from "readline";
import quizAndAnswers from "./checklist.js";
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(text) {
  return new Promise((resolve) => {
    readline.question(text, (answer) => {
      resolve(answer);
    });
  });
}

async function evaluateQuizItem({ hasInput, quiz, answer, text }, index) {
  console.log("----------------------------");
  let userInput, result, expectedAnswer;
  console.log(`Quiz ${index}:`);
  if (hasInput) {
    userInput = await askQuestion(`${text}`);
    result = quiz(userInput);
    expectedAnswer = answer(userInput);
  } else {
    result = quiz();
    expectedAnswer = answer();
  }

  if (result === expectedAnswer) {
    console.warn("Correct!");
    return true;
  } else {
    console.error(
      `Wrong! Answer is: \n${expectedAnswer} \nYour answer: \n${result}`
    );
    return false;
  }
}

async function main() {
  let correctCount = 0;

  for (let i = 0; i < quizAndAnswers.length; i++) {
    const isCorrect = await evaluateQuizItem(quizAndAnswers[i], i + 1);
    if (isCorrect) correctCount++;
  }

  console.log("----------------------------");
  console.log(
    `You answered correctly ${correctCount}/${quizAndAnswers.length} (${(
      (correctCount / quizAndAnswers.length) *
      100
    ).toFixed(2)}%)`
  );
  if (correctCount == quizAndAnswers.length) {
    console.warn("Congratulation!! you pass");
  }
  readline.close();
}
function test() {
  console.log("test");
}
main();
test();
