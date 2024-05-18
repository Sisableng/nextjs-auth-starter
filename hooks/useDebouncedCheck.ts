import { useDebouncedCallback } from "use-debounce";
import useCheckUser from "./zustand/store/useCheckUser";

const useDebouncedCheck = (
  type: "username" | "email",
  currentValue: string,
) => {
  const { handleCheck } = useCheckUser();

  return useDebouncedCallback(
    (value: string) => handleCheck(type, value, currentValue),
    1500,
  );
};

export default useDebouncedCheck;
