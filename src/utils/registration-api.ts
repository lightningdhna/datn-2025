import axios from "axios";
import { URL } from './api-config';
import { getDropshipperId, getSupplierId } from "./local-storage";

// Define interfaces/types
interface CreateRegistrationDto {
  productId: string;
  dropshipperId: string;
  commissionFee: number;
}

interface Registration {
  dropshipperId: string;
  productId: string;
  commissionFee: number;
  createdDate: string;
  status: number; // 0: pending, 1: approved, 2: rejected
  dropshipper?: any; // Detailed dropshipper information when included
  product?: any; // Detailed product information when included
}

// New interface for the RegistrationSummary
interface RegistrationSummaryDto {
  dropshipperId: string;
  dropshipperName: string;
  productId: string;
  productName: string;
  availableQuantity: number;
  completedOrderCount: number;
  soldQuantity: number;
  pendingOrderCount: number;
  commissionFee: number;
}


const apiClient = axios.create({
  baseURL: URL,
  timeout: 100000,
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
 * Tạo đăng ký mới để bán sản phẩm
 * Endpoint: POST /registration
 * @param registrationData Dữ liệu đăng ký
 */
export const createRegistration = async (
  registrationData: CreateRegistrationDto
) => {
  try {
    const response = await apiClient.post("/registration", registrationData);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi tạo đăng ký bán sản phẩm.");
  }
};

/**
 * Tạo đăng ký mới cho dropshipper hiện tại
 * Endpoint: POST /registration
 * @param productId ID sản phẩm muốn đăng ký
 * @param commissionFee Phí hoa hồng
 */
export const createRegistrationForCurrentDropshipper = async (
  productId: string,
  commissionFee: number
) => {
  const dropshipperId = getDropshipperId();
  if (!dropshipperId) {
    return {
      success: false,
      error: "Dropshipper ID not found in local storage.",
      message: "Không tìm thấy ID dropshipper trong local storage.",
      status: null,
    };
  }

  const registrationData: CreateRegistrationDto = {
    productId,
    dropshipperId,
    commissionFee,
  };

  return await createRegistration(registrationData);
};

/**
 * Lấy danh sách đăng ký theo nhà cung cấp và trạng thái (tùy chọn)
 * Endpoint: GET /registration/by-supplier/:supplierId
 * @param supplierId ID của nhà cung cấp
 * @param status Trạng thái đăng ký (0: chờ duyệt, 1: đã duyệt, 2: từ chối)
 */
export const getRegistrationsBySupplier = async (
  supplierId: string,
  status?: number
) => {
  try {
    const endpoint = `/registration/by-supplier/${supplierId}${
      status !== undefined ? `?status=${status}` : ""
    }`;
    const response = await apiClient.get(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy danh sách đăng ký theo nhà cung cấp."
    );
  }
};

/**
 * Lấy danh sách đăng ký theo nhà cung cấp hiện tại và trạng thái
 * Endpoint: GET /registration/by-supplier/:supplierId
 * @param status Trạng thái đăng ký (0: chờ duyệt, 1: đã duyệt, 2: từ chối)
 */
export const getRegistrationsByCurrentSupplier = async (status?: number) => {
  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp trong local storage.",
      status: null,
    };
  }

  return await getRegistrationsBySupplier(supplierId, status);
};

/**
 * Lấy danh sách đăng ký theo dropshipper và trạng thái (tùy chọn)
 * Endpoint: GET /registration/by-dropshipper/:dropshipperId
 * @param dropshipperId ID của dropshipper
 * @param status Trạng thái đăng ký (0: chờ duyệt, 1: đã duyệt, 2: từ chối)
 */
export const getRegistrationsByDropshipper = async (
  dropshipperId: string,
  status?: number
) => {
  try {
    const endpoint = `/registration/by-dropshipper/${dropshipperId}${
      status !== undefined ? `?status=${status}` : ""
    }`;
    const response = await apiClient.get(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi lấy danh sách đăng ký theo dropshipper."
    );
  }
};

/**
 * Lấy danh sách đăng ký theo dropshipper hiện tại và trạng thái
 * Endpoint: GET /registration/by-dropshipper/:dropshipperId
 * @param status Trạng thái đăng ký (0: chờ duyệt, 1: đã duyệt, 2: từ chối)
 */
export const getRegistrationsByCurrentDropshipper = async (status?: number) => {
  const dropshipperId = getDropshipperId();
  if (!dropshipperId) {
    return {
      success: false,
      error: "Dropshipper ID not found in local storage.",
      message: "Không tìm thấy ID dropshipper trong local storage.",
      status: null,
    };
  }

  return await getRegistrationsByDropshipper(dropshipperId, status);
};

/**
 * Lấy tất cả đăng ký đang chờ duyệt cho một nhà cung cấp
 * Endpoint: GET /registration/pending/supplier/:supplierId
 * @param supplierId ID của nhà cung cấp
 */
export const getPendingRegistrationsBySupplier = async (supplierId: string) => {
  try {
    const response = await apiClient.get(
      `/registration/pending/supplier/${supplierId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh sách đăng ký đang chờ duyệt.");
  }
};

/**
 * Lấy tất cả đăng ký đang chờ duyệt cho nhà cung cấp hiện tại
 * Endpoint: GET /registration/pending/supplier/:supplierId
 */
export const getPendingRegistrationsForCurrentSupplier = async () => {
  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp trong local storage.",
      status: null,
    };
  }

  return await getPendingRegistrationsBySupplier(supplierId);
};

/**
 * Lấy danh sách đăng ký đã duyệt của nhà cung cấp hiện tại
 * Endpoint: GET /registration/by-supplier/:supplierId?status=1
 */
export const getApprovedRegistrationsForCurrentSupplier = async () => {
  return await getRegistrationsByCurrentSupplier(1);
};

/**
 * Lấy danh sách đăng ký bị từ chối của nhà cung cấp hiện tại
 * Endpoint: GET /registration/by-supplier/:supplierId?status=2
 */
export const getRejectedRegistrationsForCurrentSupplier = async () => {
  return await getRegistrationsByCurrentSupplier(2);
};

/**
 * Lấy danh sách đăng ký đã duyệt của dropshipper hiện tại
 * Endpoint: GET /registration/by-dropshipper/:dropshipperId?status=1
 */
export const getApprovedRegistrationsForCurrentDropshipper = async () => {
  return await getRegistrationsByCurrentDropshipper(1);
};

/**
 * Lấy danh sách đăng ký đang chờ duyệt của dropshipper hiện tại
 * Endpoint: GET /registration/by-dropshipper/:dropshipperId?status=0
 */
export const getPendingRegistrationsForCurrentDropshipper = async () => {
  return await getRegistrationsByCurrentDropshipper(0);
};

/**
 * Lấy danh sách đăng ký bị từ chối của dropshipper hiện tại
 * Endpoint: GET /registration/by-dropshipper/:dropshipperId?status=2
 */
export const getRejectedRegistrationsForCurrentDropshipper = async () => {
  return await getRegistrationsByCurrentDropshipper(2);
};

/**
 * Chấp thuận đăng ký bán sản phẩm
 * Endpoint: PATCH /registration/approve/supplier/:supplierId/product/:productId/dropshipper/:dropshipperId
 * @param supplierId ID của nhà cung cấp
 * @param productId ID của sản phẩm
 * @param dropshipperId ID của dropshipper
 */
export const approveRegistration = async (
  supplierId: string,
  productId: string,
  dropshipperId: string
) => {
  try {
    const response = await apiClient.patch(
      `/registration/approve/supplier/${supplierId}/product/${productId}/dropshipper/${dropshipperId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi chấp thuận đăng ký bán sản phẩm.");
  }
};

/**
 * Chấp thuận đăng ký bán sản phẩm với nhà cung cấp hiện tại
 * Endpoint: PATCH /registration/approve/supplier/:supplierId/product/:productId/dropshipper/:dropshipperId
 * @param productId ID của sản phẩm
 * @param dropshipperId ID của dropshipper
 */
export const approveRegistrationForCurrentSupplier = async (
  productId: string,
  dropshipperId: string
) => {
  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp trong local storage.",
      status: null,
    };
  }

  return await approveRegistration(supplierId, productId, dropshipperId);
};

/**
 * Từ chối đăng ký bán sản phẩm
 * Endpoint: PATCH /registration/reject/supplier/:supplierId/product/:productId/dropshipper/:dropshipperId
 * @param supplierId ID của nhà cung cấp
 * @param productId ID của sản phẩm
 * @param dropshipperId ID của dropshipper
 */
export const rejectRegistration = async (
  supplierId: string,
  productId: string,
  dropshipperId: string
) => {
  try {
    const response = await apiClient.patch(
      `/registration/reject/supplier/${supplierId}/product/${productId}/dropshipper/${dropshipperId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi từ chối đăng ký bán sản phẩm.");
  }
};

/**
 * Từ chối đăng ký bán sản phẩm với nhà cung cấp hiện tại
 * Endpoint: PATCH /registration/reject/supplier/:supplierId/product/:productId/dropshipper/:dropshipperId
 * @param productId ID của sản phẩm
 * @param dropshipperId ID của dropshipper
 */
export const rejectRegistrationForCurrentSupplier = async (
  productId: string,
  dropshipperId: string
) => {
  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp trong local storage.",
      status: null,
    };
  }

  return await rejectRegistration(supplierId, productId, dropshipperId);
};

/**
 * Hủy đăng ký bán sản phẩm
 * Endpoint: DELETE /registration/product/:productId/dropshipper/:dropshipperId
 * @param productId ID của sản phẩm
 * @param dropshipperId ID của dropshipper
 */
export const removeRegistration = async (
  productId: string,
  dropshipperId: string
) => {
  try {
    await apiClient.delete(
      `/registration/product/${productId}/dropshipper/${dropshipperId}`
    );
    return { success: true, data: null };
  } catch (error) {
    return handleError(error, "Lỗi khi hủy đăng ký bán sản phẩm.");
  }
};

/**
 * Hủy đăng ký bán sản phẩm cho dropshipper hiện tại
 * Endpoint: DELETE /registration/product/:productId/dropshipper/:dropshipperId
 * @param productId ID của sản phẩm
 */
export const removeRegistrationForCurrentDropshipper = async (
  productId: string
) => {
  const dropshipperId = getDropshipperId();
  if (!dropshipperId) {
    return {
      success: false,
      error: "Dropshipper ID not found in local storage.",
      message: "Không tìm thấy ID dropshipper trong local storage.",
      status: null,
    };
  }

  return await removeRegistration(productId, dropshipperId);
};

/**
 * Xóa tất cả đăng ký của một dropshipper với một nhà cung cấp
 * Endpoint: DELETE /registration/dropshipper/:dropshipperId/supplier/:supplierId
 * @param dropshipperId ID của dropshipper
 * @param supplierId ID của nhà cung cấp
 */
export const removeAllRegistrationsByDropshipperAndSupplier = async (
  dropshipperId: string,
  supplierId: string
) => {
  try {
    const response = await apiClient.delete(
      `/registration/dropshipper/${dropshipperId}/supplier/${supplierId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(
      error,
      "Lỗi khi xóa đăng ký giữa dropshipper và nhà cung cấp."
    );
  }
};

/**
 * Xóa tất cả đăng ký của dropshipper hiện tại với một nhà cung cấp
 * Endpoint: DELETE /registration/dropshipper/:dropshipperId/supplier/:supplierId
 * @param supplierId ID của nhà cung cấp
 */
export const removeAllRegistrationsForCurrentDropshipperWithSupplier = async (
  supplierId: string
) => {
  const dropshipperId = getDropshipperId();
  if (!dropshipperId) {
    return {
      success: false,
      error: "Dropshipper ID not found in local storage.",
      message: "Không tìm thấy ID dropshipper trong local storage.",
      status: null,
    };
  }

  return await removeAllRegistrationsByDropshipperAndSupplier(
    dropshipperId,
    supplierId
  );
};

/**
 * Xóa tất cả đăng ký của một dropshipper với nhà cung cấp hiện tại
 * Endpoint: DELETE /registration/dropshipper/:dropshipperId/supplier/:supplierId
 * @param dropshipperId ID của dropshipper
 */
export const removeAllRegistrationsWithCurrentSupplierByDropshipper = async (
  dropshipperId: string
) => {
  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp trong local storage.",
      status: null,
    };
  }

  return await removeAllRegistrationsByDropshipperAndSupplier(
    dropshipperId,
    supplierId
  );
};

/**
 * Lấy thông tin tổng hợp về đăng ký bán sản phẩm của dropshipper
 * Endpoint: GET /registration/:dropshipperId/:productId/summary
 * @param dropshipperId ID của dropshipper
 * @param productId ID của sản phẩm
 */
export const getRegistrationSummary = async (
  dropshipperId: string,
  productId: string
) => {
  try {
    const response = await apiClient.get<RegistrationSummaryDto>(
      `/registration/${dropshipperId}/${productId}/summary`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy thông tin tổng hợp đăng ký bán sản phẩm.");
  }
};

/**
 * Lấy thông tin tổng hợp về đăng ký bán sản phẩm của dropshipper hiện tại
 * Endpoint: GET /registration/:dropshipperId/:productId/summary
 * @param productId ID của sản phẩm
 */
export const getRegistrationSummaryForCurrentDropshipper = async (
  productId: string
) => {
  const dropshipperId = getDropshipperId();
  if (!dropshipperId) {
    return {
      success: false,
      error: "Dropshipper ID not found in local storage.",
      message: "Không tìm thấy ID dropshipper trong local storage.",
      status: null,
    };
  }

  return await getRegistrationSummary(dropshipperId, productId);
};

/**
 * Lấy thông tin tổng hợp về tất cả các đăng ký bán một sản phẩm của nhà cung cấp hiện tại
 * Endpoint: GET /registration/supplier/:supplierId/product/:productId/summary
 * @param productId ID của sản phẩm
 */
export const getRegistrationSummariesForProductByCurrentSupplier = async (
  productId: string
) => {
  const supplierId = getSupplierId();
  if (!supplierId) {
    return {
      success: false,
      error: "Supplier ID not found in local storage.",
      message: "Không tìm thấy ID nhà cung cấp trong local storage.",
      status: null,
    };
  }

  try {
    const response = await apiClient.get(
      `/registration/supplier/${supplierId}/product/${productId}/summary`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh sách tổng hợp đăng ký bán sản phẩm.");
  }
};
