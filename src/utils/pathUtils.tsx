import { Link } from 'react-router-dom';
import styles from '@pages/Rules/Rules.module.scss';

/**
 * Очищает путь: убирает дубли слешей и слеш в конце.
 */
export const normalizePath = (path: string): string => {
  const clean = path.replace(/\/+/g, '/').replace(/\/$/, '');
  return clean.startsWith('/') ? clean : `/${clean}`;
};

/**
 * Хелпер для парсинга ссылок [текст](ссылка)
 */
export const renderDescription = (text: string) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      const [, label, url] = match;
      const isExternal = url.startsWith('http');
      
      if (isExternal) {
        return (
          <a key={index} href={url} target="_blank" rel="noreferrer" className={styles.inlineLink}>
            {label}
          </a>
        );
      }
      return (
        <Link key={index} to={url} className={styles.inlineLink}>
          {label}
        </Link>
      );
    }
    return part;
  });
};