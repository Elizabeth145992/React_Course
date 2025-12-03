import { useState, useEffect } from "react";

export default function QuestionTimer({timeOut, onTimeOut}) {
    const [progress, setProgress] = useState(timeOut);

    useEffect(() => {
       const timer = setTimeout(onTimeOut, timeOut);
       
       return () => {
        clearTimeout(timer);
       };
    }, [onTimeOut, timeOut]);

    useEffect(() => {
        const intervalTime = setInterval(() => {
            setProgress((prev) => prev - 100);
        }, 100);

        return () =>{
            clearInterval(intervalTime);
        }
    }, []);

    return (
        <progress id="question-time" max={timeOut} value={progress} />
    )
}