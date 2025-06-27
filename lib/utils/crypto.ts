import crypto from 'crypto';

export async function crytoSignature(
  phrase: string,
  algorithm = "sha512",
  encoding = "hex"
): Promise<string | undefined> {
  try {
    return crypto
      .createHash(algorithm)
      .update(phrase)
      .digest(encoding); 
  } catch (error) {
    return undefined;
  }
}