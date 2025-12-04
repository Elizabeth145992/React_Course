import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelectedAnswer}) {
    const shuffledQuestions = useRef();

    if(!shuffledQuestions.current){
        shuffledQuestions.current = [...answers];
        shuffledQuestions.current = shuffledQuestions.current.sort(() => Math.random() - 0.5);
      }
    return (
        <ul id="answers">
              {shuffledQuestions.current.map((answer, index) => {
                let cssClass = '';
                const isSelected = selectedAnswer === answer;

                if(answerState === 'answered' && isSelected){
                  cssClass = 'selected';
                }

                if((answerState === 'correct' || answerState === 'wrong') && isSelected){
                  cssClass = answerState;
                }
                
                return (
                <li key={index} className="answer">
                  <button onClick={() => onSelectedAnswer(answer)} className={cssClass} disabled={answerState !== ''}>
                    {answer}
                  </button>
                </li>);
              })}
            </ul>
    );
}