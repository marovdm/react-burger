import {FC, ReactNode} from 'react'
import { NavLink } from "react-router-dom";

import classNames from 'classnames';
import cnBind from 'classnames/bind';

import styles from './header-link.module.scss';

const cx = cnBind.bind(styles);

type HeaderLinkProps = {
  href: string;
  disabled?: boolean;
  children: ReactNode
}

const HeaderLink: FC <HeaderLinkProps> = ({href, disabled, children}) => {
  const link = classNames('text text_type_main-default text_color_inactive', cx('link'));
  const activeLink = classNames('text text_type_main-default', cx('link'), cx('link_active'));

  return (
    <NavLink 
      to={href} 
      className={({isActive}) => isActive ? activeLink : link}
      // небольшой костыль для ссылки в меню "лента заказов", она пока остается неактивной
      onClick={(e) => disabled && e.preventDefault()}
    >
      {children}
    </NavLink>
  )
}

export default HeaderLink;
