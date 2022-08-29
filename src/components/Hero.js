import React from 'react'
import SideNavigation from './SideNavigation'

import Container from './Container'
import Slider from './Slider'
import slideImage1 from '../imgs/man-street-style.png'

const slides = [
    {
        image: slideImage1,
        imageStyles: 'mx-auto',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Express Yourself Instyle',
            styles: 'text-5xl text-slate-700 font-semibold w-96',
        },
        subtitle: {
            text: 'Hoodie',
            styles: 'text-xl text-slate-700 font-medium uppercase mt-3',
        },
        text1: {
            text: 'Best',
            styles: 'text-lg text-slate-700 font-medium block mt-1',
        },
        text2: {
            text: 'Deal',
            styles: 'text-lg text-cyan-400 font-medium uppercase block leading-4',
        },
        button: {
            text: 'Learn More',
            styles: 'bg-cyan-400 uppercase font-normal text-white text-lg py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: slideImage1,
        imageStyles: 'mx-auto',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Express Yourself Instyle',
            styles: 'text-5xl text-slate-700 font-semibold w-96',
        },
        subtitle: {
            text: 'Hoodie',
            styles: 'text-xl text-slate-700 font-medium uppercase mt-3',
        },
        text1: {
            text: 'Best',
            styles: 'text-lg text-slate-700 font-medium block mt-1',
        },
        text2: {
            text: 'Deal',
            styles: 'text-lg text-cyan-400 font-medium uppercase block leading-4',
        },
        button: {
            text: 'Learn More',
            styles: 'bg-cyan-400 uppercase font-normal text-white text-lg py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
]

function Hero() {
    return (
        <div className="mt-7">
            <Container>
                <div className="flex items-start">
                    <SideNavigation title="Categories" />
                    <Slider slides={slides} slidesPerView={1} />
                </div>
            </Container>
        </div>
    )
}

export default Hero
