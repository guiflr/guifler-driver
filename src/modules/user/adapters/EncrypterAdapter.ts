import bcrypt from 'bcrypt';
import { Encrypter } from '../presentation/Encrypter';

export class EncrypterAdapter implements Encrypter {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);

    return hash;
  }
}
