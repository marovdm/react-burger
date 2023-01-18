import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import Preloader from './components/preloader/preloader';
import { BurgersDataContext, SelectedInredientsContext } from './services/burgerContext';
import { getBurgersData } from './utils/burger-api';

function App() {
  const [state, setState] = useState({
    burgersData: null,
    isLoading: true,
    hasError: false
  })
  const [selectedInredients, setSelectedInredients] = useState([]);

  useEffect(() => {
    getBurgersData()
      .then(data => setState({ ...state, burgersData: data, isLoading: false }))
      .catch(err => {
        setState({ ...state, hasError: true, isLoading: false });
        alert("Во время загрузки произошла ошибка");
      })
  }, []);

  // TODO: any - потому что TS постоянно ругается. После изучения  TS - исправить
  const handleOnSelect = (element) => {
    if (element?.type === 'bun') {
      //если выбрали булку - проверяем, есть ли уже в выбранных булка
      const bunIndex = selectedInredients.findIndex((item) => item.type === 'bun')
      if (bunIndex !== -1) { 
        // Заменим на выбранную, т.к. булка может быть только одна
        const updated = selectedInredients.map((ingredient, index) => {
          if (ingredient.type === 'bun' && index === bunIndex) {
            return element;
          } else {
            return ingredient;
          }
        });
        setSelectedInredients(updated);
      } else {
        setSelectedInredients([...selectedInredients, element]);
      }
    } else {
      setSelectedInredients([...selectedInredients, element]);
    }
  }

  const selectedState = {
    selected: selectedInredients,
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