import styles from './burger-constructor.module.scss'
import SelectedElement from './selected-element/selected-element';
import ConstructorOrder from './constructor-order/constructor-order'
import EmptyElement from './empty-element/empty-element';

import { useDrop } from 'react-dnd';
import { deleteIngredient, selectIngredient, sortIngredients } from '../../services/burger/reducers/burger-data-slice';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import  { IIngredient } from '../../models/IIngredient';
import { useCallback } from 'react';

type dropItem = {
  ingredient: IIngredient
}

export default function BurgerConstructor() {
  const {selectedIngredients, selectedBun} = useAppSelector(state => state.burgers);
  const dispatch = useAppDispatch();

  const onDropIngredient = (item: dropItem) => {
    const {ingredient} = item;
    dispatch(selectIngredient(ingredient));
  }; 

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: dropItem) { 
      onDropIngredient(item) 
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  const handleOnDelete = useCallback((idx: number) => {
    dispatch(deleteIngredient(idx));
  }, [dispatch]);

  const handleMoveIngredients = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(sortIngredients({
      toIndex: hoverIndex,
      fromIndex: dragIndex
    }))
  }, [dispatch]);

  return (
    <section className={styles.wrapper} data-cy='constructor'>
      <div ref={dropTarget} className='mb-10'>
        { 
          selectedBun ? 
            <SelectedElement 
              index={-Infinity} 
              ingredient={selectedBun} 
              position="top" 
              extraClass="mb-4 ml-8"
              onDelete={ () => {} }
              moveElement={ () => {} }
            />
            : <EmptyElement type='top' text="Выберите булки" />
        }
        <ul className={`${styles.content} custom-scroll`}>
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
            <SelectedElement 
              index={Infinity} 
              ingredient={selectedBun} 
              position="bottom" 
              extraClass="mt-4 ml-8" 
              onDelete={ () => {} }
              moveElement={ () => {} }
            />
            : <EmptyElement type='bottom' text="Выберите булки" />
        }
      </div>
      <ConstructorOrder />
    </section>
  )
}