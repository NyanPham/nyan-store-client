import AuctionSlider from '../Auction/AuctionSlider'
import ProductAuction from '../Auction/ProductAuction'
import GetSliderWithProducts from '../GetSliderWithProducts'
import Hero from '../Hero'
import ProductRecommendation from '../Products/ProductRecommendation'
import SliderWithPreview from '../SliderWithPreview'
import { sportSlides, furnitureSlides, womenSlides, menSlides, photographySlides } from '../data'
import GetSliderWithVertical from '../GetSliderWithVertical'

const Home = () => {
    return (
        <main className="z-0">
            <Hero />
            <ProductRecommendation />
            <SliderWithPreview />
            <ProductAuction />
            <AuctionSlider />
            <section className="py-10">
                <GetSliderWithProducts
                    tags={['Footwear', 'sport']}
                    category="Footwear"
                    sideNavBackground="bg-slate-500"
                    navTitle="Sport"
                    itemBorderColor="border-slate-200/50"
                    nameColor="text-slate-200"
                    borderColor="border-slate-500"
                    slides={sportSlides}
                />
            </section>
            <section className="py-10">
                <GetSliderWithProducts
                    tags={['Footwear', 'sport']}
                    category="Hats"
                    sideNavBackground="bg-slate-200"
                    borderColor="border-slate-200"
                    navTitle="Furniture"
                    slides={furnitureSlides}
                />
            </section>
            <section className="bg-gray-700 py-10">
                <GetSliderWithVertical
                    tags={['Footwear', 'sport']}
                    category="Hats"
                    sideNavBackground="bg-gray-900"
                    borderColor="border-gray-900"
                    navTitle="Photography"
                    nameColor="text-gray-400"
                    itemBorderColor="border-slate-700/50"
                    slides={photographySlides}
                />
            </section>
            <section className="py-10">
                <GetSliderWithProducts
                    tags={['women', 'fashion', 'beauty']}
                    category="Women"
                    sideNavBackground="bg-slate-200"
                    borderColor="border-slate-200"
                    navTitle="Women"
                    slides={womenSlides}
                />
            </section>
            <section className="bg-gray-100 py-10">
                <GetSliderWithProducts
                    tags={['women', 'fashion', 'beauty']}
                    category="Men"
                    sideNavBackground="bg-white"
                    borderColor="border-white"
                    navTitle="Men"
                    slides={menSlides}
                />
            </section>
        </main>
    )
}

export default Home
