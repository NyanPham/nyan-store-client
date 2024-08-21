import React from 'react'

export default function Overlay({ children, closeModal, childRef, position = 'center' }) {
    const handleCloseModal = (e) => {
        if (childRef?.current.contains(e.target)) return
        if (typeof closeModal === 'function') return closeModal()
    }   
    
    let popupPosition = 'items-center'
    if (position === 'top') popupPosition = 'items-start pt-7'

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-gray-800/90 flex justify-center z-20 ${popupPosition}`}
            onClick={handleCloseModal}
        >
            <div className="animate-showUp">{children}</div>
        </div>
    )
}
