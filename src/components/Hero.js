import React from 'react'
import SideNavigation from './SideNavigation'
import Container from './Container'
import Slider from './Slider'
import { heroSlides } from './data'

function Hero() {
    return (
        <Container>
            <div className="flex items-start gap-5">
                <div className="w-64 flex flex-shrink-0 lg:block">
                    <SideNavigation title="Categories" />
                </div>
                <Slider slides={heroSlides} slidesPerView={1} />
            </div>
        </Container>
    )
}

export default Hero
