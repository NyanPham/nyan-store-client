import AuctionSlider from '../Auction/AuctionSlider'
import ProductAuction from '../Auction/ProductAuction'
import GetSliderWithProducts from '../GetSliderWithProducts'
import Hero from '../Hero'
import ProductRecommendation from '../Products/ProductRecommendation'
import SliderWithPreview from '../SliderWithPreview'
import { sportSlides, furnitureSlides, womenSlides, menSlides, photographySlides } from '../data'
import GetSliderWithVertical from '../GetSliderWithVertical'
import SidebarNavigationDrawer from '../SidebarNavigationDrawer'

const Home = () => {
    return (
        <main className="z-0 flex-grow">
            <section className="md:mt-7">
                <Hero />
            </section>
            <section className="bg-slate-200 p-5 lg:py-12 lg:px-12">
                <ProductRecommendation />
            </section>
            <section className="py-12">
                <SliderWithPreview />
            </section>
            <section className="bg-slate-200 py-7">
                <ProductAuction />
            </section>
            <section className="pb-7 pt-3 bg-slate-200">
                <AuctionSlider />
            </section>
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
                    category="Furnitures"
                    sideNavBackground="bg-slate-200"
                    borderColor="border-slate-200"
                    navTitle="Furniture"
                    slides={furnitureSlides}
                />
            </section>
            <section className="bg-gray-700 py-10">
                <GetSliderWithVertical
                    tags={['Footwear', 'sport']}
                    category="Cameras"
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
                    tags={['women']}
                    category="Women"
                    sideNavBackground="bg-slate-200"
                    borderColor="border-slate-200"
                    navTitle="Women"
                    slides={womenSlides}
                    from="tags"
                />
            </section>
            <section className="bg-gray-100 py-10">
                <GetSliderWithProducts
                    tags={['men']}
                    category="Men"
                    sideNavBackground="bg-white"
                    borderColor="border-white"
                    navTitle="Men"
                    slides={menSlides}
                    from="tags"
                />
            </section>
            <SidebarNavigationDrawer />
        </main>
    )
}

export default Home
