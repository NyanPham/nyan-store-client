import { useRef } from 'react'
import { isEqual } from 'lodash'

export default function useDeepCompare(value) {
    const ref = useRef()

    console.log(!isEqual(value, ref.current))

    if (!isEqual(value, ref.current)) {
        ref.current = value
    }

    return ref.current
}
