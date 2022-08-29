import ProductAuction from '../Auction/ProductAuction'
import Hero from '../Hero'
import ProductRecommendation from '../Products/ProductRecommendation'
import SliderWithPreview from '../SliderWithPreview'

const Home = () => {
    return (
        <main className="z-0">
            <Hero />
            <ProductRecommendation />
            <SliderWithPreview />
            <ProductAuction />
        </main>
    )
}

export default Home
