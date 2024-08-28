import Container from '../Container'
import { Swiper } from 'swiper/react'
// @ts-ignore
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

type ProductShowcaseProps = {
    productCards: React.ReactNode
    isSlider: boolean
}

function ProductShowcase({ productCards, isSlider }: ProductShowcaseProps) {
    return (
        <Container>
            <div className={`${isSlider ? '' : 'pointer-events-none hide-navigation'}`}>
                <Swiper
                    spaceBetween={15}
                    slidesPerView={2}
                    modules={[Navigation]}
                    navigation
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
