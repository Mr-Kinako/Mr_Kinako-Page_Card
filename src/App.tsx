// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";

import { Home } from "@/pages/Home";
import { Media } from "./pages/Media";
import { Goals } from "./pages/Goals";
import { FoxyBoard } from "./pages/FoxyBoard";
import {
  Kinland,
  KinlandProfile,
  DiscordCallback,
  KinlandLayout,
} from "./pages/DiscordServers/Kinland";

import { NavContainer } from "./components/NavContainer";
import { Background } from "./components/Background";
import { CommandLine } from "./components/CommandLine";
import { LangSwitcher } from "./components/LangSwitcher";
import { isGoals, isConsole, isMedia, isFoxyBoard, isKinland } from "./tumblers";
import styles from "./App.module.scss";
import { KinlandAuthProvider } from "./pages/DiscordServers/Kinland/KinlandAuthContext";

const MainLayout = () => {
  return (
    <>
      <NavContainer />
      <LangSwitcher />

      <main className={styles.appContent}>
        <Outlet />
      </main>
    </>
  );
};

const KinlandMainLayout = () => {
  return (
    <main className={styles.appContent}>
      <Outlet />
    </main>
  );
};

function App() {
  return (
    <div className={styles.appWrapper}>
      <Background />
      <BrowserRouter>
        {isConsole && <CommandLine isTrue={isConsole} />}

        <Routes>
          <Route element={<MainLayout />}>
            {isGoals && <Route path="/goals" element={<Goals isTrue={isGoals} />} />}

            <Route path="/" element={<Home />} />

            <Route path="/foxyboard" element={<FoxyBoard isTrue={isFoxyBoard} />} />

            {isMedia && <Route path="/media" element={<Media isTrue={isMedia} />} />}
          </Route>

          <Route path="*" element={<Navigate to="/" />} />

          <Route element={<KinlandMainLayout />}>
            {isKinland && (
              <Route
                path="/kinland"
                element={
                  <KinlandAuthProvider>
                    <KinlandLayout />
                  </KinlandAuthProvider>
                }
              >
                <Route index element={<Kinland isTrue={isKinland} />} />

                {/* Поддержка обеих вариаций URI редиректа */}
                <Route path="auth/callback" element={<DiscordCallback />} />
                <Route path="callback" element={<DiscordCallback />} />

                {/* Роуты профиля */}
                <Route path="profile" element={<KinlandProfile />} />
                <Route path="profile/:id" element={<KinlandProfile />} />
              </Route>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
