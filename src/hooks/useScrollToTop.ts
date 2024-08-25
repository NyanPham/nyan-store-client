import useDeepCompareEffect from './useDeepCompareEffect'

export default function useScrollToTop(...dependencies) {
    useDeepCompareEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }, [dependencies])
}
