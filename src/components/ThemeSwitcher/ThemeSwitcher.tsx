import { useState, useEffect } from "react";
import classes from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    return (
        <button onClick={toggleTheme}
            className={classes.btnThemeSwitcher}>
            Switch Theme
        </button>
    );
};
