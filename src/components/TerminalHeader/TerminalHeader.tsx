import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { normalizePath } from '@/utils/pathUtils';
import styles from './TerminalHeader.module.scss';

interface TerminalHeaderProps {
  basePath: string;
  currentDir: string;
  subFile?: string | null;
  availableDirs?: string[];
  onExit?: () => void;
  exitLabel?: string;
}

const TerminalHeader = ({ 
  basePath, 
  currentDir, 
  subFile, 
  availableDirs = [], 
  onExit, 
  exitLabel = 'EXIT' 
}: TerminalHeaderProps) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isTerminating, setIsTerminating] = useState(false);
  
  const initialInput = subFile ? `${currentDir}/${subFile}.doc` : currentDir;
  const [inputValue, setInputValue] = useState(initialInput);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(subFile ? `${currentDir}/${subFile}.doc` : currentDir);
  }, [currentDir, subFile]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      let trimmedValue = inputValue.trim();
      if (trimmedValue === initialInput) return;

      // Очистка расширения перед роутингом
      if (trimmedValue.endsWith('.doc')) trimmedValue = trimmedValue.slice(0, -4);

      const parts = trimmedValue.split('/').filter(Boolean);
      if (parts.length === 0) { setInputValue(initialInput); return; }

      const [newDir, ...rest] = parts;
      const newSubFile = rest.join('/');
      const isValidDir = availableDirs.length === 0 || availableDirs.includes(newDir);

      if (isValidDir) {
        const targetPath = newSubFile ? `${basePath}/${newDir}/${newSubFile}` : `${basePath}/${newDir}`;
        navigate(normalizePath(targetPath));
      } else {
        alert(`Error: Directory "${newDir}" not found.`);
        setInputValue(initialInput);
      }
    }
    if (e.key === 'Escape') { setIsEditing(false); setInputValue(initialInput); }
  };

  const handleExitClick = () => {
    if (exitLabel === 'EXIT') {
      setIsTerminating(true);
      setTimeout(() => onExit?.(), 1600); 
    } else onExit?.();
  };

  const displayBasePath = normalizePath(basePath).replace(/\/$/, '');

  return (
    <>
      <header className={`${styles.header} ${isTerminating ? styles.terminating : ''}`}>
        <div className={styles.terminalHeader}>
          <span className={styles.userHost}>{isTerminating ? 'shutdown:' : 'root@system:'}</span>
          <span className={styles.path}>
            {`${displayBasePath}/`}
            {isEditing ? (
              <input
                ref={inputRef}
                className={styles.terminalInput}
                value={inputValue}
                style={{ width: `${Math.max(inputValue.length + 1, 8)}ch` }}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleCommand}
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <span className={styles.editablePath} onClick={() => setIsEditing(true)}>
                {isTerminating ? 'halt' : (
                  <>
                    {currentDir}
                    {subFile && !isTerminating && (
                      <span className={styles.subPath}>
                        {subFile}
                        <span className={styles.extension}>.doc</span>
                      </span>
                    )}
                  </>
                )}
              </span>
            )}
          </span>
          {!isEditing && <span className={styles.cursor}>_</span>}
        </div>
        {onExit && (
          <button 
            onClick={handleExitClick} 
            className={`${styles.backBtn} ${isTerminating ? styles.activeExit : ''}`}
            disabled={isTerminating}
          >
            [ {isTerminating ? 'HALTING...' : exitLabel} ]
          </button>
        )}
      </header>

      {isEditing && availableDirs.length > 0 && (
        <div className={styles.terminalHelp}>
          <span className={styles.helpTitle}>AVAILABLE_LOCATIONS:</span>
          <div className={styles.helpItems}>
            {availableDirs.map(dir => (
              <span key={dir} className={styles.helpItem}>--{dir}</span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalHeader;