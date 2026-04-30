import { useState } from "react";
import Question from "./Question";
import { decode } from "html-entities";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const gameStart = questions.length > 0;
  const gameOver = score !== null;
  const scoreMessage =
    score !== null ? `You scored ${score}/5 correct answers` : "";

  async function getQuestions() {
    const res = await fetch("https://opentdb.com/api.php?amount=5");
    const data = await res.json();
    return data.results;
  }

  function shuffleArray(answersArray) {
    const shuffle = [...answersArray];

    for (let i = shuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
    }

    return shuffle;
  }

  async function newGame() {
    try {
      const questions = await getQuestions();
      const idQuestions = questions.map((question, index) => {
        const shuffledAnswers = shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]).map(decode);

        return {
          id: index,
          question: decode(question.question),
          answers: shuffledAnswers,
          correct_answer: decode(question.correct_answer),
        };
      });

      setQuestions(idQuestions);
      setUserAnswers({});
      setScore(null);
    } catch (err) {
      console.error(err);
    }
  }

  function selectAnswer(answer, id) {
    setUserAnswers((prev) => ({ ...prev, [id]: answer }));
  }

  function renderQuestions() {
    const questionElements = questions.map((question) => {
      return (
        <Question
          key={question.id}
          question={question.question}
          answers={question.answers}
          correct_answer={question.correct_answer}
          checkAnswers={score !== null}
          onSelectAnswer={(answer) => selectAnswer(answer, question.id)}
        />
      );
    });

    return questionElements;
  }

  function checkAnswers() {
    const scoreCount = questions.reduce((count, question) => {
      if (question.correct_answer === userAnswers[question.id]) {
        return count + 1;
      }
      return count;
    }, 0);

    setScore(scoreCount);
  }

  return (
    <main>
      {gameStart ? (
        <section className="game">
          <section>{renderQuestions()}</section>
          {gameOver ? (
            <div>
              <span className="score-message">{scoreMessage}</span>
              <button className="play" onClick={newGame}>
                Play again
              </button>
            </div>
          ) : (
            <button
              className="play"
              onClick={checkAnswers}
              disabled={Object.keys(userAnswers).length < questions.length}
            >
              Check answers
            </button>
          )}
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
