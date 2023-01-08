import headerStyles from './app-header.module.scss'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderLink from './header-link/header-link';

export default function AppHeader() {
    return (
        <header className={`${headerStyles.header} pb-4 pt-4`}>
            <div className={headerStyles.container}>
                <div className={headerStyles.row}>
                    <HeaderLink href="/" active={true}>
                        <BurgerIcon type="primary" />
                        <span className='ml-2'>Конструктор</span>
                    </HeaderLink>

                    <HeaderLink href="/">
                        <ListIcon type="secondary" />
                        <span className='ml-2'>Лента заказов</span>
                    </HeaderLink>
                </div>
                
                <a href='/' className={headerStyles.logo}>
                    <Logo />
                </a>

                <HeaderLink href="/" alignRight={true}>
                    <ProfileIcon type="secondary" />
                    <span className='ml-2'>Личный кабинет</span>
                </HeaderLink>
            </div>
        </header>
    )
}
