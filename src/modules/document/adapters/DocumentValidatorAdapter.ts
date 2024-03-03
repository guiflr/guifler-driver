import { AddDocumentSchema } from '../helpers/AddDocumentSchema';
import { DocumentModel } from '../domain/models/DocumentModel';
import { DocumentValidator, DocumentValidatorResponse } from '../presentation/DocumentValidator';
import { getZodErrors } from '../../../shared/helpers/getZodErrors';

export class DocumentValidatorAdapter implements DocumentValidator {
  validator (document: DocumentModel): DocumentValidatorResponse {
    const validation = AddDocumentSchema.safeParse(document);

    if (validation.success) {
      return { error: '', isValid: true };
    }

    const error = JSON.stringify(validation.error);

    const fieldsError = getZodErrors(error);

    return { isValid: false, error: fieldsError };
  }
}
