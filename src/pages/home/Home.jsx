import Ads from '../../components/Ads'
import Ads2 from '../../components/Ads2'
import Arrivals from '../../components/arrivals/Arrivals'
import BannerCat from '../../components/BannerCat'
import CategoryPreview from '../../components/CategoryPreview'
import Popular from '../../components/popular/Popular'
import TopStores from '../../components/topStores/TopStores'
import Trend from '../../components/trending/Trend'
import TrendMen from '../../components/trending/TrendMen'
import '../../sass/pages/_home.scss'

const Home = () => {
  return (
    <section className='wrapper home'>
      <BannerCat />
      <CategoryPreview
        slug='trending'
        title='Trending Now'
        requestPath='/ad/trending/'
        fullListPath='/seeAll'
        className='trendingPreview'
      />
      <CategoryPreview
        slug='popular'
        title='Most Popular'
        requestPath='/ad/trending/'
        fullListPath='/seeAll'
        className='trendingPreview'
      />
      {/* <Popular /> */}
      <Ads />
      <TopStores />
      <CategoryPreview
        slug='trendingInMen'
        title='Trending in Men'
        requestPath='/ad/trending/'
        fullListPath='/seeAll'
        className='trendingPreview'
      />
      {/* <TrendMen /> */}
      <Ads2 />
      <Arrivals />
    </section>
  )
}

export default Home
