import React from 'react'
import Container from './Container'
import SideNavigation from './SideNavigation'
import Slider from './Slider'

function SliderWithVertical({
    slides,
    navTitle,
    sideNavBackground,
    nameColor,
    borderColor,
    itemBorderColor,
    caretColor,
}) {
    return (
        <div>
            <Container>
                <div className="flex justify-center flex-col lg:flex-row items-stretch max-w-full shadow-lg">
                    <div className={` ${sideNavBackground} self-stretch flex-shrink-0 w-64 hidden lg:block`}>
                        <SideNavigation
                            title={navTitle}
                            isDrawer={false}
                            nameColor={nameColor}
                            borderColor={borderColor}
                            itemBorderColor={itemBorderColor}
                            caretColor={caretColor}
                        />
                    </div>
                    <Slider slides={slides} slidesPerView={1} />
                    <div className="hidden max-h-screen w-full self-stretch lg:block lg:w-1/3 flex-shrink-0 ml-0.5">
                        <Slider slides={slides} slidesPerView={2} direction="vertical" />
                    </div>
                    <div className="block lg:hidden">
                        <Slider slides={slides} slidesPerView={1} />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SliderWithVertical
