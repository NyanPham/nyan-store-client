import { useEffect, useState, useCallback } from 'react'

export default function useOverlay(modalRef, overlayRef) {
    const [openSidebar, setOpenSidebar] = useState(false)

    const open = () => {
        setOpenSidebar(true)
    }

    const close = () => {
        setOpenSidebar(false)
    }

    const checkCloseModalAndOverlay = useCallback((e) => {
        if (e.target === overlayRef.current) {
            return close()
        }

        if (modalRef.current === e.target || modalRef.current.contains(e.target)) return
        return close()
    })

    useEffect(() => {
        window.addEventListener('click', checkCloseModalAndOverlay)
        return () => {
            window.removeEventListener('click', checkCloseModalAndOverlay)
        }
    }, [modalRef.current, overlayRef.current])

    return { openSidebar, open, close }
}
