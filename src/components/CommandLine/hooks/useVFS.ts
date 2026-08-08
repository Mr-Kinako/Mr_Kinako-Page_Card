// src/components/CommandLine/vfs/types.ts

export interface VFSMetadata {
   createdAt: number;
   updatedAt: number;
   owner: string;
   permissions: string; // например, 'rwxr-xr-x'
   size: number;
}

export interface VFSFile {
   type: "file";
   content: string;
   meta: VFSMetadata;
   targetRoute?: string;
   isExecutable?: boolean;
}

export interface VFSDir {
   type: "dir";
   children: Record<string, VFSNode>;
   meta: VFSMetadata;
}

export type VFSNode = VFSFile | VFSDir;