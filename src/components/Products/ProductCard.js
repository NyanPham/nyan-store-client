import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAsyncValidateState from '../../hooks/useAsyncValidateState'
import ProductCardAction from './ProductCardAction'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart, resetMessageError } from '../../redux/actions/cartActions'
import { useSideCartContext } from '../../context/sideCartContext'
import { useEffect } from 'react'
import { useRef } from 'react'

export default function ProductCard(props) {
    const { id, images, name, slug, variants, vendor, createdAt, inAuction = false, currentBid = false } = props
    const { setOpenSideCart } = useSideCartContext()
    const { loading, error, message } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const isNew = new Date(Date.now() - new Date(createdAt)).getHours() < 24 * 1
    const firstVariant = variants[0]

    const handleAddToCart = () => {
        const data = {
            variant: firstVariant._id,
            product: id,
            quantity: 1,
        }

        dispatch(addToCart(data))
    }

    useEffect(() => {
        if (loading || error || message !== 'success') return
        if (!loading && message === 'success') {
            setOpenSideCart(true)
            dispatch(resetMessageError())
        }
    }, [loading, error, message, setOpenSideCart])

    return (
        <div className="flex flex-col items-center justify-between aspect-29/37 bg-white relative group p-2 md:p-4">
            <Link to={`/products/${slug}`} state={props} className="product-image w-full h-fit">
                <span className="block w-4/5 aspect-29/37 bg-slate-700 mx-auto"></span>
                {/* <img className="" src={images[0]} alt={name} /> */}
                {/* <img className="" src={images[1]} alt={name} /> */}
            </Link>
            <div className="product-card-info mt-3">
                <h3 className="text-center text-ellipsis text-gray-900 text-base font-semibold">{name}</h3>
                {currentBid === false && (
                    <div className="flex justify-center items-center gap-2">
                        {firstVariant.comparePrice ? (
                            <>
                                <span className="product-card-compare-price">${firstVariant.comparePrice}</span>
                                <span className="product-card-price">${firstVariant.price}</span>
                            </>
                        ) : (
                            <span className="product-card-price">${firstVariant.price}</span>
                        )}
                    </div>
                )}
                {(typeof currentBid === 'number' || typeof currentBid === 'string') && (
                    <span className="product-card-price">${currentBid}</span>
                )}
            </div>
            <div className="absolute top-2 right-2 flex flex-col gap-3 overflow-hidden">
                <ProductCardAction productId={id} handleAddToCart={handleAddToCart} />
            </div>
            {isNew && !inAuction && (
                <div className="absolute bottom-2 right-2 bg-yellow-400 py-0.5 px-2 text-xs text-white rounded-lg">
                    New
                </div>
            )}
        </div>
    )
}
