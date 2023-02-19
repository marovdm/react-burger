import React, { useEffect, useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.scss'
import { ingredientPropTypes } from '../../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { toggleIngedientDetail, viewIngredient } from '../../../services/burger/reducers/burger-data-slice';
import { useLocation, useNavigate } from 'react-router-dom';

function BurgerIngredient({ingredient}) {
  const [count, setCount] = useState(0);
  const {selectedIngredients, lastUsedIngredient, selectedBun} = useSelector(state => state.burgers);
  
  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Текущий просматриваемый ингредиент
  const handleViewIngredientDetail = () => {
    dispatch(viewIngredient(ingredient));
    // dispatch(toggleIngedientDetail(true));
    navigate(`/ingredients/${ingredient._id}`, {state: { background: location}})
  }
  // Подсчет кол-ва ингредиентов для булок
  useEffect(() => {
    if (ingredient.type !== 'bun') return;
    if (selectedBun) {
      const countSelected = selectedBun._id === ingredient._id ? 2 : 0;
      setCount(countSelected);
    } else setCount(0);
  }, [selectedBun, ingredient]);

  // Подсчет кол-ва ингредиентов для остальных
  useEffect(() => {
    if (ingredient.type === 'bun') return;
    if (selectedIngredients.length) {
      if (lastUsedIngredient?._id === ingredient._id) {
        const countSelected = selectedIngredients.filter(el => el._id === ingredient._id).length;
        setCount(countSelected);
      }
    } else setCount(0);
  }, [selectedIngredients, lastUsedIngredient, ingredient]);

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
