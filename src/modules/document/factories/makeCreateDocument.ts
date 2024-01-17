import { DocumentValidatorAdapter } from '../adapters/DocumentValidatorAdapter';
import { DocumentModel } from '../domain/models/DocumentModel';
import { PrismaDocumentRepository } from '../infra/prisma/repositories/PrismaDocumentRepository';
import { PrismaUserRepository } from '../infra/prisma/repositories/PrismaUserRepository';
import { CreateDocumentService } from '../service/CreateDocumentService';

export async function makeCreateDocument(data: DocumentModel) {
  const documentRepo = new PrismaDocumentRepository();
  const documentValidator = new DocumentValidatorAdapter();
  const userRepository = new PrismaUserRepository();

  const createDocument = new CreateDocumentService(documentValidator, documentRepo, userRepository);

  const document = await createDocument.create(data);

  return document;
}
