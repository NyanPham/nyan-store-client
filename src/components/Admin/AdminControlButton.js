import React, { useState } from 'react'
import ReactDOM from 'react-dom'

export default function AdminControlButton({ buttonText, form: Form }) {
    const [open, setOpen] = useState(false)

    const closeModal = () => {
        setOpen(false)
    }

    return (
        <>
            <button
                className="w-full mt-4 p-3 text-lg text-slate-700 font-semibold tracking-normal rounded-xl transition duration-200 hover:bg-gray-900/10"
                type="button"
                onClick={() => setOpen(true)}
            >
                {buttonText}
            </button>
            {open &&
                ReactDOM.createPortal(<Form closeModal={closeModal} />, document.getElementById('modal-container'))}
        </>
    )
}
