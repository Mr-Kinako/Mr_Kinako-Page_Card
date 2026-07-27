import type { ReactNode } from "react";
import s from "./CardContainer.module.scss";

interface CardProps {
   children: ReactNode;
   customClass?: string;
}

export const CardContainer = ({ children, customClass }: CardProps) => {
   return <div className={`${s.cardContainer} ${customClass}`}>{children}</div>;
};
