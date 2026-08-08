// src/components/CommandLine/vfs/structure.ts
import { VFSDir, VFSMetadata } from "./types";

const defaultOwner = "kinako";

const createMeta = (
   permissions: string,
   size: number = 0,
   updatedAt: number = Date.now()
): VFSMetadata => ({
   createdAt: updatedAt,
   updatedAt,
   owner: defaultOwner,
   permissions,
   size,
});

const currentTheme = localStorage.getItem("theme") === "auto" ? "auto" : localStorage.getItem("theme");

export const initialVFS: VFSDir = {
   type: "dir",
   meta: createMeta("rwxr-xr-x", 4096),
   children: {
      pages: {
         type: "dir",
         meta: createMeta("rwxr-xr-x", 4096),
         children: {
            "home.md": {
               type: "file",
               targetRoute: "/",
               content: "# Главная страница\nДобро пожаловать в kinako.sh!",
               meta: createMeta("rw-r--r--", 58),
            },
            "goals.md": {
               type: "file",
               targetRoute: "/goals",
               content: "# Цели\nСтраница с текущими задачами проекта.",
               meta: createMeta("rw-r--r--", 48),
            },
            "media.md": {
               type: "file",
               targetRoute: "/media",
               content: "# Медиа\nМедиа-галерея (доступна только в DEV режиме).",
               meta: createMeta("rw-r--r--", 56),
            },
         },
      },
      etc: {
         type: "dir",
         meta: createMeta("rwxr-xr-x", 4096),
         children: {
            "theme.json": {
               type: "file",
               content: JSON.stringify(
                  { currentTheme: `${currentTheme}`, allowed: ["purple", "lightblue", "dark", "auto"] },
                  null,
                  2
               ),
               meta: createMeta("rw-r--r--", 86),
            },
            motd: {
               type: "file",
               content: "Привет! Используй 'cd /pages/<page>' для переключения страниц сайта.",
               meta: createMeta("rw-r--r--", 73),
            },
         },
      },
      bin: {
         type: "dir",
         meta: createMeta("rwxr-xr-x", 4096),
         children: {
            "switch-theme": {
               type: "file",
               isExecutable: true,
               content: "Системный бинарник переключения темы.",
               meta: createMeta("rwxr-xr-x", 42),
            },
         },
      },
   },
};