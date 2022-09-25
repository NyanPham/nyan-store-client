import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { ROOT_URL } from '../../../config'
import getMatchedButton from '../../../utils/getMatchedButton'
import Overlay from '../../Overlay'
import ProductEditor from './ProductEditor'
import VariantEditor from './VariantEditor'

export default function ProductAdminForm({ closeModal }) {
    const [products, setProducts] = useState([])
    const [productId, setProductId] = useState()
    const [showProduct, setShowProduct] = useState(false)
    const [variantId, setVariantId] = useState()
    const [showVariant, setShowVariant] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const ref = useRef()

    console.log(productId, showProduct, variantId, showVariant, showAddForm)

    const productConfig = {
        name: {
            type: 'text',
            required: true,
        },
        vendor: {
            type: 'text',
            required: true,
        },
        price: {
            type: 'number',
            required: false,
        },
        images: {
            type: 'textarea',
            isArray: true,
            required: false,
        },
        description: {
            type: 'textarea',
            required: false,
        },
        summary: {
            type: 'textarea',
            required: true,
        },
        variants: {
            type: 'textarea',
            isArray: true,
            required: true,
        },
        minPrice: {
            type: 'number',
            required: false,
        },
        maxPrice: {
            type: 'number',
            required: false,
        },
        SKU: {
            type: 'text',
            required: true,
        },
        category: {
            type: 'text',
            required: false,
        },
        collections: {
            type: 'textarea',
            required: false,
            isArray: true,
        },
        tags: {
            type: 'textarea',
            isArray: true,
            required: false,
        },
        isAuctioned: {
            type: 'boolean',
            required: false,
        },
        auctionExpiresIn: {
            type: 'date',
            required: false,
        },
        reviews: {
            type: 'text',
            isArray: true,
            required: false,
        },
        ratingsAverage: {
            type: 'number',
            required: false,
        },
        ratingsQuantity: {
            type: 'number',
            required: false,
        },
    }

    const variantConfig = {
        name: {
            type: 'text',
            required: true,
        },
        option1: {
            type: 'text',
            required: false,
        },
        option2: {
            type: 'text',
            required: false,
        },
        option3: {
            type: 'text',
            required: false,
        },
        price: {
            type: 'number',
            required: true,
        },
        comparePrice: {
            type: 'number',
            required: false,
        },
        images: {
            type: 'file',
            // isArray: true,
            isMultiple: true,
            required: false,
        },
        inventory: {
            type: 'number',
            required: true,
        },
    }

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${ROOT_URL}/api/v1/products`,
                    withCredentials: true,
                })

                if (res.data.status === 'success') {
                    setProducts(res.data.data.docs)
                }
            } catch (err) {
                alert(err.response.data.message)
            }
        }

        fetchAllProducts()
    }, [])

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
