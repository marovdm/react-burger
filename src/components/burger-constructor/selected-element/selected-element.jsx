import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/prop-types';
import styles from './selected-element.module.scss'

// TODO описать пропсы
export default function SelectedElement({ingredient, position, extraClass}) {
  return (
    <>
      {
       ingredient.type==="bun" ? 
         <ConstructorElement 
          type={position}
          isLocked={true}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          extraClass={extraClass}
        />
        :
        <article className={styles.wrapper} key={ingredient._id}>
          <span className={styles.icon}>
            <DragIcon type="primary" />
          </span>
          <ConstructorElement
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image_mobile}
            extraClass={extraClass}
          />
        </article>
      }
    </>
  )
}

SelectedElement.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  position: PropTypes.string,
  extraClass: PropTypes.string
}
