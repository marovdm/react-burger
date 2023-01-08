import { useState } from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import constructorOrder from './constructor-order.module.scss'
import OrderDetails from '../../order-details/order-details'

export default function ConstructorOrder({total}) {
  const [visibleOrderModal, setVisibleOrderModal] = useState(false)

  return (
    <div className={constructorOrder.order}>
        <span className='text text_type_digits-medium mr-2'>{total}</span>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="medium" onClick={() => setVisibleOrderModal(true)}>
            Оформить заказ
        </Button>
        {
          visibleOrderModal && 
          <OrderDetails onClose={() => setVisibleOrderModal(false)} 
        />}

    </div>
  )
}
