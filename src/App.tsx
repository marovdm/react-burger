import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { BurgersDataContext, SelectedInredientsContext } from './services/burgerContext';
import { getBurgersData } from './utils/burger-api';

function App() {
  const [state, setState] = useState({
    burgersData: null,
    isLoading: true,
    hasError: false
  })
  const [selectedInredients, setSelectedInredients] = useState([] as any)

  useEffect(() => {
    setState({...state, isLoading: true});   
    getBurgersData()
      .then(({data}) => setState({ ...state, burgersData: data, isLoading: false }))
      .catch(err => setState({ ...state, hasError: true, isLoading: false }))
  }, []);

  // TODO: any - потому что TS постоянно ругается. После изучения  TS - исправить
  const handleOnSelect = (element: any) => {
    if (element?.type === 'bun') {
      //если выбрали булку - проверяем, есть ли уже в выбранных булка
      const bunIndex = selectedInredients.findIndex((item: any) => item.type === 'bun')
      if (bunIndex !== -1) { 
        // Заменим на выбранную, т.к. булка может быть только одна
        const updated = selectedInredients.map((ingredient: any, index: number) => {
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
      <main className={styles.container}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        {!state.isLoading && state.burgersData && 
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
    </div>
  );
}

export default App;