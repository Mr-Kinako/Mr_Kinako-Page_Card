// src/components/CommandLine/types.ts
import { VFSDir } from "./vfs/types";

// Экспортируем типы VFS наружу
export type { VFSDir, VFSNode, VFSFile, VFSMetadata } from "./vfs/types";

export type Theme = "purple" | "lightblue" | "dark" | "auto";

export interface CommandContext {
   vfs: VFSDir;
   setVfs: React.Dispatch<React.SetStateAction<VFSDir>>;
   currentDir: string;
   setCurrentDir: (path: string) => void;
   navigate: (path: string) => void;
   applyTheme: (theme: Theme) => { success: boolean; msg: string };
   clearLogs: () => void;
   history?: string[];
}

export interface ParsedArgs {
   positional: string[];
   flags: Record<string, string | boolean>;
}

export interface CommandResult {
   output: React.ReactNode;
   isError?: boolean;
}

export interface CommandDefinition {
   desc: string;
   usage: string;
   handler: (args: ParsedArgs, ctx: CommandContext) => CommandResult | null;
}

export interface LogItem {
  id: string;
  command: string;
  output: React.ReactNode;
  isError?: boolean;
}