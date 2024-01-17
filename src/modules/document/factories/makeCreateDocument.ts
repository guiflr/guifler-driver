import { DocumentValidatorAdapter } from '../adapters/DocumentValidatorAdapter';
import { DocumentModel } from '../domain/models/DocumentModel';
import { PrismaDocumentRepository } from '../infra/prisma/repositories/PrismaDocumentRepository';
import { CreateDocumentService } from '../service/CreateDocumentService';

export async function makeCreateDocument(data: DocumentModel) {
  const documentRepo = new PrismaDocumentRepository();
  const documentValidator = new DocumentValidatorAdapter();

  const createDocument = new CreateDocumentService(documentValidator, documentRepo);

  const document = await createDocument.create(data);

  return document;
}
