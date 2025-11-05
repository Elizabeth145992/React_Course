import { useImperativeHandle, useRef } from "react";

export default function ResultModal({ref, targetTime, remainingTime, onReset}) {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const timerFormatted = (remainingTime / 1000).toFixed(2);

    useImperativeHandle(ref, () => {
        return {
            open: () => dialog.current.showModal(),
            close: () => dialog.current.close()
        }
    });

    return(
        <dialog ref={dialog} className="result-modal">
            {userLost && <h2>YOU LOST</h2>}
            <p>
                The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}</strong>.
            </p>
            <p>
                You stopped the timer with <strong>{timerFormatted} seconds</strong> left.
            </p>
            <form action="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>
    );
}