import { useRef } from 'react'
import { isEqual } from 'lodash'

export default function useDeepCompare(value) {
    const ref = useRef()

    if (!isEqual(value, ref.current)) {
        ref.current = value
    }

    return ref.current
}
