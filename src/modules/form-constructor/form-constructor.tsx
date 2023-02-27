import { FC, ReactNode, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import Preloader from '../../components/preloader/preloader';
import { resetError } from '../../services/user/reducers/user-slice';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import styles from './form-constructor.module.scss';

type FooterLinksTypes = {
  'text': string;
  'linkText': string;
  'href': string;
}

type FormConstructorProps = {
  header: string;
  footerLinks: FooterLinksTypes[];
  children: ReactNode;
}

const FormConstructor:FC<FormConstructorProps> = ({header, footerLinks, children}) => {
  const {isLoading, hasError, error} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (hasError && error !== '') {
        dispatch(resetError());
      }
    }
  }, [dispatch, error, hasError])

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

export default FormConstructor;
