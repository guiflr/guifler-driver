import { PrismaDocumentRepository } from '../infra/prisma/repositories/PrismaDocumentRepository';
import { PrismaUserRepository } from '../infra/prisma/repositories/PrismaUserRepository';
import { GetUserDocumentService } from '../service/GetUserDocumentService';

export function makeGetAllDocuments(userId: number) {
  const userRepo = new PrismaUserRepository();
  const documentRepo = new PrismaDocumentRepository();

  const getDocuments = new GetUserDocumentService(userRepo, documentRepo);

  return getDocuments.getAllDocuments(userId);
}
