import { checkUser } from "@/app/(dashboard)/dashboard/profile/actions";
import { create } from "zustand";

type CheckType = "username" | "email";
type UserCheckStatus =
  | "username"
  | "email"
  | "usernameChecked"
  | "emailChecked"
  | null;

interface StoreState {
  isChecking: UserCheckStatus;
  isUsernameExists: boolean;
  isEmailExists: boolean;
  setIsChecking: (status: UserCheckStatus) => void;
  setIsUsernameExists: (exists: boolean) => void;
  setIsEmailExists: (exists: boolean) => void;
  handleCheck: (
    type: CheckType,
    value: string,
    currentValue: string,
  ) => Promise<void>;
}

const useCheckUser = create<StoreState>((set) => ({
  isChecking: null,
  isUsernameExists: false,
  isEmailExists: false,

  setIsChecking: (status) => set({ isChecking: status }),
  setIsUsernameExists: (exists) => set({ isUsernameExists: exists }),
  setIsEmailExists: (exists) => set({ isEmailExists: exists }),

  handleCheck: async (type, value, currentValue) => {
    if (value !== currentValue && value.length !== 0) {
      if (type === "email" && value.startsWith("@")) {
        set({ isChecking: null });
        return;
      }

      set({ isChecking: type });
      try {
        const exists = await checkUser(type, value);
        if (type === "username") {
          set({ isUsernameExists: exists ? true : false });
        } else if (type === "email") {
          set({ isEmailExists: exists ? true : false });
        }
      } catch (error) {
        console.log(error);
      }
      set({ isChecking: `${type}Checked` as UserCheckStatus });
    } else {
      set({ isChecking: null });
    }
  },
}));

export default useCheckUser;
