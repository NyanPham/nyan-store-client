import React from 'react'
import Container from '../Container'
import { Swiper } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
    
function ProductShowcase({ productCards, isSlider }) {
    return (
        <Container>
            <div className="">
                <Swiper
                    spaceBetween={15}
                    slidesPerView={2}
                    modules={isSlider ? [Navigation] : []}
                    navigation={isSlider}
                    breakpoints={{
                        1200: {
                            slidesPerView: 5,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        450: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    {productCards}
                </Swiper>
                
            </div>
        </Container>
    )
}

export default ProductShowcase
