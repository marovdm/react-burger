import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/prop-types';
import styles from './selected-element.module.scss'

export default function SelectedElement({ingredient, position, index, extraClass, moveElement, onDelete}) {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'selected',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) {
        return;
      }
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      if (typeof dragIndex === "number" && typeof hoverIndex === "number") {
        moveElement(dragIndex, hoverIndex);
      }
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'selected',
    item: {ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <>
      {
       ingredient.type==="bun" ? 
         <ConstructorElement 
          type={position}
          isLocked={true}
          text={position === 'top' ? `${ingredient.name} (верх)` : `${ingredient.name} (низ)`}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          extraClass={extraClass}
        />
        :
        <li ref={ref} className={styles.wrapper} key={ingredient._id} data-handler-id={handlerId}>
          <span className={styles.icon}>
            <DragIcon type="primary" />
          </span>
          <ConstructorElement
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image_mobile}
            extraClass={extraClass}
            handleClose={() => onDelete(index)}
          />
        </li>
      }
    </>
  )
}

SelectedElement.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  position: PropTypes.string,
  extraClass: PropTypes.string,
  index: PropTypes.number,
  moveElement: PropTypes.func,
  onDelete: PropTypes.func
}
