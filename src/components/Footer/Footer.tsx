import styles from "./Footer.module.scss";

const years: string = `${new Date().getFullYear()}`;
const ownerNickname: string = "Mr_Kinako";

export const Footer = () => {
   const githubLink: string =
      "https://github.com/Mr-Kinako/Mr_Kinako-Page_Card";
   const githubText: string = "Исходный код";
   const rel: string = "noreferrer";

   return (
      <footer className={styles.footer}>
         <p>
            &copy; {years} {ownerNickname}
         </p>

         <p>
            Лицензия MIT •{" "}
            <a
               className={styles.sourceCode}
               href={githubLink}
               target="_blank"
               rel={rel}
            >
               {githubText}
            </a>
         </p>
      </footer>
   );
};
