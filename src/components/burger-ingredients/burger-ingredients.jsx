import React from 'react'
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.scss'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerChapter from './burger-chapter/burger-chapter'

const INGREDIENT_TYPES = {
  "bun": "Булки",
  "sauce": "Соусы",
  "main": "Начинки"
};

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number
});

export default function BurgerIngredients({ingredients}) {  
  const [current, setCurrent] = React.useState('bun');

  // Сгруппируем массив ингредиентов по типу ингредиента
  const ingredientsGroup = ingredients.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {})
  // console.log(ingredientsGroup);
  
  return (
    <section className={`${burgerIngredientsStyles.ingredients} mr-10`}>
      <div className={`${burgerIngredientsStyles.tabsHeader} mb-10`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyles.ingredientsWrapper} custom-scroll`}>
        {
          Object.keys(INGREDIENT_TYPES).map(type => (
            <BurgerChapter chapter={ingredientsGroup[type]} title={INGREDIENT_TYPES[type]} key={type} />
          ))
        }
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
};