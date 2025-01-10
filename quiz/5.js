export default function quiz(input) {
  const numberInterval = +input;
  let answer = "";
  for (let i = 0; i <= numberInterval; i++) {
    for (let j = 0; j <= i; j++) {
      answer += "0";
    }
    if (i != numberInterval) {
      answer += "\n";
    }
  }
  console.log(answer);
  return answer;
}
