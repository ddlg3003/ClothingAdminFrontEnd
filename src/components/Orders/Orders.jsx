import React from "react";
import {
  Avatar,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  TableRow,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Chip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { ORDER_STATUS } from "../../utils/globalVariables";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const orders = [
  {
    id: 8,
    ordTotalPrice: 200000,
    ordNote: null,
    ordShippingFee: 25000,
    ordPayment: "COD",
    ordStatus: "PENDING",
    ordAddress: "1 Võ Văn Ngân, TP. Thủ Đức",
    ordPhone: "123",
    ordDate: "2022-11-29 15:06:56",
    transactionMapper: [
      {
        id: 8,
        tranUnitPrice: 100000,
        tranQuantity: 1,
        productId: 1,
        color: "000",
        size: 1,
        productImage:
          "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2022/black-panther-fangs.jpg",
        productName: "Áo thun Marvel Oversize Black Panther",
      },
      {
        id: 9,
        tranUnitPrice: 100000,
        tranQuantity: 1,
        productId: 2,
        color: "000",
        size: 1,
        productImage:
          "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/October2022/ao-giu-nhiet-modal-mau-xam.jpg",
        productName:
          "Áo giữ nhiệt nam Modal Ultra Warm - mặc là ấm, thoáng khí - Xám",
      },
    ],
  },
  {
    id: 7,
    ordTotalPrice: 100000,
    ordNote: null,
    ordShippingFee: 25000,
    ordPayment: "COD",
    ordStatus: "DELIVERING",
    ordAddress: "123",
    ordPhone: "123123",
    ordDate: "2022-11-26 14:42:53",
    transactionMapper: [
      {
        id: 7,
        tranUnitPrice: 100000,
        tranQuantity: 1,
        productId: 1,
        color: "000",
        size: 1,
        productImage:
          "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2022/black-panther-fangs.jpg",
        productName: "Áo thun Marvel Oversize Black Panther",
      },
    ],
  },
  {
    id: 6,
    ordTotalPrice: 100000,
    ordNote: null,
    ordShippingFee: 25000,
    ordPayment: "COD",
    ordStatus: "CANCELED",
    ordAddress: "123",
    ordPhone: "123123",
    ordDate: "2022-11-26 14:41:06",
    transactionMapper: [
      {
        id: 6,
        tranUnitPrice: 100000,
        tranQuantity: 1,
        productId: 1,
        color: "000",
        size: 1,
        productImage:
          "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2022/black-panther-fangs.jpg",
        productName: "Áo thun Marvel Oversize Black Panther",
      },
    ],
  },
  {
    id: 5,
    ordTotalPrice: 100000,
    ordNote: null,
    ordShippingFee: 25000,
    ordPayment: "COD",
    ordStatus: "PENDING",
    ordAddress: "123",
    ordPhone: "123123",
    ordDate: "2022-11-26 14:40:56",
    transactionMapper: [
      {
        id: 5,
        tranUnitPrice: 100000,
        tranQuantity: 1,
        productId: 1,
        color: "000",
        size: 1,
        productImage:
          "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2022/black-panther-fangs.jpg",
        productName: "Áo thun Marvel Oversize Black Panther",
      },
    ],
  },
  {
    id: 4,
    ordTotalPrice: 100000,
    ordNote: null,
    ordShippingFee: 25000,
    ordPayment: "COD",
    ordStatus: "PENDING",
    ordAddress: "123",
    ordPhone: "123123",
    ordDate: "2022-11-26 14:25:09",
    transactionMapper: [
      {
        id: 4,
        tranUnitPrice: 100000,
        tranQuantity: 1,
        productId: 1,
        color: "000",
        size: 1,
        productImage:
          "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2022/black-panther-fangs.jpg",
        productName: "Áo thun Marvel Oversize Black Panther",
      },
    ],
  },
  {
    id: 3,
    ordTotalPrice: 200000,
    ordNote: null,
    ordShippingFee: 25000,
    ordPayment: "COD",
    ordStatus: "PENDING",
    ordAddress: "123",
    ordPhone: "123",
    ordDate: "2022-11-26 14:10:08",
    transactionMapper: [
      {
        id: 3,
        tranUnitPrice: 100000,
        tranQuantity: 2,
        productId: 1,
        color: "000",
        size: 1,
        productImage:
          "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2022/black-panther-fangs.jpg",
        productName: "Áo thun Marvel Oversize Black Panther",
      },
    ],
  },
  {
    id: 2,
    ordTotalPrice: 600000,
    ordNote: null,
    ordShippingFee: 0,
    ordPayment: "COD",
    ordStatus: "DELIVERING",
    ordAddress: "1 Vo Van Ngan",
    ordPhone: "01101",
    ordDate: "2022-11-26 13:53:18",
    transactionMapper: [
      {
        id: 2,
        tranUnitPrice: 100000,
        tranQuantity: 6,
        productId: 1,
        color: "000",
        size: 1,
        productImage:
          "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2022/black-panther-fangs.jpg",
        productName: "Áo thun Marvel Oversize Black Panther",
      },
    ],
  },
  {
    id: 1,
    ordTotalPrice: 100000,
    ordNote: null,
    ordShippingFee: 25000,
    ordPayment: "COD",
    ordStatus: "DONE",
    ordAddress: "1 Vo Van Ngan",
    ordPhone: "0001",
    ordDate: "2022-11-24 10:21:38",
    transactionMapper: [
      {
        id: 1,
        tranUnitPrice: 100000,
        tranQuantity: 1,
        productId: 2,
        color: "000",
        size: 1,
        productImage:
          "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/October2022/ao-giu-nhiet-modal-mau-xam.jpg",
        productName:
          "Áo giữ nhiệt nam Modal Ultra Warm - mặc là ấm, thoáng khí - Xám",
      },
    ],
  },
];

const Orders = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ padding: "40px 0" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#Aaaaa8" }}>
                <TableCell align="left" width={120}>
                  <Typography
                    component="p"
                    variant="body1"
                    fontWeight="bold"
                    fontSize={18}
                  >
                    Sản phẩm
                  </Typography>
                </TableCell>
                <TableCell width={500}>&nbsp;</TableCell>
                <TableCell align="left" width={200}>
                  &nbsp;
                </TableCell>
                <TableCell align="left" sx={{ width: "250px" }}>
                  <Typography
                    component="p"
                    variant="body1"
                    fontWeight="bold"
                    fontSize={18}
                  >
                    Tổng cộng
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    component="p"
                    variant="body1"
                    fontWeight="bold"
                    fontSize={18}
                    sx={{ width: "180px" }}
                  >
                    Trạng thái
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    component="p"
                    variant="body1"
                    fontWeight="bold"
                    fontSize={18}
                  >
                    Thao tác
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row, orderIndex) => (
                <>
                  <TableRow
                    sx={{
                      backgroundColor: "#Ecece9",
                      borderTop: "2px solid",
                    }}
                  >
                    <TableCell colSpan={2}>
                      <Stack>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          justifyContent="flex-start"
                          alignItems="center"
                          mb={1}
                        >
                          <Avatar sx={{ width: 24, height: 24 }} />
                          <Typography fontSize={16}>
                            Phi Anh | {orders[orderIndex]?.ordPhone}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Typography fontSize={16} color="text.secondary">
                            {orders[orderIndex]?.ordAddress}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Stack>
                        <Typography
                          component="p"
                          variant="body1"
                          fontSize={16}
                          fontWeight="bold"
                        >
                          Mã đơn hàng: {orders[orderIndex]?.id}
                        </Typography>
                        <Typography
                          component="p"
                          variant="body1"
                          fontSize={16}
                          color="text.secondary"
                        >
                          {orders[orderIndex]?.ordDate}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Stack>
                        <Typography
                          component="p"
                          variant="body1"
                          fontSize={18}
                          fontWeight="bold"
                        >
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(orders[orderIndex]?.ordTotalPrice)}
                        </Typography>
                        <Typography
                          component="p"
                          variant="body1"
                          fontSize={18}
                          color="text.secondary"
                        >
                          {orders[orderIndex]?.ordPayment}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      {/* <Typography
                        component="p"
                        variant="body1"
                        fontSize={18}
                        fontWeight="bold"
                      >
                        {orders[orderIndex]?.ordStatus}
                      </Typography> */}
                      <Chip
                        color={
                          ORDER_STATUS.find(
                            (o) => o.status === orders[orderIndex]?.ordStatus
                          ).color
                        }
                        variant="outlined"
                        icon={<FiberManualRecordIcon />}
                        label={
                          ORDER_STATUS.find(
                            (o) => o.status === orders[orderIndex]?.ordStatus
                          ).string
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      {orders[orderIndex]?.ordStatus === ORDER_STATUS[0].status ? (
                        <Stack spacing={1}>
                          <Button
                            sx={{ width: "130px" }}
                            variant="contained"
                            color="success"
                            startIcon={<CheckIcon />}
                          >
                            Xác nhận
                          </Button>
                          <Button
                            sx={{ width: "130px" }}
                            variant="contained"
                            color="error"
                            startIcon={<ClearIcon />}
                          >
                            Hủy đơn
                          </Button>
                        </Stack>
                      ) : ( orders[orderIndex]?.ordStatus === ORDER_STATUS[1].status ? (<Button
                        sx={{ width: "130px" }}
                        variant="contained"
                        startIcon={<LocalShippingIcon />}
                      >
                        Đã giao
                      </Button>) : (
                        <Button
                        sx={{ width: "130px" }}
                        variant="contained"
                        disabled 
                      >
                        Hoàn tất
                      </Button>
                      )
                        
                      )}
                    </TableCell>
                  </TableRow>

                  {orders[orderIndex].transactionMapper.map(
                    (transaction, i) => (
                      <TableRow
                        key={transaction?.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <img
                            width={80}
                            src={transaction?.productImage}
                            alt="product"
                          />
                        </TableCell>
                        <TableCell align="left">
                          <Stack direction="column">
                            <Typography
                              fontSize={16}
                              maxWidth={400}
                              sx={{ color: "#000" }}
                            >
                              {transaction?.productName}
                            </Typography>
                            <Typography
                              fontSize={16}
                              color="text.secondary"
                              maxWidth={200}
                            >
                              Màu: {transaction?.color}
                            </Typography>
                            <Typography
                              fontSize={16}
                              color="text.secondary"
                              maxWidth={200}
                            >
                              Kích cỡ: {transaction?.size}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            fontSize={16}
                            maxWidth={300}
                            sx={{ color: "#000" }}
                          >
                            x{transaction?.tranQuantity}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            component="p"
                            variant="body1"
                            fontSize={18}
                          >
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(transaction?.tranUnitPrice)}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">&nbsp;</TableCell>
                        <TableCell align="left">&nbsp;</TableCell>
                      </TableRow>
                    )
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Orders;
