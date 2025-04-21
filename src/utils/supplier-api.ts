import axios from "axios";
import { getSupplierId } from "./local-storage"; // Import hàm lấy supplierId

// TODO: Định nghĩa các interface/type cho CreateSupplierDto, UpdateSupplierDto và Supplier
// interface CreateSupplierDto { ... }
// interface UpdateSupplierDto { ... }
// interface Supplier { ... }

// const BASE_URL = "https://lidh-final-api.vercel.app"; // URL production (nếu có)
import { URL } from './api-config';
const apiClient = axios.create({
  baseURL: URL, // Base URL trỏ đến gốc API
  timeout: 100000, // Thời gian timeout là 100 giây
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Helper function for error handling ---
const handleError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      success: false,
      error: error.response.data || "Unknown server error",
      message: error.response.data?.message || defaultMessage,
      status: error.response.status,
    };
  }
  return {
    success: false,
    error: "An unexpected error occurred.",
    message: `Lỗi không xác định: ${defaultMessage}`,
    status: null,
  };
};

// --- API Functions ---

/**
 * Lấy danh sách tất cả nhà cung cấp.
 * Endpoint: GET /supplier
 */
export const getAllSuppliers = async () => {
  try {
    const response = await apiClient.get("/supplier");
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh sách tất cả nhà cung cấp.");
  }
};

/**
 * Lấy thông tin nhà cung cấp theo ID kho.
 * Endpoint: GET /supplier/by-warehouse/:warehouseId
 * @param warehouseId ID của kho
 */
export const getSupplierByWarehouseId = async (warehouseId: string) => {
  try {
    const response = await apiClient.get(
      `/supplier/by-warehouse/${warehouseId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy thông tin nhà cung cấp theo ID kho."
    );
  }
};

/**
 * Lấy thông tin nhà cung cấp theo ID sản phẩm.
 * Endpoint: GET /supplier/by-product/:productId
 * @param productId ID của sản phẩm
 */
export const getSupplierByProductId = async (productId: string) => {
  try {
    const response = await apiClient.get(`/supplier/by-product/${productId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy thông tin nhà cung cấp theo ID sản phẩm."
    );
  }
};

/**
 * Lấy danh sách nhà cung cấp theo ID dropshipper.
 * Endpoint: GET /supplier/by-dropshipper/:dropshipperId
 * @param dropshipperId ID của dropshipper
 */
export const getSuppliersByDropshipperId = async (dropshipperId: string) => {
  try {
    const response = await apiClient.get(
      `/supplier/by-dropshipper/${dropshipperId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy danh sách nhà cung cấp theo ID dropshipper."
    );
  }
};

/**
 * Lấy thông tin chi tiết của nhà cung cấp theo ID.
 * Endpoint: GET /supplier/:id
 * @param supplierId ID của nhà cung cấp
 */
export const getSupplierById = async (supplierId: string) => {
  try {
    const response = await apiClient.get(`/supplier/${supplierId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy thông tin chi tiết nhà cung cấp.");
  }
};

/**
 * Lấy thông tin nhà cung cấp hiện tại (lấy supplierId từ local storage).
 * Endpoint: GET /supplier/:id
 */
export const getCurrentSupplierInfo = async () => {
  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp.",
      status: null,
    };
  }

  try {
    const response = await apiClient.get(`/supplier/${supplierId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy thông tin nhà cung cấp hiện tại.");
  }
};

/**
 * Cập nhật thông tin nhà cung cấp.
 * Endpoint: PATCH /supplier/:id
 * @param supplierId ID của nhà cung cấp cần cập nhật
 * @param updatedData Dữ liệu cập nhật (UpdateSupplierDto)
 */
export const updateSupplier = async (
  supplierId: string,
  updatedData: Record<string, any> // TODO: Thay Record<string, any> bằng UpdateSupplierDto
) => {
  try {
    const response = await apiClient.patch(
      `/supplier/${supplierId}`,
      updatedData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi cập nhật thông tin nhà cung cấp.");
  }
};

/**
 * Cập nhật thông tin nhà cung cấp hiện tại (lấy supplierId từ local storage).
 * Endpoint: PATCH /supplier/:id
 * @param updatedData Dữ liệu cập nhật (UpdateSupplierDto)
 */
export const updateCurrentSupplier = async (
  updatedData: Record<string, any> // TODO: Thay Record<string, any> bằng UpdateSupplierDto
) => {
  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp để cập nhật thông tin.",
      status: null,
    };
  }

  try {
    const response = await apiClient.patch(
      `/supplier/${supplierId}`,
      updatedData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi cập nhật thông tin nhà cung cấp hiện tại."
    );
  }
};

/**
 * Tạo nhà cung cấp mới (API này không cần thiết theo yêu cầu).
 * Endpoint: POST /supplier
 * @param supplierData Dữ liệu nhà cung cấp mới (CreateSupplierDto)
 */
export const createSupplier = async (
  supplierData: Record<string, any> // TODO: Thay Record<string, any> bằng CreateSupplierDto
) => {
  try {
    const response = await apiClient.post("/supplier", supplierData);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi tạo nhà cung cấp mới.");
  }
};

/**
 * Xóa nhà cung cấp theo ID (API này không cần thiết theo yêu cầu).
 * Endpoint: DELETE /supplier/:id
 * @param supplierId ID của nhà cung cấp cần xóa
 */
export const deleteSupplier = async (supplierId: string) => {
  try {
    // DELETE thường trả về status 204 No Content, không có body data
    await apiClient.delete(`/supplier/${supplierId}`);
    return { success: true, data: null }; // Trả về success true nếu không có lỗi
  } catch (error) {
    return handleError(error, "Lỗi khi xóa nhà cung cấp.");
  }
};

export const getSupplierSummary = async (supplierId: string) => {
  try {
    const response = await apiClient.get(`/supplier/${supplierId}/summary`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy thông tin tổng hợp của nhà cung cấp."
    );
  }
};

/**
 * Lấy thông tin tổng hợp (dashboard) về nhà cung cấp hiện tại (lấy supplierId từ local storage).
 * Endpoint: GET /supplier/:id/summary
 */
export const getCurrentSupplierSummary = async () => {
  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp.",
      status: null,
    };
  }

  try {
    const response = await apiClient.get(`/supplier/${supplierId}/summary`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy thông tin tổng hợp của nhà cung cấp hiện tại."
    );
  }
};
