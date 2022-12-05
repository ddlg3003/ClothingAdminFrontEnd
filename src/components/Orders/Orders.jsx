import {
  Avatar,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useAcceptOrderMutation,
  useDenyOrderMutation,
  useGetOrdersQuery,
} from "../../services/orderApis";
import {
  ERROR_MESSAGES,
  ORDER_PAGING_LIMIT,
  ORDER_STATUS,
} from "../../utils/globalVariables";
import CancelOrderDialog from "./CancelOrderDialog";
import Pagination from "../Pagination/Pagination";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";

const Orders = () => {
  // tabs handling
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // handle scroll position after content load
  const handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    window.scrollTo(0, parseInt(scrollPosition));
  };

  // store position in sessionStorage
  const handleStoreScrollPosition = (e) => {
    sessionStorage.setItem("scrollPosition", window.pageYOffset);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ORDER_PAGING_LIMIT);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, ORDER_PAGING_LIMIT));
    setPage(0);
  };

  const { data: ordersData, isFetching: isFetchingOrders } = useGetOrdersQuery({
    pageNumber: page + 1,
    pageSize: rowsPerPage,
    status: "",
  });

  useEffect(() => {
    handleScrollPosition();
  }, [isFetchingOrders]);

  // cancel order dialog's state
  const [openCancelOrderDialog, setOpenCancelOrderDialog] = useState("");

  const handleClickCancelOrder = (orderId) => {
    handleStoreScrollPosition();
    setOpenCancelOrderDialog(orderId);
  };

  const handleCloseCancelOrder = () => {
    setOpenCancelOrderDialog("");
  };

  const [denyOrder] = useDenyOrderMutation();
  const [acceptOrder, { error }] = useAcceptOrderMutation();

  // api calls
  const handleConfirmCancelOrder = async (orderId) => {
    await denyOrder(orderId);
    handleScrollPosition();
  };

  const handleAcceptOrder = async (orderId) => {
    handleStoreScrollPosition();
    await acceptOrder(orderId)
      .unwrap()
      .then()
      .catch((error) => {
        if (error.originalStatus === 409) alert(ERROR_MESSAGES[0]);
      });

    handleScrollPosition();
  };

  const handleCompletingOrder = async (orderId) => {
    await acceptOrder(orderId);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ padding: "40px 0" }}>
        <Paper sx={{ padding: "12px", marginBottom: "20px" }}>
          <div sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">
              Tổng đơn hàng hiện có: {ordersData?.numberItem}
            </Typography>
          </div>
        </Paper>
        <TableContainer component={Paper}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Tất cả" value="1" />
                  <Tab label="Chờ xác nhận" value="2" />
                  <Tab label="Đang giao" value="3" />
                  <Tab label="Đã giao" value="4" />
                  <Tab label="Đã hủy" value="5" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{}}>
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
                          sx={{ width: "200px" }}
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
                    {isFetchingOrders ? (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Typography
                            variant="body1"
                            fontSize={16}
                            fontWeight="bold"
                          >
                            Đang tải đơn hàng...
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      ordersData.orderMapperList.map((order, orderIndex) => (
                        <>
                          <TableRow key={order?.id} sx={{ height: "130px" }}>
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
                                    {order?.ordName} | {order?.ordPhone}
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction="row"
                                  spacing={1.5}
                                  justifyContent="flex-start"
                                  alignItems="center"
                                >
                                  <Typography
                                    fontSize={16}
                                    color="text.secondary"
                                  >
                                    {order?.ordAddress}
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
                                  // fontWeight="bold"
                                >
                                  Mã đơn hàng: {order?.id}
                                </Typography>
                                <Typography
                                  component="p"
                                  variant="body1"
                                  fontSize={16}
                                  color="text.secondary"
                                >
                                  {order?.ordDate}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">
                              <Stack>
                                <Typography
                                  component="p"
                                  variant="body1"
                                  fontSize={20}
                                  fontWeight="bold"
                                >
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(order?.ordTotalPrice)}
                                </Typography>
                                <Typography
                                  component="p"
                                  variant="body1"
                                  fontSize={18}
                                  color="text.secondary"
                                >
                                  {order?.ordPayment}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">
                              <Typography
                                component="p"
                                variant="body1"
                                fontSize={18}
                                // fontWeight="bold"
                              >
                                {
                                  ORDER_STATUS.find(
                                    (o) => o.status === order?.ordStatus
                                  ).string
                                }
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              {order?.ordStatus === ORDER_STATUS[0].status ? (
                                <Stack spacing={1}>
                                  <Button
                                    sx={{ width: "130px" }}
                                    variant="contained"
                                    onClick={() => handleAcceptOrder(order.id)}
                                  >
                                    Xác nhận
                                  </Button>

                                  <Button
                                    sx={{ width: "130px" }}
                                    variant="outlined"
                                    onClick={() =>
                                      handleClickCancelOrder(order.id)
                                    }
                                  >
                                    Hủy đơn
                                  </Button>
                                  <CancelOrderDialog
                                    open={openCancelOrderDialog === order.id}
                                    onClose={handleCloseCancelOrder}
                                    orderId={order.id}
                                    handleConfirmCancelOrder={
                                      handleConfirmCancelOrder
                                    }
                                  />
                                </Stack>
                              ) : order?.ordStatus ===
                                ORDER_STATUS[1].status ? (
                                <Button
                                  sx={{ width: "130px" }}
                                  variant="contained"
                                  onClick={() =>
                                    handleCompletingOrder(order.id)
                                  }
                                >
                                  Đã giao
                                </Button>
                              ) : (
                                <Button
                                  sx={{ width: "130px" }}
                                  variant="outlined"
                                  disabled
                                >
                                  Hoàn tất
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>

                          {order.transactionMapper.map((transaction, i) => (
                            <TableRow
                              key={transaction?.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                          ))}
                          {orderIndex !==
                          ordersData.orderMapperList.length - 1 ? (
                            <TableRow
                              sx={{
                                backgroundColor: "#F5F5F5",
                                lineHeight: "30px",
                              }}
                            >
                              <TableCell>&nbsp;</TableCell>
                              <TableCell>&nbsp;</TableCell>
                              <TableCell>&nbsp;</TableCell>
                              <TableCell>&nbsp;</TableCell>
                              <TableCell>&nbsp;</TableCell>
                              <TableCell>&nbsp;</TableCell>
                            </TableRow>
                          ) : (
                            <>
                              <Divider />
                            </>
                          )}
                        </>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value="2">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{}}>
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
                          sx={{ width: "200px" }}
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
                    {isFetchingOrders ? (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Typography
                            variant="body1"
                            fontSize={16}
                            fontWeight="bold"
                          >
                            Đang tải đơn hàng...
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      ordersData.orderMapperList
                        ?.filter(
                          (order) => order.ordStatus === ORDER_STATUS[0].status
                        )
                        .map((order, orderIndex) => (
                          <>
                            <TableRow key={order?.id} sx={{ height: "130px" }}>
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
                                      {order?.ordName} | {order?.ordPhone}
                                    </Typography>
                                  </Stack>
                                  <Stack
                                    direction="row"
                                    spacing={1.5}
                                    justifyContent="flex-start"
                                    alignItems="center"
                                  >
                                    <Typography
                                      fontSize={16}
                                      color="text.secondary"
                                    >
                                      {order?.ordAddress}
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
                                    // fontWeight="bold"
                                  >
                                    Mã đơn hàng: {order?.id}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={16}
                                    color="text.secondary"
                                  >
                                    {order?.ordDate}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">
                                <Stack>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={20}
                                    fontWeight="bold"
                                  >
                                    {Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(order?.ordTotalPrice)}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={18}
                                    color="text.secondary"
                                  >
                                    {order?.ordPayment}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">
                                <Typography
                                  component="p"
                                  variant="body1"
                                  fontSize={18}
                                  // fontWeight="bold"
                                >
                                  {
                                    ORDER_STATUS.find(
                                      (o) => o.status === order?.ordStatus
                                    ).string
                                  }
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                {order?.ordStatus === ORDER_STATUS[0].status ? (
                                  <Stack spacing={1}>
                                    <Button
                                      sx={{ width: "130px" }}
                                      variant="contained"
                                      onClick={() =>
                                        handleAcceptOrder(order.id)
                                      }
                                    >
                                      Xác nhận
                                    </Button>

                                    <Button
                                      sx={{ width: "130px" }}
                                      variant="outlined"
                                      onClick={() =>
                                        handleClickCancelOrder(order.id)
                                      }
                                    >
                                      Hủy đơn
                                    </Button>
                                    <CancelOrderDialog
                                      open={openCancelOrderDialog === order.id}
                                      onClose={handleCloseCancelOrder}
                                      orderId={order.id}
                                      handleConfirmCancelOrder={
                                        handleConfirmCancelOrder
                                      }
                                    />
                                  </Stack>
                                ) : order?.ordStatus ===
                                  ORDER_STATUS[1].status ? (
                                  <Button
                                    sx={{ width: "130px" }}
                                    variant="contained"
                                    onClick={() =>
                                      handleCompletingOrder(order.id)
                                    }
                                  >
                                    Đã giao
                                  </Button>
                                ) : (
                                  <Button
                                    sx={{ width: "130px" }}
                                    variant="contained"
                                    disabled
                                  >
                                    Hoàn tất
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>

                            {order.transactionMapper.map((transaction, i) => (
                              <TableRow
                                key={transaction?.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
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
                            ))}
                            {orderIndex !==
                            ordersData.orderMapperList.length - 1 ? (
                              <TableRow
                                sx={{
                                  backgroundColor: "#F5F5F5",
                                  lineHeight: "30px",
                                }}
                              >
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                              </TableRow>
                            ) : (
                              <>
                                <Divider />
                              </>
                            )}
                          </>
                        ))
                    )}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value="3">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{}}>
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
                          sx={{ width: "200px" }}
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
                    {isFetchingOrders ? (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Typography
                            variant="body1"
                            fontSize={16}
                            fontWeight="bold"
                          >
                            Đang tải đơn hàng...
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      ordersData.orderMapperList
                        ?.filter(
                          (order) => order.ordStatus === ORDER_STATUS[1].status
                        )
                        .map((order, orderIndex) => (
                          <>
                            <TableRow key={order?.id} sx={{ height: "130px" }}>
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
                                      {order?.ordName} | {order?.ordPhone}
                                    </Typography>
                                  </Stack>
                                  <Stack
                                    direction="row"
                                    spacing={1.5}
                                    justifyContent="flex-start"
                                    alignItems="center"
                                  >
                                    <Typography
                                      fontSize={16}
                                      color="text.secondary"
                                    >
                                      {order?.ordAddress}
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
                                    // fontWeight="bold"
                                  >
                                    Mã đơn hàng: {order?.id}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={16}
                                    color="text.secondary"
                                  >
                                    {order?.ordDate}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">
                                <Stack>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={20}
                                    fontWeight="bold"
                                  >
                                    {Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(order?.ordTotalPrice)}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={18}
                                    color="text.secondary"
                                  >
                                    {order?.ordPayment}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">
                                <Typography
                                  component="p"
                                  variant="body1"
                                  fontSize={18}
                                  // fontWeight="bold"
                                >
                                  {
                                    ORDER_STATUS.find(
                                      (o) => o.status === order?.ordStatus
                                    ).string
                                  }
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                {order?.ordStatus === ORDER_STATUS[0].status ? (
                                  <Stack spacing={1}>
                                    <Button
                                      sx={{ width: "130px" }}
                                      variant="contained"
                                      onClick={() =>
                                        handleAcceptOrder(order.id)
                                      }
                                    >
                                      Xác nhận
                                    </Button>

                                    <Button
                                      sx={{ width: "130px" }}
                                      variant="outlined"
                                      onClick={() =>
                                        handleClickCancelOrder(order.id)
                                      }
                                    >
                                      Hủy đơn
                                    </Button>
                                    <CancelOrderDialog
                                      open={openCancelOrderDialog === order.id}
                                      onClose={handleCloseCancelOrder}
                                      orderId={order.id}
                                      handleConfirmCancelOrder={
                                        handleConfirmCancelOrder
                                      }
                                    />
                                  </Stack>
                                ) : order?.ordStatus ===
                                  ORDER_STATUS[1].status ? (
                                  <Button
                                    sx={{ width: "130px" }}
                                    variant="contained"
                                    onClick={() =>
                                      handleCompletingOrder(order.id)
                                    }
                                  >
                                    Đã giao
                                  </Button>
                                ) : (
                                  <Button
                                    sx={{ width: "130px" }}
                                    variant="contained"
                                    disabled
                                  >
                                    Hoàn tất
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>

                            {order.transactionMapper.map((transaction, i) => (
                              <TableRow
                                key={transaction?.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
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
                            ))}
                            {orderIndex !==
                            ordersData.orderMapperList.length - 1 ? (
                              <TableRow
                                sx={{
                                  backgroundColor: "#F5F5F5",
                                  lineHeight: "30px",
                                }}
                              >
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                              </TableRow>
                            ) : (
                              <>
                                <Divider />
                              </>
                            )}
                          </>
                        ))
                    )}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value="4">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{}}>
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
                          sx={{ width: "200px" }}
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
                    {isFetchingOrders ? (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Typography
                            variant="body1"
                            fontSize={16}
                            fontWeight="bold"
                          >
                            Đang tải đơn hàng...
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      ordersData.orderMapperList
                        ?.filter(
                          (order) => order.ordStatus === ORDER_STATUS[2].status
                        )
                        .map((order, orderIndex) => (
                          <>
                            <TableRow key={order?.id} sx={{ height: "130px" }}>
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
                                      {order?.ordName} | {order?.ordPhone}
                                    </Typography>
                                  </Stack>
                                  <Stack
                                    direction="row"
                                    spacing={1.5}
                                    justifyContent="flex-start"
                                    alignItems="center"
                                  >
                                    <Typography
                                      fontSize={16}
                                      color="text.secondary"
                                    >
                                      {order?.ordAddress}
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
                                    // fontWeight="bold"
                                  >
                                    Mã đơn hàng: {order?.id}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={16}
                                    color="text.secondary"
                                  >
                                    {order?.ordDate}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">
                                <Stack>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={20}
                                    fontWeight="bold"
                                  >
                                    {Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(order?.ordTotalPrice)}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={18}
                                    color="text.secondary"
                                  >
                                    {order?.ordPayment}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">
                                <Typography
                                  component="p"
                                  variant="body1"
                                  fontSize={18}
                                  // fontWeight="bold"
                                >
                                  {
                                    ORDER_STATUS.find(
                                      (o) => o.status === order?.ordStatus
                                    ).string
                                  }
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                {order?.ordStatus === ORDER_STATUS[0].status ? (
                                  <Stack spacing={1}>
                                    <Button
                                      sx={{ width: "130px" }}
                                      variant="contained"
                                      onClick={() =>
                                        handleAcceptOrder(order.id)
                                      }
                                    >
                                      Xác nhận
                                    </Button>

                                    <Button
                                      sx={{ width: "130px" }}
                                      variant="outlined"
                                      onClick={() =>
                                        handleClickCancelOrder(order.id)
                                      }
                                    >
                                      Hủy đơn
                                    </Button>
                                    <CancelOrderDialog
                                      open={openCancelOrderDialog === order.id}
                                      onClose={handleCloseCancelOrder}
                                      orderId={order.id}
                                      handleConfirmCancelOrder={
                                        handleConfirmCancelOrder
                                      }
                                    />
                                  </Stack>
                                ) : order?.ordStatus ===
                                  ORDER_STATUS[1].status ? (
                                  <Button
                                    sx={{ width: "130px" }}
                                    variant="contained"
                                    onClick={() =>
                                      handleCompletingOrder(order.id)
                                    }
                                  >
                                    Đã giao
                                  </Button>
                                ) : (
                                  <Button
                                    sx={{ width: "130px" }}
                                    variant="contained"
                                    disabled
                                  >
                                    Hoàn tất
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>

                            {order.transactionMapper.map((transaction, i) => (
                              <TableRow
                                key={transaction?.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
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
                            ))}
                            {orderIndex !==
                            ordersData.orderMapperList.length - 1 ? (
                              <TableRow
                                sx={{
                                  backgroundColor: "#F5F5F5",
                                  lineHeight: "30px",
                                }}
                              >
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                              </TableRow>
                            ) : (
                              <>
                                <Divider />
                              </>
                            )}
                          </>
                        ))
                    )}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value="5">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{}}>
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
                          sx={{ width: "200px" }}
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
                    {isFetchingOrders ? (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Typography
                            variant="body1"
                            fontSize={16}
                            fontWeight="bold"
                          >
                            Đang tải đơn hàng...
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      ordersData.orderMapperList
                        ?.filter(
                          (order) => order.ordStatus === ORDER_STATUS[3].status
                        )
                        .map((order, orderIndex) => (
                          <>
                            <TableRow key={order?.id} sx={{ height: "130px" }}>
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
                                      {order?.ordName} | {order?.ordPhone}
                                    </Typography>
                                  </Stack>
                                  <Stack
                                    direction="row"
                                    spacing={1.5}
                                    justifyContent="flex-start"
                                    alignItems="center"
                                  >
                                    <Typography
                                      fontSize={16}
                                      color="text.secondary"
                                    >
                                      {order?.ordAddress}
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
                                    // fontWeight="bold"
                                  >
                                    Mã đơn hàng: {order?.id}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={16}
                                    color="text.secondary"
                                  >
                                    {order?.ordDate}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">
                                <Stack>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={20}
                                    fontWeight="bold"
                                  >
                                    {Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(order?.ordTotalPrice)}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    variant="body1"
                                    fontSize={18}
                                    color="text.secondary"
                                  >
                                    {order?.ordPayment}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">
                                <Typography
                                  component="p"
                                  variant="body1"
                                  fontSize={18}
                                  // fontWeight="bold"
                                >
                                  {
                                    ORDER_STATUS.find(
                                      (o) => o.status === order?.ordStatus
                                    ).string
                                  }
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                {order?.ordStatus === ORDER_STATUS[0].status ? (
                                  <Stack spacing={1}>
                                    <Button
                                      sx={{ width: "130px" }}
                                      variant="contained"
                                      onClick={() =>
                                        handleAcceptOrder(order.id)
                                      }
                                    >
                                      Xác nhận
                                    </Button>

                                    <Button
                                      sx={{ width: "130px" }}
                                      variant="outlined"
                                      onClick={() =>
                                        handleClickCancelOrder(order.id)
                                      }
                                    >
                                      Hủy đơn
                                    </Button>
                                    <CancelOrderDialog
                                      open={openCancelOrderDialog === order.id}
                                      onClose={handleCloseCancelOrder}
                                      orderId={order.id}
                                      handleConfirmCancelOrder={
                                        handleConfirmCancelOrder
                                      }
                                    />
                                  </Stack>
                                ) : order?.ordStatus ===
                                  ORDER_STATUS[1].status ? (
                                  <Button
                                    sx={{ width: "130px" }}
                                    variant="contained"
                                    onClick={() =>
                                      handleCompletingOrder(order.id)
                                    }
                                  >
                                    Đã giao
                                  </Button>
                                ) : (
                                  <Button
                                    sx={{ width: "130px" }}
                                    variant="contained"
                                    disabled
                                  >
                                    Hoàn tất
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>

                            {order.transactionMapper.map((transaction, i) => (
                              <TableRow
                                key={transaction?.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
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
                            ))}
                            {orderIndex !==
                            ordersData.orderMapperList.length - 1 ? (
                              <TableRow
                                sx={{
                                  backgroundColor: "#F5F5F5",
                                  lineHeight: "30px",
                                }}
                              >
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                              </TableRow>
                            ) : (
                              <>
                                <Divider />
                              </>
                            )}
                          </>
                        ))
                    )}
                  </TableBody>
                </Table>
              </TabPanel>
            </TabContext>
          </Box>
        </TableContainer>
        <Pagination
          page={page}
          handleChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          count={!isFetchingOrders ? ordersData?.numberItem : 0}
        />
      </Container>
    </>
  );
};

export default Orders;
