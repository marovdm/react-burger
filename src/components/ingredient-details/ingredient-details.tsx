import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { viewIngredient } from '../../services/burger/reducers/burger-data-slice';

import styles from './ingredient-details.module.scss';

export default function IngredientDetails() {
  const {burgersData, viewedIngredient} = useAppSelector(state => state.burgers);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(viewedIngredient) return;
    if (!viewedIngredient && burgersData.length) {
      const ingredient = burgersData.find(el => el._id === id);
      if (ingredient) {
        dispatch(viewIngredient(ingredient));
      } 
    }
  }, [burgersData, dispatch, id, viewedIngredient])

  return (
    <>
      {
        viewedIngredient &&
        (
          <>
            <img src={viewedIngredient.image_large} alt={viewedIngredient.name} />
            <p className="text text_type_main-medium mb-8">
              {viewedIngredient.name}
            </p>
            <div className={styles.valuesWrapper}>
              <div className="text text_type_main-small text_color_inactive">
                <p>Калории,ккал</p>
                <p>{viewedIngredient.calories}</p>
              </div>
              <div className="text text_type_main-small text_color_inactive">
                <p>Белки, г</p>
                <p>{viewedIngredient.proteins}</p>
              </div>
              <div className="text text_type_main-small text_color_inactive">
                <p>Жиры, г</p>
                <p>{viewedIngredient.fat}</p>
              </div>
              <div className="text text_type_main-small text_color_inactive">
                <p>Углеводы, г</p>
                <p>{viewedIngredient.carbohydrates}</p>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}