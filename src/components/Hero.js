import React from 'react'
import SideNavigation from './SideNavigation'
import Container from './Container'
import Slider from './Slider'
import { heroSlides } from './data'

function Hero() {
    return (
        <div className="mt-7">
            <Container>
                <div className="flex items-start">
                    <SideNavigation title="Categories" />
                    <Slider slides={heroSlides} slidesPerView={1} />
                </div>
            </Container>
        </div>
    )
}

export default Hero
