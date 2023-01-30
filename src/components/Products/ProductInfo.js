import axios from 'axios'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { LazyLoadImage } from 'react-lazy-load-image-component'
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
import Overlay from '../Overlay'
import 'react-lazy-load-image-component/src/effects/blur.css'

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

    const [showZoomImage, setShowZoomImage] = useState(false)
    const images = getImagesFromVariants(product?.variants) || []
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [lenPosition, setLenPosition] = useState({ x: 0, y: 0 })
    // const [resultBackgroundPos, setResultBackgroundPos] = useState({ x: 0, y: 0 })
    // const [showZoom, setShowZoom] = useState(false)

    // const mainImageRef = useRef()
    // const imgLenRef = useRef()
    // const imgZoomResultRef = useRef()

    const imageZoomRef = useRef()

    const createdTimeDelta = new Date(Date.now() - new Date(product?.createdAt)).getHours()
    const isNew = createdTimeDelta < 24 * 1 && createdTimeDelta > 0

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

    const selectVariant = (variantId, imgUrl) => {
        setSelectedVariantId(variantId)
        setMainImage(imgUrl)
    }

    useEffect(() => {
        catchProduct(slug)
    }, [slug, catchProduct])

    useEffect(() => {
        if (product != null) return

        catchProduct(slug)
    }, [slug, product, catchProduct])

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

    // const getCursorPosition = (e) => {
    //     let x = 0,
    //         y = 0,
    //         imgBox
    //     e = e || window.event

    //     imgBox = mainImageRef.current.getBoundingClientRect()

    //     x = e.pageX - imgBox.left
    //     y = e.pageY - imgBox.top

    //     x = x - window.scrollX
    //     y = y - window.scrollY

    //     return { x, y }
    // }

    // const moveLens = (e) => {
    //     e.preventDefault()

    //     if (!showZoom) setShowZoom(true)

    //     const position = getCursorPosition(e)

    //     let x = position.x - imgLenRef.current.offsetWidth / 2
    //     let y = position.y - imgLenRef.current.offsetHeight / 2

    //     if (x > mainImageRef.current.width - imgLenRef.current.offsetWidth)
    //         x = mainImageRef.current.width - imgLenRef.current.offsetWidth
    //     if (x < 0) x = 0
    //     if (y > mainImageRef.current.height - imgLenRef.current.offsetHeight)
    //         y = mainImageRef.current.height - imgLenRef.current.offsetHeight

    //     if (y < 0) y = 0

    //     const cx = mainImageRef.current.clientWidth / imgLenRef.current.offsetWidth
    //     const cy = mainImageRef.current.clientHeight / imgLenRef.current.offsetHeight

    //     imgZoomResultRef.current.style.width = `${mainImageRef.current.clientWidth * cx}px`
    //     imgZoomResultRef.current.style.height = `${mainImageRef.current.clientHeight * cy}px`

    //     setResultBackgroundPos({
    //         x: cx * x,
    //         y: cy * y,
    //     })
    //     setLenPosition({
    //         x,
    //         y,
    //     })
    // }

    return (
        <Container>
            <div className="flex flex-col gap-5 mt-5 justify-center md:mt-10 md:gap-10 md:flex-row relative">
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="flex product-images max-h-96 max-w-96 gap-3">
                        <Swiper
                            className="flex-shrink-1 flex-grow-0 hidden md:flex select-none"
                            spaceBetween={15}
                            slidesPerView={3}
                            modules={[Navigation]}
                            navigation={images && images.length >= 3}
                            direction="vertical"
                            loop={images && images.length >= 3}
                        >
                            {product &&
                                images &&
                                images.map(({ imgUrl, variantId, variantName }, index) => (
                                    <SwiperSlide
                                        className=" flex-shrink-1 w-20 h-20"
                                        key={`image_${variantId}_${index}`}
                                        data-variant-id={variantId}
                                    >
                                        {imgUrl ? (
                                            <LazyLoadImage
                                                className="w-full h-full cursor-pointer object-cover object-center"
                                                src={`${ROOT_URL}/img/products/${imgUrl}`}
                                                alt={variantName}
                                                crossOrigin="anonymous"
                                                loading="lazy"
                                                onClick={() => selectVariant(variantId, imgUrl)}
                                            />
                                        ) : (
                                            <Skeleton />
                                        )}
                                    </SwiperSlide>
                                ))}
                            {images.length < 3 &&
                                Array.from(Array(3 - images.length)).map((_, index) => (
                                    <SwiperSlide
                                        className="bg-transparent flex-shrink-1 w-20 h-20"
                                        key={`image_empty_${index}`}
                                    ></SwiperSlide>
                                ))}
                        </Swiper>
                        <div className="aspect-square w-full bg-gray-400 relative">
                            <LazyLoadImage
                                className="w-full h-full object-cover object-center"
                                src={`${ROOT_URL}/img/products/${mainImage}`}
                                alt={product?.name}
                                loading="lazy"
                                crossOrigin="anonymous"
                                // ref={mainImageRef}
                            />
                            {/* <span
                                className={`absolute w-20 h-20 border border-slate-500 transition  ${
                                    showZoom ? 'opacity-100' : 'opacity-0'
                                }`}
                                ref={imgLenRef}
                                style={{
                                    left: lenPosition.x + 'px',
                                    top: lenPosition.y + 'px',
                                }}
                            /> */}
                            {isNew && (
                                <div className="absolute bottom-3 right-3 bg-yellow-400 py-0.5 px-2 text-sm text-white rounded-lg">
                                    New
                                </div>
                            )}
                            <button
                                className="absolute left-3 bottom-3 w-8 h-8 text-white border border-white rounded-full transition transform duration-300 hover:bg-slate-200/90 hover:scale-110"
                                onClick={() => setShowZoomImage(true)}
                            >
                                <FontAwesomeIcon className="w-1/2 h-1/2" icon={faExpand} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-7">
                        <ProductDetail title="Product Detail" content={product?.description} />
                    </div>
                </div>
                <div className="w-full md:w-1/3 relative">
                    {product != null && (
                        <VariantsPicker
                            productId={product._id}
                            productName={product.name}
                            variants={product.variants}
                            buttonText={'Buy Now'}
                            formSubmitHandler={formSubmitHandler}
                            currentBid={false}
                            nameStyles="text-4xl border-b border-gray-200 w-full pb-3"
                            priceStyles="border-b border-gray-200 w-full pb-3"
                            review={{
                                show: true,
                                reviews: product?.reviews || [],
                                ratingsAverage: product.ratingsAverage,
                                ratingsQuantity: product.ratingsQuantity,
                            }}
                            quantityControl={true}
                            wishlist={true}
                            onVariantChange={handleVariantChange}
                            currentVariantId={selectedVariantId}
                        />
                    )}
                    {/* <div
                        className={`absolute top-4 left-4 w-96 h-96 border border-slate-800 transform transition duration-200 overflow-hidden pointer-events-none ${
                            showZoom ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                        }`}
                    >
                        <img
                            src={`${ROOT_URL}/img/products/${mainImage}`}
                            alt={product?.name}
                            loading="lazy"
                            crossOrigin="anonymous"
                            className="object-cover object-center"
                            style={{
                                objectPosition: `-${resultBackgroundPos.x}px -${resultBackgroundPos.y}px`,
                            }}
                            ref={imgZoomResultRef}
                        />
                    </div> */}
                </div>
                {showZoomImage && (
                    <Overlay closeModal={() => setShowZoomImage(false)} childRef={imageZoomRef}>
                        <div className="h-screen-4/5 aspect-square bg-white" ref={imageZoomRef}>
                            <LazyLoadImage
                                className="w-full h-full object-cover object-center"
                                src={`${ROOT_URL}/img/products/${mainImage}`}
                                alt={product?.name}
                                loading="lazy"
                                crossOrigin="anonymous"
                            />
                        </div>
                    </Overlay>
                )}
            </div>
        </Container>
    )
}

export default ProductInfo
