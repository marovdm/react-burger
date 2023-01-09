import React from 'react'
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.scss'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerChapter from './burger-chapter/burger-chapter'
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientPropTypes } from '../../utils/prop-types';

const INGREDIENT_TYPES = {
  "bun": "Булки",
  "sauce": "Соусы",
  "main": "Начинки"
};

export default function BurgerIngredients({ingredients}) {  
  const [current, setCurrent] = React.useState('bun');
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);
  const [visibleIngedientDetail, setVisibleIngedientDetail] = React.useState(false);


  // Сгруппируем массив ингредиентов по типу ингредиента
  const ingredientsGroup = ingredients.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {}); 

  const handleSelectIngredient = selected => {
    if (selected) {
      setSelectedIngredient(selected);
      setVisibleIngedientDetail(true)
    }
  }
  
  return (
    <section className={`${styles.ingredients} mr-10`}>
      <div className={`${styles.tabsHeader} mb-10`}>
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
      <div className={`${styles.ingredientsWrapper} custom-scroll`}>
        {
          Object.keys(INGREDIENT_TYPES).map(type => (
            <BurgerChapter chapter={ingredientsGroup[type]} title={INGREDIENT_TYPES[type]} key={type} onClick={handleSelectIngredient} />
          ))
        }
      </div>
      {
        visibleIngedientDetail && selectedIngredient && 
        <IngredientDetails 
          ingredientDetail={selectedIngredient}
          onClose={() => setVisibleIngedientDetail(false)}
        />
      }
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
};