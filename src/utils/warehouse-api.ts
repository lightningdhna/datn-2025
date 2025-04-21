import axios from "axios";
import { getSupplierId } from "./local-storage"; // Import hàm lấy supplierId

// TODO: Định nghĩa các interface/type cho CreateWarehouseDto, UpdateWarehouseDto, và UpdateWarehouseProductDto
// interface CreateWarehouseDto { ... }
// interface UpdateWarehouseDto { ... }
// interface UpdateWarehouseProductDto { ... }

// const BASE_URL = "https://lidh-final-api.vercel.app"; // URL production (nếu có)
import { URL } from "./api-config";

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
 * Tạo kho mới cho nhà cung cấp.
 * Endpoint: POST /warehouse/supplier/:supplierId
 * @param supplierId ID của nhà cung cấp
 * @param warehouseData Dữ liệu kho mới (CreateWarehouseDto)
 */
export const createWarehouse = async (
  supplierId: string,
  warehouseData: Record<string, any> // TODO: Thay Record<string, any> bằng CreateWarehouseDto
) => {
  try {
    const response = await apiClient.post(
      `/warehouse/supplier/${supplierId}`,
      warehouseData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi tạo kho mới.");
  }
};

/**
 * Tạo kho mới cho nhà cung cấp hiện tại (lấy supplierId từ local storage).
 * Endpoint: POST /warehouse/supplier/:supplierId
 * @param warehouseData Dữ liệu kho mới (CreateWarehouseDto)
 */
export const createWarehouseForCurrentSupplier = async (
  warehouseData: Record<string, any> // TODO: Thay Record<string, any> bằng CreateWarehouseDto
) => {
  console.log("second test : ", warehouseData);

  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp để tạo kho.",
      status: null,
    };
  }

  try {
    const response = await apiClient.post(
      `/warehouse/supplier/${supplierId}`,
      warehouseData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi tạo kho mới.");
  }
};

/**
 * Lấy danh sách tất cả kho.
 * Endpoint: GET /warehouse
 */
export const getAllWarehouses = async () => {
  try {
    const response = await apiClient.get("/warehouse");
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh sách tất cả kho.");
  }
};

/**
 * Lấy danh sách kho theo ID nhà cung cấp.
 * Endpoint: GET /warehouse/supplier/:supplierId
 * @param supplierId ID của nhà cung cấp
 */
export const getWarehousesBySupplier = async (supplierId: string) => {
  try {
    const response = await apiClient.get(`/warehouse/supplier/${supplierId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh sách kho theo nhà cung cấp.");
  }
};

/**
 * Lấy danh sách kho của nhà cung cấp hiện tại (lấy supplierId từ local storage).
 * Endpoint: GET /warehouse/supplier/:supplierId
 */
export const getWarehousesForCurrentSupplier = async () => {
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
    const response = await apiClient.get(`/warehouse/supplier/${supplierId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy danh sách kho của nhà cung cấp hiện tại."
    );
  }
};

/**
 * Lấy danh sách kho có chứa sản phẩm với số lượng > 0.
 * Endpoint: GET /warehouse/by-product/:productId
 * @param productId ID của sản phẩm
 */
export const getWarehousesByProduct = async (productId: string) => {
  try {
    const response = await apiClient.get(`/warehouse/by-product/${productId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh sách kho theo sản phẩm.");
  }
};

/**
 * Lấy thông tin chi tiết của một kho.
 * Endpoint: GET /warehouse/:id
 * @param warehouseId ID của kho
 */
export const getWarehouseById = async (warehouseId: string) => {
  try {
    const response = await apiClient.get(`/warehouse/${warehouseId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy thông tin chi tiết kho.");
  }
};

/**
 * Lấy thông tin tổng hợp về một kho.
 * Endpoint: GET /warehouse/:id/summary
 * @param warehouseId ID của kho
 */
export const getWarehouseSummary = async (warehouseId: string) => {
  try {
    const response = await apiClient.get(`/warehouse/${warehouseId}/summary`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy thông tin tổng hợp của kho.");
  }
};

/**
 * Cập nhật thông tin kho.
 * Endpoint: PATCH /warehouse/:id
 * @param warehouseId ID của kho cần cập nhật
 * @param updatedData Dữ liệu cập nhật (UpdateWarehouseDto)
 */
export const updateWarehouse = async (
  warehouseId: string,
  updatedData: Record<string, any> // TODO: Thay Record<string, any> bằng UpdateWarehouseDto
) => {
  try {
    const response = await apiClient.patch(
      `/warehouse/${warehouseId}`,
      updatedData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi cập nhật thông tin kho.");
  }
};

/**
 * Cập nhật số lượng một mặt hàng trong kho.
 * Endpoint: PATCH /warehouse/:id/product/:productId
 * @param warehouseId ID của kho
 * @param productId ID của sản phẩm
 * @param updateData Dữ liệu cập nhật (UpdateWarehouseProductDto)
 */
export const updateProductQuantity = async (
  warehouseId: string,
  productId: string,
  updateData: Record<string, any> // TODO: Thay Record<string, any> bằng UpdateWarehouseProductDto
) => {
  try {
    const response = await apiClient.patch(
      `/warehouse/${warehouseId}/product/${productId}`,
      updateData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi cập nhật số lượng sản phẩm trong kho.");
  }
};

/**
 * Xóa kho.
 * Endpoint: DELETE /warehouse/:id
 * @param warehouseId ID của kho cần xóa
 */
export const deleteWarehouse = async (warehouseId: string) => {
  try {
    // DELETE thường trả về status 204 No Content, không có body data
    await apiClient.delete(`/warehouse/${warehouseId}`);
    return { success: true, data: null }; // Trả về success true nếu không có lỗi
  } catch (error) {
    return handleError(error, "Lỗi khi xóa kho.");
  }
};
