import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DETAILED_LISTS } from '@/constants/docs';
import { normalizePath } from '@/utils/pathUtils';
import TerminalHeader from '@/components/TerminalHeader/TerminalHeader';
import styles from './Lists.module.scss';

const ListView = () => {
  const { listId, serverId } = useParams();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const list = listId ? DETAILED_LISTS[listId] : null;
  const parentPath = normalizePath(serverId ? `/${serverId}/lists/catalog` : '/lists/catalog');

  if (!list) return <div className={styles.error}>Error: System list not found.</div>;

  return (
    <div className={styles.listView}>
      <TerminalHeader 
        basePath={parentPath}
        currentDir={listId!}
        availableDirs={Object.keys(DETAILED_LISTS)}
        onExit={() => navigate(parentPath)} 
        exitLabel="BACK"
      />
      <h1 className={styles.title}>{list.title}</h1>
      <ul className={styles.list}>
        {list.items.map((item, index) => (
          <li 
            key={index} 
            className={`${styles.item} ${selectedIndex === index ? styles.selectedItem : ''}`}
            onClick={() => setSelectedIndex(index)}
          >
            <span className={styles.marker}>//</span> {item}
          </li>
        ))}
      </ul>
      {list.note && (
        <div className={styles.noteContainer}>
          <span className={styles.noteLabel}>NOTE:</span>
          <p className={styles.note}>{list.note}</p>
        </div>
      )}
    </div>
  );
};

export default ListView;