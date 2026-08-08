import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import s from "./CommandLine.module.scss";
import { Theme, VFSDir, LogItem } from "./types";
import { initialVFS } from "./vfs/structure";
import { CLI_NAME, ALLOWED_THEMES, commandRegistry } from "./core/commands";
import { executeCommandPipeline } from "./core/CommandExec";
import { useCommandHistory } from "./hooks/useCommandHistory";

interface CommandLineProps {
   customClass?: string;
}

export const CommandLine: React.FC<CommandLineProps> = ({
   customClass = "",
}) => {
   const [value, setValue] = useState("");
   const [logs, setLogs] = useState<LogItem[]>([]);
   const [vfs, setVfs] = useState<VFSDir>(initialVFS);

   const [isClosed, setIsClosed] = useState(true);
   const [isMinimized, setIsMinimized] = useState(false);
   const [isFullscreen, setIsFullscreen] = useState(false);

   const [currentDir, setCurrentDir] = useState("/");
   const navigate = useNavigate();

   const inputRef = useRef<HTMLInputElement>(null);
   const bodyRef = useRef<HTMLDivElement>(null);

   const { addToHistory, getPreviousCommand, getNextCommand } =
      useCommandHistory();

   const resetConsole = useCallback(() => {
      setValue("");
      setLogs([]);
      setCurrentDir("/");
      setVfs(initialVFS);
      setIsMinimized(false);
      setIsFullscreen(false);
   }, []);

   const handleClose = useCallback(() => {
      setIsClosed(true);
      resetConsole();
   }, [resetConsole]);

   const clearLogs = useCallback(() => setLogs([]), []);

   const applyTheme = useCallback((theme: string) => {
      if (!ALLOWED_THEMES.includes(theme as Theme)) {
         return {
            success: false,
            msg: `Недопустимая тема "${theme}". Доступны: ${ALLOWED_THEMES.join(", ")}`,
         };
      }

      if (theme === "auto") {
         document.documentElement.setAttribute("data-theme", "auto");
         localStorage.setItem("theme", "auto");
         return { success: true, msg: "Установлена автоматическая тема" };
      }

      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      return { success: true, msg: `Тема успешно изменена на "${theme}"` };
   }, []);

   // Горячая клавиша (Ctrl + I)
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.repeat) return;
         if (e.ctrlKey && e.code === "KeyI") {
            e.preventDefault();
            setIsClosed((prev) => {
               const nextState = !prev;
               if (nextState) resetConsole();
               return nextState;
            });
         }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [resetConsole]);

   // Автоскролл
   useEffect(() => {
      if (bodyRef.current) {
         bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
   }, [logs]);

   // Фокус при открытии
   useEffect(() => {
      if (!isClosed && !isMinimized) {
         const timer = setTimeout(() => inputRef.current?.focus(), 150);
         return () => clearTimeout(timer);
      }
   }, [isClosed, isMinimized]);

   // Инициализация темы
   useEffect(() => {
      const savedTheme = localStorage.getItem("theme") || "auto";
      if (ALLOWED_THEMES.includes(savedTheme as Theme)) {
         applyTheme(savedTheme);
      }
   }, [applyTheme]);

   useEffect(() => {
      let touchStartY: number | null = null;

      const handleTouchStart = (e: TouchEvent) => {
         const startY = e.touches[0].clientY;
         // Фиксируем старт только если попали в нижние 100px
         if (startY > window.innerHeight - 100) {
            touchStartY = startY;
         } else {
            touchStartY = null;
         }
      };

      const handleTouchEnd = (e: TouchEvent) => {
         // Если старт был не в нижней зоне — игнорируем
         if (touchStartY === null) return;

         const touchEndY = e.changedTouches[0].clientY;
         const diffY = touchStartY - touchEndY;

         // Свайп вверх более чем на 100px (150px на мобилке бывает многовато для короткого свайпа)
         if (diffY > 100) {
            window.dispatchEvent(
               new KeyboardEvent("keydown", {
                  code: "KeyI",
                  ctrlKey: true,
                  bubbles: true,
               }),
            );
         }

         touchStartY = null; // Обязательно сбрасываем
      };

      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);
      return () => {
         window.removeEventListener("touchstart", handleTouchStart);
         window.removeEventListener("touchend", handleTouchEnd);
      };
   }, []);

   const handleCommandExecution = (rawInput: string) => {
      const trimmed = rawInput.trim();
      if (!trimmed) return;

      addToHistory(trimmed);

      const executedLogs = executeCommandPipeline({
         rawInput: trimmed,
         vfs,
         setVfs,
         currentDir,
         setCurrentDir,
         clearLogs,
         applyTheme,
         navigate,
      });

      setLogs((prev) => [...prev, ...executedLogs]);
      setValue("");
   };

   const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         handleCommandExecution(value);
      } else if (e.key === "Tab") {
         e.preventDefault();
         const trimmed = value.trim();
         if (!trimmed) return;

         const matches = Object.keys(commandRegistry).filter((cmd) =>
            cmd.startsWith(trimmed),
         );
         if (matches.length === 1) setValue(matches[0] + " ");
      } else if (e.key === "ArrowUp") {
         e.preventDefault();
         const prevCmd = getPreviousCommand();
         if (prevCmd !== null) setValue(prevCmd);
      } else if (e.key === "ArrowDown") {
         e.preventDefault();
         const nextCmd = getNextCommand();
         if (nextCmd !== null) setValue(nextCmd);
      }
   };

   const wrapperClass = [
      s.commandLine,
      isClosed ? s.isClosed : "",
      isMinimized ? s.isMinimized : "",
      isFullscreen ? s.isFullscreen : "",
      customClass,
   ]
      .filter(Boolean)
      .join(" ");

   return (
      <div className={wrapperClass} onClick={() => inputRef.current?.focus()}>
         <div className={s.header}>
            <div className={s.controls}>
               <button
                  className={s.btnClose}
                  title="Закрыть"
                  onClick={handleClose}
               />
               <button
                  className={s.btnMinimize}
                  title="Свернуть/Развернуть"
                  onClick={() => setIsMinimized((prev) => !prev)}
               />
               <button
                  className={s.btnFullscreen}
                  title="Полноэкранный режим"
                  onClick={() => setIsFullscreen((prev) => !prev)}
               />
            </div>
            <div className={s.title}>
               {CLI_NAME} <span className={s.pathHint}>[{currentDir}]</span>
            </div>
         </div>

         <div className={s.bodyWrapper}>
            <div className={s.body} ref={bodyRef}>
               <div className={s.logs}>
                  <div className={s.welcome}>
                     Консоль {CLI_NAME}. Введите <span>help</span> для списка
                     команд.
                  </div>

                  {logs.map((log) => (
                     <div key={log.id} className={s.logRow}>
                        <div className={s.commandLinePrompt}>
                           <span className={s.promptSymbol}>&gt;</span>{" "}
                           {log.command}
                        </div>
                        <div
                           className={`${s.commandOutput} ${
                              log.isError ? s.isError : ""
                           }`}
                        >
                           {log.output}
                        </div>
                     </div>
                  ))}
               </div>

               <div className={s.inputRow}>
                  <span className={s.promptSymbol}>{currentDir} &gt;</span>
                  <input
                     ref={inputRef}
                     type="text"
                     className={s.input}
                     value={value}
                     onChange={(e) => setValue(e.target.value)}
                     onKeyDown={handleInputKeyDown}
                     placeholder="Введите команду..."
                     spellCheck={false}
                     autoComplete="off"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
