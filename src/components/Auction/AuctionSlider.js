import React from 'react'
import Container from '../Container'
import SideNavigation from '../SideNavigation'

import { auctionSlides } from '../data'
import Slider from '../Slider'

function AuctionSlider() {
    return (
        <div className="pb-7 pt-3 bg-slate-200">
            <Container>
                <div className="flex bg-white p-5 shadow-lg gap-7">
                    <SideNavigation title="Auction & Bidding" isDrawer={false} />
                    <Slider slides={auctionSlides} slidesPerView={2} />
                </div>
            </Container>
        </div>
    )
}

export default AuctionSlider
