import { DocumentModel } from '../domain/models/DocumentModel';

export type DocumentValidatorResponse = {
  isValid: boolean;
  error: string;
};

export interface DocumentValidator {
  validator(document: DocumentModel): DocumentValidatorResponse;
}
