import React from 'react'
import Container from '../Container'
import { Swiper } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

function ProductShowcase({ productCards, isSlider, slidesPerView }) {
    return (
        <Container>
            <div className="flex flex-row gap-7 justify-center items-stretch ">
                {isSlider ? (
                    <Swiper spaceBetween={15} slidesPerView={slidesPerView} modules={[Navigation]} navigation>
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
