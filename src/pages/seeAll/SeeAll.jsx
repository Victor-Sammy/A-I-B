import React, { useEffect } from 'react'
import '../../sass/pages/_seeAll.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { client } from '../../Api/Api'
import { useQuery } from '@tanstack/react-query'

const SeeAll = () => {
  const navigate = useNavigate()
  const {
    data: productList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => client.get('/ad/products/'),
    cacheTime: 0,
  })
  console.log(productList)
  const allProducts = productList?.data?.results
  console.log(allProducts)

  if (isError) return <h1>Error Loading Products</h1>

  return (
    <div className='seeAll-pg'>
      <div className='top-header'>
        <div className='backBtn' onClick={() => navigate('/home')}>
          Home
        </div>
        <div className='btnIcon'>
          <AiOutlineArrowRight />
        </div>
        <div>See All Products</div>
      </div>
      <div className='title'>See All Products</div>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <div className='allProducts'>
          {allProducts?.map((item) => {
            return (
              <div key={item.id} className='productCard'>
                <img src={item?.images[0]?.image} alt='' />
                <div className='details'>
                  <h1>{item.name}</h1>
                  <p>{item.brand}</p>
                  <h1>{item.price}</h1>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SeeAll
