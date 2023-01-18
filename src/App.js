import { useEffect, useReducer, useState } from 'react';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import Preloader from './components/preloader/preloader';
import { BurgersDataContext, SelectedInredientsContext } from './services/burgerContext';
import { getBurgersData } from './utils/burger-api';

// начальное состояние useReducer
const initialState = {
  burgersData: null,
  isLoading: true,
  hasError: false,
  selectedInredients: [],
  lastSelectedIngedient: null
};

// функция редюсер для управления стэйтом компонента
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_SUCCESS':
      return {
        ...state, 
        burgersData: action.payload, 
        isLoading: false
      }
    case 'LOADING_ERROR':
      return {
        ...state, 
        hasError: true, 
        isLoading: false
      }
    case 'SET_SELECTED_INGREDIENTS': {
      return {
        ...state,
        selectedInredients: action.payload,
      }
    }
    case 'SET_LAST_ADDED': {
      return {
        ...state,
        lastSelectedIngedient: action.payload,
      }
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getBurgersData()
      .then(data => {
        dispatch({ type: 'LOADING_SUCCESS', payload: data });
      })
      .catch(err => {
        dispatch({ type: 'LOADING_ERROR'})
        alert("Во время загрузки произошла ошибка");
      })
  }, []);

  // при выборе ингредиента в дочернем компоненте вызываем соответсвующий редюсер
  const handleOnSelect = (ingredients, last) => {
    dispatch({ type: 'SET_LAST_ADDED', payload: last });
    dispatch({ type: 'SET_SELECTED_INGREDIENTS', payload: ingredients });    
  }

  const selectedState = {
    //Прокидываем стэйт и редюсер в дочерние компоненты
    selected: state.selectedInredients,
    lastAdded: state.lastSelectedIngedient,
    handleOnSelect: handleOnSelect
  }

  return (
    <div className="App">
      <AppHeader />
      {state.isLoading ? (
        <Preloader />
      ) : (
          <main className={styles.container}>
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            {state.burgersData && 
              <div className={styles.row}>
                <BurgersDataContext.Provider value={[state.burgersData]}>
                  <SelectedInredientsContext.Provider value={selectedState}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </SelectedInredientsContext.Provider>
                </BurgersDataContext.Provider>
              </div>
            }
          </main>
        )
      }
    </div>
  );
}

export default App;