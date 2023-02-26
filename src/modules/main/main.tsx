import { ReactNode, useEffect } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchBurgersData } from '../../services/burger/reducers/action-creators';

// import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
// import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import Preloader from '../../components/preloader/preloader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

type MainComponentProp = {
  children: ReactNode
}

export default function Main({children}: MainComponentProp) {
  const {burgersData, isLoading, hasError, error} = useAppSelector(state => state.burgers)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBurgersData())
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />
  }

  if (hasError && error) {
    <h3 className="text text_type_main-large">{error}</h3>
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        { burgersData.length && 
          <div className='row'>
            {children}
          </div>
        }
      </DndProvider>
    </>
  )
}
