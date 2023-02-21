import { useRef  } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './selected-element.module.scss';
import { IIngredient } from '../../../models/IIngredient';

import type { Identifier, XYCoord } from 'dnd-core'

type SelectedElementProps = {
  ingredient: IIngredient
  position?: 'bottom' | 'top',
  extraClass?: string,
  index: number,
  moveElement?: (dragIndex: number, hoverIndex: number) => void,
  onDelete?: (idx: number) => void 
}

interface IDragItem {
  index: number, 
  ingredient: IIngredient
}

const SelectedElement = (props: SelectedElementProps) => {
  const {ingredient, position, index, extraClass, moveElement, onDelete} = props;
  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop<
    IDragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'selected',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: IDragItem, monitor) {
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      if (typeof dragIndex === "number" && 
          typeof hoverIndex === "number" && 
          typeof moveElement === 'function') {
        moveElement(dragIndex, hoverIndex);
      }
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
       (ingredient.type !== "bun" && typeof onDelete === "function") ? (
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
        ) : (
          <ConstructorElement 
            type={position}
            isLocked={true}
            text={position === 'top' ? `${ingredient.name} (верх)` : `${ingredient.name} (низ)`}
            price={ingredient.price}
            thumbnail={ingredient.image_mobile}
            extraClass={extraClass}
          />
        )
       
      }
    </>
  )
}

export default SelectedElement;
