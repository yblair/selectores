import { useId } from "react";

export const useUniqueId = (prefix = "") => {
  const id = useId();
  return prefix ? `${prefix}-${id}` : id;
};
