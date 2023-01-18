import { useContext, useMemo } from 'react';
import styles from './burger-constructor.module.scss'
import ConstructorOrder from './constructor-order/constructor-order'
import { SelectedInredientsContext } from '../../services/burgerContext';
import EmptyElement from './empty-element/empty-element';
import { v4 as uuidv4 } from 'uuid';
import SelectedElement from './selected-element/selected-element';

export default function BurgerConstructor() {
  const {selected} = useContext(SelectedInredientsContext);

  const selectedBun = useMemo(() => selected.find(ingredient => ingredient.type === 'bun'), [selected]);
  const selectedOthers = useMemo(() => selected.filter(ingredient => ingredient.type !== 'bun'), [selected]);

  return (
    <section className={styles.constructor}>
      <div className="mb-10">
        { 
          selectedBun ? 
            <SelectedElement ingredient={selectedBun} position="top" extraClass="mb-4 ml-8" />
            : <EmptyElement type='top' text="Выберите булки" />
        }
        <ul className={`${styles.constructorWrapper} custom-scroll`}>
          {
            (selectedOthers && selectedOthers.length) ? selectedOthers.map(ingredient =>
              <SelectedElement ingredient={ingredient} extraClass="ml-8" key={uuidv4()}/>
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