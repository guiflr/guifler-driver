import { missingParamError } from '../../../shared/errors/missingParamsError';
import { DocumentModel } from '../domain/models/DocumentModel';
import { CreateDocument } from '../domain/useCases/CreateDocument';
import { DocumentValidator } from '../presentation/DocumentValidator';
import { DocumentDTO, DocumentRepository } from '../repositories/DocumentRepository';

export class CreateDocumentService implements CreateDocument {
  constructor(
    private validator: DocumentValidator,
    private documentRepository: DocumentRepository
  ) {}

  async create(data: DocumentModel): Promise<DocumentDTO> {
    const validated = this.validator.validator(data);

    if (!validated.isValid) {
      throw missingParamError(validated.error);
    }

    const document = await this.documentRepository.store(data);

    return document;
  }
}
