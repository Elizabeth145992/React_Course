import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();
    const [timerRemaining, setTimerRemaining] = useState(targetTime * 1000);
    
    const timerStarted = timerRemaining < targetTime * 1000 && timerRemaining > 0;
    
    if(timerRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimerRemaining(targetTime * 1000);
    }

    function handleStart(){
        timer.current = setInterval(() => {
            setTimerRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop(){
        clearInterval(timer.current);
        dialog.current.open();
    }

    return(
        <>
       <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timerRemaining} onReset={handleReset} />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-timer">
                {targetTime} second{targetTime > 1 ? 's' : ''} to complete the challenge.
            </p>
            {/*timerExpired && <p className="challenge-expired">Time's up!</p>*/}
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>
                    {timerStarted ? 'Stop':'Start'} Challenge
                </button>
            </p>
            <p className={timerStarted ? 'active' : undefined}>
                {timerStarted ? 'Challenge in progress...' : 'Challenge not started yet.'}
            </p>

        </section>
        </>
    );
}