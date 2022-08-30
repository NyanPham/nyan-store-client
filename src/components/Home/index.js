import AuctionSlider from '../Auction/AuctionSlider'
import ProductAuction from '../Auction/ProductAuction'
import GetSliderWithProducts from '../GetSliderWithProducts'
import Hero from '../Hero'
import ProductRecommendation from '../Products/ProductRecommendation'
import SliderWithPreview from '../SliderWithPreview'
import { sportSlides, furnitureSlides, womenSlides, menSlides } from '../data'

const Home = () => {
    return (
        <main className="z-10">
            <Hero />
            <ProductRecommendation />
            <SliderWithPreview />
            <ProductAuction />
            <AuctionSlider />
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
            <GetSliderWithProducts
                tags={['Footwear', 'sport']}
                category="Hats"
                sideNavBackground="bg-slate-200"
                borderColor="border-slate-200"
                navTitle="Furniture"
                slides={furnitureSlides}
            />
            <GetSliderWithProducts
                tags={['women', 'fashion', 'beauty']}
                category="Women"
                sideNavBackground="bg-slate-200"
                borderColor="border-slate-200"
                navTitle="Women"
                slides={womenSlides}
            />
            <GetSliderWithProducts
                tags={['women', 'fashion', 'beauty']}
                category="Women"
                sideNavBackground="bg-white"
                borderColor="border-white"
                navTitle="Men"
                slides={menSlides}
            />
        </main>
    )
}

export default Home
