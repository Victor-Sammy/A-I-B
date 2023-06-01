// import axios from 'axios'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsArrowRightShort } from 'react-icons/bs'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import '../../sass/pages/_cart.scss'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCart } from '../../Api/cart'
import { getFullCart } from '../../Api/cart'
import { client } from '../../Api/Api'
import { useState } from 'react'
import OrderSuccessModal from './OrderSuccessModal'

const CartItem = () => {
  const queryClient = useQueryClient()
  const {
    data: cart,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    cacheTime: 0,
  })
  console.log(cart)

  const cartItems = cart?.data
  console.log(cartItems)
  const count = cart?.data?.length
  const cartId = localStorage.getItem('cartID')

  const cartQuery = useQuery({
    queryKey: [''],
    queryFn: getFullCart,
  })
  console.log(cartQuery.isError)
  console.log(cartQuery.isLoading)
  console.log(cartQuery.data)
  const total = cartQuery?.data?.data?.total

  const [openModal, setOpenModal] = useState(false)

  if (isError) return <h1>Error Loading Products</h1>

  const navigate = useNavigate()

  if (count < 1) {
    return (
      <section className='cart' id='cart'>
        <header>
          <h2>Your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }

  return (
    <>
      {isLoading ? (
        <p>...loading</p>
      ) : (
        <div className='cart-house'>
          <h1 className='count' id='count'>
            my cart ({count})
          </h1>
          <div className='cart-container' id='cart-container'>
            <div className='cart-info' id='cart-info'>
              <div className='cart-items'>
                {cartItems?.map((item) => {
                  return (
                    <div className='cart-item' id='cart-item' key={item?.id}>
                      <div className='cart-img' id='cart-img'>
                        <img src={item?.product?.images[0]?.image} alt='' />
                      </div>
                      <div className='make-des' id='make-des'>
                        <h1>{item?.product?.name}</h1>
                        <h3>{item?.product?.description}</h3>
                      </div>
                      <div>
                        <div className='cart-price' id='cart-price'>
                          <h1>NGN {item?.product?.price}</h1>
                        </div>
                        <div className='quantity'>
                          <span
                            className='decrease'
                            onClick={() => {
                              const checker =
                                item.quantity > 1 ? item.quantity - 1 : ''
                              const requestOptions = {
                                quantity: checker,
                              }
                              client
                                .patch(
                                  `/ad/carts/${cartId}/items/${item.id}/`,
                                  requestOptions
                                )
                                .then((res) => {
                                  console.log(res.status, res.data)
                                  setTimeout(() => {
                                    queryClient.invalidateQueries([''])
                                    queryClient.invalidateQueries(['cart'])
                                  }, 200)
                                  if (res.status === 415) {
                                    console.log(res.data, res.message)
                                  }
                                })
                            }}
                          >
                            <AiOutlineMinus />
                          </span>
                          <span>{item?.quantity}</span>
                          <span
                            className='increase'
                            onClick={() => {
                              console.log(item?.quantity + 1)
                              const requestOptions = {
                                quantity: item?.quantity + 1,
                              }
                              client
                                .patch(
                                  `/ad/carts/${cartId}/items/${item.id}/`,
                                  requestOptions
                                )
                                .then((res) => {
                                  console.log(res.status, res.data)
                                  setTimeout(() => {
                                    queryClient.invalidateQueries([''])
                                    queryClient.invalidateQueries(['cart'])
                                  }, 200)
                                  if (res.status === 415) {
                                    console.log(res.data, res.message)
                                  }
                                })
                            }}
                          >
                            <AiOutlinePlus />
                          </span>
                        </div>
                        <div
                          className='delete-item'
                          onClick={() => {
                            client
                              .delete(
                                `/ad/carts/${cartId}/items/${item.id}/`,
                                item.id
                              )
                              .then((res) => {
                                console.log(res.status)
                                setTimeout(() => {
                                  queryClient.invalidateQueries([''])
                                  queryClient.invalidateQueries(['cart'])
                                }, 200)
                              })
                          }}
                        >
                          <RiDeleteBin5Fill />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='complete-order' id='complete-order'>
                <h1>Cart Summary</h1>
                <hr className='cart-line' />
                <div className='total' id='total'>
                  <div className='subtotal'>
                    <h2>Subtotal</h2>
                  </div>
                  <div className='total-amount'>NGN {total}</div>
                </div>
                <p>Deliveries fees not included</p>
                <hr className='cart-line2' />

                <div
                  className='checkout-btn'
                  onClick={() => setOpenModal(true)}
                >
                  <div className='ck-btn-text'>
                    <span>Place Order</span>
                  </div>
                  <div className='ck-arrw-icon'>
                    <BsArrowRightShort />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <OrderSuccessModal
          open={openModal}
          onClose={() => {
            setOpenModal(false)
            navigate('/home')
          }}
        />
      </div>
    </>
  )
}

export default CartItem
