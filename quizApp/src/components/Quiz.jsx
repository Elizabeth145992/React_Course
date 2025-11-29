import { useState } from 'react';
import QUESTIONS from '../../questions.js';

export default function Quiz() {
    const [userAnswer, setUserAnswer] = useState([]);
    const [showQuestions, setShowQuestions] = useState(true);
    const activeQuestionIndex = userAnswer.length;

    function handleAnswerSelection(selectedAnswer) {
        setUserAnswer(prevAnswers => {
           return [...prevAnswers, selectedAnswer];
        });

        if (userAnswer.length + 1 === QUESTIONS.length) {
            setShowQuestions(false);
        }
    }

    return(
        <>
            {showQuestions ? (<div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {QUESTIONS[activeQuestionIndex].answers.map((answer, index) => (
                        <li key={index} className='answer'>
                            <button onClick={() => handleAnswerSelection(answer)}>
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>) : (
            <div id="results">
                <h2>Quiz Completed!</h2>
                <p>You answered {userAnswer.length} out of {QUESTIONS.length} questions correctly.</p>
            </div>
            )}
        </>
    );
}