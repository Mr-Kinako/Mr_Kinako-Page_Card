// src/pages/DiscordServers/Kinland/components/KinlandHeader.tsx

import React from "react";
import { NavLink, useNavigate } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  // FaBell,
  FaMagnifyingGlass,
} from "react-icons/fa6";
// import { useKinlandAuth } from '../../KinlandAuthContext';
import { KINLAND_ASSETS } from "../assets";
import styles from "./KinlandHeader.module.scss";

interface KinlandHeaderProps {
  onToggleMenu: () => void;
}

export const KinlandHeader: React.FC<KinlandHeaderProps> = ({ onToggleMenu }) => {
  // const {
  //   user,
  //   executeWithAuth
  // } = useKinlandAuth();
  const navigate = useNavigate();

  // const handleAuthClick = (e: React.MouseEvent, path: string) => {
  //   e.preventDefault();
  //   executeWithAuth(() => navigate(path));
  // };

  return (
    <header className={styles.topHeader}>
      <div className={styles.headerLeft}>
        <div className={styles.brandLogo} onClick={() => navigate("/kinland")}>
          <img src={KINLAND_ASSETS.logo} alt="Logo" className={styles.logoImg} />
          {/* <img src={KINLAND_ASSETS.title} alt="Title" className={styles.brandTitle} /> */}
        </div>

        <nav className={styles.topNav}>
          <NavLink
            to="/kinland"
            end
            className={({ isActive }) => `${styles.topNavLink} ${isActive ? styles.active : ""}`}
          >
            Главная
          </NavLink>

          {/* <NavLink
            to="/kinland/profile"
            end
            onClick={(e) => handleAuthClick(e, "/kinland/profile")}
            className={({ isActive }) => `${styles.topNavLink} ${isActive ? styles.active : ""}`}
          >
            Сообщество
          </NavLink>

          <NavLink
            to={user?.id ? `/kinland/profile/${user.id}` : "/kinland/profile"}
            end
            onClick={(e) => handleAuthClick(e, `/kinland/profile/${user?.id}`)}
            className={({ isActive }) => `${styles.topNavLink} ${isActive ? styles.active : ""}`}
          >
            Правила
          </NavLink> */}
        </nav>
      </div>

      <div className={styles.headerRight}>
        <button
          className={styles.iconBtn}
          title="В данный момент является заглушкой"
          aria-label="Поиск"
        >
          <FaMagnifyingGlass />
        </button>

        {/* <button className={styles.iconBtn} title="В данный момент является заглушкой" aria-label="Уведомления">
          <FaBell />
        </button> */}

        <button className={styles.iconBtn} onClick={onToggleMenu} aria-label="Меню">
          <GiHamburgerMenu />
        </button>
      </div>
    </header>
  );
};
