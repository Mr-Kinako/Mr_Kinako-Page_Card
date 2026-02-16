import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useMemo } from 'react';
import { RULES_DATA, SERVER_MAP } from '@/constants/rules';
import { renderDescription } from '@/utils/pathUtils';
import TerminalHeader from '@/components/TerminalHeader/TerminalHeader';
import styles from './Rules.module.scss';

const Rules = () => {
  const { serverId, rulesCategory, ruleId } = useParams();
  const navigate = useNavigate();

  const dataKey = useMemo(() => 
    SERVER_MAP[serverId || '']?.[rulesCategory || ''] || null
  , [serverId, rulesCategory]);

  const data = dataKey ? RULES_DATA[dataKey] : null;

  const isRuleValid = useMemo(() => 
    data?.some(cat => cat.items.some(item => item.id === ruleId))
  , [data, ruleId]);

  const currentRuleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRuleValid && currentRuleRef.current) {
      currentRuleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isRuleValid]);

  const handleExit = () => {
    navigate(serverId ? `/${serverId}` : '/system/halt');
  };

  return (
    <div className={styles.rulesPage}>
      <TerminalHeader 
        basePath={`/${serverId}/rules`}
        currentDir={rulesCategory || 'unknown'}
        subFile={isRuleValid ? ruleId : null}
        availableDirs={Object.keys(SERVER_MAP[serverId || ''] || {})}
        onExit={handleExit}
        exitLabel='EXIT'
      />

      {!data ? (
        <div className={styles.error}>
          <p>ERROR 404: Directory "/{rulesCategory}" not found in registry.</p>
        </div>
      ) : (
        <div className={styles.scrollArea}>
          {data.map((cat, idx) => (
            <section key={idx} className={styles.category}>
              <h2 className={styles.categoryTitle}>{cat.categoryName}</h2>
              <div className={styles.grid}>
                {cat.items.map(rule => (
                  <div 
                    key={rule.id} 
                    ref={rule.id === ruleId ? currentRuleRef : null}
                    className={`${styles.ruleCard} ${rule.id === ruleId ? styles.highlight : ''}`}
                  >
                    <div className={styles.ruleHeader}>
                      <span className={styles.id}>#{rule.id}</span>
                      <h3>{rule.title}</h3>
                    </div>
                    <p className={styles.description}>
                      {renderDescription(rule.description)}
                    </p>
                    <button 
                      className={styles.copyBtn} 
                      onClick={() => navigator.clipboard.writeText(rule.discordText)}
                    >
                      Copy for Discord
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rules;