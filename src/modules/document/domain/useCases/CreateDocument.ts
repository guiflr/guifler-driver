import { DocumentDTO } from '../../repositories/DocumentRepository';
import { DocumentModel } from '../models/DocumentModel';

export interface CreateDocument {
  create(data: DocumentModel): Promise<DocumentDTO>;
}
