// src/pages/DiscordServers/Kinland/Kinland.tsx

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { KINLAND_ASSETS } from "./components/assets";
import styles from "./Kinland.module.scss";

export const Kinland = ({ isTrue }: { isTrue: boolean }) => {
  useDocumentTitle("Kinland |> Главная");

  if (!isTrue) {
    return null;
  }

  return (
    <div className={styles.heroContainer}>
      {/* Левая текстовая часть */}
      <section className={styles.heroContent}>
        <img src={KINLAND_ASSETS.title} className={styles.heroTitle} alt="KINLAND" />
        <p className={styles.heroDescription}>
          Городок, что будет строиться при помощи общих усилий участников и администрации 🐾
        </p>

        <a
          href="https://discord.gg/XUFMbkg9vT"
          className={styles.heroPrimaryBtn}
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="strict-origin-when-cross-origin"
        >
          {KINLAND_ASSETS.discordIcon}
          <span>Присоединиться к серверу</span>
          <span className={styles.btnArrow}>›</span>
        </a>
      </section>
    </div>
  );
};
