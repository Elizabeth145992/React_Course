import { useState, useCallback } from "react";
import QUESTIONS from "../../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

import quizComplete from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIndex = userAnswer.length;
  const quizCompleted = userAnswer.length === QUESTIONS.length;
  const shuffledQuestions = !quizCompleted ? QUESTIONS[activeQuestionIndex].answers.sort(() => Math.random() - 0.5) : [];

  const handleAnswerSelection = useCallback(
  function handleAnswerSelection(selectedAnswer) {
    setUserAnswer((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  }, []);

  const hanldeSkipAnswer = useCallback(() => handleAnswerSelection(null), [handleAnswerSelection]);

  return (
    <>
      <div id="quiz">
        {!quizCompleted ? (
          <div id="question">
            <QuestionTimer timeOut={10000} onTimeOut={hanldeSkipAnswer} />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id="answers">
              {shuffledQuestions.map((answer, index) => (
                <li key={index} className="answer">
                  <button onClick={() => handleAnswerSelection(answer)}>
                    {answer}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div id="summary">
            <img src={quizComplete} alt="Quiz complete" />
            <h2>Quiz Completed!</h2>
          </div>
        )}
      </div>
    </>
  );
}
