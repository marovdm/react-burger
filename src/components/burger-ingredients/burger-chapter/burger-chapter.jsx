import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import styles from './burger-chapter.module.scss';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/prop-types';
import React from 'react';

function BurgerChapter({chapter, title, id, refUse }) {
  return (
    <article className="pb-10" id={id}>
      <h3 className="text text_type_main-medium mb-6" ref={refUse}>{title}</h3>
      <div className={`${styles.items} pl-4`}>
        {
          chapter.map(item => <BurgerIngredient ingredient={item} key={item._id} />)
        } 
      </div>
    </article>
  )
}

BurgerChapter.propTypes = {
  chapter: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default React.memo(BurgerChapter);