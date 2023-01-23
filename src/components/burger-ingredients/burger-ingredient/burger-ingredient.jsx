import React, { useEffect, useMemo, useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.scss'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { toggleIngedientDetail, viewIngredient } from '../../../store/reducers/burger-data-slice';

function BurgerIngredient({ingredient}) {
  const [count, setCount] = useState(0);
  const {selectedIngredients, lastUsedIngredient, selectedBun} = useSelector(state => state.burgers);
  const dispatch = useDispatch();
  const {_id, type} = ingredient;
  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  
  // Текущий просматриваемый ингредиент
  const handleViewIngredientDetail = () => {
    dispatch(viewIngredient(ingredient));
    dispatch(toggleIngedientDetail(true));
  }

  useMemo(() => {
    // Оптимизация подсчета количества
    // Если добавили булку, то сбросим счетчик другой, а добавленной присвоим 2
    if (selectedBun?.type === 'bun' && ingredient.type === 'bun') {
      const countSelected = selectedBun._id === ingredient._id ? 2 : 0;
      setCount(countSelected);
      // иначе установим счетчик для выбранного ингредиента
    } else if (lastUsedIngredient?._id === ingredient._id) {
      const countSelected = selectedIngredients.filter(el => el._id === ingredient._id).length;
      setCount(countSelected);
    }
    
  }, [selectedIngredients, selectedBun, lastUsedIngredient, ingredient]);

  return (
    <div ref={ref} className={styles.ingredient} onClick={()=> handleViewIngredientDetail(ingredient)} >
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
