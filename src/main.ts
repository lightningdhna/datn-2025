import { createApp } from "vue";

import App from "@/App.vue";
import { registerPlugins } from "@core/utils/plugins";

// Styles
import "@core/scss/template/index.scss";
import "@layouts/styles/index.scss";
import "@styles/styles.scss";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Create vue app
const app = createApp(App);

const options: PluginOptions = {
  position: "top-center", // Vị trí hiển thị thông báo (top-right, top-center, bottom-right, etc.)
  timeout: 2500, // Thời gian tự động ẩn (ms)
  closeOnClick: true, // Đóng khi click
  pauseOnHover: true, // Tạm dừng khi hover
  draggable: true, // Kéo thả thông báo
  draggablePercent: 0.6, // Phần trăm kéo thả
  showCloseButtonOnHover: false, // Hiển thị nút đóng khi hover
  hideProgressBar: false, // Hiển thị thanh tiến trình
  closeButton: "button", // Nút đóng
  icon: true, // Hiển thị icon
  rtl: false, // Hỗ trợ ngôn ngữ từ phải sang trái
  maxToasts: 3, // Số lượng thông báo tối đa
};


// Register plugins
registerPlugins(app);
app.use(Toast, options);
// Mount vue app
app.mount("#app");
