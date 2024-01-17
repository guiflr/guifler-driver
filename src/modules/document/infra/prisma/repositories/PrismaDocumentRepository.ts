import prisma from '../../../../../shared/infra/prisma/client';
import { DocumentModel } from '../../../domain/models/DocumentModel';
import { DocumentDTO, DocumentRepository } from '../../../repositories/DocumentRepository';

export class PrismaDocumentRepository implements DocumentRepository {
  async store(data: DocumentModel): Promise<DocumentDTO> {
    const document = await prisma.document.create({ data: data });

    return document;
  }
}
