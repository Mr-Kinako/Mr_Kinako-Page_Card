import { useState } from "react";
import cn from "classnames";
import styles from "./Media.module.scss";
import { isDev } from "@/tumblers";
import { Footer } from "@/components/Footer";

const imageModules = import.meta.glob<{ default: string }>(
   "@/assets/media/*.{jpg,jpeg,png,webp}",
   {
      eager: true,
   },
);

const mediaList = Object.keys(imageModules).map((path, index) => ({
   id: index + 1,
   src: path.replace("/public", ""),
}));

export const Media = () => {
   const [activeSrc, setActiveSrc] = useState<string | null>(null);
   const [isClosing, setIsClosing] = useState(false);
   const [isAnimating, setIsAnimating] = useState(false);

   const openOverlay = (src: string) => {
      if (isAnimating || activeSrc) return;

      setIsAnimating(true);
      setActiveSrc(src);
      setIsClosing(false);

      setTimeout(() => {
         setIsAnimating(false);
      }, 320);
   };
   const closeOverlay = () => {
      if (isAnimating || !activeSrc) return;

      setIsAnimating(true);
      setIsClosing(true);

      setTimeout(() => {
         setActiveSrc(null);
         setIsClosing(false);
         setIsAnimating(false);
      }, 320);
   };

   if (isDev)
      return (
         <>
            <main className={styles.mediaContainer}>
               <h2 className={styles.pageTitle}>Галерея Медиа</h2>

               <div className={styles.contentWindow}>
                  <div className={styles.masonryGrid}>
                     {mediaList.map((item) => (
                        <div
                           key={item.id}
                           className={styles.card}
                           onClick={() => openOverlay(item.src)}
                        >
                           <img
                              src={item.src}
                              alt={`Media asset ${item.id}`}
                              loading="lazy"
                              draggable={false}
                           />
                        </div>
                     ))}
                  </div>
               </div>

               {activeSrc && (
                  <div
                     className={cn(
                        styles.overlay,
                        isClosing ? styles.fadeOut : styles.fadeIn,
                     )}
                     onClick={closeOverlay}
                  >
                     <div
                        className={styles.overlayContent}
                        onClick={(e) => e.stopPropagation()}
                     >
                        <img
                           src={activeSrc}
                           alt="Full size view"
                           decoding="async"
                           onClick={closeOverlay}
                           draggable={false}
                        />

                        <button
                           className={styles.closeButton}
                           onClick={closeOverlay}
                        >
                           ×
                        </button>
                     </div>
                  </div>
               )}
            </main>

            <Footer />
         </>
      );
};
