import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { Home } from "@/pages/Home";
import { NavContainer } from "./components/NavContainer";
import { Media } from "./pages/Media";
import styles from "./App.module.scss";
import { Goals } from "./pages/Goals";
import { isDev } from "./tumblers";
import { CustomCursor } from "./CustomCursor";
import { Background } from "./components/Background";
import { CommandLine } from "./components/CommandLine";

const MainLayout = () => {
   return (
      <>
         <NavContainer />
         <Outlet />
      </>
   );
};

function App() {
   return (
      <div className={styles.appWrapper}>
         <CustomCursor />
         <Background />
         <BrowserRouter>
            <CommandLine />
            <Routes>
               <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />

                  <Route path="/media" element={<Media />} />

                  <Route path="/goals" element={<Goals />} />
               </Route>

               <Route path="*" element={<Navigate to="/" />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
