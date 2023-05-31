import React, { useEffect, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { AiOutlineHeart } from 'react-icons/ai'
import '../../sass/components/_sliders.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Trend = () => {
  const [products, setProducts] = useState({})
  const [addToWishlist, setAddToWishlist] = useState(false)

  useEffect(() => {
    fetchTrending()
  }, [])

  const navigate = useNavigate()

  const fetchTrending = async () => {
    axios.get('/ad/products').then((response) => {
      console.log(response)
      const data = response.data
      setProducts(data)
      console.log(data)
    })
  }

  const slideLeft = () => {
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft - 500
  }
  const slideRight = () => {
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + 500
  }
  return (
    <section className='trending'>
      <div className='top'>
        <div className='title'>Trending Now</div>
        <div className='btn'>
          <div className='btn-txt' onClick={() => navigate(fullListPath)}>
            See All
          </div>
          <div className='arr-icon'>
            <BsArrowRightShort />
          </div>
        </div>
      </div>

      <div className='display'>
        <div className='left-arrow' onClick={slideLeft}>
          <MdChevronLeft />
        </div>
        <div className='slider' id='slider'>
          {products?.results?.map((prod) => {
            return (
              <div key={prod?.id} className='item'>
                <NavLink to={`/products/${prod.id}`} className='trend-link'>
                  <div className='image'>
                    <img src={prod?.images[0]?.image} alt='' />
                  </div>
                  <div className='details'>
                    <div className='cat-name'>
                      <h4>{prod.category}</h4>
                    </div>
                    <div className='title'>
                      <h3>{prod.name}</h3>
                    </div>
                    <div className='price'>
                      <h2>NGN{prod.price}</h2>
                    </div>
                    <div className='rating'>
                      <span className='stars'>⭐⭐⭐⭐⭐</span>
                      <span className='num'>5.0 (34k)</span>
                    </div>
                  </div>
                </NavLink>
                <div className='wishlist-icon'>
                  <AiOutlineHeart
                    key={prod.id}
                    onClick={() => setAddToWishlist(!addToWishlist)}
                    className={`heart-icon ${
                      addToWishlist ? 'heart-active' : ''
                    }`}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className='right-arrow' onClick={slideRight}>
          <MdChevronRight />
        </div>
      </div>
    </section>
  )
}

export default Trend
