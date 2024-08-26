import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback } from 'react'
import { useRef } from 'react'
import useTimeout from '../../hooks/useTimeout'

type AlertProps = {
    type: string
    message: string
    delayToClose?: number
    closeCallback: () => void
}

export default function Alert({ type, message, delayToClose = 10000, closeCallback } : AlertProps) {
    useTimeout(closeCallback, delayToClose)
    const modalRef = useRef<HTMLDivElement>(null)
    
    const handleOverlayClick = useCallback(
        (e : React.MouseEvent<HTMLDivElement>) => {
            if (modalRef.current?.contains(e.target as Node)) return
            closeCallback()
        },
        [closeCallback]
    )

    return (
        <>
            <div
                className="bg-white max-w-md flex flex-col rounded-lg z-20"
                ref={modalRef}
                onClick={handleOverlayClick}
            >
                <div className="flex justify-end items-center py-2 px-4 border-b border-slate-900/10">
                    <FontAwesomeIcon className="cursor-pointer" icon={faClose} onClick={closeCallback} />
                </div>
                <div className="border-b border-slate-900/10 flex-shrink-0">
                    <span className={`py-4 px-7 block alert alert-${type}`}>{message}</span>
                </div>
            </div>
        </>
    )
}
