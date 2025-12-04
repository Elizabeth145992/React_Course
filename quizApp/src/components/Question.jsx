import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers.jsx";

import QUESTIONS from "../../questions.js";

export default function Question({activeQuestionIndex, handleAnswerSelection, hanldeSkipAnswer}) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    function handleSelectAnswer(selectedAnswer) {
         setAnswer({
            selectedAnswer: selectedAnswer,
            isCorrect: null
        });

        setTimeout(() => {
             setAnswer({
                selectedAnswer: selectedAnswer,
                isCorrect: selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]
            });
        }, 1000);

        setTimeout(() => {
            handleAnswerSelection(selectedAnswer);
        }, 2000);
    }

     let answerState = '';
    if(answer.selectedAnswer && answer.isCorrect !== null){
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    }else if(answer.selectedAnswer){
        answerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer key={activeQuestionIndex} timeOut={10000} onTimeOut={hanldeSkipAnswer} />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <Answers
              key={QUESTIONS[activeQuestionIndex].id}
              answers={QUESTIONS[activeQuestionIndex].answers}
              selectedAnswer={answer.selectedAnswer}
              answerState={answerState}
              onSelectedAnswer={handleSelectAnswer}
            />
        </div>
    );
}