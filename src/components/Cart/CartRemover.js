import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { removeCart } from '../../redux/actions/cartActions'
import getMatchedButton from '../../utils/getMatchedButton'
import AlertWithConfirm from '../Alert/AlertWithConfirm'
import Overlay from '../Overlay'

export default function CartRemover({ productId, variantId }) {
    const [openConfirm, setOpenConfirm] = useState(false)
    const dispatch = useDispatch()

    const handleRemoveClick = (e) => {
        const button = getMatchedButton(e, '[data-remove-btn]')
        if (!button) return

        setOpenConfirm(true)
    }

    const onConfirm = () => {
        const data = {
            product: productId,
            variant: variantId,
        }

        dispatch(removeCart(data))
        setOpenConfirm(false)
    }

    const onCancel = () => {
        setOpenConfirm(false)
    }

    const onClose = () => {
        setOpenConfirm(false)
    }

    return (
        <>
            <button
                className="text-slate-700 text-md transition duration-200 hover:text-red-400"
                onClick={handleRemoveClick}
                type="button"
                data-remove-btn
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
            {openConfirm &&
                ReactDOM.createPortal(
                    <Overlay>
                        <AlertWithConfirm
                            type="warning"
                            message="Are you sure to remove the item from your cart"
                            confirmText="Yes"
                            cancelText="No"
                            confirmCallback={onConfirm}
                            cancelCallback={onCancel}
                            closeCallback={onClose}
                        />
                    </Overlay>,
                    document.getElementById('modal-container')
                )}
        </>
    )
}
