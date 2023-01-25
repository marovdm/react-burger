import styles from './burger-constructor.module.scss'
import SelectedElement from './selected-element/selected-element';
import ConstructorOrder from './constructor-order/constructor-order'
import EmptyElement from './empty-element/empty-element';

import { useDispatch, useSelector } from 'react-redux';

import { useDrop } from 'react-dnd';
import { deleteIngredient, selectIngredient, sortIngredients } from '../../services/reducers/burger-data-slice';


export default function BurgerConstructor() {
  const {selectedIngredients, selectedBun} = useSelector(state => state.burgers);
  const dispatch = useDispatch();

  const onDropIngredient = ({ingredient}) => {
    dispatch(selectIngredient(ingredient))
  }; 

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) { onDropIngredient(item) },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  const handleOnDelete = (idx) => {
    dispatch(deleteIngredient(idx));
  }

  const handleMoveIngredients = (dragIndex, hoverIndex) => {
    dispatch(sortIngredients({
      toIndex: hoverIndex,
      fromIndex: dragIndex
    }))
  }

  return (
    <section className={styles.constructor}>
      <div ref={dropTarget} className='mb-10'>
        { 
          selectedBun ? 
            <SelectedElement ingredient={selectedBun} position="top" extraClass="mb-4 ml-8" />
            : <EmptyElement type='top' text="Выберите булки" />
        }
        <ul className={`${styles.constructorWrapper} custom-scroll`}>
          {
            selectedIngredients.length ? selectedIngredients.map((ingredient, idx) =>
              <SelectedElement 
                ingredient={ingredient} 
                index={idx}
                key={ingredient.unique}
                moveElement={handleMoveIngredients} 
                onDelete={handleOnDelete} 
                extraClass="ml-8" 
              />
            ) 
            : <EmptyElement text="Выберите ингредиенты"/>
          }
        </ul>      
        { 
          selectedBun ? 
            <SelectedElement ingredient={selectedBun} position="bottom" extraClass="mt-4 ml-8" />
            : <EmptyElement type='bottom' text="Выберите булки" />
        }
      </div>
      <ConstructorOrder />
    </section>
  )
}