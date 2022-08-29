import { useCallback, useEffect, useRef } from 'react'

export default function useInterval(callback, timeSpan) {
    const callbackRef = useRef(callback)
    const intervalRef = useRef()

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        intervalRef.current = setInterval(() => callbackRef.current(), timeSpan)
    }, [timeSpan])

    const stop = useCallback(() => {
        intervalRef.current && clearInterval(intervalRef.current)
    }, [])

    useEffect(() => {
        set()
        return stop
    }, [timeSpan, set, stop])

    return { set, stop }
}
