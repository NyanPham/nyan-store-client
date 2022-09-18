import axios from 'axios'
import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { ROOT_URL } from '../../config'
import Overlay from '../Overlay'

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
                <h2>Products</h2>
                <div className="max-h-96 overflow-y-auto">
                    {products.length > 0 &&
                        products.map((product) => (
                            <div key={`product_${product.SKU}`}>
                                <details>
                                    <summary>{product.name}</summary>
                                    <div>
                                        {product.variants.map((variant) => (
                                            <div key={`variant_${product.SKU}_${variant.name}`}>{variant.name}</div>
                                        ))}
                                    </div>
                                </details>
                            </div>
                        ))}
                </div>
                <button type="button">+</button>
            </form>
        </Overlay>
    )
}
