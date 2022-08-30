import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import 'swiper/css/effect-creative'
import { Link } from 'react-router-dom'
import SlideCountdown from './SlideCountdown'

export default function Slider({ slides, slidesPerView, direction = 'horizontal', setCurrentSlide = () => {} }) {
    return (
        <Swiper
            direction={direction}
            spaceBetween={2}
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            onSlideChangeTransitionStart={function () {
                setCurrentSlide(this.realIndex)
            }}
            loop={true}
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
                            <img className={slide.imageStyles} src={slide.image} alt={slide.title} />
                            <div className={`absolute ${slide.contentStyles}`}>
                                {slide.title && <h3 className={slide.title.styles}>{slide.title.text}</h3>}
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
