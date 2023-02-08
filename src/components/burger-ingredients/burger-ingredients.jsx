import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useInView } from "react-intersection-observer";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerChapter from './burger-chapter/burger-chapter';

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

  const [currentTab, setCurrentTab] = useState('bun');
  const {burgersData} = useSelector(state => state.burgers);


  const buns = useMemo(() => burgersData.filter(ingredient => ingredient.type === 'bun'), [burgersData]);
  const mains = useMemo(() => burgersData.filter(ingredient => ingredient.type === 'main'), [burgersData]);
  const sauces = useMemo(() => burgersData.filter(ingredient => ingredient.type === 'sauce'), [burgersData]);

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
    </section>
  )
}