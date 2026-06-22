import { GitHubIcon } from '@assets/svg/GitHubIcon';
import { YouTubeIcon } from '@assets/svg/YouTubeIcon';
import classes from './NavLinks.module.scss';

export const LINKS = {
    SOCIALS: {
        GITHUB: "https://github.com/Mr-Kinako/Mr_Kinako-Personal-Page",
        YOUTUBE: "https://www.youtube.com/@mr_kinako"
    }
};

export const NavLinks = () => {
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
