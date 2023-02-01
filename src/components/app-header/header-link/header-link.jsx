import { Link } from "react-router-dom";

import classNames from 'classnames';
import cnBind from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './header-link.module.scss';


const cx = cnBind.bind(styles);

export default function HeaderLink({href, children, active=false}) {
  const classes = classNames(
    'text text_type_main-default', 
    cx('link', {
      'text_color_inactive': !active
    })
  );

  return (
    <Link to={href} className={classes}>
      {children}
    </Link>
  )
}

HeaderLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool
}
