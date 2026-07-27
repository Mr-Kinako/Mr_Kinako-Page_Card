import { useEffect, useState } from "react";
import s from "./AboutMe.module.scss";
import cn from "classnames";

interface AboutMeProps {
   isOpen: boolean;
}

export const AboutMe = ({ isOpen }: AboutMeProps) => {
   const [shouldRender, setShouldRender] = useState<boolean>(isOpen);
   const [isSpoiler, setIsSpoiler] = useState<boolean>(true);

   useEffect(() => {
      if (isOpen) setShouldRender(true);
   }, [isOpen]);

   const handleAnimationEnd = () => {
      if (!isOpen) setShouldRender(false);
   };

   if (!shouldRender) return null;

   const handleSpoiler = () => {
      if (isSpoiler) setIsSpoiler((prev) => !prev);
   };

   return (
      <>
         <section
            className={cn(s.aboutMe, {
               [s.aboutMeOpen]: isOpen,
               [s.aboutMeClose]: !isOpen,
            })}
            onAnimationEnd={handleAnimationEnd}
         >
            <h2 className={s.aboutMe_header}>Немного информации обо мне</h2>

            <div className={s.aboutMe_contentContainer}>
               <span>Я Мистер Кинако, или же просто Кинако.</span>
               <br />

               <span>
                  Ко мне также можно обращаться как к: Кино, Кина, Кинак,
                  Лисёнок.
               </span>
               <br />
               <br />

               <span>
                  В основном люблю играть в игры и смотреть ютуб. Ну и также
                  слушать музыку, скорее даже обожаю. По жизни особо ничем не
                  занимаюсь пока, только вот программированием интересуюсь
                  немного, уже даже есть некоторое понимание в этом.
               </span>
               <br />
               <br />

               <div
                  className={`${s.spoiler} ${!isSpoiler ? s.visible : null}`}
                  onClick={handleSpoiler}
               >
                  <span
                     className={`${s.spoilerText} ${!isSpoiler ? s.visible : null}`}
                  >
                     Кажется, я не отпущу одного человека. В конце концов, даже
                     сейчас, иногда он делает меня довольно счастливым
                     человеком, пусть и есть проблемы.
                  </span>
               </div>
            </div>
         </section>
      </>
   );
};
