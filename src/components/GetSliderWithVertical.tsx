import SliderWithVertical from './SliderWithVertical'
    
type GetSliderWithVerticalProps = {
    sideNavBackground: string
    navTitle: string
    nameColor: string
    borderColor: string
    itemBorderColor: string
    caretColor: string
    slides: number
}

function GetSliderWithVertical({
    sideNavBackground,
    navTitle,
    nameColor,
    borderColor,
    itemBorderColor,
    caretColor,
    slides,
}: GetSliderWithVerticalProps) {
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
