import { DocumentValidatorAdapter } from '../src/modules/document/adapters/DocumentValidatorAdapter';
import { DocumentModel } from '../src/modules/document/domain/models/DocumentModel';

describe('DocumentValidatorAdapter', () => {
  const documentValidator = new DocumentValidatorAdapter();
  test('Should return error when any field is missed', () => {
    const response = documentValidator.validator({} as DocumentModel);

    expect(response.isValid).toBe(false);
    expect(response.error).toEqual(['name required', 'type is required', 'user id is required']);
  });

  test('Should return error when type is invalid', () => {
    const response = documentValidator.validator({
      name: 'gui',
      user_id: 1,
      type: 'test',
    } as any as DocumentModel);

    expect(response.isValid).toBe(false);
    expect(response.error).toEqual([
      "Invalid enum value. Expected 'file' | 'folder', received 'test'",
    ]);
  });
});
