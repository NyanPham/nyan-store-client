import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCardAction from './ProductCardAction'

export default function ProductCard(props) {
    const { SKU, id, images, name, slug, variants, vendor, createdAt, minPrice } = props

    const isNew = new Date(Date.now() - new Date(createdAt)).getHours() < 24 * 1
    const firstVariant = variants[0]

    return (
        <div className="flex flex-col items-center justify-between aspect-29/37 bg-white p-4 relative group">
            <Link to={`/products/${slug}`} className="product-image w-full h-fit">
                <span className="block w-4/5 aspect-29/37 bg-slate-700 mx-auto"></span>
                {/* <img className="" src={images[0]} alt={name} /> */}
                {/* <img className="" src={images[1]} alt={name} /> */}
            </Link>
            <div className="product-card-info mt-3">
                <h3 className="text-center text-ellipsis text-gray-900 text-base font-semibold">{name}</h3>
                <div className="flex justify-center items-center gap-2">
                    {firstVariant.oldPrice ? (
                        <>
                            <span className="product-card-compare-price">${firstVariant.oldPrice}</span>
                            <span className="product-card-price">${firstVariant.price}</span>
                        </>
                    ) : (
                        <span className="product-card-price">${firstVariant.price}</span>
                    )}
                </div>
            </div>
            <div className="absolute top-2 right-2 flex flex-col gap-3 overflow-hidden">
                <ProductCardAction productId={id} />
            </div>
            {isNew && (
                <div className="absolute bottom-2 right-2 bg-yellow-400 py-0.5 px-2 text-xs text-white rounded-lg">
                    New
                </div>
            )}
        </div>
    )
}
