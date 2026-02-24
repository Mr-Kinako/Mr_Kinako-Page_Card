import { useParams, Link } from 'react-router-dom';
import React, { useMemo } from 'react';
import { SERVER_MAP } from '@/constants/docs';
import styles from './SystemHalt.module.scss';

const SystemHalt = () => {
  const { serverId } = useParams();
  const hostName = serverId || 'system-core';

  // Проверка: находимся ли мы в режиме разработки (localhost)
  const isDev = window.location.hostname === 'localhost' || import.meta.env.DEV;

  const firstCategory = useMemo(() => {
    if (!serverId || !SERVER_MAP[serverId]) return null;
    const categories = Object.keys(SERVER_MAP[serverId]);
    return categories.length > 0 ? categories[0] : null;
  }, [serverId]);

  // Получаем список всех серверов для DEV-режима
  const allServers = useMemo(() => Object.keys(SERVER_MAP), []);

  return (
    <div className={styles.haltPage}>
      <div className={styles.console}>
        <p>[ <b>OK</b> ] Initializing shutdown sequence...</p>
        <p>[ <b>OK</b> ] Reached target Power-Off.</p>
        <p className={styles.empty}>&nbsp;</p>
        <p className={styles.path}>guest@localhost:~/{hostName}$ ls -la</p>
        
        <div className={styles.fileList}>
          <span>drwxr-xr-x  2 root root  4096 Feb 16 00:00 .</span>
          
          {/* Ссылка на текущий сервер */}
          {serverId && firstCategory && (
            <Link to={`/${serverId}/rules/${firstCategory}`} className={styles.link}>
              -rw-r--r--  1 root root   128 Feb 16 00:00 server_rules.sh
            </Link>
          )}

          <Link to={serverId ? `/${serverId}/lists/catalog` : '/lists/catalog'} className={styles.link}>
            -rw-r--r--  1 root root   512 Feb 16 00:00 technical_lists.db
          </Link>

          {/* DEV-секция: выводим все доступные серверы */}
          {isDev && (
            <>
              <p className={styles.empty}>&nbsp;</p>
              <p style={{ color: '#ebdbb2', opacity: 0.5 }}># DEV MODE: Available servers</p>
              {allServers.map((sId) => {
                const sCat = Object.keys(SERVER_MAP[sId])[0];
                return (
                  <React.Fragment key={sId}>
                    <Link to={`/${sId}/rules/${sCat}`} className={styles.link}>
                      -rwxr-xr-x  1 dev  root   256 Feb 16 00:00 {sId.toLowerCase()}_node.bin
                    </Link>
                    <Link to={`/${sId}/lists/catalog`} className={styles.link}>
                      -rwxr-xr-x  1 dev root   512 Feb 16 00:00 {sId.toLowerCase()}_lists.db
                    </Link>
                  </React.Fragment>
                );
              })}
            </>
          )}
        </div>

        <p className={styles.prompt}>
          Connection closed. <span className={styles.blink}>_</span>
        </p>
      </div>
    </div>
  );
};

export default SystemHalt;