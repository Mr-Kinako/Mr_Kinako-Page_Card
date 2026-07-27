import { NavLink } from "react-router";
import cn from "classnames";
import s from "./NavContainer.module.scss";
import { isDev } from "@/tumblers";

export const NavContainer = () => {
   return (
      <nav className={s.navigationContainer}>
         <div className={s.navBubble}>
            <NavLink
               to="/"
               end
               className={({ isActive }) =>
                  cn(s.link, {
                     [s.active]: isActive,
                  })
               }
            >
               Home
            </NavLink>

            <span className={cn(s.separator, isDev ? null : s.notDev)}></span>

            <NavLink
               to="/media"
               className={({ isActive }) =>
                  cn(
                     s.link,
                     {
                        [s.active]: isActive,
                     },
                     isDev ? null : s.notDev,
                  )
               }
            >
               Media
            </NavLink>
         </div>
      </nav>
   );
};
