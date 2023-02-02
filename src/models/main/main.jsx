import { useEffect } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBurgersData } from '../../services/reducers/action-creators';

import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import Preloader from '../../components/preloader/preloader';


export default function Main() {
  const {burgersData, isLoading, hasError, error} = useSelector(state => state.burgers)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBurgersData())
  }, [dispatch]);

  return (
    <>
      { isLoading 
        ? <Preloader /> 
        : (
          <DndProvider backend={HTML5Backend}>
            <>
              {
                !hasError && error === '' ? (
                  <>
                    <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
                    { burgersData && 
                      <div className='row'>
                        <BurgerIngredients />
                        <BurgerConstructor />
                      </div>
                    }
                  </>
                ) : ( 
                  <h3 className='text text_type_main-medium'>{error}</h3>
                )
              }
            </>
          </DndProvider>
          )
      }
    </>
  )
}
