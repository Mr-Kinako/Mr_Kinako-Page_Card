import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useMemo } from 'react';
import { RULES_DATA, SERVER_MAP } from '@/constants/docs';
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
  }, [isRuleValid, ruleId]); // Добавлен ruleId в зависимости

  const handleExit = () => {
    navigate(serverId ? `/system/${serverId}` : '/system/halt');
  };

  const handleSelectRule = (id: string) => {
    navigate(`/${serverId}/rules/${rulesCategory}/${id}`, { replace: true });
  };

  const copyToClipboard = (e: React.MouseEvent, text: string) => {
    e.stopPropagation(); // Чтобы не срабатывал выбор карточки при клике на кнопку
    navigator.clipboard.writeText(text);
  };

  const copyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const fullUrl = `${window.location.origin}/${serverId}/rules/${rulesCategory}/${id}`;
    navigator.clipboard.writeText(fullUrl);
  };
  const isCozyBar = serverId === 'CozyBar';

  return (
    <div className={styles.rulesPage}>
      <div className={styles.headerContainer}>
        <TerminalHeader 
          basePath={`/${serverId}/rules`}
          currentDir={rulesCategory || 'unknown'}
          subFile={isRuleValid ? ruleId : null}
          availableDirs={Object.keys(SERVER_MAP[serverId || ''] || {})}
          onExit={handleExit}
          exitLabel='EXIT'
        />
      </div>
      
      {!data ? (
        <div className={styles.error}>
          <p>ERROR 404: Directory "/{rulesCategory}" not found in registry.</p>
        </div>
      ) : (
        <div className={styles.scrollArea}>
          {isCozyBar && (
            <div className={styles.containerWarnRules}>
              <h2>Важно для прочтения</h2>
              <div className={styles.containerDescWR}>
                <p className={styles.descWarnRules}>Правила могут быть не идеальными, и мы понимаем, что угодить всем невозможно.
                  Предложения по улучшению раздела приветствуются, если они подаются без негатива.</p>
              </div>
            </div>
          )}            

          {data.map((cat, idx) => (
            <section key={idx} className={styles.category}>
              <h2 className={styles.categoryTitle}>{cat.categoryName}</h2>
              <div className={styles.grid}>
                {cat.items.map(rule => (
                  <div 
                    key={rule.id} 
                    ref={rule.id === ruleId ? currentRuleRef : null}
                    onClick={() => handleSelectRule(rule.id)}
                    className={`${styles.ruleCard} ${rule.id === ruleId ? styles.highlight : ''}`}
                    draggable={false}
                  >
                    <div className={styles.ruleHeader}>
                      <span className={styles.id}>#{rule.id}</span>
                      <h3>{rule.title}</h3>
                    </div>
                    <p className={styles.description}
                      onClick={(e) => {
                        if ((e.target as HTMLElement).tagName === 'A') {
                          e.stopPropagation();
                        }
                      }}
                    >
                      {renderDescription(rule.description)}
                    </p>
                    <div className={styles.actions}>
                      <button 
                        className={styles.copyBtn} 
                        onClick={(e) => copyToClipboard(e, rule.discordText)}
                      >
                        Copy for Discord
                      </button>
                      <button 
                        className={styles.copyBtn} 
                        onClick={(e) => copyLink(e, rule.id)}
                      >
                        Copy Link
                      </button>
                    </div>
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