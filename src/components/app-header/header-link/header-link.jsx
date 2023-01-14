import styles from './header-link.module.scss';
import classNames from 'classnames';
import cnBind from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = cnBind.bind(styles);

export default function HeaderLink({href, children, active=false}) {
  const classes = classNames(
    'text text_type_main-default', 
    cx('link', {
      'text_color_inactive': !active
    })
  );

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  )
}

HeaderLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool
}
