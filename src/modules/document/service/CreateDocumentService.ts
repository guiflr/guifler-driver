import { missingParamError } from '../../../shared/errors/missingParamsError';
import { DocumentModel } from '../domain/models/DocumentModel';
import { CreateDocument } from '../domain/useCases/CreateDocument';
import { DocumentValidator } from '../presentation/DocumentValidator';
import { DocumentDTO, DocumentRepository } from '../repositories/DocumentRepository';
import { UserRepository } from '../repositories/UserRepository';

export class CreateDocumentService implements CreateDocument {
  constructor(
    private validator: DocumentValidator,
    private documentRepository: DocumentRepository,
    private userRepository: UserRepository
  ) {}

  async create(data: DocumentModel): Promise<DocumentDTO> {
    const validated = this.validator.validator(data);

    if (!validated.isValid) {
      throw missingParamError(validated.error);
    }

    const user = await this.userRepository.get(data.user_id);

    if (!user) {
      throw missingParamError('user is not valid');
    }

    const document = await this.documentRepository.store(data);

    return document;
  }
}
