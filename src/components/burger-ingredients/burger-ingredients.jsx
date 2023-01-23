import React, { useMemo } from 'react'
import styles from './burger-ingredients.module.scss'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerChapter from './burger-chapter/burger-chapter'
import IngredientDetails from '../ingredient-details/ingredient-details';

import { useDispatch, useSelector } from 'react-redux';
import { toggleIngedientDetail, viewIngredient } from '../../store/reducers/burger-data-slice';


export default function BurgerIngredients() {  
  const [currentTab, setCurrentTab] = React.useState('bun');
  const {burgersData, isOpenedIngedientDetail, viewedIngredient, lastAddedIngredient} = useSelector(state => state.burgers);
  const dispatch = useDispatch();

  const buns = useMemo(() => burgersData.filter(ingredient => ingredient.type === 'bun'), [burgersData]);
  const mains = useMemo(() => burgersData.filter(ingredient => ingredient.type === 'main'), [burgersData]);
  const sauces = useMemo(() => burgersData.filter(ingredient => ingredient.type === 'sauce'), [burgersData]);

  const closeIngedientDetail = () => {
    dispatch(toggleIngedientDetail(false));
    dispatch(viewIngredient({}))
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
        <BurgerChapter 
          chapter={buns} 
          title={"Булки"} 
          id="bun"
        />
        <BurgerChapter 
          chapter={sauces} 
          title={"Соусы"} 

          id="main"
        />
        <BurgerChapter 
          chapter={mains} 
          title={"Начинки"} 
          id="sauce"
        />
      </div>
      {
        isOpenedIngedientDetail && 
        <IngredientDetails 
          ingredientDetail={viewedIngredient}
          onClose={() => closeIngedientDetail()}
        />
      }
    </section>
  )
}