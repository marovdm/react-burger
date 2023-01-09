import { useEffect, useState } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.scss'
import ConstructorOrder from './constructor-order/constructor-order'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';

export default function BurgerConstructor({selected}) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // подсчет общей стоимости заказа
    const calculateTotalPrice = () => {
      return selected.reduce((acc, el) => acc + el.price, 0)
    }
    setTotalPrice(calculateTotalPrice());
  }, [selected]);

  // исключим из выбранных ингредиентов булки
  const selectedBun = selected.find(ingredient => ingredient.type === "bun");
  const selectedIngredients = selected.filter(ingredient => ingredient.type !== "bun")

  return (
    <section className={styles.constructor}>
      <div className="mb-10">
        {selectedBun && <ConstructorElement 
            type="top"
            isLocked={selectedBun.type === "bun"}
            text={selectedBun.name}
            price={selectedBun.price}
            thumbnail={selectedBun.image_mobile}
            extraClass="mb-4 ml-8"
          />
        }
        <div className={`${styles.constructorWrapper} custom-scroll`}>
          {selectedIngredients.map(ingredient =>
            <article className={styles.elementWrapper} key={ingredient._id}>
              <span className={styles.elementIcon}>
                <DragIcon type="primary" />
              </span>
              <ConstructorElement
                isLocked={ingredient.type === "bun"}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                extraClass="ml-8"
              />
            </article>
          )}
        </div>      
        {selectedBun && <ConstructorElement 
            type="bottom"
            isLocked={selectedBun.type === "bun"}
            text={selectedBun.name}
            price={selectedBun.price}
            thumbnail={selectedBun.image_mobile}
            extraClass="mt-4 ml-8"
          />
        }
      </div>       
      <ConstructorOrder total={totalPrice} />
    </section>
  )
}

BurgerConstructor.propTypes = {
  selected: PropTypes.arrayOf(ingredientPropTypes).isRequired
};
