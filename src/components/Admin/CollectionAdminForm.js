import React, { useRef } from 'react'
import Overlay from '../Overlay'

export default function CollectionAdminForm({ closeModal }) {
    const ref = useRef()

    return (
        <Overlay closeModal={closeModal} childRef={ref}>
            <form className="w-1/2 bg-white" ref={ref}>
                Collections
            </form>
        </Overlay>
    )
}
