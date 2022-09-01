import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useDeepCompareEffect from '../../hooks/useDeepCompareEffect'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import VariantsPicker from '../Products/VariantsPicker'
import Container from '../Container'
import { useAuthContext } from '../../context/authContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, resetMessageError } from '../../redux/actions/cartActions'
import { useSideCartContext } from '../../context/sideCartContext'

function ProductPage() {
    const { isLoggedIn } = useAuthContext()
    const { slug } = useParams()
    const location = useLocation()
    const [product, setProduct] = useState(() => {
        return location.state
    })
    const { loading, message } = useSelector((state) => state.cart)
    const { setOpenSideCart } = useSideCartContext()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useDeepCompareEffect(() => {
        if (product != null) return
        const catchProduct = async (slug) => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `/api/v1/products/slug/${slug}`,
                })
                if (res.data.status === 'success') {
                    setProduct(res.data.data.doc)
                }
            } catch (err) {
                alert(err.respone.data.message)
            }
        }

        catchProduct(slug)
    }, [product])

    useEffect(() => {
        if (!message || message !== 'success') return
        setOpenSideCart(true)
        dispatch(resetMessageError())
    }, [message, setOpenSideCart, dispatch])

    const formSubmitHandler = async (data) => {
        if (!isLoggedIn) {
            alert('Please login to add product to cart')
            return setTimeout(navigate('/log-in'), 2500)
        }
        const dataToSubmit = {
            product: product._id,
            variant: data.variantId,
            quantity: data.quantity,
        }

        dispatch(addToCart(dataToSubmit))
    }

    const images = product.variants.flatMap((variant) => {
        return variant.images.map((image) => {
            return {
                variantId: variant._id,
                imgUrl: image,
                variantName: variant.name,
            }
        })
    })

    return (
        <Container>
            <div className="flex gap-10 mt-10 justify-center">
                <div className="flex product-images max-h-96 gap-3">
                    <Swiper
                        className="flex-shrink-1 flex-grow-0"
                        spaceBetween={15}
                        slidesPerView={3}
                        modules={[Navigation]}
                        navigation
                        direction="vertical"
                        loop={true}
                    >
                        {images.map(({ imgUrl, variantId, variantName }, index) => (
                            <SwiperSlide
                                className=" bg-green-400 flex-shrink-1"
                                key={`image_${variantId}_${index}`}
                                data-variant-id={variantId}
                            >
                                <img className="w-20 h-20 bg-green-400" src={imgUrl} alt={variantName} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="w-96 h-96 bg-gray-400">
                        <img
                            className="w-full h-full object-cover object-center"
                            src={product.images[0]}
                            alt={product.name}
                        />
                    </div>
                </div>
                <div className="w-1/3">
                    <VariantsPicker
                        productId={product._id}
                        variants={product.variants}
                        buttonText={'Buy Now'}
                        formSubmitHandler={formSubmitHandler}
                        currentBid={false}
                        nameStyles="text-4xl border-b border-gray-200 w-full pb-3"
                        priceStyles="border-b border-gray-200 w-full pb-3"
                        review={{
                            show: true,
                            reviews: product.reviews,
                            ratingsAverage: product.ratingsAverage,
                            ratingsQuantity: product.ratingsQuantity,
                        }}
                        quantityControl={true}
                        wishlist={true}
                    />
                </div>
            </div>
        </Container>
    )
}

export default ProductPage
