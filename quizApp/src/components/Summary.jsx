import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../../questions.js";

export default function Summary({ userAnswers }) {
    let skippedCount = userAnswers.filter(answer => answer === null);
    let correctCount = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

    const skippedPorcentage = Math.round((skippedCount.length / userAnswers.length) * 100);
    const correctPorcentage = Math.round((correctCount.length / userAnswers.length) * 100);
    const wrongPorcentage = 100 - skippedPorcentage - correctPorcentage;


  return (
    <div id="summary">
      <img src={quizComplete} alt="Quiz complete" />
      <h2>Quiz Completed!</h2>

      <div id="summary-stats">
        <p>
          <span className="number">{skippedPorcentage}%</span>
          <span className="text"></span>
        </p>
        <p>
          <span className="number">{correctPorcentage}%</span>
          <span className="text"></span>
        </p>
        <p>
          <span className="number">{wrongPorcentage}%</span>
          <span className="text"></span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
            let questionClass = 'user-answer';

            if(answer === null){
                questionClass += ' skipped';
            }else if(answer === QUESTIONS[index].answers[0]){
                questionClass += ' correct';
            }else{
                questionClass += ' wrong';
            }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={questionClass}>{answer ?? 'skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
