import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}) {
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const timer = useRef();
    const dialog = useRef();

    function handleStart(){
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.showModal();
        }, targetTime * 1000);
        setTimerStarted(true);
    }

    function handleStop(){
        clearTimeout(timer.current);
    }

    return(
        <>
       <ResultModal ref={dialog} results="lost" targetTime={targetTime} />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-timer">
                {targetTime} second{targetTime > 1 ? 's' : ''} to complete the challenge.
            </p>
            {timerExpired && <p className="challenge-expired">Time's up!</p>}
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