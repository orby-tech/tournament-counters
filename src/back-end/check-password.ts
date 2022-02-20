import { UserRule } from "../common/models/user.model";

const ROOT_PASSWORD = "123";

export const getUserRuleByPassword = (password: string): UserRule | null => {
  if (String(password) === ROOT_PASSWORD) {
    return "root";
  }
  return null;
};
