import React from 'react'
import SliderWithVertical from './SliderWithVertical'

function GetSliderWithVertical({
    sideNavBackground,
    navTitle,
    nameColor,
    borderColor,
    itemBorderColor,
    caretColor,
    slides,
}) {
    return (
        <SliderWithVertical
            slides={slides}
            navTitle={navTitle}
            sideNavBackground={sideNavBackground}
            nameColor={nameColor}
            borderColor={borderColor}
            itemBorderColor={itemBorderColor}
            caretColor={caretColor}
        />
    )
}

export default GetSliderWithVertical
