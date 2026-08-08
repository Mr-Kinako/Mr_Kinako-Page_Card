import { Fragment } from "react";
import { NavLink } from "react-router";
import cn from "classnames";
import s from "./NavContainer.module.scss";
import { isDev } from "@/tumblers";

const NAV_LINKS = [
   { to: "/goals", text: "Goals" },
   { to: "/", text: "Home", end: true },
   { to: "/media", text: "Media" },
];

export const NavContainer = () => {
   return (
      <nav className={cn(s.navigationContainer, { [s.notDev]: !isDev })}>
         <div className={s.navBubble}>
            {NAV_LINKS.map(({ to, text, end }, index) => (
               <Fragment key={to}>
                  {index > 0 && <span className={s.separator} />}

                  <NavLink
                     to={to}
                     end={end}
                     className={({ isActive }) =>
                        cn(s.link, { [s.active]: isActive })
                     }
                  >
                     {text}
                  </NavLink>
               </Fragment>
            ))}
         </div>
      </nav>
   );
};
