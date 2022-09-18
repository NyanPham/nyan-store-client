import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import VariantsPicker from './VariantsPicker'
import Container from '../Container'
import { useAuthContext } from '../../context/authContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, resetMessageError } from '../../redux/actions/cartActions'
import { useSideCartContext } from '../../context/sideCartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import ProductDetail from './ProductDetail'
import { ROOT_URL } from '../../config'
import { useCallback } from 'react'

const getImagesFromVariants = (variants) => {
    return variants?.flatMap((variant) => {
        return variant.images.map((image) => {
            return {
                variantId: variant._id,
                imgUrl: image,
                variantName: variant.name,
            }
        })
    })
}

function ProductInfo({ product, setProduct }) {
    const { isLoggedIn } = useAuthContext()
    const { slug } = useParams()

    const { message } = useSelector((state) => state.cart)
    const { setOpenSideCart } = useSideCartContext()
    const [mainImage, setMainImage] = useState(product?.variants[0].images[0])
    const [selectedVariantId, setSelectedVariantId] = useState(product?.variants[0]._id)
    const images = getImagesFromVariants(product?.variants)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isNew = new Date(Date.now() - new Date(product?.createdAt)).getHours() < 24 * 1

    const handleVariantChange = (variant) => {
        if (variant == null) return

        const selectedVariantImage = images.find((image) => image?.variantId === variant._id)
        if (!selectedVariantImage) return

        setSelectedVariantId(variant._id)
        setMainImage(selectedVariantImage.imgUrl)
    }

    const catchProduct = useCallback(
        async (slug) => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${ROOT_URL}/api/v1/products/slug/${slug}`,
                    withCredentials: true,
                })
                if (res.data.status === 'success') {
                    const fetchedProduct = res.data.data.doc
                    setProduct(fetchedProduct)
                    setSelectedVariantId(fetchedProduct.variants[0]._id)
                }
            } catch (err) {
                alert(err.respone.data.message)
            }
        },
        [setProduct]
    )

    const selectVariant = (variantId) => {
        setSelectedVariantId(variantId)
    }

    useEffect(() => {
        catchProduct(slug)
    }, [slug, catchProduct])

    useEffect(() => {
        if (!message || message !== 'success') return
        setOpenSideCart(true)
        dispatch(resetMessageError())
    }, [message, setOpenSideCart, dispatch])

    const formSubmitHandler = async (data) => {
        if (!isLoggedIn) {
            alert('Please login to add product to cart')
            return setTimeout(navigate('/login'), 2500)
        }
        const dataToSubmit = {
            product: product._id,
            variant: data.variantId,
            quantity: data.quantity,
        }

        dispatch(addToCart(dataToSubmit))
    }

    return (
        <Container>
            <div className="flex flex-col gap-5 mt-5 justify-center md:mt-10 md:gap-10 md:flex-row">
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="flex product-images max-h-96 gap-3">
                        <Swiper
                            className="flex-shrink-1 flex-grow-0 hidden md:flex"
                            spaceBetween={15}
                            slidesPerView={3}
                            modules={[Navigation]}
                            navigation
                            direction="vertical"
                            loop={true}
                        >
                            {images &&
                                images.map(({ imgUrl, variantId, variantName }, index) => (
                                    <SwiperSlide
                                        className=" bg-green-400 flex-shrink-1 w-20 h-20"
                                        key={`image_${variantId}_${index}`}
                                        data-variant-id={variantId}
                                    >
                                        {imgUrl ? (
                                            <img
                                                className="w-full h-full bg-green-400 cursor-pointer object-cover object-center"
                                                src={`${ROOT_URL}/img/products/${imgUrl}`}
                                                alt={variantName}
                                                crossOrigin="anonymous"
                                                loading="lazy"
                                                onClick={() => selectVariant(variantId)}
                                            />
                                        ) : (
                                            <Skeleton />
                                        )}
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                        <div className="aspect-square w-full bg-gray-400 relative">
                            <img
                                className="w-full h-full object-contain object-center"
                                src={`${ROOT_URL}/img/products/${mainImage}`}
                                alt={product?.name}
                                loading="lazy"
                                crossOrigin="anonymous"
                            />
                            {isNew && (
                                <div className="absolute bottom-3 right-3 bg-yellow-400 py-0.5 px-2 text-sm text-white rounded-lg">
                                    New
                                </div>
                            )}
                            <button className="absolute left-3 bottom-3 w-8 h-8 text-white border border-white rounded-full transition transform duration-300 hover:bg-slate-200/90 hover:scale-110">
                                <FontAwesomeIcon className="w-1/2 h-1/2" icon={faExpand} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-7">
                        <ProductDetail title="Product Detail" content={product?.description} />
                    </div>
                </div>
                <div className="w-full md:w-1/3">
                    {product != null && (
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
                            onVariantChange={handleVariantChange}
                            currentVariantId={selectedVariantId}
                        />
                    )}
                </div>
            </div>
        </Container>
    )
}

export default ProductInfo
