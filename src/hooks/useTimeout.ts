import { useEffect, useRef, useCallback } from 'react'

export default function useTimeout(
    callback: (...args: any[]) => void,
    delay: number
): { reset: () => void; clear: () => void } {
    const callbackRef = useRef<typeof callback>(callback)
    const timeoutRef = useRef<number | null>(null)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay)
    }, [delay])

    const clear = useCallback(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }, [])

    useEffect(() => {
        set()
        return clear
    }, [delay, set, clear])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])

    return { reset, clear }
}
