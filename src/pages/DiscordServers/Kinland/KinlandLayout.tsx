// src/pages/DiscordServers/Kinland/KinlandLayout.tsx

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { KinlandHeader, KinlandSidebar, KinlandAuthModal } from "./components";
import styles from "./Kinland.module.scss";

export const KinlandLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Игнорируем сочетание, если пользователь находится в текстовом поле или модалке ввода
      const target = event.target as HTMLElement;
      const isInputActive =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable;

      if (isInputActive) return;

      // event.code === "KeyX" отлавливает физическую клавишу X вне зависимости от языка (RU/EN)
      if (event.shiftKey && event.code === "KeyX") {
        event.preventDefault();
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className={styles.appShell}>
      <div className={styles.background}></div>

      <div className={styles.mainLayout}>
        <KinlandHeader onToggleMenu={() => setIsMenuOpen((prev) => !prev)} />

        <main className={styles.mainContent}>
          <Outlet />
        </main>

        <footer className={styles.footer}
          style={{ opacity: 1 }}
        >
          <span>&copy; 2026 Kinland. Все права защищены.</span> <br />
          <span>Для юзеров с главной странице существует: <code style={{ backgroundColor: "rgba(29, 29, 33, 0.1)", fontWeight: 600, opacity: 0.6 }}>CTRL + X</code></span>
        </footer>
      </div>

      <KinlandSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <KinlandAuthModal />
    </div>
  );
};
