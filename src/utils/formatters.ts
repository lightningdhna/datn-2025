export const formatDate = (date: Date | null) => {
  if (!date) return "Không có dữ liệu";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Ngày không hợp lệ"; // Xử lý khi giá trị không phải là ngày hợp lệ
  }

  const day = parsedDate.getDate(); // Lấy ngày
  const month = parsedDate.getMonth() + 1; // Lấy tháng (tháng bắt đầu từ 0 nên cần +1)
  const year = parsedDate.getFullYear(); // Lấy năm

  return `${day}/${month}/${year}`; // Trả về chuỗi định dạng "ngày dd/mm/yyyy"
};

export const formatDateTime = (date: Date | null): string => {
  if (!date) return "Không có dữ liệu";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Ngày không hợp lệ"; // Xử lý khi giá trị không phải là ngày hợp lệ
  }

  const hours = parsedDate.getHours().toString().padStart(2, "0"); // Lấy giờ, thêm số 0 nếu cần
  const minutes = parsedDate.getMinutes().toString().padStart(2, "0"); // Lấy phút, thêm số 0 nếu cần
  const day = parsedDate.getDate(); // Lấy ngày
  const month = parsedDate.getMonth() + 1; // Lấy tháng (tháng bắt đầu từ 0 nên cần +1)
  const year = parsedDate.getFullYear(); // Lấy năm

  return `${hours} : ${minutes} ngày ${day}/${month}/${year}`; // Trả về chuỗi định dạng
};

export const formatPrice = (price: number): string => {
  if (!price) return "  VNĐ";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "  ") + " ";
};
