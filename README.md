# Công việc hiện tại, UI cho bên vận chuyển:
## usecase:
```
+ Xem, tìm kiếm danh sách các nhà cung cấp
-	Người dùng chọn chức năng xem danh sách các nhà cung cấp
-	Hệ thống lấy danh sách các nhà cung cấp từ CSDL
-	Hệ thống hiển thị thông tin các nhà cung cấp, dưới dạng bảng, gồm các trường: Tên nhà cung cấp, số lượng kho, số mặt hàng, số đơn hàng đã hoàn thành, số hàng tồn, số lượng dropshipper đăng ký
-	Người dùng xem danh sách các nhà cung cấp
-	Người dùng nhập thông tin vào ô tìm kiếm
-	Hệ thống lọc các nhà cung cấp có tên nhà cung cấp phù hợp với cụm từ tìm kiếm
-	Hệ thống cập nhật lại hiển thị danh sách các nhà cung cấp
+ Duyệt thêm mới một nhà cung cấp:
-	Người dùng chọn chức năng xem các nhà cung cấp chờ duyệt
-	Hệ thống lấy thông tin các nhà cung cấp đang chờ duyệt
-	Hệ thống hiển thị danh sách các nhà cung cấp đang chờ duyệt
-	Người dụng click vào nút duyệt
-	Hệ thống xác nhận duyệt cho nhà cung cấp


+ Xem thông tin cụ thể của nhà cung cấp ( Danh sách kho, Danh sách sản phẩm )
-	Tiền điều kiện: Người dùng xem danh sách các nhà cung cấp
-	Người dùng nhấn chọn nút xem chi tiết ở hàng tương ứng với nhà cung cấp cần xem
-	Hệ thống lấy thông tin của nhà cung cấp theo id nhà cung cấp
-	Hệ thống hiển thị trang thông tin của nhà cung cấp : Tên nhà cung cấp, danh sách các kho hàng, danh sách các mặt hàng, Danh sách các dropshipper liên quan
-	Người dùng xem thông tin chi tiết của nhà cung cấp
+ Xem, tìm kiếm (theo tên nhà cung cấp/ mã kho) kho 
-	Người dùng chọn chức năng xem danh sách các kho hàng
-	Hệ thống lấy thông tin tất cả các kho hàng của tất cả các nhà cung cấp từ cơ sở dữ liệu
-	Hệ thống hiển thị thông tin các kho hàng dưới dạng bảng gồm các trường :Tên kho hàng, tên nhà cung cấp, địa chỉ, số lượng loại mặt hàng trong kho, tổng số lượng hàng trong kho, thời gian cần để lấy hàng từ kho
-	Người dùng xem bảng danh sách kho hàng
+ Xem thông tin cụ thể của kho : danh sách sản phẩm trong kho
-	Tiền điều kiện: Người dùng đang xem danh sách kho hàng
-	Người dùng nhấn chọn 1 hàng của bảng
-	Hệ thống lấy thông tin chi tiết của kho hàng tương ứng từ CSDL
-	Hệ thống hiển thị 1 trang thông tin chi tiết của kho hàng bao gồm: danh sách các mặt hàng trong kho kèm số lượng, địa chỉ kho hàng, tên kho hàng, tên nhà cung cấp sở hữu, thời gian cần để xe tải lấy hàng từ kho
-	Người dùng xem thông tin cụ thể của kho
+ Quản lí thông tin đội xe
-	Người dùng chọn chức năng quản lí đội xe
-	Hệ thống lấy thông tin toàn bộ các xe từ CSDL
-	Hệ thống hiển thị thông tin dưới dạng bảng bao gồm: Tên xe, loại xe, khối lượng tối đa, thể tích tối đa, vận tốc trung bình, chi phí trung bình /km, số đơn hàng đã thực hiện, Vị trí depot
-	Người dùng xem thông tin của xe
-	Người dùng click vào nút sửa thông tin xe cụ thể
-	Hệ thống hiển thị hộp thoại cập nhật thông tin
-	Người dùng cập nhật thông tin xe
-	Người dùng nhất xác nhận
-	Hệ thống cập nhật lại thông tin của xe tới CSDL
-	Người dùng click chọn xóa 1 xe cụ thể
-	Hệ thống hỏi xác nhận yêu cầu xóa
-	Người dùng chọn xác nhận
-	Hệ thống xóa thông tin của xe khỏi CSDL
-	Người dùng click nút thêm xe
-	Hệ thống hiển thị hộp thoại điền thông tin xe
-	Người dùng nhập thông tin của xe. Tất cả các trường là bắt buộc
-	Người dùng xác nhận
-	Hệ thống thêm mới thông tin xe vào CSDL 
+ Xem danh sách các đơn hàng
-	Người dùng chọn chức năng xem danh sách các đơn hàng
-	Người dùng chọn xem danh sách các đơn hàng theo trạng thái (tất cả | chưa duyệt| đang có kế hoạch vận chuyển| đã hoàn thành)
-	Hệ thống lấy danh sách tất cả các đơn hàng theo loại , từ CSDL
-	Hệ thống hiển thị danh sách đơn hàng dưới dạng bảng, bao gồm các trường: mã đơn hàng, tên sản phẩm, số lượng, địa chỉ người mua, giá đơn hàng , trạng thái đơn hàng
-	Người xem xem danh sách đơn hàng
+ Xem kế hoạch vận chuyển cho các xe tải
-	Người dùng chọn chức năng xem kế hoạch vận chuyển
-	Hệ thống lấy danh sách các kế hoạch vận chuyển cho các xe từ CSDL
-	Hệ thống hiển thị dưới dạng danh sách các kế hoạch cho các xe, mỗi kế hoạch của một xe là chuỗi các vị trí mà xe sẽ di chuyển đến
-	Người dùng xem kế hoạch vận chuyển cho các xe 
+Thống kê các đơn hàng
-	Người dùng chọn chức năng thống kê các đơn hàng đã thực hiện
-	Hệ thống lấy thông tin các đơn hàng đã thực hiện từ CSDL
-	Hệ thống hiển thị thông tin dưới dạng bảng bao gồm các trường: mã đơn hàng, tên xe vận chuyển, ngày hoàn tất, thời gian đáp ứng
-	Hệ thống hiển thị thông tin tổng hợp bao gồm : tổng số đơn hàng đã thực hiện trong tháng, tổng số Km mỗi xe đã di chuyển, tổng số đơn hàng mỗi xe đã thực hiện…
-	Người dùng xem thống kê các đơn hàng


```
# Link deploy on github:

https://lightningdhna.github.io/datn-2025



## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
