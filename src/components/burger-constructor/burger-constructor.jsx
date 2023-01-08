import { useEffect, useState } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.scss'
import ConstructorOrder from './constructor-order/constructor-order'

export default function BurgerConstructor({selected}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedBun, setSelectedBun] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
    filteredIngredients();
  }, [])


  const filteredIngredients = () => {
    let otherIngredients = [];
    selected.forEach(ingredient => {
      if (ingredient.type === 'bun') {
        setSelectedBun(ingredient);
      } else otherIngredients.push(ingredient);
    });
    setSelectedIngredients(otherIngredients);
  }

  const calculateTotalPrice = () => {
    return selected.reduce((acc, el) => acc + el.price, 0)
  }

  return (
    <section className={burgerConstructorStyles.constructor}>
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
        <div className={`${burgerConstructorStyles.constructorWrapper} custom-scroll`}>
          {selectedIngredients.map(ingredient =>
            <article className={burgerConstructorStyles.elementWrapper} key={ingredient._id}>
              <span className={burgerConstructorStyles.elementIcon}>
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
