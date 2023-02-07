import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Preloader from '../../components/preloader/preloader';
import { resetError } from '../../services/user/reducers/user-slice';
import styles from './form-constructor.module.scss';

export default function FormConstructor({header, footerLinks, children}) {
  const {isLoading, hasError, error} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return(() => {
      if (hasError && error) {
        dispatch(resetError());
      }
    })
  }, [error, hasError, dispatch])

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
    <>
      {
        isLoading ? 
        <Preloader /> : (
          <div className={styles.formConstructor}>
            <h2 className="text text_type_main-medium mb-6">{header}</h2>
            { error && <p className={`${styles.error} text text_type_main-small`}>{ error }</p>}
            { children }
            {links}
          </div>
        )
      }
    </>
  )
}
