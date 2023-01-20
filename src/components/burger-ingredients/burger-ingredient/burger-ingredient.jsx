import React, { useEffect, useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.scss'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectIngredient, toggleIngedientDetail } from '../../../store/reducers/burger-data-slice';

function BurgerIngredient({ingredient}) {
  const [count, setCount] = useState(0);
  const {selectedIngredients, lastAddedIngredient} = useSelector(state => state.burgers);
  const dispatch = useDispatch();

  const handleSelectIngredient = lastAdded => {
    if (lastAdded?.type === 'bun') {
      //если выбрали булку - проверяем, есть ли уже в выбранных булка
      const bunIndex = selectedIngredients.findIndex((item) => item.type === 'bun')
      if (bunIndex !== -1) { 
        // Заменим на выбранную, т.к. булка может быть только одна
        const updated = selectedIngredients.map((ingredient, index) => {
          if (ingredient.type === 'bun' && index === bunIndex) {
            return lastAdded;
          } else {
            return ingredient;
          }
        });
        dispatch(selectIngredient({
          selectedIngredients: [...updated],
          last: lastAdded
        }))
      } else {
        dispatch(selectIngredient({
          selectedIngredients: [...selectedIngredients, lastAdded],
          last: lastAdded
        }))
      }
    } else {
      dispatch(selectIngredient({
        selectedIngredients: [...selectedIngredients, lastAdded],
        last: lastAdded
      }))
    }
    // И открываем модалку с детализацией ингредиента
    dispatch(toggleIngedientDetail(true))
  }

  useEffect(() => {
    // Оптимизация подсчета количества
    // Считаем только для последнего выбранного ингредиента или же в случае выбора булки, чтобы сбросить счетчик у другой
    if ((lastAddedIngredient?.type === 'bun' && ingredient.type === 'bun') || 
        (lastAddedIngredient?._id === ingredient._id)) {
        let countSelected = selectedIngredients.filter(el => el._id === ingredient._id).length;
        // если выбрана булка, то ее количество должно быть 2
        if (ingredient.type === 'bun' && countSelected > 0) {
          countSelected = 2;
        }
      setCount(countSelected)
    }
  }, [selectedIngredients, lastAddedIngredient, ingredient]);


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
  ingredient: ingredientPropTypes.isRequired
};

export default React.memo(BurgerIngredient);
