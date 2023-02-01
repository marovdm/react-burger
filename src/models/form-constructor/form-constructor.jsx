import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './form-constructor.module.scss';

export default function FormConstructor({header, footerLinks, children}) {

  const links = useMemo(() => {
    return (
      footerLinks.length ? (
        footerLinks.map((link, id) => 
          <p className="mb-4" key={id}>
            <span className="text text_type_main-default text_color_inactive">{link.text}</span>
            <span><Link className={styles.link} to={link.href}>{link.linkText}</Link></span>
          </p>
        )
      ) : null
    )
  }, [footerLinks]);

  return (
    <div className={styles.formConstructor}>
      <h2 className="text text_type_main-medium mb-6">{header}</h2>
      {children}
      {links}
    </div>
  )
}
