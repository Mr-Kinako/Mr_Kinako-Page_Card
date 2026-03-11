import github_icon from '@/assets/github.png';
import styles from './GitLink.module.scss';

interface GitLinkProps {
  href: string;
  label?: string;      // Текст подсказки
  showText?: boolean;  // Показывать ли текстовый блок рядом
  className?: string;  // Для внешней стилизации (позиционирование)
}

const GitLink = ({ 
  href, 
  label = "This page's Git repository is public", 
  showText = true, 
  className 
}: GitLinkProps) => {
  return (
    <div className={`${styles.containerLinks} ${className || ''}`}>
      <a
        className={styles.linkGithub}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        draggable={false}
      >
        <img
          src={github_icon}
          title={label}
          aria-label='Github Repository'
          alt='Github Repository'
          draggable={false}
        />
      </a>

      {showText && (
        <div className={styles.gitTooltip}>
          <span className={styles.gitInfoText}>
            {label}
          </span>
        </div>
      )}
    </div>
  );
};

export default GitLink;