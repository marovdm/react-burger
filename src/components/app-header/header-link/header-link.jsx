import { NavLink } from "react-router-dom";

import classNames from 'classnames';
import cnBind from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './header-link.module.scss';


const cx = cnBind.bind(styles);

export default function HeaderLink({href, children}) {
  const link = classNames('text text_type_main-default text_color_inactive', cx('link'));
  const activeLink = classNames('text text_type_main-default', cx('link'), cx('link_active'));

  return (
    <NavLink to={href} className={({isActive}) => isActive ? activeLink : link}>
      {children}
    </NavLink>
  )
}

HeaderLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
