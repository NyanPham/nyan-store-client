import React from 'react'
import Container from '../Container'
import SideNavigation from '../SideNavigation'

import { auctionSlides } from '../data'
import Slider from '../Slider'

function AuctionSlider() {
    return (
        <Container>
            <div className="flex bg-white p-5 shadow-lg gap-7">
                <SideNavigation title="Auction & Bidding" isDrawer={false} />
                <Slider slides={auctionSlides} slidesPerView={2} />
            </div>
        </Container>
    )
}

export default AuctionSlider
