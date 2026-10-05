// src/pages/FoxyBoard/FoxyBoard.tsx
import { Footer } from "@/components/Footer/Footer";
import styles from "./FoxyBoard.module.scss";

const pageTitle = "FoxyBoard";

export const FoxyBoard = ({ isTrue }: { isTrue: boolean }) => {
  if (!isTrue) {
    return null;
  }

  return (
    <>
      <main className={styles.foxyBoard}>
        <h1 className={styles.title}>{pageTitle}</h1>

        <div className={styles.foxyBoardGrid}>
          <div className={styles.technicalInfoContainer}>
            <div className={styles.hardwareContainer}>
              <h2 className={`${styles.hardwareTitle} ${styles.boardTitles}`}>Hardware</h2>

              <ul className={`${styles.hardwareList} ${styles.boardLists}`} style={{ listStyleType: "none" }}>
                <li className={`${styles.hardwareItem} ${styles.boardItems}`}>
                  <strong>Monitor:</strong> <code>23.8" DEXP DF24N1</code>
                </li>

                <li className={`${styles.hardwareItem} ${styles.boardItems}`}>
                  <strong>Case:</strong> <code>ATX Cryptone-Y</code>
                </li>

                <li className={`${styles.hardwareItem} ${styles.boardItems}`}>
                  <strong>PSU:</strong> <code>Cougar VTE600</code>
                </li>

                <li className={`${styles.hardwareItem} ${styles.boardItems}`}>
                  <strong>Motherboard:</strong> <code>ASRock B550 Phantom Gaming 4</code>
                </li>

                <li className={`${styles.hardwareItem} ${styles.boardItems}`}>
                  <strong>CPU:</strong> <code>AMD Ryzen 5 5600</code>
                </li>

                <li className={`${styles.hardwareItem} ${styles.boardItems}`}>
                  <strong>Cooler:</strong> <code>ID-COOLING SE-206-XT ARGB</code>
                </li>

                <li className={`${styles.hardwareItem} ${styles.boardItems}`}>
                  <strong>RAM:</strong> <code>ADATA XPG SPECTRIX D41 32 GB</code>
                </li>

                <li className={`${styles.hardwareItem} ${styles.boardItems}`}>
                  <strong>Graphics card:</strong> <code>GeForce RTX 4060 CYCLONE OC</code>
                </li>

                <li className={`${styles.hardwareItem} ${styles.boardItems}`}>
                  <strong>Memories:</strong> <br />
                  <code>ADATA SU650 SSD 512 GB;</code> <br />
                  <code>ADATA SU650 SSD 240 GB</code>
                </li>

                <li className={`${styles.hardwareItem} ${styles.boardItems}`}>
                  <strong>OS:</strong> <code>Windows 11 Pro</code>
                </li>
              </ul>
            </div>

            <div className={styles.perepheralsContainer}>
              <h2 className={`${styles.perepheralsTitle} ${styles.boardTitles}`}>Perepherals</h2>

              <div className={styles.perepherals}>
                <ul className={`${styles.perepheralsList} ${styles.boardLists}`} style={{ listStyleType: "none" }}>
                  <li className={`${styles.perepheralsItem} ${styles.boardItems}`}>
                    <strong>Headphones:</strong> <code>ARDOR GAMING Edge</code>
                  </li>

                  <li className={`${styles.perepheralsItem} ${styles.boardItems}`}>
                    <strong>Microphone:</strong> <code>Fifine AmpliGame A8</code>
                  </li>

                  <li className={`${styles.perepheralsItem} ${styles.boardItems}`}>
                    <strong>Speakers:</strong> <code>None</code>
                  </li>

                  <li className={`${styles.perepheralsItem} ${styles.boardItems}`}>
                    <strong>Keyboard:</strong> <code>ARDOR GAMING Pathfinder</code>
                  </li>

                  <li className={`${styles.perepheralsItem} ${styles.boardItems}`}>
                    <strong>Mouse:</strong> <code>Logitech G102 LIGHTSYNC</code>
                  </li>

                  <li className={`${styles.perepheralsItem} ${styles.boardItems}`}>
                    <strong>Mouse pad:</strong> <code>DEXP GM-XL Black Speed</code>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.gamesContainer}>
            <h2 className={`${styles.gamesTitle} ${styles.boardTitles}`}>Current Games</h2>

            <div className={styles.gamesContent}>
              <ul className={`${styles.gamesList} ${styles.boardLists}`} style={{ listStyleType: "none" }}>
                <li className={`${styles.gamesItem} ${styles.boardItems}`}>
                  Rain World
                </li>

                <li className={`${styles.gamesItem} ${styles.boardItems}`}>
                  Osu! Lazer
                </li>

                <li className={`${styles.gamesItem} ${styles.boardItems}`}>
                  Casualties: Unknown
                </li>

                <li className={`${styles.gamesItem} ${styles.boardItems}`}>
                  Counter-Strike 2
                </li>

                <li className={`${styles.gamesItem} ${styles.boardItems}`}>
                  VR Chat
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
