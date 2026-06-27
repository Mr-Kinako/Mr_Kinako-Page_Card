import { useEffect, useState } from 'react';
import styles from './AboutMe.module.scss';
import cn from 'classnames';

interface AboutMeProps {
    isOpen: boolean;
}

export const AboutMe = ({
    isOpen
}: AboutMeProps) => {
    const [shouldRender, setShouldRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) setShouldRender(true);
    }, [isOpen]);

    const handleAnimationEnd = () => {
        if (!isOpen) setShouldRender(false);
    };

    if (!shouldRender) return null;

    return (
        <>
        <section className={cn(styles.aboutMe, {
            [styles.aboutMeOpen]: isOpen,
            [styles.aboutMeClose]: !isOpen
        })}
            onAnimationEnd={handleAnimationEnd}
        >
            <h2>Немного информации обо мне</h2>
            <p>
                Я Мистер Кинако, или же просто Кинако. <br />

                Ко мне также можно обращаться как к: Кино, Кина, Кинак, Лисёнок. <br />

                Мой возраст 16 на 170-180+- роста.<br /><br />

                <span style={{ color: "#15181870" }}>
                    Также я очень люблю своего Ириську, не смотря ни на что.. И я сдержу своё обещание, которое у нас было 💘
                </span> <br />

                Больше.. мне пока нечего рассказать тут, о себе.
            </p>
        </section>
        </>
    );
};
