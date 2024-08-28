import Container from '../Container'
import { searchHeroSlides } from '../data'
import Slider, { SlideData } from '../Slider'
import FilterContainer from './FilterContainer'

export default function Search() {
    return (
        <main id="search-page">
            <Slider slides={searchHeroSlides as SlideData[]} slidesPerView={1} />
            <section className="w-full lg:py-10">
                <Container>
                    <FilterContainer />
                </Container>
            </section>
        </main>
    )
}
