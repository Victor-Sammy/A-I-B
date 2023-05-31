import React, { useEffect, useState } from 'react'
import '../sass/components/_banner-cat.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import Image1 from '../assets/banner1.png'
import Image2 from '../assets/banner2.png'
import Image3 from '../assets/banner3.png'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import { useNavigate } from 'react-router-dom'
import ICONS from '../assets/other-icons.png'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const imageSlide = [
  {
    id: 1,
    img: Image1,
  },
  {
    id: 2,
    img: Image2,
  },
  {
    id: 3,
    img: Image3,
  },
]

const BannerCat = () => {
  const navigate = useNavigate()

  return (
    <section className='cat-banner'>
      <div className='categories' style={{ display: 'none' }}>
        <div className='cats'>
          <div className='cat' onClick={() => navigate('/product/fashion')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Fashion
            </div>
          </div>
          <div className='cat' onClick={() => navigate('/product/animals')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Animals & Pets
            </div>
          </div>

          <div className='cat' onClick={() => navigate('/product/electronics')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Electronics
            </div>
          </div>
          <div className='cat' onClick={() => navigate('/product/automobile')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Cars & Automobiles
            </div>
          </div>
          <div className='cat' onClick={() => navigate('/product/furniture')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Furniture & Appliances
            </div>
          </div>

          <div className='cat' onClick={() => navigate('#')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Laptops & Computers
            </div>
          </div>
          <div className='cat' onClick={() => navigate('/product/phone')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Phones & Tablets
            </div>
          </div>

          {/* new */}

          <div className='cat' onClick={() => navigate('#')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Property, Housing & Hotels
            </div>
          </div>

          <div className='cat' onClick={() => navigate('/product/sporting')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Sporting Items
            </div>
          </div>

          <div className='cat' onClick={() => navigate('/product/musical')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Musical
            </div>
          </div>

          <div className='cat' onClick={() => navigate('/product/health')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Health & Beauty
            </div>
          </div>

          <div className='cat' onClick={() => navigate('/product/food')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Food, Restaurant & Agric
            </div>
          </div>

          <div className='cat' onClick={() => navigate('/product/kids')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Babies & Kids
            </div>
          </div>

          <div className='cat' onClick={() => navigate('/product/commercial')}>
            <div className='cat-icon'>
              <img src={ICONS} alt='' />
            </div>
            <div className='text' id='text'>
              Commercial Equipments
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <Carousel
        showStatus={false}
        showIndicators={true}
        showArrows={false}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={4000}
        renderIndicator={(clickHandler, isSelected) => {
          ;<CustomIndicator
            isSelected={isSelected}
            clickHandler={clickHandler}
          />
        }}
      >
        {imageSlide.map((image) => {
          return (
            <div className='cat-banner_carousel-item' key={image.id}>
              <img src={image.img} />
            </div>
          )
        })}
      </Carousel>
      {/* <div className="banner">
        <div className="swiperWrap">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            autoplay={true}
            slidesPerView={1}
            pagination={{ clickable: true }}
            EffectFade
            className="swiper"
          >
            {imageSlide.map((values) => {
              return (
                <SwiperSlide className="slide" key={values.id}>
                  <img src={values.img} alt="" />
                </SwiperSlide>
              );
            })}
           {bannerImage.map((values) => {
            return (
              <SwiperSlide className="slide" key={values.images.id}>
                {values.images.map((img) => (
                  <img src={img.media} alt="" />
                ))}
              </SwiperSlide>
            );
          })}
          </Swiper>
        </div>
      </div> */}
    </section>
  )
}

export default BannerCat

const CustomIndicator = ({ isSelected, clickHandler }) => {
  return isSelected ? (
    <span
      style={{
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#fe7702',
      }}
      onClick={clickHandler}
    ></span>
  ) : (
    <span
      style={{
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#D9D9D9',
      }}
      onClick={clickHandler}
    ></span>
  )
}
