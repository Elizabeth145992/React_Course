import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers.jsx";

import QUESTIONS from "../../questions.js";

export default function Question({activeQuestionIndex, handleAnswerSelection, hanldeSkipAnswer}) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

    if(answer.selectedAnswer){
        timer = 1000;
    }

    if(answer.isCorrect !== null){
        timer = 2000;
    }

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
            <QuestionTimer 
              key={timer} 
              timeOut={timer}
              onTimeOut={ answer.selectedAnswer === '' ? hanldeSkipAnswer : null }
              mode={answerState} 
            />
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