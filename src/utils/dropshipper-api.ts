import axios from "axios";
import { getDropshipperId } from "./local-storage"; // Import hàm lấy dropshipperId

// TODO: Định nghĩa các interface/type cho CreateDropshipperDto, UpdateDropshipperDto
// interface CreateDropshipperDto { ... }
// interface UpdateDropshipperDto { ... }
// interface Dropshipper { ... }


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
 * Lấy danh sách tất cả dropshipper.
 * Endpoint: GET /dropshipper
 */
export const getAllDropshippers = async () => {
  try {
    const response = await apiClient.get("/dropshipper");
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh sách tất cả dropshipper.");
  }
};

/**
 * Lấy danh sách dropshipper theo sản phẩm cụ thể.
 * Endpoint: GET /dropshipper/by-product/:productId
 * @param productId ID của sản phẩm
 */
export const getDropshippersByProductId = async (productId: string) => {
  try {
    const response = await apiClient.get(
      `/dropshipper/by-product/${productId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy danh sách dropshipper theo sản phẩm."
    );
  }
};

/**
 * Lấy danh sách dropshipper theo nhà cung cấp.
 * Endpoint: GET /dropshipper/by-supplier/:supplierId
 * @param supplierId ID của nhà cung cấp
 */
export const getDropshippersBySupplierId = async (supplierId: string) => {
  try {
    const response = await apiClient.get(
      `/dropshipper/by-supplier/${supplierId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy danh sách dropshipper theo nhà cung cấp."
    );
  }
};

/**
 * Lấy thông tin chi tiết của dropshipper theo ID.
 * Endpoint: GET /dropshipper/:id
 * @param dropshipperId ID của dropshipper
 */
export const getDropshipperById = async (dropshipperId: string) => {
  try {
    const response = await apiClient.get(`/dropshipper/${dropshipperId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy thông tin chi tiết dropshipper.");
  }
};

/**
 * Lấy thông tin dropshipper hiện tại (lấy dropshipperId từ local storage).
 * Endpoint: GET /dropshipper/:id
 */
export const getCurrentDropshipperInfo = async () => {
  const dropshipperId = getDropshipperId();
  if (!dropshipperId) {
    return {
      success: false,
      error: "Dropshipper ID not found in local storage.",
      message: "Không tìm thấy ID dropshipper.",
      status: null,
    };
  }

  try {
    const response = await apiClient.get(`/dropshipper/${dropshipperId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy thông tin dropshipper hiện tại.");
  }
};

/**
 * Lấy thông tin tổng hợp về dropshipper.
 * Endpoint: GET /dropshipper/:id/summary
 * @param dropshipperId ID của dropshipper
 */
export const getDropshipperSummary = async (dropshipperId: string) => {
  try {
    const response = await apiClient.get(
      `/dropshipper/${dropshipperId}/summary`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy thông tin tổng hợp của dropshipper."
    );
  }
};

/**
 * Lấy thông tin tổng hợp về dropshipper hiện tại (lấy dropshipperId từ local storage).
 * Endpoint: GET /dropshipper/:id/summary
 */
export const getCurrentDropshipperSummary = async () => {
  const dropshipperId = getDropshipperId();
  if (!dropshipperId) {
    return {
      success: false,
      error: "Dropshipper ID not found in local storage.",
      message: "Không tìm thấy ID dropshipper.",
      status: null,
    };
  }

  try {
    const response = await apiClient.get(
      `/dropshipper/${dropshipperId}/summary`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy thông tin tổng hợp của dropshipper hiện tại."
    );
  }
};

/**
 * Lấy thông tin tổng hợp về dropshipper với một nhà cung cấp cụ thể.
 * Endpoint: GET /dropshipper/:id/supplier/:supplierId/summary
 * @param dropshipperId ID của dropshipper
 * @param supplierId ID của nhà cung cấp
 */
export const getDropshipperSupplierSummary = async (
  dropshipperId: string,
  supplierId: string
) => {
  try {
    const response = await apiClient.get(
      `/dropshipper/${dropshipperId}/supplier/${supplierId}/summary`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy thông tin tổng hợp của dropshipper với nhà cung cấp."
    );
  }
};

/**
 * Lấy thông tin tổng hợp về dropshipper hiện tại với một nhà cung cấp cụ thể.
 * Endpoint: GET /dropshipper/:id/supplier/:supplierId/summary
 * @param supplierId ID của nhà cung cấp
 */
export const getCurrentDropshipperSupplierSummary = async (
  supplierId: string
) => {
  const dropshipperId = getDropshipperId();
  if (!dropshipperId) {
    return {
      success: false,
      error: "Dropshipper ID not found in local storage.",
      message: "Không tìm thấy ID dropshipper.",
      status: null,
    };
  }

  try {
    const response = await apiClient.get(
      `/dropshipper/${dropshipperId}/supplier/${supplierId}/summary`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy thông tin tổng hợp của dropshipper hiện tại với nhà cung cấp."
    );
  }
};

/**
 * Cập nhật thông tin dropshipper.
 * Endpoint: PATCH /dropshipper/:id
 * @param dropshipperId ID của dropshipper cần cập nhật
 * @param updatedData Dữ liệu cập nhật (UpdateDropshipperDto)
 */
export const updateDropshipper = async (
  dropshipperId: string,
  updatedData: Record<string, any> // TODO: Thay Record<string, any> bằng UpdateDropshipperDto
) => {
  try {
    const response = await apiClient.patch(
      `/dropshipper/${dropshipperId}`,
      updatedData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi cập nhật thông tin dropshipper.");
  }
};

/**
 * Cập nhật thông tin dropshipper hiện tại (lấy dropshipperId từ local storage).
 * Endpoint: PATCH /dropshipper/:id
 * @param updatedData Dữ liệu cập nhật (UpdateDropshipperDto)
 */
export const updateCurrentDropshipper = async (
  updatedData: Record<string, any> // TODO: Thay Record<string, any> bằng UpdateDropshipperDto
) => {
  const dropshipperId = getDropshipperId();
  if (!dropshipperId) {
    return {
      success: false,
      error: "Dropshipper ID not found in local storage.",
      message: "Không tìm thấy ID dropshipper để cập nhật thông tin.",
      status: null,
    };
  }

  try {
    const response = await apiClient.patch(
      `/dropshipper/${dropshipperId}`,
      updatedData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi cập nhật thông tin dropshipper hiện tại."
    );
  }
};

/**
 * Tạo dropshipper mới.
 * Endpoint: POST /dropshipper
 * @param dropshipperData Dữ liệu dropshipper mới (CreateDropshipperDto)
 */
export const createDropshipper = async (
  dropshipperData: Record<string, any> // TODO: Thay Record<string, any> bằng CreateDropshipperDto
) => {
  try {
    const response = await apiClient.post("/dropshipper", dropshipperData);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi tạo dropshipper mới.");
  }
};

/**
 * Xóa dropshipper.
 * Endpoint: DELETE /dropshipper/:id
 * @param dropshipperId ID của dropshipper cần xóa
 */
export const deleteDropshipper = async (dropshipperId: string) => {
  try {
    // DELETE thường trả về status 204 No Content, không có body data
    await apiClient.delete(`/dropshipper/${dropshipperId}`);
    return { success: true, data: null }; // Trả về success true nếu không có lỗi
  } catch (error) {
    return handleError(error, "Lỗi khi xóa dropshipper.");
  }
};
