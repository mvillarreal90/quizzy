import { useState } from "react";
import Question from "./Question";

export default function App() {
  const [questions, setQuestions] = useState([]);

  const gameStart = questions.length > 0;

  async function getQuestions() {
    const res = await fetch("https://opentdb.com/api.php?amount=5");
    const data = await res.json();
    return data.results;
  }

  async function newGame() {
    try {
      const questions = await getQuestions();
      setQuestions(questions);
    } catch (err) {
      console.error(err);
    }
  }

  function renderQuestions() {
    const questionElements = questions.map((question, index) => (
      <Question key={index} questionObj={question} id={index} />
    ));

    return questionElements;
  }

  return (
    <main>
      {gameStart ? (
        <section className="game">
          <section>{renderQuestions()}</section>
          <button className="play">Check answers</button>
        </section>
      ) : (
        <header>
          <h1>Quizzy</h1>
          <button className="start" onClick={newGame}>
            Start quiz
          </button>
        </header>
      )}
    </main>
  );
}
