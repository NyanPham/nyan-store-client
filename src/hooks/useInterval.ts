import { useCallback, useEffect, useRef } from 'react'

export default function useInterval(callback, timeSpan) {
    const intervalRef = useRef(null);

    const set = useCallback(() => {
        intervalRef.current = setInterval(callback, timeSpan);
    }, [timeSpan, callback]);

    const stop = useCallback(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);

    useEffect(() => {
        set();
        return stop;
    }, [set, stop]);

    return { set, stop };
}
