import { useEffect } from 'react'
import useTimeout from './useTimeout'

export default function useDebounce<T extends (...args: any[]) => any>(
    callback: T,
    delay: number,
    dependencies: React.DependencyList = [],
) {
    const { reset } = useTimeout(callback, delay)
    useEffect(reset, [...dependencies, reset])
    // return useCallback(callback, [reset])
}
