import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { getBurgersData } from './utils/burger-api';


// hardcoded данные для имитации выбранных ингредиентов
const selectedIngredients = [
  {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b9",
    "name":"Соус традиционный галактический",
    "type":"sauce",
    "proteins":42,
    "fat":24,
    "carbohydrates":42,
    "calories":99,
    "price":15,
    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b4",
    "name":"Мясо бессмертных моллюсков Protostomia",
    "type":"main",
    "proteins":433,
    "fat":244,
    "carbohydrates":33,
    "calories":420,
    "price":1337,
    "image":"https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9bc",
    "name":"Плоды Фалленианского дерева",
    "type":"main",
    "proteins":20,
    "fat":5,
    "carbohydrates":55,
    "calories":77,
    "price":874,
    "image":"https://code.s3.yandex.net/react/code/sp_1.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9bb",
    "name":"Хрустящие минеральные кольца",
    "type":"main",
    "proteins":808,
    "fat":689,
    "carbohydrates":609,
    "calories":986,
    "price":300,
    "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    "__v":0
  }
];


function App() {
  const [state, setState] = useState({
    burgersData: null,
    isLoading: true,
    hasError: false
  })

  // заготовка под запрос с бэка
  useEffect(() => {
    setState({...state, isLoading: true});   
    getBurgersData()
      .then(({data}) => setState({ ...state, burgersData: data, isLoading: false }))
      .catch(err => setState({ ...state, hasError: true, isLoading: false }))
  }, []);  

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.container}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        {!state.isLoading && state.burgersData && 
          <div className={styles.row}>
            <BurgerIngredients ingredients={state.burgersData} />
            <BurgerConstructor selected={selectedIngredients} />
          </div>
        }
      </main>
    </div>
  );
}

export default App;