import { useEffect, useState } from 'react'

const useOnScreen = (ref, rootMargin = '0px', threshold = 0.5) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (ref.current == null) return

        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
            rootMargin,
            threshold,
        })

        observer.observe(ref.current)
        return () => {
            if (ref.current == null) return
            observer.unobserve(ref.current) //eslint-disable-line
        }
    }, [ref.current, rootMargin]) //eslint-disable-line

    return isVisible
}

export default useOnScreen
