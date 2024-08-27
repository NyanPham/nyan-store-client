import { faPenToSquare, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import getMatchedButton from '../../utils/getMatchedButton'
import { ROOT_URL } from '../../config'
import VariantsPickerWithImage from '../Products/VariantsPickerWithImage'
import { Product, Variant, VariantDataToSubmit } from '../../types'

type CartEditorProps = {
    productId: string
    variantId: string
    currentQuantity: number
    onVariantChange: (variant: Variant) => void 
    onQuantityChange: (quantiy: number) => void
}   

const CartEditor = React.memo(({ productId, variantId, currentQuantity, onVariantChange, onQuantityChange }: CartEditorProps) => {
    const [product, setProduct] = useState<Product | null>(null)
    const [openEditor, setOpenEditor] = useState(false)
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)

    useEffect(() => {
        const getProduct = async (productId: string) => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${ROOT_URL}/api/v1/products/${productId}`,
                    withCredentials: true,
                })

                if (res.data.status === 'success') {
                    setProduct(res.data.data.doc)
                    setSelectedVariant(res.data.data.doc.variants.find((variant : Variant) => variant._id === variantId))
                }
            } catch (err: any) {
                alert(err.response.data.message)
            }
        }

        getProduct(productId)
    }, [productId, variantId])

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = getMatchedButton(e, '[data-edit-btn]')
        if (!button) return

        setOpenEditor(true)
    }

    const formSubmitHandler = (data : VariantDataToSubmit) => {
        const variant = product?.variants.find((variant) => variant._id.toString() === data.variantId)
        if (variant != null) onVariantChange(variant)
        if (data.quantity != null) onQuantityChange(data.quantity)
    }

    const handleVariantChange = (variant: Variant) => {
        setSelectedVariant(variant)
    }

    return (
        <>
            <button
                className="text-slate-700 text-md transition hover:text-green-400"
                onClick={handleEditClick}
                type="button"
                data-edit-btn
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            {openEditor &&
                ReactDOM.createPortal(
                    <div className="z-20 bg-slate-700/90 fixed top-0 left-0 w-full h-full">
                        <div className="p-3 w-96 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <VariantsPickerWithImage
                                selectedVariant={selectedVariant}
                                id={product?._id}
                                variants={product?.variants}
                                handleVariantChange={handleVariantChange}
                                handleAddToCart={formSubmitHandler}
                                setOpenQuickView={setOpenEditor}
                                buttonText="Edit"
                                nameStyles="text-2xl"
                                review={{
                                    show: false,
                                }}
                                quantityControl={true}
                                currentQuantity={currentQuantity}
                                wishlist={false}
                                isEditing={true}
                            />
                            <button
                                className="absolute right-4 top-3"
                                type="button"
                                onClick={() => setOpenEditor(false)}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    </div>, 
                    document.getElementById('modal-container')!
                )}
        </>
    )
})

export default CartEditor
