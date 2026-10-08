// src/pages/DiscordServers/Kinland/components/KinlandSidebar.tsx

import React from "react";
import { NavLink, useNavigate } from "react-router";
import { GiSplitCross } from "react-icons/gi";
import { useKinlandAuth } from "../../KinlandAuthContext";
import styles from "./KinlandSidebar.module.scss";

interface KinlandSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KinlandSidebar: React.FC<KinlandSidebarProps> = ({ isOpen, onClose }) => {
  const {
    user,
    isAuthenticated,
    isLoadingUser,
    // openAuthModal,
    // executeWithAuth,
    logout,
  } = useKinlandAuth();

  const navigate = useNavigate();

  // const handleAuthClick = (e: React.MouseEvent, path: string) => {
  //   e.preventDefault();
  //   executeWithAuth(() => navigate(path));
  // };

  return (
    <div className={styles.sidebarContainer}>
      <div
        className={`${styles.sidebarBackdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
      />

      <aside className={`${styles.rightSidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <header className={styles.sidebarHeader}>
          <h3>Навигация</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </header>

        <nav className={styles.sidebarSection}>
          <NavLink
            to="/kinland"
            end
            className={({ isActive }) => `${styles.sidebarItem} ${isActive ? styles.active : ""}`}
          >
            <span className={styles.itemIcon}>🏠</span>
            Главная
          </NavLink>

          {/* <NavLink
            to="/kinland/profile"
            end
            onClick={(e) => handleAuthClick(e, "/kinland/profile")}
            className={({ isActive }) => `${styles.sidebarItem} ${isActive ? styles.active : ""}`}
          >
            <span className={styles.itemIcon}>👥</span>
            Сообщество
          </NavLink>

          <NavLink
            to={user?.id ? `/kinland/profile/${user.id}` : "/kinland/profile"}
            end
            onClick={(e) => handleAuthClick(e, `/kinland/profile/${user?.id}`)}
            className={({ isActive }) => `${styles.sidebarItem} ${isActive ? styles.active : ""}`}
          >
            <span className={styles.itemIcon}>📜</span>
            Правила
          </NavLink> */}
        </nav>

        <div className={styles.sidebarDivider} style={{ opacity: 0 }} />

        <section className={styles.profileBlock} style={{ opacity: 0, userSelect: "none" }}>
          <h4 className={styles.profileBlockTitle}>Профиль</h4>

          {isLoadingUser ? (
            <div className={styles.profileCard} style={{ opacity: 0.6 }}>
              <span>Загрузка…</span>
            </div>
          ) : isAuthenticated && user ? (
            <article
              role="button"
              tabIndex={0}
              className={styles.profileCard}
              onClick={() => {
                onClose();
                navigate(`/kinland/profile/${user.id}`);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onClose();
                  navigate(`/kinland/profile/${user.id}`);
                }
              }}
            >
              <img src={user.avatarUrl} alt={user.username} className={styles.avatarImg} />
              <div className={styles.profileText}>
                <div className={styles.loginTitle}>{user.globalName || user.username}</div>
                <div className={styles.loginSubtitle}>@{user.username}</div>
              </div>

              <button
                className={styles.logoutBtn}
                title="Выйти"
                onClick={(e) => {
                  e.stopPropagation();
                  logout();
                }}
              >
                <GiSplitCross />
              </button>
            </article>
          ) : (
            <button
              className={styles.profileCard}
              // onClick={() => {
              //   onClose();
              //   openAuthModal();
              // }}
            >
              <span className={styles.avatarPlaceholder}>👤</span>

              <div className={styles.profileText}>
                <span className={styles.loginTitle}>Войти через Discord</span>
                <span className={styles.loginSubtitle}>Для доступа ко всем возможностям</span>
              </div>

              <span className={styles.arrowRight}>›</span>
            </button>
          )}
        </section>

        {/* <footer className={styles.sidebarFooter}>
          <button className={styles.themeToggleBtn}>
            <span className={styles.themeIcons}>☀ 🌙</span>
            <span>Тема</span>
            <span className={styles.arrowRight}>›</span>
          </button>
        </footer> */}
      </aside>
    </div>
  );
};
