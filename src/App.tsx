import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { Home } from "@/pages/Home";
import { NavContainer } from "./components/NavContainer";
import { Footer } from "./components/Footer";
import { Media } from "./pages/Media";
import styles from "./App.module.scss";
import { Goals } from "./pages/Goals";
import { isDev } from "./tumblers";

const MainLayout = ({
   isGlobalFooter = false,
}: {
   isGlobalFooter?: boolean;
}) => {
   return (
      <>
         <NavContainer />

         <Outlet />

         {isGlobalFooter && <Footer />}
      </>
   );
};
const GoalsLayout = ({
   isGlobalFooter = false,
}: {
   isGlobalFooter?: boolean;
}) => {
   return (
      <>
         <Outlet />

         {isGlobalFooter && <Footer />}
      </>
   );
};

function App() {
   return (
      <div className={styles.appWrapper}>
         <BrowserRouter>
            <Routes>
               <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />

                  {isDev && <Route path="/media" element={<Media />} />}
               </Route>

               <Route element={<GoalsLayout />}>
                  <Route path="/goals" element={<Goals />} />
               </Route>

               <Route path="*" element={<Navigate to="/" />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
