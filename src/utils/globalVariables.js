export const BLACK_LOGO =
  'https://res.cloudinary.com/dgyqhnavx/image/upload/v1670131428/samples/ecommerce/Clothing%20assets/Black_qvloqn.png';

export const BASE_API_URL = 'http://localhost:8099';

export const URL_SIDEBAR = {
  home: '/',
  category: '/categories',
  product: '/products',
  order: '/orders',
  user: '/users',
};

export const ORDER_STATUS = {
  pending: {
    status: 'PENDING',
    string: 'Chờ xác nhận',
  },
  delivering: {
    status: "DELIVERING",
            string: "Đang giao",
  },
  done: {
    status: 'DONE',
    string: 'Đã giao',
  },
  canceled: {
    status: 'CANCELED',
    string: 'Đã hủy',
  },
};

// export const PRODUCT_QUERY_STRING = ['page', 'limit'];

export const LIMIT = 10;

export const ORDER_PAGING_LIMIT = 5;

export const COLOR_LIST = [
  {
    color: 'f1f1f1',
    name: 'Trắng',
  },
  {
    color: '000',
    name: 'Đen',
  },
  {
    color: '8c8c8c',
    name: 'Xám',
  },
  {
    color: 'd9b99b',
    name: 'Be',
  },
  {
    color: '186287',
    name: 'Xanh nước nhạt',
  },
  {
    color: '114abd',
    name: 'Xanh nước đậm',
  },
  {
    color: '6e10a1',
    name: 'Tím',
  },
];

export const SIZE_LIST = [1, 2, 3, 4, 5];

export const ERROR_MESSAGES = ['Không đủ số lượng sản phẩm trong kho!'];

export const REPORT_CRITERIA = {
  day: 'day',
  month: 'month',
  year: 'year',
};

export const STATUS_ACTIVE = 'Active';
export const STATUS_DISABLE = 'Disable';
