import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                &copy; {new Date().getFullYear()} Mr_Kinako
            </p>
            <p>Лицензия MIT • {" "}
                <a className={styles.sourceCode}
                    href="https://github.com/Mr-Kinako/Mr_Kinako-Page_Card"
                    target="_blank"
                    rel="noreferrer"
                >
                    Исходный код
                </a>
            </p>
      </footer>
    );
};
