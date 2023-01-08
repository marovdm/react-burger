import { useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingedientStyles from './burger-ingredient.module.scss'

export default function BurgerIngredient({ingredient, onSelectIngredient}) {

  const [count, setCount] = useState(0);
  
  const handleSelectIngredient = (ingredient) => {
    setCount(count + 1);
    onSelectIngredient(ingredient)
  }

  return (
    <div className={ingedientStyles.ingredient} onClick={()=> handleSelectIngredient(ingredient)}>
      {count > 0 ? <Counter count={count} size="default" extraClass="m-1" /> : null}
      <div className="pl-4 pr-4">
        <img src={ingredient.image_large} className={ingedientStyles.ingredientImg} alt={ingredient.name} />
      </div>
      <p className="mb-1 mt-1">
        <span className="text text_type_digits-default">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </p>      
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  )
}
