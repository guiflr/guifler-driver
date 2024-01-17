export interface Encrypter {
  encrypt(value: string): Promise<string>;
  isValid(value: string, hashedValue: string): Promise<boolean>;
}
