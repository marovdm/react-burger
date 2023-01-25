import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from "react-intersection-observer";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerChapter from './burger-chapter/burger-chapter'
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import { toggleIngedientDetail, viewIngredient } from '../../services/reducers/burger-data-slice';

import styles from './burger-ingredients.module.scss'


export default function BurgerIngredients() {
  const [refBun, inViewBun] = useInView({
    threshold: 1
  });

  const [refSauce, inViewSauce] = useInView({
    threshold: 1
  });

  const [refMain, inViewMain] = useInView({
    threshold: 1
  });

  const [currentTab, setCurrentTab] = React.useState('bun');
  const {burgersData, isOpenedIngedientDetail, viewedIngredient} = useSelector(state => state.burgers);
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

  useMemo(() => {
    const activeTab = () => {
      if (inViewBun) {
        setCurrentTab('bun');
      } else if (inViewSauce && !inViewBun) {
        setCurrentTab('sauce');
      } else if (inViewMain && !inViewSauce) {
        setCurrentTab('main');
      } 
    };

    activeTab();
  }, [inViewBun, inViewSauce, inViewMain])


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
        {buns && <BurgerChapter 
          chapter={buns} 
          title={"Булки"} 
          id="bun"
          refUse={refBun}
        /> }
        {sauces && <BurgerChapter 
          chapter={sauces} 
          title={"Соусы"} 
          id="sauce"
          refUse={refSauce}
        /> }
        {mains && <BurgerChapter 
          chapter={mains} 
          title={"Начинки"} 
          id="main"
          refUse={refMain}
        /> }
      </div>
      {
        isOpenedIngedientDetail && 
        <Modal 
          header="Детали ингредиента" 
          onClose={() => closeIngedientDetail()}
          className="pt-10 pb-15"
        >
          <IngredientDetails ingredientDetail={viewedIngredient} />
        </Modal>
      }
    </section>
  )
}