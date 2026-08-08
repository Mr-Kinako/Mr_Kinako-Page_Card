import { VFSDir, VFSNode } from "./types";

export const normalizePath = (currentDir: string, targetPath: string): string => {
  if (targetPath.startsWith("/")) {
    return targetPath.replace(/\/+/g, "/") || "/";
  }

  const parts = (currentDir + "/" + targetPath).split("/").filter(Boolean);
  const stack: string[] = [];

  for (const part of parts) {
    if (part === ".") continue;
    if (part === "..") {
      stack.pop();
    } else {
      stack.push(part);
    }
  }

  return "/" + stack.join("/");
};

export const getNodeByPath = (root: VFSDir, path: string): VFSNode | null => {
  if (path === "/" || path === "") return root;

  const parts = path.split("/").filter(Boolean);
  let current: VFSNode = root;

  for (const part of parts) {
    if (current.type !== "dir" || !current.children[part]) {
      return null;
    }
    current = current.children[part];
  }

  return current;
};