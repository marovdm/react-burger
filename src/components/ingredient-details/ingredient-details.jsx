import styles from './ingredient-details.module.scss';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';

export default function IngredientDetails({ingredientDetail}) {
  return (
    <>
      <img src={ingredientDetail.image_large} alt={ingredientDetail.name} />
      <p className="text text_type_main-medium mb-8">
        {ingredientDetail.name}
      </p>
      <div className={styles.valuesWrapper}>
        <div className="text text_type_main-small text_color_inactive">
          <p>Калории,ккал</p>
          <p>{ingredientDetail.calories}</p>
        </div>
        <div className="text text_type_main-small text_color_inactive">
          <p>Белки, г</p>
          <p>{ingredientDetail.proteins}</p>
        </div>
        <div className="text text_type_main-small text_color_inactive">
          <p>Жиры, г</p>
          <p>{ingredientDetail.fat}</p>
        </div>
        <div className="text text_type_main-small text_color_inactive">
          <p>Углеводы, г</p>
          <p>{ingredientDetail.carbohydrates}</p>
        </div>
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  ingredientDetail: ingredientPropTypes.isRequired
};