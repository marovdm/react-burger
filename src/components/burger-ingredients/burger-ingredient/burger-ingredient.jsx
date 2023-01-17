import { useContext, useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.scss'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/prop-types';
import { SelectedInredientsContext } from '../../../services/burgerContext';

export default function BurgerIngredient({ingredient, onSelectIngredient}) {
  const [count, setCount] = useState(0);
  const {handleOnSelect} = useContext(SelectedInredientsContext);
  
  const handleSelectIngredient = (ingredient) => {
    // TODO: Разобраться с инкрементом счетчика
    // по идее, он должен быть равен количеству элементов с данным id в store
    // потому что иначе не получится удалять или сбрасывать, если это, например булка (при замене на другую)
    // Пока не знаю как сделать, может быть на ревью подскажут:)
    
    // setCount(count + 1);
    onSelectIngredient(ingredient);
    handleOnSelect(ingredient);
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
