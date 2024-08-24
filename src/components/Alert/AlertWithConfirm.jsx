import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function AlertWithConfirm({
    type,
    message,
    confirmText,
    cancelText,
    confirmCallback,
    cancelCallback,
    closeCallback,
}) {
    return (
        <div className="bg-white max-w-md flex flex-col rounded-lg">
            <div className="flex justify-end items-center py-2 px-4 border-b border-slate-900/10">
                <FontAwesomeIcon className="cursor-pointer" icon={faClose} onClick={closeCallback} />
            </div>
            <div className="border-b border-slate-900/10 flex-shrink-0">
                <span className={`py-4 px-7 block alert alert-${type}`}>{message}</span>
            </div>
            <div className="flex justify-end p-4 gap-3">
                <button
                    className="py-1 px-4 bg-green-500 text-white rounded-md hover:bg-green-400 active:bg-green-600"
                    onClick={confirmCallback}
                >
                    {confirmText}
                </button>
                <button
                    className="py-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 active:bg-red-600"
                    onClick={cancelCallback}
                >
                    {cancelText}
                </button>
            </div>
        </div>
    )
}
