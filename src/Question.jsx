import { useState } from "react";
import clsx from "clsx";

export default function Question(props) {
  const [selected, setSelected] = useState("");

  function selectAnswer(answer) {
    setSelected(answer);
    props.onSelectAnswer(answer);
  }

  const answersElements = props.answers.map((answer, index) => {
    const className = clsx({
      answer: true,
      selected: !props.checkAnswers && answer === selected,
      wrong:
        props.checkAnswers &&
        answer === selected &&
        answer !== props.correct_answer,
      correct: props.checkAnswers && answer === props.correct_answer,
    });

    return (
      <button
        className={className}
        key={answer + index}
        onClick={() => selectAnswer(answer)}
        disabled={props.checkAnswers}
      >
        {answer}
      </button>
    );
  });

  return (
    <section className="question">
      <p>{props.question}</p>
      <section className="answers">{answersElements}</section>
    </section>
  );
}
