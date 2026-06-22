import { NavLink } from 'react-router';
import { isMedia, isNavigation, isDev } from '@/tumblers';
import cn from 'classnames';
import styles from './NavContainer.module.scss';

export const NavContainer = () => {
    if (!isNavigation) return null;
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

                {(
                    isMedia ||
                    isMedia && !isDev
                ) && (
                    <span className={styles.separator}></span>
                )}

                {(
                    isMedia ||
                    isMedia && !isDev
                ) && (
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
                )}
            </div>
        </nav>
    );
};
