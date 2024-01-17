import { missingParamError } from '../../../shared/errors/missingParamsError';
import { GetUserDocument } from '../domain/useCases/GetUserDocument';
import { DocumentDTO, DocumentRepository } from '../repositories/DocumentRepository';
import { UserRepository } from '../repositories/UserRepository';

export class GetUserDocumentService implements GetUserDocument {
  constructor(
    private userRepository: UserRepository,
    private document: DocumentRepository
  ) {}
  async getAllDocuments(userId: number): Promise<DocumentDTO[]> {
    if (!userId) {
      throw missingParamError('user id not sent');
    }

    const user = await this.userRepository.get(userId);

    if (!user) {
      throw missingParamError('user not found');
    }

    const documents = await this.document.getByUser(userId);

    return documents;
  }
}
