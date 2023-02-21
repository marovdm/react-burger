import styles from './empty-element.module.scss';
import classNames from 'classnames';
import cnBind from 'classnames/bind';

const cx = cnBind.bind(styles);

type EmptyElementProps = {
  type?: 'top' | 'bottom',
  text: string
}

export default function EmptyElement({type, text}: EmptyElementProps) {
  const classes = classNames(
    'text text_type_main-default', 
    cx('empty_element',{
      'empty_element__top': type === 'top',
      'empty_element__bottom': type === 'bottom'
    })
  );

  return (
    <div className={classes}>
      {text}
    </div>
  )
}
