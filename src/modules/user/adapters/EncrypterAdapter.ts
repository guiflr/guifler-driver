import bcrypt from 'bcrypt';
import { Encrypter } from '../presentation/Encrypter';

export class EncrypterAdapter implements Encrypter {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }

  async isValid(value: string, hashedValue: string): Promise<boolean> {
    const isValidValue = await bcrypt.compare(value, hashedValue);

    return isValidValue;
  }

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);

    return hash;
  }
}
