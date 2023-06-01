import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useRef } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { getPreviewProducts } from '../../Api/products'
import Button from '../Button'
import ItemCard from '../ItemCard/itemCard.jsx'
import './style.scss'

export default function CategoryPreview({
  title,
  slug,
  requestPath,
  fullListPath,
  className = '',
}) {
  const navigate = useNavigate()
  const scrollRef = useRef()

  const {
    data: productList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`${slug} preview`],
    queryFn: () => getPreviewProducts(requestPath),
  })

  const slideLt = () => {
    var slider = scrollRef.current
    slider.scrollLeft = slider.scrollLeft - 250
  }
  const slideRt = () => {
    var slider = scrollRef.current
    slider.scrollLeft = slider.scrollLeft + 250
  }

  if (isError) {
    return <div>Error loading products</div>
  }

  return (
    <div className={`preview ${className}`}>
      {isLoading ? (
        <>
          <div className='preview-loading-header'>
            <div className='h2'></div>
            <div className='button'></div>
          </div>

          <div className='preview-loading-items'>
            {Array(5)
              .fill(0)
              .map((item, index) => (
                <div className='item' key={index}></div>
              ))}
            {}
          </div>
        </>
      ) : (
        <>
          <div className='preview-header'>
            <h2>{title}</h2>
            <Button
              text='See All'
              iconRight={<BsArrowRightShort />}
              onClick={(e) => navigate(fullListPath)}
            />
          </div>

          <div className='preview-wrap'>
            {productList.data.results.length > 5 && (
              <div className='preview-scroll'>
                <div className='left-arrw' onClick={slideLt}>
                  <MdChevronLeft />
                </div>
                <div className='right-arrw' onClick={slideRt}>
                  <MdChevronRight />
                </div>
              </div>
            )}
            <div className='preview-items' ref={scrollRef}>
              {productList.data.results
                // .filter((item) => item.images.length > 0)
                // .slice(0, 5)
                .map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              {}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
