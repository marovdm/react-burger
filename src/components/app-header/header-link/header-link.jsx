import linkStyles from './header-link.module.scss';
import classNames from 'classnames'
import cnBind from 'classnames/bind'

const cx = cnBind.bind(linkStyles);

export default function HeaderLink({href, children, active=false, alignRight=false}) {
  const classes = classNames(
    'text text_type_main-default', 
    cx('link', { 
      'align-right': alignRight,
      'text_color_inactive': !active
    })
  );

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  )
}
