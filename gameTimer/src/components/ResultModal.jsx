export default function ResultModal({ref, results, targetTime}) {
    return(
        <dialog ref={ref} className="result-modal">
            <h2>You {results}</h2>
            <p>
                The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}</strong>.
            </p>
            <p>
                You stopped the timer with <strong>X seconds</strong> left.
            </p>
            <form action="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
}