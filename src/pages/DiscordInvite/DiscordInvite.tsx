import { useState, useEffect } from 'react';
import GitLink from '@comp/GitLink/GitLink';
import styles from './DiscordInvite.module.scss';

interface DiscordWidgetData {
  name: string;
  instant_invite: string;
  presence_count: number;
}

// 1. Ручные данные (Fallback)
const MANUAL_DATA = {
  name: "МойФурриСервер [МФС]",
  description: "мили фурри фембой сервер, мяу <3",
  inviteLink: "https://discord.gg/WqZHBH3zdj",
  totalMembers: "1.920",
  membersFallback: "Active Community",
  platform: "Discord"
};

const SERVER_ID = '1224205787975520276';

const DiscordInvite = () => {
  const [serverData, setServerData] = useState<DiscordWidgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApiError, setIsApiError] = useState(false);
  const hrefGithub = 'https://github.com/Mr-Kinako/Mr_Kinako-Personal-Page'

  useEffect(() => {
    fetch(`https://discord.com/api/guilds/${SERVER_ID}/widget.json`)
      .then(res => {
        if (!res.ok) throw new Error('Widget disabled or not found');
        return res.json();
      })
      .then(data => {
        if (!data.name) throw new Error('Incomplete data');
        setServerData(data);
      })
      .catch(err => {
        console.warn("Using manual fallback data:", err.message);
        setIsApiError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.wrapper}><div className={styles.loader}>Loading...</div></div>;

  const displayName = serverData?.name || MANUAL_DATA.name;
  const displayInvite = serverData?.instant_invite || MANUAL_DATA.inviteLink;
  const displayOnline = serverData?.presence_count;
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.statusBadge}>
            {/* Добавлен класс .idle для желтого цвета при ошибке API */}
            <span className={`${styles.dot} ${isApiError ? styles.idle : ''}`}></span>
            {displayOnline !== undefined ? `${displayOnline} Online` : MANUAL_DATA.membersFallback}
          </div>
          <h1 className={styles.title}>{displayName}</h1>
        </header>

        <main className={styles.info}>
          <p className={styles.description}>{MANUAL_DATA.description}</p>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Members</span>
              <span className={styles.statValue}>{MANUAL_DATA.totalMembers} 
                <p className={styles.totalMembers__actuallyStatus}>(static data)</p>
              </span>
            </div>
            
            <div className={styles.divider} />
            
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Source</span>
              <span className={styles.statValue}>{isApiError ? 'Static' : 'Live Data'}</span>
            </div>
            
            <div className={styles.divider} />

            <div className={styles.statItem}>
              <span className={styles.statLabel}>Platform</span>
              <span className={styles.statValue}>{MANUAL_DATA.platform}</span>
            </div>
          </div>

          {/* Вводная информация / Почему стоит зайти */}
          <div className={styles.extraInfo}>
             <h3>О сервере</h3>
             <ul>
               <li>Простой в своей сути сервер</li>
             </ul>
          </div>
        </main>

        <footer className={styles.footer}>
          <a 
            href={displayInvite} 
            target="_blank" 
            rel="noreferrer" 
            className={styles.joinButton}
          >
            Join Community
            <span className={styles.arrow}>→</span>
          </a>
          <GitLink
            href={hrefGithub}
            label='Page Mr_Kinako is open-source'
            className={styles.inviteGitPos}
          />
        </footer>
      </div>
    </div>
  );
};

export default DiscordInvite;