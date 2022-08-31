import React from 'react'
import Container from '../Container'
import { Swiper } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

function ProductShowcase({ productCards, isSlider }) {
    return (
        <Container>
            <div className="flex flex-row gap-7 justify-center items-stretch ">
                {isSlider ? (
                    <Swiper
                        spaceBetween={15}
                        slidesPerView={2}
                        modules={[Navigation]}
                        navigation
                        breakpoints={{
                            1024: {
                                slidesPerView: 5,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            450: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {productCards}
                    </Swiper>
                ) : (
                    { productCards }
                )}
            </div>
        </Container>
    )
}

export default ProductShowcase
