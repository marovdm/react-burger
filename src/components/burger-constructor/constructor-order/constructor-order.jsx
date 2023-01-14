import { useState } from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-order.module.scss'
import OrderDetails from '../../order-details/order-details'
import PropTypes from 'prop-types';

export default function ConstructorOrder({total}) {
  const [visibleOrderModal, setVisibleOrderModal] = useState(false)

  return (
    <div className={styles.order}>
        <span className='text text_type_digits-medium mr-2'>{total}</span>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="medium" onClick={() => setVisibleOrderModal(true)}>
            Оформить заказ
        </Button>
        {
          visibleOrderModal && 
          <OrderDetails orderNumber="034536" onClose={() => setVisibleOrderModal(false)} 
        />}

    </div>
  )
}

ConstructorOrder.propTypes = {
  total: PropTypes.number.isRequired
};


