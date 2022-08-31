import React from 'react'
import Container from '../Container'
import { heroSlides } from '../data'
import Slider from '../Slider'
import FilterContainer from './FilterContainer'

export default function Search() {
    return (
        <main>
            <Slider slides={heroSlides} slidesPerView={1} />
            <section className="w-full lg:py-10">
                <Container>
                    <FilterContainer />
                </Container>
            </section>
        </main>
    )
}
