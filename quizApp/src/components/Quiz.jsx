import { useState, useCallback} from "react";
import QUESTIONS from "../../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";



export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIndex = userAnswer.length;
  const quizCompleted = userAnswer.length === QUESTIONS.length;

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
          <Question
            key={activeQuestionIndex}
            activeQuestionIndex={activeQuestionIndex}
            handleAnswerSelection={handleAnswerSelection}
            hanldeSkipAnswer={hanldeSkipAnswer}
          />
        ) : (
          <Summary userAnswers={userAnswer}/>
        )}
      </div>
    </>
  );
}
