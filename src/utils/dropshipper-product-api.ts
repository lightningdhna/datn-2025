import { URL } from "@/utils/api-config";
import { getDropshipperId } from "@/utils/local-storage";
import axios, { AxiosError } from "axios";

export interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  category: string;
  supplierName: string;
  supplierId: string;
  createdAt: string;
  updatedAt: string;
  stock: number;
  sku: string;
  status: string;
}

export interface ProductSummaryInfoDto {
  totalStock: number;
  totalSales: number;
  averageRating: number;
  reviewCount: number;
}

const instance = axios.create({
  baseURL: URL,
  timeout: 20000,
});

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return axiosError.response.data;
    } else if (axiosError.request) {
      return "No response received from server";
    } else {
      return axiosError.message;
    }
  }
  return "An unexpected error occurred";
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const dropshipperId = getDropshipperId();
    const response = await instance.get(`/api/dropshipper/${dropshipperId}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw handleError(error);
  }
};

export const getProductById = async (productId: string): Promise<Product> => {
  try {
    const response = await instance.get(`/api/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw handleError(error);
  }
};

export const getProductSummary = async (productId: string): Promise<ProductSummaryInfoDto> => {
  try {
    const response = await instance.get(`/api/product/${productId}/summary`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching summary for product with ID ${productId}:`, error);
    throw handleError(error);
  }
};

export const getProductsBySupplier = async (supplierId: string): Promise<Product[]> => {
  try {
    const response = await instance.get(`/api/supplier/${supplierId}/products`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for supplier with ID ${supplierId}:`, error);
    throw handleError(error);
  }
};

export const getProductsByDropshipper = async (dropshipperId: string = getDropshipperId() as string): Promise<Product[]> => {
  try {
    const response = await instance.get(`/api/dropshipper/${dropshipperId}/products`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for dropshipper with ID ${dropshipperId}:`, error);
    throw handleError(error);
  }
};

export const getProductsByWarehouse = async (warehouseId: string): Promise<Product[]> => {
  try {
    const response = await instance.get(`/api/warehouse/${warehouseId}/products`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for warehouse with ID ${warehouseId}:`, error);
    throw handleError(error);
  }
}; 
