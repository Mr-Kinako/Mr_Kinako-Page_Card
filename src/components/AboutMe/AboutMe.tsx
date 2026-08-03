import { useEffect, useState } from "react";
import s from "./AboutMe.module.scss";
import cn from "classnames";

interface AboutMeProps {
   isOpen: boolean;
}

export const AboutMe = ({ isOpen }: AboutMeProps) => {
   const [shouldRender, setShouldRender] = useState<boolean>(isOpen);
   const [isSpoiler, setIsSpoiler] = useState<boolean>(true);

   const InfoMap = {
      hello: "Я Мистер Кинако, или же просто Кинако.",
      names: "Ко мне также можно обращаться как к: Кино, Кина, Кинак, Лисёнок.",
      moreInfo:
         "В основном люблю играть в игры и смотреть ютуб. Ну и также слушать музыку, скорее даже обожаю. По жизни особо ничем не занимаюсь пока, только вот программированием интересуюсь немного, уже даже есть некоторое понимание в этом.",
      spoiler:
         "Кажется, я не отпущу одного человека. В конце концов, даже сейчас, иногда он делает меня довольно счастливым человеком, пусть и есть проблемы.",
   };

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
               <span>{InfoMap.hello}</span>
               <br />

               <span>{InfoMap.names}</span>
               <br />
               <br />

               <span>{InfoMap.moreInfo}</span>
               <br />
               <br />

               <div
                  className={`${s.spoiler} ${!isSpoiler ? s.visible : null}`}
                  onClick={handleSpoiler}
               >
                  <span
                     className={`${s.spoilerText} ${!isSpoiler ? s.visible : null}`}
                  >
                     {InfoMap.spoiler}
                  </span>
               </div>
            </div>
         </section>
      </>
   );
};
