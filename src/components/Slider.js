import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Link } from 'react-router-dom'

export default function Slider({ slides, slidesPerView }) {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={slidesPerView}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
        >
            {slides.map((slide, index) => {
                return (
                    <SwiperSlide key={`slider_${index}`}>
                        <div className="relative select-none">
                            <img className={slide.imageStyles} src={slide.image} alt={slide.title} />
                            <div className={`absolute ${slide.contentStyles}`}>
                                {slide.title && <h3 className={slide.title.styles}>{slide.title.text}</h3>}
                                {slide.subtitle && <h4 className={slide.subtitle.styles}>{slide.subtitle.text}</h4>}
                                {slide.text1 && <span className={slide.text1.styles}>{slide.text1.text}</span>}
                                {slide.text2 && <span className={slide.text2.styles}>{slide.text2.text}</span>}
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
