import { decode } from "html-entities";
import { useState } from "react";
import clsx from "clsx";

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [answers] = useState(() =>
    shuffleArray([
      ...props.questionObj.incorrect_answers,
      props.questionObj.correct_answer,
    ]).map(decode),
  );

  function shuffleArray(answersArray) {
    const shuffle = [...answersArray];

    for (let i = shuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
    }

    return shuffle;
  }

  function selectAnswer(answer) {
    setSelectedAnswer(answer);
  }

  const answersElements = answers.map((answer) => {
    const className = clsx("answer", answer === selectedAnswer && "selected");

    return (
      <button
        className={className}
        key={answer}
        onClick={() => selectAnswer(answer)}
      >
        {answer}
      </button>
    );
  });

  return (
    <section className="question">
      <p>{decode(props.questionObj.question)}</p>
      <section className="answers">{answersElements}</section>
    </section>
  );
}
