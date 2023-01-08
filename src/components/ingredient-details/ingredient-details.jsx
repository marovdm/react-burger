import Modal from '../modal/modal';
import detailStyles from './ingredient-details.module.scss';

export default function IngredientDetails({ingredientDetail, onClose}) {
  return (
    <Modal header="Детали ингредиента" onClose={onClose} className="pt-10 pb-15">
      <img src={ingredientDetail.image_large} alt={ingredientDetail.name} />
        <p className="text text_type_main-medium mb-8">
          {ingredientDetail.name}
        </p>
        <div className={detailStyles.valuesWrapper}>
          <p className="text text_type_main-small text_color_inactive">
              <p>Калории,ккал</p>
              <p>{ingredientDetail.calories}</p>
          </p>
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
    </Modal>
  )
}
