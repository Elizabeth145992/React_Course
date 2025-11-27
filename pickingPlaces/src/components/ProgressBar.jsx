import { useEffect, useState } from "react";

export default function ProgressBar({ timer, modalIsOpen }) {
    const [remainingTime, setRemainingTime] = useState(timer);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 10);
        }, 10);
    
        return () => {
          clearInterval(interval);
        };
      }, [modalIsOpen, timer]);

      return (
        <progress value={remainingTime} max={timer} />
      );
}