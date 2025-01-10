import quiz1 from "./1.js";
import quiz2 from "./2.js";
import quiz3 from "./3.js";
import quiz4 from "./4.js";
import quiz5 from "./5.js";
export default [
  {
    hasInput: true,
    quiz: quiz1,
    answer: (e) => +e >= 20,
    text: "Enter buyer age: ",
  },
  { hasInput: false, quiz: quiz2, answer: () => true, text: "" },
  {
    hasInput: false,
    quiz: quiz3,
    answer: () => "onnaphat",
    text: "Enter your name: ",
  },
  { hasInput: false, quiz: quiz4, answer: () => 10, text: "" },
  {
    hasInput: true,
    quiz: quiz5,
    answer: () => "*\n**\n***\n****",
    text: "enter number :",
  },
];
