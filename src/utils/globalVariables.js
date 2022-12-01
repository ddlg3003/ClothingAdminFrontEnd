export const BLACK_LOGO =
  "https://fontmeme.com/permalink/221015/466d5aeb7170191e34604da1b59fb9b2.png";

export const BASE_API_URL = "http://localhost:8099";

export const URL_SIDEBAR = [
  "/",
  "/categories",
  "/products",
  "/orders",
  "/users",
];

export const ORDER_STATUS = [
  {
    status: "PENDING",
    color: "warning",
    string: "Chờ xác nhận",
  },
  {
    status: "DELIVERING",
    color: "primary",
    string: "Đang giao",
  },
  {
    status: "DONE",
    color: "success",
    string: "Đã giao",
  },
  {
    status: "CANCELED",
    color: "error",
    string: "Đã hủy",
  },
];

// export const PRODUCT_QUERY_STRING = ['page', 'limit'];

export const LIMIT = 10;
