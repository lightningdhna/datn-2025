const ACCESS_TOKEN_KEY = "accessToken";
const SUPPLIER_ID_KEY = "supplierId"; // Key mô tả
const DROPSHIPPER_ID_KEY = "dropshipperId"; // Key mô tả

const DEFAULT_SUPPLIER_ID = "e551beaa-555d-48b1-bfe5-2f764f4aa995"; // Giá trị mặc định
const DEFAULT_DROPSHIPPER_ID = "0aabf77e-bee9-4913-a1a6-30e793a349a5"; // Giá trị mặc định

// Access Token
export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

// Supplier ID
export const setSupplierId = (id: string): void => {
  localStorage.setItem(SUPPLIER_ID_KEY, id);
};

export const getSupplierId = (): string | null => {
  // Trả về giá trị từ localStorage HOẶC giá trị mặc định
  return localStorage.getItem(SUPPLIER_ID_KEY) ?? DEFAULT_SUPPLIER_ID;
};

export const removeSupplierId = (): void => {
  localStorage.removeItem(SUPPLIER_ID_KEY);
};

// Dropshipper ID
export const setDropshipperId = (id: string): void => {
  localStorage.setItem(DROPSHIPPER_ID_KEY, id);
};

export const getDropshipperId = (): string | null => {
  // Trả về giá trị từ localStorage HOẶC giá trị mặc định
  return localStorage.getItem(DROPSHIPPER_ID_KEY) ?? DEFAULT_DROPSHIPPER_ID;
};

export const removeDropshipperId = (): void => {
  localStorage.removeItem(DROPSHIPPER_ID_KEY);
};

// Clear all relevant storage (e.g., on logout)
export const clearAuthStorage = (): void => {
  removeAccessToken();
  removeSupplierId();
  removeDropshipperId();
  // Lưu ý: Việc clear này sẽ xóa cả ID đã được set thủ công.
  // Nếu bạn muốn giữ lại ID mặc định sau khi clear, bạn cần logic phức tạp hơn
  // hoặc đơn giản là không gọi clearAuthStorage trong quá trình dev nếu không cần thiết.
};
