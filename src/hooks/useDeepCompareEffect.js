import { isEqual } from 'lodash'
import { useEffect, useRef } from 'react'

export default function useDeepCompareEffect(callback, dependencies) {
    const currentDependenciesRef = useRef()
    const callbackRef = useRef(callback)

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies
    }

    if (!isEqual(callbackRef.current, callback)) {
        callbackRef.current = callback
    }

    useEffect(() => callbackRef.current(), [currentDependenciesRef, callbackRef])
}
