import classes from './HomePage.module.scss';
import cn from 'classnames';
import avatar from '/9h5CQ0Xs.ico';
import { LINKS } from "@comp/NavLinks";
import { INFO_DATA } from '@data/info_data';
import { GlassCard } from '@comp/GlassCard';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HomePage = () => {
    const [activeCategory, setActiveCategory] = useState<keyof typeof INFO_DATA>("Hardware-Info");
    const [cardVisible, setCardVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(cardVisible);
    const { GITHUB } = LINKS.SOCIALS;
    const avatarSource: string | null = avatar;
    const currentData = INFO_DATA[activeCategory];
    
    const buttonTooltip = activeCategory === "Hardware-Info" ? 'Next to Other Information' : 'Go Back to Hardware Information';

    const handleSwitch = () => {
        setActiveCategory(prev =>
            prev === "Hardware-Info" ? "More-Info" : "Hardware-Info"
        );
    };
    const handleVisible = () => {
        if(cardVisible) {
            setCardVisible(false);
        } else {
            setShouldRender(true);
            setCardVisible(true);
        }
    };

    const handleAnimationEnd = () => {
        if (!cardVisible) setShouldRender(false);
    }

    const combinedClassesSwitchBtn = [
        classes.btnSwitch,
        activeCategory === "More-Info" ? classes.active : null
    ].filter(Boolean).join(' ');

    return (
        <main className={classes['homepage-container']}>
            <motion.div layout className={classes['homepage-grid']}>

            <motion.div
                layout
                className={cn(
                    classes.profileCard
                )}
            >
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
                    <div className={classes.footerNote}>
                        <div className={classes.noteText}>Found a bug?
                            <a className={classes.issueLink}
                                href={`${GITHUB}/issues`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Issues (opens in a new tab)"
                                title="GitHub Issues (opens in a new tab)"
                            >
                                Open an issue
                            </a>.
                        </div>
                        
                        <a
                            className={classes.linkToIrisPage}
                            target="_blank"
                            href="https://mr-kinako.github.io/Iris-page-by-Mr_Kinako/"
                            rel="noopener noreferrer"
                            aria-label="Iris Git Page (opens in a new tab)"
                            title="Iris Git Page (opens in a new tab)"
                        >
                            <p>Site for Iris</p>❤️
                        </a>
                    </div>
                </div>
                <div className={classes.profileFooter}>
                    <button
                        className={classes.btnMoreInfo}
                        onClick={handleVisible}
                        aria-expanded={cardVisible}
                        aria-label='More Info'
                    >
                        📄
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {shouldRender && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9, x: 0, y: 0 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <GlassCard
                            className={cn(
                                classes.cardContainer,
                                cardVisible ? classes.visible : classes.hidden
                            )}
                            onAnimationEnd={handleAnimationEnd}
                            isHoverable={true}
                        >
                            <div>
                                {currentData.map((section) => (
                                    <div key={section.key} className={classes.infoContainer}
                                    >
                                        <div className={classes.infoHeader}>
                                            <h2 className={classes.infoTitle}>
                                                {section.key}
                                            </h2>
                                            <button className={combinedClassesSwitchBtn}
                                                onClick={handleSwitch}
                                                aria-label={buttonTooltip}
                                                title={buttonTooltip}
                                            >
                                                {activeCategory === "Hardware-Info" ? 'next' : 'back'}
                                            </button>
                                        </div>

                                        <div className={classes.infoContent_Container}>
                                            {section.items.length > 0 ? (
                                                section.items.map((item, index) => (
                                                    <div key={index}
                                                        className={classes.item}
                                                    >
                                                        <span className={classes.label}>
                                                            {item.label}
                                                        </span>
                                                        <span className={classes.code}>
                                                            {item.value}
                                                        </span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>data is null...</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>

            </motion.div>
        </main>
    );
};
