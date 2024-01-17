import { UserDTO } from '../../../user/repositories/UserRepository';
import { DocumentDTO } from '../../repositories/DocumentRepository';

export interface GetUserDocument {
  getAllDocuments(userId: number): Promise<DocumentDTO[]>;
}
