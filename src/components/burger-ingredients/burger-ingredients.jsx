import React, { useContext } from 'react'
import styles from './burger-ingredients.module.scss'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerChapter from './burger-chapter/burger-chapter'
import IngredientDetails from '../ingredient-details/ingredient-details';
import { BurgersDataContext } from '../../services/burgerContext';

const INGREDIENT_TYPES = {
  "bun": "Булки",
  "sauce": "Соусы",
  "main": "Начинки"
};

export default function BurgerIngredients() {  
  const [current, setCurrent] = React.useState('bun');
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);
  const [openedIngedientDetail, setOpenedIngedientDetail] = React.useState(false);
  const [ingredients] = useContext(BurgersDataContext);

  // Сгруппируем массив ингредиентов по типу ингредиента
  const ingredientsGroup = ingredients.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {}); 

  const handleSelectIngredient = selected => {
    if (selected) {
      setSelectedIngredient(selected);
      setOpenedIngedientDetail(true)
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
        openedIngedientDetail && selectedIngredient && 
        <IngredientDetails 
          ingredientDetail={selectedIngredient}
          onClose={() => setOpenedIngedientDetail(false)}
        />
      }
    </section>
  )
}