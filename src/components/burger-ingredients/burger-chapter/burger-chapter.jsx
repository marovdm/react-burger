import BurgerIngredient from '../burger-ingredient/burger-ingredient'
import chapterStyles from './burger-chapter.module.scss'

export default function BurgerChapter({chapter, title, onClick}) {
  return (
    <article className="pb-10">
      <h3 className="text text_type_main-medium mb-6">{title}</h3>
      <div className={`${chapterStyles.items} pl-4`}>
        {
          chapter.map(item => <BurgerIngredient ingredient={item} key={item._id} onSelectIngredient={onClick}/>)
        } 
      </div>
    </article>
  )
}
