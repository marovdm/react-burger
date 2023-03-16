
import {useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom';

import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Preloader from '../../components/preloader/preloader';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { viewIngredient } from '../../services/burger/reducers/burger-data-slice';

import styles from "./ingredient.module.scss";

export default function Ingredient() {
  const {burgersData, isLoading, hasError, error, viewedIngredient} = useAppSelector(state => state.burgers);
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if(viewedIngredient) return;
    if (burgersData.length) {
      const ingredient = burgersData.find(el => el._id === id);
      if (ingredient) {
        dispatch(viewIngredient(ingredient));
      } 
    }
  }, [viewedIngredient, dispatch, pathname, burgersData, id]);

  if (isLoading) {
    return <Preloader />
  }

  if (hasError && error) {
    <h3 className="text text_type_main-large">{error}</h3>
  }

  return (
    <div className={styles.ingredient}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      {viewedIngredient && <IngredientDetails />}
    </div>
  )
}
