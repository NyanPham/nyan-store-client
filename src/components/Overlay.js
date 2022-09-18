import React from 'react'

export default function Overlay({ children, closeModal, childRef }) {
    const handleCloseModal = (e) => {
        if (childRef.current.contains(e.target)) return

        closeModal()
    }

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-gray-800/90 flex justify-center items-center"
            onClick={handleCloseModal}
        >
            {children}
        </div>
    )
}
