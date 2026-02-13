import styles from './Profile.module.scss';
// Пример локального импорта (если положишь картинку в src/assets)
import localAvatar from '@/assets/icon.jpg'; 

const Profile = () => {
  // Универсальная переменная для аватара
  // Сюда можно вставить: 
  // 1. Ссылку: "https://example.com/photo.jpg"
  // 2. Локальный путь: localAvatar
  // 3. null или "" для показа плейсхолдера
  const avatarSource: string | null = localAvatar;

  return (
    <header className={styles.profile}>
      <div className={styles.avatarWrapper}>
        {avatarSource ? (
          <img 
            src={avatarSource} 
            alt="Avatar" 
            className={styles.avatarImage} 
            // Обработка ошибки, если ссылка битая
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className={styles.placeholderAvatar}>氏K</div>
        )}
      </div>

      <div className={styles.info}>
        <h1 className={styles.nickname}>
          Mr Kinako
          <span className={`${styles.bracket} ${styles.bracket__one}`}>(</span>
          <span className={styles.jpText}>キナコ氏</span>
          <span className={`${styles.bracket} ${styles.bracket__two}`}>)</span>
        </h1>
        <p className={styles.description}>
          Какой-то тип снова делает свою страницу с помощью Vibe-Coding. 
          <span> Долбаёб одним словом короче.</span>
        </p>
        <div className={styles.systemInfo}>
          <span><b>Stack:</b> Vite + React + TypeScript + SCSS</span>
          <span className={styles.separator}>|</span>
          <span><b>Developers:</b> Mr_Kinako & AI (Gemini 3.0)</span>
        </div>
      </div>
    </header>
  );
};

export default Profile;