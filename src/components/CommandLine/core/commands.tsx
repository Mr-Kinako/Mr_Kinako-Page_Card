// src/components/CommandLine/core/commands.tsx
import React from "react";
import { CommandDefinition, Theme, VFSDir } from "../types";
import { getNodeByPath, normalizePath } from "../vfs/utils";
import s from "../CommandLine.module.scss";

export const CLI_NAME = "kinako.sh";
export const ALLOWED_THEMES: Theme[] = ["purple", "lightblue", "dark", "auto"];

const reply = (output: React.ReactNode, isError = false) => ({
   output,
   isError,
});

const defaultMeta = (permissions: string, size: number = 0) => ({
   createdAt: Date.now(),
   updatedAt: Date.now(),
   owner: "kinako",
   permissions,
   size,
});

export const commandRegistry: Record<string, CommandDefinition> = {
   help: {
      desc: "список доступных команд",
      usage: "help",
      handler: () => ({
         output: (
            <div className={s.helpBlock}>
               <p>Доступные команды:</p>
               <ul>
                  {Object.entries(commandRegistry).map(([name, item]) => (
                     <li key={name}>
                        <code>{name}</code> — {item.desc}
                     </li>
                  ))}
               </ul>
            </div>
         ),
      }),
   },

   info: {
      desc: "информация о системе и окружении",
      usage: "info",
      handler: () => ({
         output: (
            <div className={s.infoBlock}>
               <p>
                  <strong>{CLI_NAME} OS v1.2.0</strong>
               </p>
               <p>Интерактивная оболочка виртуальной файловой системы (VFS).</p>
               <ul>
                  <li>
                     <strong>Движок:</strong> React 18 + TypeScript
                  </li>
                  <li>
                     <strong>Стилизация:</strong> SCSS Modules + CSS Grid
                     Dynamic Rows
                  </li>
                  <li>
                     <strong>Пайплайны:</strong> Поддержка цепочек{" "}
                     <code>&&</code> и <code>;</code>
                  </li>
                  <li>
                     <strong>Навигация:</strong> Автоматический маппинг VFS на
                     React Router
                  </li>
               </ul>
            </div>
         ),
      }),
   },

   neofetch: {
      desc: "вывод системной информации и железа",
      usage: "neofetch",
      handler: () => ({
         output: (
            <div
               style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  fontFamily: "monospace",
               }}
            >
               <pre
                  style={{
                     color: "var(--accent)",
                     margin: 0,
                     lineHeight: "1.2",
                  }}
               >
                  {`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⡀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⣿⣦⣄⠀⠀⠀⠀⢠⣿⣿⣿⣿⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢹⣿⣿⣷⣤⣀⣠⣿⣿⠃⠸⣿⣧⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⣿⣿⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣤⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⢸⣿⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⣿⣿⣿⣛⣩⣽⣿⣿⣿⣷⣸⣿⠀⠀⠀⠀
⠀⠀⠀⢀⣴⣿⣿⣿⡾⠿⠛⠛⠛⠛⠿⣿⣿⡿⠀⢰⡀⠀
⢀⣠⣾⣿⠟⠋⠉⢀⣀⣤⣤⣶⣶⣶⣦⣾⣿⠇⠀⣾⣷⠀
⠈⠙⠻⢷⣶⣴⡾⠿⠛⠉⠉⠀⠀⠈⣩⣿⠏⠀⣰⣿⣿⡄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⠏⠀⣰⣿⢿⣿⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠋⢀⣾⣿⠏⣾⣿⡇
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠋⣠⣴⣿⠟⢁⣼⣿⣿⡇
⠀⠀⠀⠀⠀⠀⠀⣴⡿⠟⢉⣤⣾⣿⠟⠁⣠⣿⣿⣿⣿⠀
⠀⠀⠀⠀⠀⠀⠚⢉⣤⣶⣿⠿⠋⢀⣴⣾⣿⣿⣿⣿⠃⠀
⠀⠀⠀⠀⠀⠀⣴⣿⡿⠋⢁⣤⣾⣿⣿⣿⣿⣿⡿⠃⠀⠀
⠀⠀⠀⠀⠀⣼⣿⠋⠀⣴⣿⣿⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⠇⢀⣾⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⠀⣼⣿⣿⣿⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠱⠀⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`}
               </pre>
               <div>
                  <p style={{ margin: 0 }}>
                     <strong>kinako@mr-kinako.vercel.app</strong> <br />
                     <span
                        style={{
                           fontSize: "0.69rem",
                        }}
                     >
                        Данные ниже - не являются реальностью, кроме{" "}
                        <strong>Host</strong>
                     </span>
                  </p>
                  <p style={{ margin: "0.2rem 0", opacity: 0.5 }}>
                     --------------------------
                  </p>
                  <p style={{ margin: 0 }}>
                     <strong>OS:</strong> kinako.sh v1.2.0
                  </p>
                  <p style={{ margin: 0 }}>
                     <strong>Host:</strong>{" "}
                     {import.meta.env.DEV ? "localhost" : "Vercel Platform"}
                  </p>

                  <p style={{ margin: 0 }}>
                     <strong>CPU:</strong> AMD Ryzen 9 9950X3D (16c/32t)
                  </p>
                  <p style={{ margin: 0 }}>
                     <strong>GPU:</strong> NVIDIA GeForce RTX 5090 32GB
                  </p>
                  <p style={{ margin: 0 }}>
                     <strong>Memory:</strong> 128 GB DDR5 7200MHz CL34
                  </p>
               </div>
            </div>
         ),
      }),
   },

   pwd: {
      desc: "показать текущую рабочую директорию",
      usage: "pwd",
      handler: (_, ctx) => reply(ctx.currentDir),
   },

   ls: {
      desc: "просмотр файлов и папок в директории",
      usage: "ls [-l] [path]",
      handler: ({ positional, flags }, ctx) => {
         const targetPath = normalizePath(ctx.currentDir, positional[0] || ".");
         const node = getNodeByPath(ctx.vfs, targetPath);

         if (!node) {
            return reply(
               `ls: ${positional[0] || "."}: Нет такого файла или каталога`,
               true,
            );
         }

         if (node.type === "file") return reply(positional[0]);

         const isLong = Boolean(flags["l"]);

         const items = Object.entries(node.children).map(([name, child]) => {
            if (isLong) {
               const date = new Date(
                  child.meta?.updatedAt || Date.now(),
               ).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
               });
               const typeChar = child.type === "dir" ? "d" : "-";
               const perms =
                  child.meta?.permissions ||
                  (child.type === "dir" ? "rwxr-xr-x" : "rw-r--r--");
               const owner = child.meta?.owner || "kinako";
               const size =
                  child.meta?.size ||
                  (child.type === "file" ? child.content.length : 4096);

               return (
                  <div
                     key={name}
                     style={{
                        display: "flex",
                        gap: "1rem",
                        fontFamily: "monospace",
                        opacity: 0.9,
                     }}
                  >
                     <span style={{ opacity: 0.6 }}>
                        {typeChar}
                        {perms}
                     </span>
                     <span style={{ opacity: 0.8, minWidth: "50px" }}>
                        {owner}
                     </span>
                     <span style={{ minWidth: "50px", textAlign: "right" }}>
                        {size}B
                     </span>
                     <span style={{ opacity: 0.6, minWidth: "110px" }}>
                        {date}
                     </span>
                     <span
                        className={
                           child.type === "dir" ? s.dirItem : s.fileItem
                        }
                     >
                        {name}
                        {child.type === "dir" ? "/" : ""}
                     </span>
                  </div>
               );
            }

            return (
               <span
                  key={name}
                  className={child.type === "dir" ? s.dirItem : s.fileItem}
               >
                  {name}
                  {child.type === "dir" ? "/" : ""}
               </span>
            );
         });

         return reply(
            <div className={isLong ? undefined : s.lsGrid}>{items}</div>,
         );
      },
   },

   cd: {
      desc: "переход по директориям или страницам",
      usage: "cd <path>",
      handler: ({ positional }, ctx) => {
         if (!positional[0] || positional[0] === "~") {
            ctx.setCurrentDir("/");
            ctx.navigate("/");
            return reply("Переход в корень /");
         }

         const targetPath = normalizePath(ctx.currentDir, positional[0]);
         const node = getNodeByPath(ctx.vfs, targetPath);

         if (!node) {
            return reply(
               `cd: ${positional[0]}: Нет такого файла или каталога`,
               true,
            );
         }

         if (node.type === "file") {
            if (node.targetRoute) {
               ctx.navigate(node.targetRoute);
               return reply(`Переход на страницу: ${node.targetRoute}`);
            }
            return reply(`cd: ${positional[0]}: Это файл, а не каталог`, true);
         }

         ctx.setCurrentDir(targetPath);
         return reply(`Текущая директория: ${targetPath}`);
      },
   },

   cat: {
      desc: "просмотр содержимого файла",
      usage: "cat <file>",
      handler: ({ positional }, ctx) => {
         if (!positional[0]) return reply("Ошибка: укажите имя файла", true);

         const targetPath = normalizePath(ctx.currentDir, positional[0]);
         const node = getNodeByPath(ctx.vfs, targetPath);

         if (!node) return reply(`cat: ${positional[0]}: Файл не найден`, true);
         if (node.type === "dir")
            return reply(`cat: ${positional[0]}: Это каталог`, true);

         return reply(<pre className={s.fileContent}>{node.content}</pre>);
      },
   },

   grep: {
      desc: "поиск строки в файле",
      usage: "grep <pattern> <file>",
      handler: ({ positional }, ctx) => {
         const [pattern, fileName] = positional;
         if (!pattern || !fileName)
            return reply("Использование: grep <pattern> <file>", true);

         const targetPath = normalizePath(ctx.currentDir, fileName);
         const node = getNodeByPath(ctx.vfs, targetPath);

         if (!node) return reply(`grep: ${fileName}: Файл не найден`, true);
         if (node.type === "dir")
            return reply(`grep: ${fileName}: Это каталог`, true);

         const lines = node.content.split("\n");
         const matched = lines.filter((line) => line.includes(pattern));

         if (matched.length === 0) return null;

         return reply(
            <div style={{ fontFamily: "monospace" }}>
               {matched.map((line, i) => (
                  <div key={i}>{line}</div>
               ))}
            </div>,
         );
      },
   },

   echo: {
      desc: "вывод строки в терминал или запись в файл (> / >>)",
      usage: "echo [text] [>|>> filename]",
      handler: ({ positional }, ctx) => {
         if (positional.length === 0) return reply("");

         const appendIdx = positional.indexOf(">>");
         const writeIdx = positional.indexOf(">");
         const isAppend = appendIdx !== -1;
         const redirectIdx = isAppend ? appendIdx : writeIdx;

         if (redirectIdx !== -1 && redirectIdx < positional.length - 1) {
            const textToSave = positional.slice(0, redirectIdx).join(" ");
            const fileName = positional[redirectIdx + 1];

            const parentNode = getNodeByPath(ctx.vfs, ctx.currentDir);
            if (!parentNode || parentNode.type !== "dir") {
               return reply("echo: ошибка текущей директории", true);
            }

            ctx.setVfs((prevVfs: VFSDir) => {
               const next: VFSDir = JSON.parse(JSON.stringify(prevVfs));
               const target = getNodeByPath(next, ctx.currentDir);
               if (target && target.type === "dir") {
                  const existingFile = target.children[fileName];
                  const newContent =
                     isAppend && existingFile && existingFile.type === "file"
                        ? existingFile.content + "\n" + textToSave
                        : textToSave;

                  target.children[fileName] = {
                     type: "file",
                     content: newContent,
                     meta: {
                        ...(existingFile?.meta || defaultMeta("rw-r--r--")),
                        updatedAt: Date.now(),
                        size: newContent.length,
                     },
                  };
               }
               return next;
            });

            return reply(`Записано в файл '${fileName}'`);
         }

         return reply(positional.join(" "));
      },
   },

   mkdir: {
      desc: "создание новой директории в VFS",
      usage: "mkdir <folder_name>",
      handler: ({ positional }, ctx) => {
         const folderName = positional[0];
         if (!folderName) return reply("mkdir: укажите имя директории", true);

         const parentNode = getNodeByPath(ctx.vfs, ctx.currentDir);
         if (!parentNode || parentNode.type !== "dir") {
            return reply("mkdir: ошибка текущей директории", true);
         }

         if (parentNode.children[folderName]) {
            return reply(
               `mkdir: невозможно создать директорию '${folderName}': Файл существует`,
               true,
            );
         }

         ctx.setVfs((prevVfs: any) => {
            const next = JSON.parse(JSON.stringify(prevVfs));
            const target = getNodeByPath(next, ctx.currentDir);
            if (target && target.type === "dir") {
               target.children[folderName] = {
                  type: "dir",
                  children: {},
                  meta: defaultMeta("rwxr-xr-x", 4096),
               };
            }
            return next;
         });

         return reply(`Директория '${folderName}' успешно создана`);
      },
   },

   touch: {
      desc: "создание пустого файла",
      usage: "touch <file_name>",
      handler: ({ positional }, ctx) => {
         const fileName = positional[0];
         if (!fileName) return reply("touch: укажите имя файла", true);

         const parentNode = getNodeByPath(ctx.vfs, ctx.currentDir);
         if (!parentNode || parentNode.type !== "dir") {
            return reply("touch: ошибка текущей директории", true);
         }

         ctx.setVfs((prevVfs: any) => {
            const next = JSON.parse(JSON.stringify(prevVfs));
            const target = getNodeByPath(next, ctx.currentDir);
            if (target && target.type === "dir") {
               const existing = target.children[fileName];
               target.children[fileName] = {
                  type: "file",
                  content: existing?.type === "file" ? existing.content : "",
                  meta: {
                     ...(existing?.meta || defaultMeta("rw-r--r--")),
                     updatedAt: Date.now(),
                  },
               };
            }
            return next;
         });

         return reply(`Файл '${fileName}' успешно создан`);
      },
   },

   rm: {
      desc: "удаление файла или папки",
      usage: "rm <name>",
      handler: ({ positional }, ctx) => {
         const name = positional[0];
         if (!name) return reply("rm: укажите имя файла или папки", true);

         const parentNode = getNodeByPath(ctx.vfs, ctx.currentDir);
         if (
            !parentNode ||
            parentNode.type !== "dir" ||
            !parentNode.children[name]
         ) {
            return reply(
               `rm: не удалось удалить '${name}': Нет такого файла или каталога`,
               true,
            );
         }

         ctx.setVfs((prevVfs: any) => {
            const next = JSON.parse(JSON.stringify(prevVfs));
            const target = getNodeByPath(next, ctx.currentDir);
            if (target && target.type === "dir") {
               delete target.children[name];
            }
            return next;
         });

         return reply(`Объект '${name}' удален`);
      },
   },

   date: {
      desc: "показать текущую дату и время",
      usage: "date",
      handler: () => reply(new Date().toLocaleString()),
   },

   "switch-theme": {
      desc: "смена темы оформления",
      usage: "switch-theme <auto|custom> [purple|lightblue]",
      handler: ({ positional, flags }, ctx) => {
         const mode =
            (flags["mode"] as string) ||
            (flags["m"] as string) ||
            positional[0]?.toLowerCase();
         const customTheme =
            (flags["theme"] as string) ||
            (flags["t"] as string) ||
            positional[1]?.toLowerCase();

         if (mode === "auto") {
            const res = ctx.applyTheme("auto");
            return reply(res.msg, !res.success);
         }

         if (mode === "custom") {
            if (!customTheme) {
               return reply(
                  'Ошибка: Укажите тему: "purple" или "lightblue" (-t / --theme).',
                  true,
               );
            }
            if (customTheme !== "purple" && customTheme !== "lightblue") {
               return reply(
                  `Ошибка: Недопустимая тема "${customTheme}". Доступно: purple, lightblue.`,
                  true,
               );
            }
            const res = ctx.applyTheme(customTheme);
            return reply(res.msg, !res.success);
         }

         return reply(
            "Использование: switch-theme <auto|custom> [purple|lightblue]",
            true,
         );
      },
   },

   "short-info": {
      desc: "краткая сводка возможностей консоли",
      usage: "short-info",
      handler: () => ({
         output: (
            <div className={s.infoBlock}>
               <p>
                  <strong>Возможности kinako.sh:</strong>
               </p>
               <ul>
                  <li>
                     <strong>Файловая система (VFS):</strong> просмотр (
                     <code>ls</code>, <code>ls -l</code>), навигация (
                     <code>cd</code>), чтение (<code>cat</code>), поиск (
                     <code>grep</code>), создание (<code>mkdir</code>,{" "}
                     <code>touch</code>), запись (<code>echo &gt;</code> /{" "}
                     <code>&gt;&gt;</code>) и удаление (<code>rm</code>).
                  </li>
                  <li>
                     <strong>Навигация и роутинг:</strong>{" "}
                     <code>cd &lt;route&gt;</code> умеет перенаправлять на
                     страницы приложения через React Router.
                  </li>
                  <li>
                     <strong>Пайплайны:</strong> выполнение цепочек команд с
                     помощью операторов <code>&amp;&amp;</code> и <code>;</code>
                     .
                  </li>
                  <li>
                     <strong>Персонализация:</strong> кастомизация тем
                     оформления (<code>switch-theme</code>) и вывод системной
                     информации (<code>neofetch</code>).
                  </li>
               </ul>
            </div>
         ),
      }),
   },

   clear: {
      desc: "очистить терминал",
      usage: "clear",
      handler: (_, ctx) => {
         ctx.clearLogs();
         return null;
      },
   },
};
