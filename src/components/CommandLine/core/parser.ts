export interface ParsedCommand {
  cmdName: string;
  positional: string[];
  flags: Record<string, string | boolean>;
}

export interface ExecutionStep {
  raw: string;
  operator: "AND" | "SEQ" | "END";
}

export const parseSingleCommand = (raw: string): ParsedCommand => {
  const parts = raw.trim().split(/\s+/);
  const cmdName = parts[0].toLowerCase();
  const args = parts.slice(1);

  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith("--")) {
      const clean = arg.slice(2);
      if (clean.includes("=")) {
        const [key, val] = clean.split("=");
        flags[key.toLowerCase()] = val;
      } else if (i + 1 < args.length && !args[i + 1].startsWith("-")) {
        flags[clean.toLowerCase()] = args[i + 1];
        i++;
      } else {
        flags[clean.toLowerCase()] = true;
      }
    } else if (arg.startsWith("-") && arg.length > 1) {
      const clean = arg.slice(1);
      if (i + 1 < args.length && !args[i + 1].startsWith("-")) {
        flags[clean.toLowerCase()] = args[i + 1];
        i++;
      } else {
        flags[clean.toLowerCase()] = true;
      }
    } else {
      positional.push(arg);
    }
  }

  return { cmdName, positional, flags };
};

export const parsePipeline = (input: string): ExecutionStep[] => {
  const steps: ExecutionStep[] = [];
  const regex = /(.*?)(&&|;|$)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    const raw = match[1].trim();
    const opStr = match[2];

    if (!raw && !opStr) break;

    let operator: ExecutionStep["operator"] = "END";
    if (opStr === "&&") operator = "AND";
    if (opStr === ";") operator = "SEQ";

    if (raw) {
      steps.push({ raw, operator });
    }
  }

  return steps;
};