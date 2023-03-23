import { IIngredient } from '../../../models/IIngredient';
import burgerReducer, { 
  BurgersDataState, 
  viewIngredient, 
  toggleIngedientDetail,
  setDefaultValues,
  selectIngredient,
  deleteIngredient,
  sortIngredients
} from '../reducers/burger-data-slice';

describe('burger-data-slice', () => {
  const ingredient: IIngredient = {
    _id:"60d3b41abdacab0026a733cd",
    name:"Соус фирменный Space Sauce",
    type:"sauce",
    proteins:50,
    fat:22,
    carbohydrates:11,
    calories:14,
    price:80,
    image:"https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile:"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v:0
  }

  const ingredientM: IIngredient = {
    "_id": "60d3b41abdacab0026a733c9",
    "name": "Мясо бессмертных моллюсков Protostomia",
    "type": "main",
    "proteins": 433,
    "fat": 244,
    "carbohydrates": 33,
    "calories": 420,
    "price": 1337,
    "image": "https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v": 0
  }

  const bun: IIngredient = {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0
}

  let state: BurgersDataState = {
    burgersData: [],
    isLoading: false,
    hasError: false,
    error: '',
    viewedIngredient: null,
    selectedIngredients: [],
    selectedBun: null,
    lastUsedIngredient: null,
    isOpenedIngedientDetail: false
  };


  it('should be viewed ingredient', () => {
    const action = { type: viewIngredient.type, payload: ingredient }
    const result = burgerReducer(state, action);

    expect(result.viewedIngredient?._id).toEqual(ingredient._id);
  })

  it('should be toggle value flag', () => {
    const action = { type: toggleIngedientDetail.type, payload: true }
    const result = burgerReducer(state, action);

    expect(result.isOpenedIngedientDetail).toBeTruthy();
  })

  it('should be set default values', () => {
    const action = { type: setDefaultValues.type }    
    const result = burgerReducer(state, action);
    
    expect(result.selectedBun).toBeNull();
    expect(result.selectedIngredients).toEqual([]);
  })

  it('should be added ingredient', () => {
    const action = { type: selectIngredient.type, payload: ingredient }    
    const result = burgerReducer(state, action);
    expect
      (result.selectedIngredients[result.selectedIngredients.length - 1]._id)
      .toEqual(ingredient._id)
  })

  it('should be added bun', () => {
    const action = { type: selectIngredient.type, payload: bun }    
    const result = burgerReducer(state, action);
    expect
      (result.selectedBun?._id)
      .toEqual(bun._id)
  })

  it('should be delete ingredient', () => {
    let tmp = [];
    tmp.push(ingredient);
    tmp.push(ingredient);
    tmp.push(ingredient);

    const newState = {...state, selectedIngredients: tmp}
    const action = { type: deleteIngredient.type, payload: 2 }
    
    const result = burgerReducer(newState, action);
    
    expect
      (result.selectedIngredients.length)
      .toEqual(2)
  })

  it('should be sorted ingredients', () => {
    let tmp = [];
    tmp.push(ingredient);
    tmp.push(ingredientM);

    const newState = {...state, selectedIngredients: tmp}
    const action = { type: sortIngredients.type, payload: {toIndex: 0, fromIndex: 1} }
    
    const result = burgerReducer(newState, action);
    
    expect
      (result.selectedIngredients[0]._id)
      .toEqual(ingredientM._id)

      expect
      (result.selectedIngredients[1]._id)
      .toEqual(ingredient._id)
  })
})