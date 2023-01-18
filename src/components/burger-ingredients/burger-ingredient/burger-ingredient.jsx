import React, { useContext, useEffect, useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.scss'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/prop-types';
import { SelectedInredientsContext } from '../../../services/burgerContext';

function BurgerIngredient({ingredient, onSelectIngredient}) {
  const [count, setCount] = useState(0);
  const {selected, lastAdded} = useContext(SelectedInredientsContext);

  useEffect(() => {
    // Оптимизация подсчета количества
    // Считаем только для последнего выбранного ингредиента или же в случае выбора булки, чтобы сбросить счетчик у другой
    if ((lastAdded?.type === 'bun' && ingredient.type === 'bun') || 
        (lastAdded?._id === ingredient._id)) {
        let countSelected = selected.filter(el => el._id === ingredient._id).length;
        // если выбрана булка, то ее количество должно быть 2
        if (ingredient.type === 'bun' && countSelected > 0) {
          countSelected = 2;
        }
      setCount(countSelected)
    }
  }, [ingredient, lastAdded, selected]);
  
  const handleSelectIngredient = (ingredient) => {
    onSelectIngredient(ingredient);
  }

  return (
    <div className={styles.ingredient} onClick={()=> handleSelectIngredient(ingredient)}>
      {count > 0 ? <Counter count={count} size="default" extraClass="m-1" /> : null}
      <div className="pl-4 pr-4">
        <img src={ingredient.image_large} className={styles.ingredient_img} alt={ingredient.name} />
      </div>
      <p className={styles.ingredient_price}>
        <span className="text text_type_digits-default mr-2">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </p>      
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  )
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  onSelectIngredient: PropTypes.func.isRequired
};

export default React.memo(BurgerIngredient);
