export type DocumentModel = {
  name: string;
  type: 'file' | 'folder';
  owner_id: number | null;
};
