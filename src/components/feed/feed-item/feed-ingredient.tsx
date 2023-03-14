import { ReactNode } from 'react';
import styles from '../feed.module.scss';

type TFeedIngredientTypes = {
  imgSrc: string,
  styleWrapper?: React.CSSProperties,
  children: ReactNode,
  styleImg?: React.CSSProperties
}

const FeedIngredient = ({imgSrc, styleWrapper, styleImg, children}: TFeedIngredientTypes) => {
  return (
    <li className={styles.feed_detail__preview} style={styleWrapper}>
      <img src={imgSrc} alt="ingredient" style={styleImg} />
      {children}
    </li>
  )
}

export default FeedIngredient;