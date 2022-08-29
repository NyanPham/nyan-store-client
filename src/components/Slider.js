import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Link } from 'react-router-dom'

export default function Slider({ slides, slidesPerView, setCurrentSlide = () => {} }) {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            onSlideChangeTransitionStart={function () {
                setCurrentSlide(this.realIndex)
            }}
            loop={true}
        >
            {slides.map((slide, index) => {
                return (
                    <SwiperSlide key={`slider_${index}`}>
                        <div className="relative select-none max-h-screen h-full">
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
