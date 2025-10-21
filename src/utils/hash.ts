import * as bcrypt from 'bcryptjs';

export const hashData = async (data: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(data, salt);
}

export const compareHash = async (data: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(data, hash);
}