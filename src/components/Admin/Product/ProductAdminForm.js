import axios from 'axios'
import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { ROOT_URL } from '../../../config'
import Overlay from '../../Overlay'

export default function ProductAdminForm({ closeModal }) {
    const [products, setProducts] = useState([])
    const ref = useRef()

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

    return (
        <Overlay closeModal={closeModal} childRef={ref}>
            <form className="w-1/2 bg-white py-3 px-7" ref={ref}>
                <h2 className="text-center text-2xl text-cyan-400 font-semibold">Products</h2>
                <div className="max-h-96 mt-5 overflow-y-auto select-none">
                    {products.length > 0 &&
                        products.map((product) => (
                            <div key={`product_${product.SKU}`} className="cursor-pointer">
                                <details className="form-input group hover:bg-cyan-400">
                                    <summary className="group-hover:text-white">{product.name}</summary>
                                    <div className="mt-3">
                                        {product.variants.map((variant) => (
                                            <div key={`variant_${product.SKU}_${variant.name}`} className="form-input">
                                                {variant.name}
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            </div>
                        ))}
                </div>
                <button type="button" className="submit-button">
                    +
                </button>
            </form>
        </Overlay>
    )
}
