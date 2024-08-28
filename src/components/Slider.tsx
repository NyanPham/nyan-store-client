import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import 'swiper/css/effect-creative'
import { Link } from 'react-router-dom'
import SlideCountdown from './SlideCountdown'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

export type SlideData = {
    title: {
        text: string
        styles: string
    }
    subtitle: {
        text: string
        styles: string
    }
    text1: {
        text: string
        styles: string
    }
    text2: {
        text: string
        styles: string
    }  
    comparePrice?: {
        text: string,
        styles: string
    }
    price?: {
        text: string,
        styles: string
    } 
    expiresTime: {
        label: {
            text: string,
            styles: string
        },
        timeLeft: {
            date: Date
            styles: string
        }
    }
    button: {
        text: string
        link: string 
        styles: string
    }
    image: string
    link: string
    imageStyles?: string
    contentStyles?: string
    currentBid?: {
        label: {
            text: string
            styles: string
        },
        value: {
            text: string
            styles: string
        }
    }
}

type SliderProps = {
    slides: SlideData[]
    slidesPerView?: number
    direction?: 'horizontal' | 'vertical'
    setCurrentSlide?: (currentSlide: number) => void
}

export default function Slider({ slides, slidesPerView, direction = 'horizontal', setCurrentSlide = () => {} }: SliderProps) {
    return (
        <Swiper
            direction={direction}
            spaceBetween={2}
            slidesPerView={1}
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            onSlideChangeTransitionStart={function () {
                setCurrentSlide(this.realIndex)
            }}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: true,
            }}
            breakpoints={{
                768: {
                    slidesPerView: slidesPerView,
                },
            }}
        >
            {slides.map((slide, index) => {
                return (
                    <SwiperSlide key={`slider_${index}`}>
                        <div
                            className={`relative select-none max-h-screen h-full max-w-full ${
                                direction === 'vertical' && 'flex-shrink-0 w-full self-start max-h-96'
                            }`}
                        >
                            <LazyLoadImage
                                className={`${slide.imageStyles} w-full h-full object-cover object-center`}
                                src={slide.image}
                                alt={slide.title.text}
                                loading="lazy"
                                width={900}
                                height={380}
                            />
                            <div className={`absolute ${slide.contentStyles}`}>
                                {slide.title && (
                                    <h3 className={slide.title.styles}>
                                        <a href={slide.link || '#'}>{slide.title.text}</a>
                                    </h3>
                                )}
                                {slide.subtitle && <h4 className={slide.subtitle.styles}>{slide.subtitle.text}</h4>}
                                {slide.text1 && <span className={slide.text1.styles}>{slide.text1.text}</span>}
                                {slide.text2 && <span className={slide.text2.styles}>{slide.text2.text}</span>}
                                {(slide.comparePrice || slide.price) && (
                                    <div className="flex flex-row justify-start items-center mt-3">
                                        {slide.comparePrice && (
                                            <h4 className={slide.comparePrice.styles}>{slide.comparePrice.text}</h4>
                                        )}
                                        {slide.price && <h3 className={slide.price.styles}>{slide.price.text}</h3>}
                                    </div>
                                )}
                                {slide.expiresTime && (
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className={slide.expiresTime.label.styles}>
                                            {slide.expiresTime.label.text}
                                        </span>
                                        <span className={slide.expiresTime.timeLeft.styles}>
                                            <SlideCountdown dueDate={slide.expiresTime.timeLeft.date} />
                                        </span>
                                    </div>
                                )}  
                                {slide.currentBid && (
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className={slide.currentBid.label.styles}>
                                            {slide.currentBid.label.text}
                                        </span>
                                        <span className={slide.currentBid.value.styles}>
                                            {slide.currentBid.value.text}
                                        </span>
                                    </div>
                                )}
                                {slide.button && (
                                    <Link to={slide.button.link} className={`inline-block ${slide.button.styles}`}>
                                        {slide.button.text}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}
