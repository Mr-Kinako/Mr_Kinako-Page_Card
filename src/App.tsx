import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { Home } from "@/pages/Home";
import { NavContainer } from "./components/NavContainer";
import { Media } from "./pages/Media";
import { Goals } from "./pages/Goals";
import { Background } from "./components/Background";
import { CommandLine } from "./components/CommandLine";
import { LangSwitcher } from "./components/LangSwitcher";
import { isGoals, isConsole, isMedia } from "./tumblers";
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
        {isConsole && <CommandLine isTrue={isConsole} /> }

        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            {isMedia && <Route path="/media" element={<Media isTrue={isMedia} />} /> }

            {isGoals && <Route path="/goals" element={<Goals isTrue={isGoals} />} /> }
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;