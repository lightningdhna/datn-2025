export interface SupplierBrief {
  id: string;
  warehouseQuantity: number;
  productQuantity: number;
  completedOrderQuantity: number;
  dropshipperQuantity: number;
  stockQuantity: number; // số hàng tồn
}
