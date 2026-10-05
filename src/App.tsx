// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";

import { Home } from "@/pages/Home";
import { Media } from "./pages/Media";
import { Goals } from "./pages/Goals";
import { FoxyBoard } from "./pages/FoxyBoard";

import { NavContainer } from "./components/NavContainer";
import { Background } from "./components/Background";
import { CommandLine } from "./components/CommandLine";
import { LangSwitcher } from "./components/LangSwitcher";
import { isGoals, isConsole, isMedia, isFoxyBoard } from "./tumblers";
import styles from "./App.module.scss";

const MainLayout = () => {
  return (
    <>
      <NavContainer />
      <LangSwitcher />
      <Outlet />
    </>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
