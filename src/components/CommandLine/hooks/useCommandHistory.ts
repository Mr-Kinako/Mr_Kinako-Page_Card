import { useState } from "react";

export const useCommandHistory = () => {
   const [history, setHistory] = useState<string[]>([]);
   const [historyIdx, setHistoryIdx] = useState<number | null>(null);

   const addToHistory = (cmd: string) => {
      setHistory((prev) => [...prev, cmd]);
      setHistoryIdx(null);
   };

   const getPreviousCommand = () => {
      if (history.length === 0) return null;
      const nextIdx =
         historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      return history[nextIdx] || "";
   };

   const getNextCommand = () => {
      if (historyIdx === null) return null;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
         setHistoryIdx(null);
         return "";
      }
      setHistoryIdx(nextIdx);
      return history[nextIdx] || "";
   };

   return {
      history,
      addToHistory,
      getPreviousCommand,
      getNextCommand,
   };
};