import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useRef } from 'react'
import useTimeout from '../../hooks/useTimeout'

export default function Alert({ type, message, delayToClose = 10000, closeCallback }) {
    useTimeout(closeCallback, delayToClose)
    const modalRef = useRef()

    const handleOverlayClick = (e) => {
        if (modalRef.current.contains(e.target)) return

        closeCallback()
    }

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
