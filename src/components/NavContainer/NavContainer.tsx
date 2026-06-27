import { NavLink } from 'react-router';
import { isDev, isProd } from '@/tumblers';
import cn from 'classnames';
import styles from './NavContainer.module.scss';

export const NavContainer = () => {
    if (isDev || isProd)
    return (
        <nav className={styles.navigationContainer}>
            <div className={styles.navBubble}>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        cn(styles.link, {
                            [styles.active]: isActive
                        })
                    }
                >
                    Home
                </NavLink>

                <span className={styles.separator}></span>

                <NavLink
                    to="/media"
                    className={({ isActive }) => 
                        cn(styles.link, {
                            [styles.active]: isActive
                        })
                    }
                >
                    Media
                </NavLink>
            </div>
        </nav>
    );
};
