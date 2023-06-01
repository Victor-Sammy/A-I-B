import React from 'react'
import '../../sass/components/_orderSuccess.scss'
import orderCheck from '../../assets/order-success.jpg'
import { AiFillCloseCircle } from 'react-icons/ai'

const OrderSuccessModal = ({ open, onClose }) => {
  if (!open) return null
  return (
    <div className='overlay' style={{ position: 'absolute', zIndex: '10' }}>
      <div className='modal'>
        <img src={orderCheck} alt='' />
        <div className='closeIcon' onClick={onClose}>
          <AiFillCloseCircle />
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessModal
