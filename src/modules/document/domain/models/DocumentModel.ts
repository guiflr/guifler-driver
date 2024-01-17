export type DocumentModel = {
  name: string;
  type: 'file' | 'folder';
  owner_id: number | null;
  user_id: number;
};
