// src/pages/DiscordServers/Kinland/components/KinlandAuthModal.tsx

import React from "react";
import { openDiscordLogin } from "../../api/discordAuth";
import { useKinlandAuth } from "../../KinlandAuthContext";
import { KINLAND_ASSETS } from "../assets";
import styles from "./KinlandAuthModal.module.scss";

export const KinlandAuthModal: React.FC = () => {
  const { isAuthenticated, isAuthOverlayOpen, closeAuthModal } = useKinlandAuth();

  if (isAuthenticated || !isAuthOverlayOpen) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={closeAuthModal}>
      <div className={styles.authModal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseX} onClick={closeAuthModal}>
          ✕
        </button>

        <div className={styles.discordModalLogo}>{KINLAND_ASSETS.discordIcon}</div>

        <h2 className={styles.modalTitle}>Войдите через Discord</h2>
        <p className={styles.modalDescription}>
          Чтобы получить доступ ко всем возможностям Kinland, войдите через свой Discord-аккаунт.
        </p>

        <button className={styles.discordSubmitBtn} onClick={openDiscordLogin}>
          {KINLAND_ASSETS.discordIcon}
          <span>Войти через Discord</span>
        </button>

        <button className={styles.cancelTextBtn} onClick={closeAuthModal}>
          Отмена
        </button>
      </div>
    </div>
  );
};
