// src/pages/TempFreeze/TempFreeze.tsx

import React, { useState, useEffect } from 'react';
import { githubLink } from "@/shared/constants";
import styles from './TempFreeze.module.scss';

export const TempFreeze: React.FC = () => {
  const [contrastMode, setContrastMode] = useState<'low' | 'high'>(() => {
    try {
      return (localStorage.getItem('temp-freeze-contrast') as 'low' | 'high') || 'low';
    } catch {
      return 'low';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('temp-freeze-contrast', contrastMode);
    } catch {
      // Ignore storage errors (e.g. strict privacy mode)
    }
  }, [contrastMode]);

  const toggleContrast = () => {
    setContrastMode((prev) => (prev === 'low' ? 'high' : 'low'));
  };

  return (
    <main className={styles.page} data-contrast={contrastMode}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            Status: Frozen
          </div>
          <button
            type="button"
            className={styles.contrastBtn}
            onClick={toggleContrast}
            aria-pressed={contrastMode === 'high'}
          >
            Contrast: {contrastMode === 'high' ? 'High' : 'Low'}
          </button>
        </header>

        <section className={styles.content}>
          <h1 className={styles.title}>This is a temporary freeze page.</h1>
          <p className={styles.description}>
            The personal website is currently on hold due to upcoming global changes.
            Everything is being rebuilt from the ground up.
          </p>

          <footer style={{ color: "color-mix(in srgb, var(--text-secondary) 42%, #00000000)" }}>
            <code style={{ backgroundColor: "color-mix(in srgb, var(--text-secondary) 6%, rgb(255, 170, 248) 4%, #00000000)" }}>/kinland</code> {" "}
            <span>is currently active.</span>
          </footer>
        </section>

        <footer className={styles.footer}>
          <span className={styles.copyright}>&copy; 2026</span>
          <a
            href={githubLink}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </footer>
      </div>
    </main>
  );
};
