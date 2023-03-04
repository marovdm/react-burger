import React, {FC, LegacyRef} from 'react';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import styles from './burger-chapter.module.scss';
import { IIngredient } from '../../../models/IIngredient';

type BurgerChapterProps = {
  chapter: IIngredient[];
  title: string;
  id: 'bun' | 'main' | 'sauce';
  refUse: LegacyRef<HTMLHeadingElement>
}

const BurgerChapter:FC <BurgerChapterProps>  = ({chapter, title, id, refUse }) => {
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

export default React.memo(BurgerChapter);