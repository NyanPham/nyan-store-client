type OverlayProps = {
    children: React.ReactNode
    closeModal?: () => void
    childRef?: React.RefObject<HTMLElement>
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
}   

export default function Overlay({ children, closeModal, childRef, position = 'center' } : OverlayProps) {
    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (childRef?.current?.contains(e.target as Node)) return
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
