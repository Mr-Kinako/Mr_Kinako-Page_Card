import { useState, useMemo } from 'react';
import Profile from '@comp/Profile';
import Tabs from '@comp/Tabs';
import GitLink from '@comp/GitLink/GitLink';
import { TABS_DATA } from '@constants/content';
import type { TabType, HardwareItem, GameItem, MediaItem, MediaType } from '@/constants/content';
import styles from './Home.module.scss';

const Home = () => {
  const [activeTab, setActiveTab] = useState<TabType>('PC-Hardware');
  const [activeMediaFilter, setActiveMediaFilter] = useState<MediaType>('Video');
  
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const hrefGithub = 'https://github.com/Mr-Kinako/Mr_Kinako-Personal-Page'

  const filteredMedia = useMemo(() => {
    return TABS_DATA.MEDIA.filter(item => item.type === activeMediaFilter);
  }, [activeMediaFilter]);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className={styles.home} onMouseMove={handleMouseMove}>
      <Profile />
      <GitLink
        href={hrefGithub}
        className={styles.homeGitPos}
      />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <section className={styles.content}>
        {activeTab === 'Media' && (
          <div className={styles.mediaFilters}>
            {(['Music', 'Video'] as MediaType[]).map(f => (
              <button 
                key={`filter-${f}`}
                className={activeMediaFilter === f ? styles.activeFilter : ''}
                onClick={() => setActiveMediaFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        <div className={styles.scrollContainer}>
          <div className={styles.grid}>
            {/* Используем HardwareItem */}
            {activeTab === 'PC-Hardware' && TABS_DATA.HARDWARE.map((item: HardwareItem) => (
              <div key={`hw-${item.label}`} className={styles.item}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </div>
            ))}
            
            {/* Используем GameItem */}
            {activeTab === 'P-Games' && TABS_DATA.GAMES.map((game: GameItem) => (
              <div key={`game-${game.name}`} className={styles.item}>
                <span className={styles.label}>{game.name}</span>
                <span className={styles.value}>{game.status}</span>
              </div>
            ))}

            {/* Используем MediaItem */}
            {activeTab === 'Media' && filteredMedia.map((media: MediaItem) => (
              <a 
                key={`media-${media.title}`} 
                href={media.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.item} ${styles.mediaLink}`}
                onMouseEnter={() => {
                  if (media.type === 'Video') setHoveredVideo(getYoutubeId(media.link));
                }}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <div className={styles.mediaInfo}>
                  <span className={styles.value}>{media.title}</span>
                  {media.author && (
                    <span className={styles.author}>{media.author}</span>
                  )}
                </div>
                <span className={styles.label}>{media.type} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {hoveredVideo && (
        <div 
          className={styles.videoPreview}
          style={{ 
            left: `${mousePos.x + 20}px`, 
            top: `${mousePos.y + 20}px` 
          }}
        >
          <img 
            src={`https://img.youtube.com/vi/${hoveredVideo}/mqdefault.jpg`} 
            alt="Preview" 
          />
          <div className={styles.previewOverlay}>PLAY ON YOUTUBE</div>
        </div>
      )}
    </div>
  );
};

export default Home;