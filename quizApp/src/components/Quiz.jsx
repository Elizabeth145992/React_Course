import { useState, useCallback} from "react";
import QUESTIONS from "../../questions.js";
import Question from "./Question.jsx";

import quizComplete from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const [answerState, setAnswerState] = useState('');
  const activeQuestionIndex = answerState === '' ? userAnswer.length: userAnswer.length -1;
  const quizCompleted = userAnswer.length === QUESTIONS.length;

  const handleAnswerSelection = useCallback(
  function handleAnswerSelection(selectedAnswer) {
    setAnswerState('answered');
    setUserAnswer((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
    setTimeout(() => {
      if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
        setAnswerState('correct');
      }else{
        setAnswerState('wrong');
      }
    }, 1000);

    setTimeout(() => {
      setAnswerState('');
    }, 2000);

  }, [activeQuestionIndex]);

  const hanldeSkipAnswer = useCallback(() => handleAnswerSelection(null), [handleAnswerSelection]);

  return (
    <>
      <div id="quiz">
        {!quizCompleted ? (
          <Question
          /* key={activeQuestionIndex} Puede ser una única llave en el componente para ya no colocarle las dos llaves a cada
            componete dentor de Question*/
            activeQuestionIndex={activeQuestionIndex}
            userAnswer={userAnswer}
            answerState={answerState}
            handleAnswerSelection={handleAnswerSelection}
            hanldeSkipAnswer={hanldeSkipAnswer}
          />
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
