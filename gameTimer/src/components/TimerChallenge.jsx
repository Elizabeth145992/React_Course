import { useState } from "react";

export default function TimerChallenge({title, targetTime}) {
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    function handleStart(){
        setTimeout(() => {
            setTimerExpired(true);
        }, targetTime * 1000);
        setTimerStarted(true);
    }

    return(
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-timer">
                {targetTime} second{targetTime > 1 ? 's' : ''} to complete the challenge.
            </p>
            {timerExpired && <p className="challenge-expired">Time's up!</p>}
            <p>
                <button onClick={handleStart}>
                    {timerStarted ? 'Stop':'Start'} Challenge
                </button>
            </p>
            <p className={timerStarted ? 'active' : undefined}>
                {timerStarted ? 'Challenge in progress...' : 'Challenge not started yet.'}
            </p>

        </section>
    );
}