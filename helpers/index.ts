import * as crypto from 'crypto';

export const aesEncrypt = (text: string, iv: Buffer): Buffer => {
  const key = Buffer.from(process.env.AES_KEY);
  const ciphertext = crypto.createCipheriv('aes-256-ctr', Buffer.from(key), iv);
  const encrypt = ciphertext.update(text);
  return Buffer.concat([encrypt, ciphertext.final()]);
};

export const aesDecrypt = (encryptedText: Buffer, iv: Buffer): string => {
  const key = Buffer.from(process.env.AES_KEY);
  const iv2 = Buffer.from(iv.toString('hex'), 'hex');
  const encrypted = Buffer.from(encryptedText.toString('hex'), 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    Buffer.from(key),
    iv2,
  );
  const decrypted = decipher.update(encrypted);
  const final = Buffer.concat([decrypted, decipher.final()]);
  return final.toString();
};
