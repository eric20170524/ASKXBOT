export type Tab = 'source' | 'changes' | 'terminal' | 'browser';

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}
