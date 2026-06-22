import type { ReactNode, HTMLAttributes } from "react";
import classes from './GlassCard.module.scss';

interface GlassCardInterfaceProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
    isHoverable?: boolean;
}

export const GlassCard = ({
    className,
    children,
    isHoverable,
    ...props
}: GlassCardInterfaceProps) => {
    const combinedClasses = [
        classes.baseClass,
        isHoverable ? classes.hover_effect : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div
            className={combinedClasses}
            {...props}
        >
            {children}  
        </div>
    );
};
