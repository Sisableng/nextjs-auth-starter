import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

export const saltAndHashPassword = (password: string): string => {
  const salt = genSaltSync(12);
  const hash = hashSync(password, salt);
  return hash;
};

export const compareHashPassword = (
  password: string,
  hashedPassword: string,
): boolean => {
  const result = compareSync(password, hashedPassword);
  return result;
};
