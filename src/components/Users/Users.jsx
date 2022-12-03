import {
  Button,
  Container,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
// import Pagination from '../Pagination/Pagination';
import AddIcon from "@mui/icons-material/Add";
import { useGetCategoriesQuery } from "../../services/catApis";
import { useGetAllProductsQuery } from "../../services/productApis";
import { useGetAllUsersQuery } from "../../services/userApis";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useStyles from "./styles";

const Users = () => {
  const classes = useStyles();

  const { data: usersData, isFetching: isFetchingUsers } =
    useGetAllUsersQuery();
  console.log(usersData);

  return (
    <Container maxWidth="xl" sx={{ padding: "40px 0" }}>
      <Paper sx={{ padding: "12px" }}>
        <div className={classes.categoryInfo}>
          <Typography variant="h6">
            Tổng người dùng hiện có: {usersData?.length}
          </Typography>
        </div>
      </Paper>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="product">
          <TableHead>
            <TableRow>
              <TableCell align="left" width={100}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Tên đăng nhập
                </Typography>
              </TableCell>
              <TableCell align="left" width={100}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Tên người dùng
                </Typography>
              </TableCell>
              <TableCell align="left" width={80}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Số điện thoại
                </Typography>
              </TableCell>
              <TableCell align="left" width={120}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Email
                </Typography>
              </TableCell>
              <TableCell align="left" width={80}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Giới tính
                </Typography>
              </TableCell>
              <TableCell align="left" width={100}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Trạng thái
                </Typography>
              </TableCell>
              <TableCell align="left" width={60}>
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
            {isFetchingUsers ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="body1" fontSize={16} fontWeight="bold">
                    ...Đang tải danh sách người dùng
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              usersData?.map((user, i) => (
                <TableRow key={i}>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {user?.username}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {user?.fullname}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {user?.phone}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {user?.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {user?.gender === "male"
                        ? "Nam"
                        : user?.gender === "female"
                        ? "Nữ"
                        : "Khác"}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {user?.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Link sx={{ cursor: "pointer" }}>Hạn chế</Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Pagination
                page={page}
                handleChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                count={!isFetchingProducts ? productsData?.numberItem : 0}
            /> */}
    </Container>
  );
};

export default Users;
