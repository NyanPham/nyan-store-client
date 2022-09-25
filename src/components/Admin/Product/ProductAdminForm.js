import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { productConfig, variantConfig } from '../../../config'
import useFetchDocs from '../../../hooks/useFetchDocs'
import getMatchedButton from '../../../utils/getMatchedButton'
import Overlay from '../../Overlay'
import ProductEditor from './ProductEditor'
import VariantEditor from './VariantEditor'

export default function ProductAdminForm({ closeModal }) {
    const [products] = useFetchDocs('products')
    const [productId, setProductId] = useState()
    const [showProduct, setShowProduct] = useState(false)
    const [variantId, setVariantId] = useState()
    const [showVariant, setShowVariant] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const ref = useRef()

    const handleProductEditClick = (e) => {
        e.preventDefault()
        const button = getMatchedButton(e, '[data-product-id]')

        if (!button) return

        setProductId(button.dataset.productId)
        setShowAddForm(false)
    }

    const handleVariantEditClick = (e) => {
        e.preventDefault()
        const button = getMatchedButton(e, '[data-variant-id]')
        if (!button) return

        setVariantId(button.dataset.variantId)
        setProductId(button.closest('details').querySelector('[data-product-id]').dataset.productId)
        setShowAddForm(false)
    }

    useEffect(() => {
        if (!productId) return setShowProduct(false)

        setShowProduct(true)
    }, [productId])

    useEffect(() => {
        if (!variantId) return setShowVariant(false)

        setShowVariant(true)
    }, [variantId])

    useEffect(() => {
        if (showProduct) return

        setProductId(null)
    }, [showProduct])

    useEffect(() => {
        if (showVariant) return

        setVariantId(null)
        setProductId(null)
    }, [showVariant])

    return (
        <Overlay closeModal={closeModal} childRef={ref}>
            <form className="w-1/2 bg-white py-3 px-7" ref={ref}>
                <h2 className="text-center text-2xl text-cyan-400 font-semibold">Products</h2>
                <div className="max-h-96 mt-5 overflow-y-auto select-none">
                    {products.length > 0 &&
                        products.map((product) => (
                            <div key={`product_${product.SKU}`} className="cursor-pointer">
                                <details className="form-input group hover:bg-cyan-400">
                                    <summary className="group-hover:text-white flex justify-between">
                                        {product.name}
                                        <FontAwesomeIcon
                                            className="hover:text-green-200"
                                            icon={faEdit}
                                            onClick={handleProductEditClick}
                                            data-product-id={product._id}
                                        />
                                    </summary>
                                    <div className="mt-3">
                                        {product.variants.map((variant) => (
                                            <div
                                                key={`variant_${product.SKU}_${variant.name}`}
                                                className="form-input flex justify-between"
                                            >
                                                {variant.name}
                                                <FontAwesomeIcon
                                                    className="hover:text-green-400"
                                                    icon={faEdit}
                                                    onClick={handleVariantEditClick}
                                                    data-variant-id={variant._id}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            </div>
                        ))}
                </div>
                <button
                    type="button"
                    className="submit-button font-semibold text-lg"
                    onClick={() => {
                        setShowAddForm(true)
                        setShowProduct(true)
                    }}
                >
                    Create Product
                </button>
                <button
                    type="button"
                    className="submit-button font-semibold text-lg"
                    onClick={() => {
                        setShowAddForm(true)
                        setShowVariant(true)
                    }}
                >
                    Create Variant
                </button>
                {showProduct && !showAddForm && productId && (
                    <ProductEditor
                        productId={productId}
                        products={products}
                        isAddForm={false}
                        closeModal={() => setShowProduct(false)}
                        config={productConfig}
                    />
                )}
                {showProduct && showAddForm && (
                    <ProductEditor
                        productId={productId}
                        products={products}
                        isAddForm={true}
                        closeModal={() => setShowAddForm(false)}
                        config={productConfig}
                    />
                )}
                {showVariant && !showAddForm && variantId && (
                    <VariantEditor
                        variantId={variantId}
                        variants={products.find((product) => product._id === productId)?.variants}
                        isAddForm={false}
                        closeModal={() => {
                            setShowVariant(false)
                            setShowProduct(false)
                        }}
                        config={variantConfig}
                    />
                )}
                {showVariant && showAddForm && (
                    <VariantEditor
                        variantId={variantId}
                        variants={products.find((product) => product._id === productId)?.variants}
                        isAddForm={true}
                        closeModal={() => {
                            setShowVariant(false)
                            setShowProduct(false)
                        }}
                        config={variantConfig}
                    />
                )}
            </form>
        </Overlay>
    )
}
