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
        <section className={cn(styles.aboutMe, {
            [styles.aboutMeOpen]: isOpen,
            [styles.aboutMeClose]: !isOpen
        })}
            onAnimationEnd={handleAnimationEnd}
        >
            <h2>Немного информации обо мне</h2>
            <p>
                Я Мистер Кинако, или же просто Кинако. <br />

                Ко мне также можно обращаться как к: Кино, Кина, Кинак, Лисёнок. <br /><br />

                Мой возраст 16 на 170-180+- роста, и я мужского пола.<br />

                Я имею хорошего для себя друга, которому пообещал, навсегда быть с ним рядом.. <span style={
                    {
                        color: "rgba(42, 49, 49, 0.45)"
                    }
                }>
                    (а также, я до сих пор очень люблю своего Ириську..💘).
                </span> <br />

                Больше.. мне пока нечего рассказать тут, о себе.
            </p>
        </section>
    );
};
