import AppHeader from './components/app-header/app-header';
import appStyles from './app.module.css';

import { data } from './utils/data';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={appStyles.container}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div className={appStyles.row}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor />
        </div>
      </main>
    </div>
  );
}

export default App;