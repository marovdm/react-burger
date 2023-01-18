import React, { useContext, useMemo } from 'react'
import styles from './burger-ingredients.module.scss'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerChapter from './burger-chapter/burger-chapter'
import IngredientDetails from '../ingredient-details/ingredient-details';
import { BurgersDataContext, SelectedInredientsContext } from '../../services/burgerContext';

const INGREDIENT_TYPES = {
  "bun": "Булки",
  "sauce": "Соусы",
  "main": "Начинки"
};

export default function BurgerIngredients() {  
  const [currentTab, setCurrentTab] = React.useState('bun');
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);
  const [openedIngedientDetail, setOpenedIngedientDetail] = React.useState(false);
  const [ingredients] = useContext(BurgersDataContext);
  const {selected, handleOnSelect} = useContext(SelectedInredientsContext);

  // Сгруппируем массив ингредиентов по типу ингредиента
  const ingredientsGroup = useMemo(() => ingredients.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {}), [ingredients]);

  const handleSelectIngredient = element => {
    if (element) {
      setSelectedIngredient(element);
      setOpenedIngedientDetail(true);

      if (element?.type === 'bun') {
        //если выбрали булку - проверяем, есть ли уже в выбранных булка
        const bunIndex = selected.findIndex((item) => item.type === 'bun')
        if (bunIndex !== -1) { 
          // Заменим на выбранную, т.к. булка может быть только одна
          const updated = selected.map((ingredient, index) => {
            if (ingredient.type === 'bun' && index === bunIndex) {
              return element;
            } else {
              return ingredient;
            }
          });
          handleOnSelect(updated, element);
        } else {
          handleOnSelect([...selected, element], element);
        }
      } else {
        handleOnSelect([...selected, element], element);
      }
    }
  }

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }
  
  return (
    <section className={`${styles.ingredients} mr-10`}>
      <div className={`${styles.tabsHeader} mb-10`}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredientsWrapper} custom-scroll`}>
        {
          Object.keys(INGREDIENT_TYPES).map(type => (
            <BurgerChapter 
              chapter={ingredientsGroup[type]} 
              title={INGREDIENT_TYPES[type]} 
              key={type} 
              onClick={handleSelectIngredient} 
              id={type}
            />
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