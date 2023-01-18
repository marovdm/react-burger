import styles from './empty-element.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import cnBind from 'classnames/bind';

const cx = cnBind.bind(styles);

export default function EmptyElement({type, text}) {
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

EmptyElement.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
}
