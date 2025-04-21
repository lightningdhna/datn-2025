import axios from "axios";
import { getSupplierId } from "./local-storage"; // Import hàm lấy supplierId

// TODO: Định nghĩa các interface/type cho CreateProductDto, UpdateProductDto và Product
// interface CreateProductDto { ... }
// interface UpdateProductDto { ... }
// interface Product { ... }

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
 * Lấy danh sách tất cả sản phẩm (không cần supplierId).
 * Endpoint: GET /product
 */
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get("/product");
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh sách tất cả sản phẩm.");
  }
};

/**
 * Lấy danh sách sản phẩm theo supplierId từ local storage.
 * Endpoint: GET /product/supplier/:supplierId
 */
export const getAllProductsBySupplier = async () => {
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
    const response = await apiClient.get(`/product/supplier/${supplierId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy danh sách sản phẩm theo nhà cung cấp."
    );
  }
};

/**
 * Tạo sản phẩm mới cho nhà cung cấp (lấy supplierId từ local storage).
 * Endpoint: POST /product/supplier/:supplierId
 * @param newProductData Dữ liệu sản phẩm mới (CreateProductDto)
 */
export const createProduct = async (newProductData: Record<string, any>) => {
  // TODO: Thay Record<string, any> bằng CreateProductDto
  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp để tạo sản phẩm.",
      status: null,
    };
  }
  try {
    const response = await apiClient.post(
      `/product/supplier/${supplierId}`,
      newProductData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi tạo sản phẩm.");
  }
};

/**
 * Lấy danh sách sản phẩm trong kho theo warehouseId.
 * Endpoint: GET /product/warehouse/:warehouseId
 * @param warehouseId ID của kho
 */
export const getAllProductsByWarehouse = async (warehouseId: string) => {
  try {
    const response = await apiClient.get(`/product/warehouse/${warehouseId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh sách sản phẩm trong kho.");
  }
};

/**
 * Lấy thông tin chi tiết của một sản phẩm theo ID.
 * Endpoint: GET /product/:id
 * @param productId ID của sản phẩm
 */
export const getProductById = async (productId: string) => {
  try {
    const response = await apiClient.get(`/product/${productId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy thông tin chi tiết sản phẩm.");
  }
};

/**
 * Cập nhật thông tin sản phẩm (lấy supplierId từ local storage).
 * Endpoint: PATCH /product/:id/supplier/:supplierId
 * @param productId ID của sản phẩm cần cập nhật
 * @param updatedData Dữ liệu cập nhật (UpdateProductDto)
 */
export const updateProduct = async (
  productId: string,
  updatedData: Record<string, any> // TODO: Thay Record<string, any> bằng UpdateProductDto
) => {
  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp để cập nhật sản phẩm.",
      status: null,
    };
  }
  try {
    const response = await apiClient.patch(
      `/product/${productId}/supplier/${supplierId}`,
      updatedData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi cập nhật sản phẩm.");
  }
};

/**
 * Xóa sản phẩm theo ID.
 * Endpoint: DELETE /product/:id
 * @param productId ID của sản phẩm cần xóa
 */
export const deleteProduct = async (productId: string) => {
  try {
    // DELETE thường trả về status 204 No Content, không có body data
    await apiClient.delete(`/product/${productId}`);
    return { success: true, data: null }; // Trả về success true nếu không có lỗi
  } catch (error) {
    return handleError(error, "Lỗi khi xóa sản phẩm.");
  }
};

/*
// Chức năng seed không có trong controller được cung cấp, tạm thời comment lại
export const seedProducts = async (count: number) => {
  try {
    // Giả sử endpoint là /product/seed/:count (cần xác nhận lại)
    const response = await apiClient.post(`/product/seed/${count}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi seed dữ liệu sản phẩm.");
  }
};
*/


// Định nghĩa interface cho ProductSummaryInfoDto
interface ProductSummaryInfoDto {
  productId: string;
  productName: string;
  totalStockQuantity: number;
  warehouseCount: number;
  dropshipperCount: number;
  totalSoldQuantity: number;
  completedOrderCount: number;
  monthlySoldQuantity: number;
  monthlyCompletedOrderCount: number;
  month: number;
  year: number;
}

// --- API Functions ---

/**
 * Lấy thông tin tổng hợp của một sản phẩm.
 * Endpoint: GET /product/:id/summary
 * @param productId ID của sản phẩm
 * @returns Thông tin tổng hợp về sản phẩm hoặc lỗi
 */
export const getProductSummary = async (productId: string) => {
  try {
    const response = await apiClient.get<ProductSummaryInfoDto>(`/product/${productId}/summary`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy thông tin tổng hợp sản phẩm.");
  }
};
