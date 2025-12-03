import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers.jsx";

import QUESTIONS from "../../questions.js";

export default function Question({activeQuestionIndex, userAnswer, answerState, handleAnswerSelection, hanldeSkipAnswer}) {
    return (
        <div id="question">
            <QuestionTimer key={activeQuestionIndex} timeOut={10000} onTimeOut={hanldeSkipAnswer} />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <Answers
              key={QUESTIONS[activeQuestionIndex].id}
              answers={QUESTIONS[activeQuestionIndex].answers}
              selectedAnswer={userAnswer[userAnswer.length -1]}
              answerState={answerState}
              onSelectedAnswer={handleAnswerSelection}
            />
        </div>
    );
}