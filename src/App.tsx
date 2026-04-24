import { BrowserRouter, Routes, Route } from "react-router";
// import cn from 'classnames';
import classes from './App.module.scss';
import { GitHubIcon } from "./assets/svg/GitHubIcon";
import { YouTubeIcon } from "./assets/svg/YouTubeIcon";
import avatar from '/9h5CQ0Xs.ico';
// import { useEffect, useState } from "react";

const LINKS = {
    SOCIALS: {
        GITHUB: "https://github.com/Mr-Kinako/Mr_Kinako-Personal-Page",
        YOUTUBE: "https://www.youtube.com/@mr_kinako"
    }
};

const NavLinks = () => {
    const { GITHUB, YOUTUBE } = LINKS.SOCIALS;

    return (
        <div className={classes['navLinks-container']}>
            <div className={classes.navLinksField}>
                <nav className={classes.navLinks}>
                    <a className={classes.link}
                        href={GITHUB}
                        target="_blank"
                        rel="noopener noreferrer"
                        draggable={false}
                        aria-label="GitHub Repository (opens in a new tab)"
                        title="GitHub Repository (opens in a new tab)"
                    >
                        <GitHubIcon aria-hidden="true" />
                    </a>
                    <a className={classes.link}
                        href={YOUTUBE}
                        target="_blank"
                        rel="noopener noreferrer"
                        draggable={false}
                        aria-label="YouTube channel (opens in a new tab)"
                        title="YouTube channel (opens in a new tab)"
                    >
                        <YouTubeIcon aria-hidden="true" />
                    </a>
                </nav>
            </div>
        </div>
    );
};

// const ThemeSwitcher = () => {
//     const [theme, setTheme] = useState('dark');

//     const toggleTheme = () => {
//         const newTheme = theme === 'dark' ? 'light' : 'dark';
//         setTheme(newTheme);
//         document.documentElement.setAttribute('data-theme', newTheme);
//         localStorage.setItem('theme', newTheme);
//     };

//     useEffect(() => {
//         const savedTheme = localStorage.getItem('theme') || 'dark';
//         setTheme(savedTheme);
//         document.documentElement.setAttribute('data-theme', savedTheme);
//     }, []);

//     return (
//         <button onClick={toggleTheme} style={{
//             display: "none",
//             position: "absolute",
//             left: "10px", top: "10px",
//             backgroundColor: "var(--card-bg-color)",
//             border: "none",
//             borderRadius: "8px",
//             color: "var(--text-color)",
//             cursor: "pointer",
//             transition: "background 0.3s ease",
//             zIndex: "2"
//         }}>
//             Switch Theme
//         </button>
//     );
// };

const WidgetLinks = () => {
    return (
        <div className={classes.invisibleContainer}>
            <div className={classes.widgetLinks_Container}>
                <a
                    className={classes.widgetLink}
                    target="_blank"
                    href="https://mr-kinako.github.io/Iris-page-by-Mr_Kinako/"
                    rel="noopener noreferrer"
                    aria-label="Iris Git Page (opens in a new tab)"
                    title="Iris Git Page (opens in a new tab)"
                >
                    Site for Iris ❤️
                </a>
            </div>
        </div>
    );
};

const Home = () => {
    const { GITHUB } = LINKS.SOCIALS;
    const avatarSource: string | null = avatar;

    return (
        <main className={classes['homepage-container']}>
            <div className={classes.profileCard}>
                <div className={classes.mainInfo}>
                    <h1 className={classes.nickname}>Mr Kinako</h1>

                    <span className={classes.separator} aria-hidden="true"></span>

                    <div className={classes.avatarContainer}>
                        {avatarSource ? (
                            <img className={classes.avatar}
                                src={avatarSource}
                                title="*boop*"
                                alt="action *boop at you*"
                                draggable={false}
                            />
                        ) : (
                            <div className={classes.avatarPlaceholder_container}>
                                <div role="img" className={classes.avatarPlaceholder}
                                    title="avatar placeholder"
                                    aria-label="avatar placeholder: MK"
                                    style={{ cursor: "default" }}
                                >
                                    MK
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={classes.descriptionContainer}>
                    <p className={classes.description}>
                        Hi, I'm Mr_Kinako. I love playing games and i love furry art. Thanks for reading this text and visiting my page.
                    </p>
                    <p className={classes.footerNote}>
                        {'Found a bug? '}
                        <a className={classes.issueLink}
                            href={`${GITHUB}/issues`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Issues (opens in a new tab)"
                            title="GitHub Issues (opens in a new tab)"
                        >
                            Open an issue
                        </a>.
                    </p>
                </div>
            </div>
            <WidgetLinks />
        </main>
    );
};

export const App = () => {
    return (
        <div className={classes['app-root']}>
            <BrowserRouter>
                <div className={classes['background']}
                    aria-hidden="true"
                    draggable={false}
                ></div>
                
                <div className={classes['app-content']}>
                    <NavLinks  />
                    {/* <ThemeSwitcher /> */}

                    <Routes>
                        <Route path="/"
                            element={
                                <Home />
                            }
                        />

                        <Route path="/rules"
                            element={
                                <h2 style={{
                                    textAlign: "center",
                                    margin: "269px 0 0 0",
                                    userSelect: "none"
                                }}
                                >
                                    Hi, I'm a second component.
                                </h2>
                            }
                        />

                        <Route path="*"
                            element={
                                <>
                                <h2 style={{
                                        textAlign: "center",
                                        margin: "269px 0 4px 0",
                                        userSelect: "none"
                                    }}
                                >
                                     Page not found.
                                </h2>

                                <p style={{
                                        textAlign: "center",
                                        userSelect: "none"
                                    }}
                                >
                                    Please, navigate to: '...app/' or '..app/rules'
                                </p>
                                </>
                            }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
};
