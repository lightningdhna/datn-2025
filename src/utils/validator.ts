export const requiredValidator = (value: string | null | undefined) => {
  return !!value || "Trường này là bắt buộc";
};
