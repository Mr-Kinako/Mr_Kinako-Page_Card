import { useState, useRef, useEffect, useCallback } from 'react';
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

  // Синхронизация при смене URL внешне
  useEffect(() => {
    setInputValue(subFile ? `${currentDir}/${subFile}.doc` : currentDir);
  }, [currentDir, subFile]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = useCallback(() => {
    setIsEditing(false);
    let trimmedValue = inputValue.trim();
    if (trimmedValue === initialInput || !trimmedValue) return;

    if (trimmedValue.endsWith('.doc')) trimmedValue = trimmedValue.slice(0, -4);

    const [newDir, ...rest] = trimmedValue.split('/').filter(Boolean);
    const newSubFile = rest.join('/');
    
    const isValidDir = availableDirs.length === 0 || availableDirs.includes(newDir);

    if (isValidDir) {
      const targetPath = newSubFile ? `${basePath}/${newDir}/${newSubFile}` : `${basePath}/${newDir}`;
      navigate(normalizePath(targetPath));
    } else {
      setInputValue(initialInput);
      // Можно добавить временный стейт ошибки вместо alert
    }
  }, [inputValue, initialInput, availableDirs, basePath, navigate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setInputValue(initialInput);
    }
  };

  const handleExitClick = () => {
    if (exitLabel === 'EXIT') {
      setIsTerminating(true);
      setTimeout(() => onExit?.(), 1600); 
    } else onExit?.();
  };

  const displayBasePath = normalizePath(basePath).replace(/\/$/, '');

  return (
    <header className={`${styles.header} ${isTerminating ? styles.terminating : ''}`}>
      <div className={styles.terminalLine}>
        <span className={styles.userHost}>
          {isTerminating ? 'shutdown:' : 'root@system:'}
        </span>
        
        <div className={styles.pathWrapper}>
          <span className={styles.basePath}>{displayBasePath}/</span>
          
          {isEditing ? (
            <div className={styles.inputContainer}>
              <input
                ref={inputRef}
                className={styles.terminalInput}
                value={inputValue}
                spellCheck={false}
                autoComplete="off"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsEditing(false)}
                style={{ width: `${inputValue.length + 1}ch` }}
              />
              {availableDirs.length > 0 && (
                <div className={styles.hints}>
                  {availableDirs
                    .filter(d => d.startsWith(inputValue.split('/')[0]))
                    .slice(0, 3)
                    .map(d => <span key={d} className={styles.hintItem}>{d}</span>)}
                </div>
              )}
            </div>
          ) : (
            <span className={styles.editableArea} onClick={() => setIsEditing(true)}>
              {isTerminating ? 'halt' : (
                <>
                  <span className={styles.currentDir}>{currentDir}</span>
                  {subFile && (
                    <span className={styles.filePart}>
                       /{subFile}<span className={styles.ext}>.doc</span>
                    </span>
                  )}
                </>
              )}
              <span className={styles.cursor}>_</span>
            </span>
          )}
        </div>
      </div>

      {onExit && (
        <button 
          onClick={handleExitClick} 
          className={`${styles.exitBtn} ${isTerminating ? styles.activeExit : ''}`}
          disabled={isTerminating}
        >
          {isTerminating ? '[ SHUTTING DOWN... ]' : `[ ${exitLabel} ]`}
        </button>
      )}
    </header>
  );
};

export default TerminalHeader;