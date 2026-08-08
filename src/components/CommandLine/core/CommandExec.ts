import React from "react";
import { LogItem } from "../types";
import { parsePipeline } from "./parser";
import { parseSingleCommand } from "./parser";
import { commandRegistry } from "./commands";

interface ExecuteParams {
   rawInput: string;
   vfs: any;
   setVfs: React.Dispatch<React.SetStateAction<any>>;
   currentDir: string;
   setCurrentDir: (dir: string) => void;
   clearLogs: () => void;
   applyTheme: (theme: string) => { success: boolean; msg: string };
   navigate: any;
}

export const executeCommandPipeline = ({
   rawInput,
   vfs,
   setVfs,
   currentDir,
   setCurrentDir,
   clearLogs,
   applyTheme,
   navigate,
}: ExecuteParams): LogItem[] => {
   const trimmed = rawInput.trim();
   if (!trimmed) return [];

   const steps = parsePipeline(trimmed);
   const newLogs: LogItem[] = [];
   let stopPipeline = false;

   for (const step of steps) {
      if (stopPipeline) break;

      const parsed = parseSingleCommand(step.raw);
      const targetCmd = commandRegistry[parsed.cmdName];

      let output: React.ReactNode = "";
      let isError = false;

      if (targetCmd) {
         const result = targetCmd.handler(parsed, {
            clearLogs,
            applyTheme,
            navigate,
            currentDir,
            setCurrentDir,
            vfs,
            setVfs,
         });

         if (!result) continue; // Если команда вернула null (например, clear)
         output = result.output;
         isError = !!result.isError;
      } else {
         output = `Команда "${parsed.cmdName}" не найдена. Введите help для списка команд.`;
         isError = true;
      }

      newLogs.push({
         id: crypto.randomUUID(),
         command: step.raw,
         output,
         isError,
      });

      if (isError && step.operator === "AND") {
         stopPipeline = true;
      }
   }

   return newLogs;
};