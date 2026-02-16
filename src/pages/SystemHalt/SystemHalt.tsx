import { useParams, Link } from 'react-router-dom';
import styles from './SystemHalt.module.scss';

const SystemHalt = () => {
  const { serverId } = useParams();
  const hostName = serverId || 'system-core';

  return (
    <div className={styles.haltPage}>
      <div className={styles.console}>
        <p>[ OK ] Initializing shutdown sequence...</p>
        <p>[ OK ] Reached target Power-Off.</p>
        <p className={styles.empty}>&nbsp;</p>
        <p className={styles.path}>guest@localhost:~/{hostName}$ ls -la</p>
        <div className={styles.fileList}>
          <span>drwxr-xr-x  2 root root  4096 Feb 16 00:00 .</span>
          {serverId && (
            <Link to={`/${serverId}/rules/basic`} className={styles.link}>
              -rw-r--r--  1 root root   128 Feb 16 00:00 rules.sh
            </Link>
          )}
          <Link to="/lists" className={styles.link}>
            -rw-r--r--  1 root root   512 Feb 16 00:00 tech_lists.db
          </Link>
        </div>
        <p className={styles.prompt}>
          Connection closed. <span className={styles.blink}>_</span>
        </p>
      </div>
    </div>
  );
};

export default SystemHalt;