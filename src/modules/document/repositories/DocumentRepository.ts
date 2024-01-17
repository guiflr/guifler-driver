import { DocumentModel } from '../domain/models/DocumentModel';

export interface DocumentDTO extends DocumentModel {
  id: number;
}

export interface DocumentRepository {
  store(user: DocumentModel): Promise<DocumentDTO>;
  getByUser(userId: number): Promise<DocumentDTO[]>;
}
