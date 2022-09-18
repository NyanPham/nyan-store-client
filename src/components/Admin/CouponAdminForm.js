import React from 'react'
import { useRef } from 'react'
import Overlay from '../Overlay'

export default function CouponAdminForm({ closeModal }) {
    const ref = useRef()

    return (
        <Overlay closeModal={closeModal} childRef={ref}>
            <form className="w-1/2 bg-white" ref={ref}>
                Coupons
            </form>
        </Overlay>
    )
}
