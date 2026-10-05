import { Fragment } from "react";
import { NavLink } from "react-router";
import { useTranslation } from "@/i18n";
import cn from "classnames";
import s from "./NavContainer.module.scss";
import { isGoals, isMedia } from "@/tumblers";

export const NavContainer = () => {
  const { t } = useTranslation();

  const NAV_LINKS = [
    { to: "/goals", text: t("nav.goals"), isTrue: isGoals },
    { to: "/", text: t("nav.home"), isTrue: true, end: true },
    { to: "/foxyboard", text: t("nav.foxyboard"), isTrue: true },
    { to: "/media", text: t("nav.media"), isTrue: isMedia },
  ].filter((link) => link.isTrue);

  return (
    <nav className={cn(s.navigationContainer)}>
      <div className={s.navBubble}>
        {NAV_LINKS.map(({ to, text, end }, index) => (
          <Fragment key={to}>
            {index > 0 && <span className={s.separator} />}

            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(s.link, {
                  [s.active]: isActive,
                })
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
