import { useState } from 'react'
import Container from './Container'
import SideNavigation from './SideNavigation'
import Slider, { SlideData } from './Slider'
import { slidesWPreview } from './data'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function SliderWithPreview() {
    const [currentSlide, setCurrentSlide] = useState(0)

    let nextSlide = currentSlide + 1
    if (nextSlide > slidesWPreview.length - 1) {
        nextSlide = 0
    }

    return (
        <Container>
            <div className="flex items-stretch gap-4 lg:gap-8">
                <div className="w-64 flex-shrink-0 hidden lg:flex">
                    <SideNavigation title="Best Deal Promo Category" isDrawer={false} />
                </div>
                <Slider slides={slidesWPreview as SlideData[] } slidesPerView={1} setCurrentSlide={setCurrentSlide} />
                <div className="hidden w-1/4 flex-shrink-0 justify-self-stretch -ml-2 xl:-ml-5 relative lg:flex">
                    <div className="h-full w-full"></div>
                    {slidesWPreview.map((slide, index) => (
                        <div
                            className={`h-full w-full absolute top-0 left-0 opacity-0 transform transition duration-300 ${
                                nextSlide === index && 'opacity-100'
                            }`}
                            key={`slide_preview_image_${index}`}
                        >
                            <LazyLoadImage
                                className="h-full w-full object-cover object-center"
                                src={slide.image}
                                alt={slide.title.text}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default SliderWithPreview
