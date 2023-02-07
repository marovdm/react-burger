import { Link } from "react-router-dom";

import styles from './app-header.module.scss'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderLink from './header-link/header-link';

export default function AppHeader() {
    return (
        <header className={`${styles.header} pb-4 pt-4`}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <HeaderLink href="/">
                        <BurgerIcon type="primary" />
                        <span className='ml-2'>Конструктор</span>
                    </HeaderLink>

                    <HeaderLink href="/list-order" disabled>
                        <ListIcon type="secondary" />
                        <span className='ml-2'>Лента заказов</span>
                    </HeaderLink>
                </div>

                <Link to='/' className={styles.logo}>
                    <Logo />
                </Link>

                <div className={styles.rowend}>
                    <HeaderLink href="/login">
                        <ProfileIcon type="secondary" />
                        <span className='ml-2'>Личный кабинет</span>
                    </HeaderLink>
                </div>
            </div>
        </header>
    )
}
