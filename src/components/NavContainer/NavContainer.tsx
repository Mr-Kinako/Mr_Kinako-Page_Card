import { NavLink } from "react-router";
import cn from "classnames";
import s from "./NavContainer.module.scss";
import { isDev } from "@/tumblers";

export const NavContainer = () => {
   const isNotDev = isDev ? null : s.notDev;
   const LinksMap = {
      0: {
         to: "/",
         end: true,
         text: "Home",
      },
      1: {
         to: "/media",
         end: false,
         text: "Media",
      },
   };

   return (
      <nav className={s.navigationContainer}>
         <div className={s.navBubble}>
            <NavLink
               to={LinksMap[0].to}
               end={LinksMap[0].end}
               className={({ isActive }) =>
                  cn(s.link, {
                     [s.active]: isActive,
                  })
               }
            >
               {LinksMap[0].text}
            </NavLink>

            <span className={cn(s.separator, isNotDev)}></span>

            <NavLink
               to={LinksMap[1].to}
               end={LinksMap[1].end}
               className={({ isActive }) =>
                  cn(
                     s.link,
                     {
                        [s.active]: isActive,
                     },
                     isNotDev,
                  )
               }
            >
               {LinksMap[1].text}
            </NavLink>
         </div>
      </nav>
   );
};
