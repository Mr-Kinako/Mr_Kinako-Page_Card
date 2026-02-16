import { Link, useNavigate, useParams } from 'react-router-dom';
import { DETAILED_LISTS } from '@/constants/docs';
import { normalizePath } from '@/utils/pathUtils';
import TerminalHeader from '@/components/TerminalHeader/TerminalHeader';
import styles from './Lists.module.scss';

const ListsCatalog = () => {
  const { serverId } = useParams();
  const navigate = useNavigate();

  const basePath = normalizePath(serverId ? `/${serverId}/lists` : '/lists');

  const handleExit = () => {
    navigate(serverId ? normalizePath(`/${serverId}`) : '/system/halt');
  };

  return (
    <div className={styles.rulesPage}>
      <TerminalHeader 
        basePath={basePath}
        currentDir=''
        availableDirs={Object.keys(DETAILED_LISTS)}
        onExit={handleExit}
        exitLabel={serverId ? "SERVER_ROOT" : "EXIT"}
      />
      <h1 className={styles.title}>Технические списки</h1>
      <div className={styles.grid}>
        {Object.entries(DETAILED_LISTS).map(([key, list]) => (
          <Link 
            key={key} 
            to={normalizePath(`${basePath}/${key}`)} 
            className={styles.ruleCard} 
            style={{ textDecoration: 'none' }}
          >
            <div className={styles.ruleHeader}>
              <span className={styles.id}>FILE</span>
              <h3>{list.title}</h3>
            </div>
            <p className={styles.description}>Открыть содержание...</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListsCatalog;