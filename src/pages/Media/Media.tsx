import { useState } from "react";
import styles from "./Media.module.scss";
import { Footer } from "@/components/Footer";
import { Overlay } from "@/components/Overlay";

const imageModules = import.meta.glob<{ default: string }>(
   "@/assets/media/*.{jpg,jpeg,png,webp}",
   { eager: true },
);

const mediaList = Object.keys(imageModules).map((path, index) => ({
   id: index + 1,
   src: path.replace("/public", ""),
}));

export const Media = () => {
   const [activeSrc, setActiveSrc] = useState<string | null>(null);

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
                        onClick={() => setActiveSrc(item.src)}
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

            {/* Единый оверлей для полноэкранного просмотра */}
            <Overlay
               isOpen={Boolean(activeSrc)}
               onClose={() => setActiveSrc(null)}
               showCloseButton
            >
               {activeSrc && (
                  <img
                     src={activeSrc}
                     alt="Full size view"
                     decoding="async"
                     onClick={() => setActiveSrc(null)}
                     draggable={false}
                     className={styles.overlayImage}
                  />
               )}
            </Overlay>
         </main>

         <Footer />
      </>
   );
};
