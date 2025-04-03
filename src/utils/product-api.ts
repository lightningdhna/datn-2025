import axios from "axios";

const BASE_URL = "https://lidh-final-api.vercel.app/product";
const DEV_URL = "http://localhost:3000/product"; // Địa chỉ API trong môi trường phát triển

const apiClient = axios.create({
  baseURL: DEV_URL,
  timeout: 100000, // Thời gian timeout là 10 giây
  headers: {
    "Content-Type": "application/json",
  },
});

// Tạo sản phẩm mới
export const createProduct = async (newProduct: Record<string, any>) => {
  try {
    const response = await apiClient.post("/", newProduct);
    return { success: true, data: response.data }; // Trả về kết quả thành công
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Trả về thông tin lỗi từ server
      return {
        success: false,
        error: error.response.data || "Unknown server error",
        message: error.response.data?.message || "Lỗi khi tạo sản phẩm.",
        status: error.response.status,
      };
    }
    // Trả về lỗi không phải từ server (ví dụ: lỗi mạng)
    return {
      success: false,
      error: "An unexpected error occurred while creating the product.",
      message: "Lỗi không xác định khi tạo sản phẩm.",
      status: null,
    };
  }
};

// Lấy danh sách tất cả sản phẩm
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get("/");
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error.response.data || "Unknown server error",
        message: error.response.data?.message || "Lỗi khi lấy danh sách sản phẩm.",
        status: error.response.status,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred while fetching products.",
      message: "Lỗi không xác định khi lấy danh sách sản phẩm.",
      status: null,
    };
  }
};

// Lấy thông tin chi tiết của một sản phẩm
export const getProductById = async (id: string) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error.response.data || "Unknown server error",
        message: error.response.data?.message || "Lỗi khi lấy thông tin sản phẩm.",
        status: error.response.status,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred while fetching the product.",
      message: "Lỗi không xác định khi lấy thông tin sản phẩm.",
      status: null,
    };
  }
};

// Cập nhật thông tin sản phẩm
export const updateProduct = async (
  id: string,
  updatedData: Record<string, any>
) => {
  try {
    const response = await apiClient.patch(`/${id}`, updatedData);
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error.response.data || "Unknown server error",
        message: error.response.data?.message || "Lỗi khi cập nhật sản phẩm.",
        status: error.response.status,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred while updating the product.",
      message: "Lỗi không xác định khi cập nhật sản phẩm.",
      status: null,
    };
  }
};

// Xóa sản phẩm
export const deleteProduct = async (id: string) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error.response.data || "Unknown server error",
        message: error.response.data?.message || "Lỗi khi xóa sản phẩm.",
        status: error.response.status,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred while deleting the product.",
      message: "Lỗi không xác định khi xóa sản phẩm.",
      status: null,
    };
  }
};

// Seed dữ liệu sản phẩm
export const seedProducts = async (count: number) => {
  try {
    const response = await apiClient.post(`/seed/${count}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error.response.data || "Unknown server error",
        message: error.response.data?.message || "Lỗi khi seed dữ liệu sản phẩm.",
        status: error.response.status,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred while seeding products.",
      message: "Lỗi không xác định khi seed dữ liệu sản phẩm.",
      status: null,
    };
  }
};

const main = async () => {
  // const products = await getAllProducts();
  // // Hàm này đã chuẩn

  const product = await getProductById("0d982daf-b9ee-4bfa-a1fd-32b0a28a2178");
  // Oke
  console.log(product);

  // const result = await createProduct({
  //   date: "2025-03-27T12:45:27.310Z",
  //   supplierId: "2b04363d-3083-4b65-b346-6ce352b3bde3",
  //   price: 16840000,
  //   note: null,
  // });

  // console.log(result);
};

main();
