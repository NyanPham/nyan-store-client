import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useDeepCompareEffect from '../../hooks/useDeepCompareEffect'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import VariantsPicker from './VariantsPicker'
import Container from '../Container'
import { useAuthContext } from '../../context/authContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, resetMessageError } from '../../redux/actions/cartActions'
import { useSideCartContext } from '../../context/sideCartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import ProductDetail from './ProductDetail'

const getImagesFromVariants = (variants) => {
    return variants.flatMap((variant) => {
        return variant.images.map((image) => {
            return {
                variantId: variant._id,
                imgUrl: image,
                variantName: variant.name,
            }
        })
    })
}

function ProductInfo() {
    const { isLoggedIn } = useAuthContext()
    const { slug } = useParams()
    const location = useLocation()
    const [product, setProduct] = useState(() => {
        return location.state
    })

    const { message } = useSelector((state) => state.cart)
    const { setOpenSideCart } = useSideCartContext()
    const [mainImage, setMainImage] = useState(product?.images[0])
    const images = getImagesFromVariants(product.variants)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isNew = new Date(Date.now() - new Date(product?.createdAt)).getHours() < 24 * 1

    const handleVariantChange = (variant) => {
        const selectedVariantImage = images.find((image) => image.variantId === variant._id)
        if (!selectedVariantImage) return

        setMainImage(selectedVariantImage.imgUrl)
    }

    const catchProduct = async (slug) => {
        try {
            const res = await axios({
                method: 'GET',
                url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/products/slug/${slug}`,
                withCredentials: true,
            })
            if (res.data.status === 'success') {
                setProduct(res.data.data.doc)
            }
        } catch (err) {
            alert(err.respone.data.message)
        }
    }

    useDeepCompareEffect(() => {
        if (product != null) return
        catchProduct(slug)
    }, [product])

    useEffect(() => {
        catchProduct(slug)
    }, [slug])

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
                        <div className="aspect-square w-full bg-gray-400 relative">
                            <img
                                className="w-full h-full object-cover object-center"
                                src={mainImage}
                                alt={product.name}
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
                        <ProductDetail
                            title="Product Detail"
                            content={
                                'Hello, this is just an empty string to let you know the size and height, fontsize of this p'
                            }
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/3">
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
                    />
                </div>
            </div>
        </Container>
    )
}

export default ProductInfo
