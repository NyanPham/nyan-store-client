import React from 'react'
import Container from '../Container'
import SideNavigation from '../SideNavigation'

import { auctionSlides } from '../data'
import Slider from '../Slider'

function AuctionSlider() {
    return (
        <Container>
            <div className="flex bg-white p-5 shadow-lg gap-7">
                <div className="w-64 flex-shrink-0 hidden lg:flex">
                    <SideNavigation title="Jewelry" isDrawer={false} />
                </div>
                <Slider slides={auctionSlides} slidesPerView={2} />
            </div>
        </Container>
    )
}

export default AuctionSlider
