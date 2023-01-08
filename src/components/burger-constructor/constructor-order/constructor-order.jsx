import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import constructorOrder from './constructor-order.module.scss'

export default function ConstructorOrder() {
  return (
    <div className={constructorOrder.order}>
        <span className='text text_type_digits-medium mr-2'>610</span>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="medium">
            Оформить заказ
        </Button>
    </div>
  )
}
