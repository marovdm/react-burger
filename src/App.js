import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import Preloader from './components/preloader/preloader';
import { fetchBurgersData } from './store/reducers/action-creators';


function App() {
  const {burgersData, isLoading, hasError, error} = useSelector(state => state.burgers)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBurgersData())
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      { isLoading 
        ? <Preloader /> 
        : (
            <main className={styles.container}>
              {
                !hasError && error === '' ? (
                  <>
                    <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
                    { burgersData && 
                      <div className={styles.row}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                      </div>
                    }
                  </>
                ) : ( 
                  <h3 className='text text_type_main-medium'>{error}</h3>
                )
              }
            </main>
          )
      }
    </div>
  );
}

export default App;