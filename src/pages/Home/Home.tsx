import { AboutMe } from '@/components/AboutMe';
import { isDev, isProd, Tumblers } from '@/tumblers';
import { useState } from 'react';
import styles from './Home.module.scss';

export const Home = ({
  // isDev
}: Tumblers) => {
  const [isActiveAboutMe, setIsActiveAboutMe] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function toggleAboutMe() {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsActiveAboutMe(prev => !prev);

    setTimeout(() => {
      setIsAnimating(false);
    }, 420);
  }

  return (
    <main className={styles.home}>
      <section className={styles.heroSection}>
        <h1 className={styles.title}>
          Mr_Kinako
        </h1>
        
        <p className={styles.subtitle}>
          Добро пожаловать в моё личное пространство.
        </p>
      </section>

      {(isDev || isProd) && (
        <div className={styles.openAboutMe}>
          <button onClick={toggleAboutMe} disabled={isAnimating}>
            About Me
          </button>
        </div>
      )}

      <AboutMe isOpen={isActiveAboutMe} />
    </main>
  );
};
