import {
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Chart from "../Chart/Chart";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Link from "@mui/material/Link";
import { URL_SIDEBAR } from "../../utils/globalVariables";
import { useNavigate } from "react-router-dom";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, "16 Mar, 2019", "Hữu Đăng", "DONE", "COD", 312000),
  createData(1, "16 Mar, 2019", "Phi Anh", "PENDING", "COD", 900000),
  createData(2, "16 Mar, 2019", "Hữu Đăng", "DONE", "COD", 312000),
  createData(3, "16 Mar, 2019", "Hữu Đăng", "DONE", "COD", 312000),
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [profitBy, setProfitBy] = useState("day");

  const handleChangeProfitBy = (e) => {
    setProfitBy(e.target.value);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "40px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                mb={2}
              >
                <Typography component="p" variant="body1" fontSize={18}>
                  Doanh thu
                </Typography>
                <FormControl sx={{ m: 1, width: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">Theo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={profitBy}
                    label="Age"
                    onChange={(e) => handleChangeProfitBy(e)}
                  >
                    <MenuItem value="day">Ngày</MenuItem>
                    <MenuItem value="month">Tháng</MenuItem>
                    <MenuItem value="year">Năm</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Typography component="p" variant="h4" mt={1}>
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(99450000)}
              </Typography>
              {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 15 March, 2019
              </Typography> */}
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Typography component="p" variant="body1" fontSize={20} mb={1}>
                Đơn hàng gần đây
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        component="p"
                        variant="body1"
                        fontWeight="bold"
                        fontSize={18}
                      >
                        Thời gian
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="p"
                        variant="body1"
                        fontWeight="bold"
                        fontSize={18}
                      >
                        Tên khách
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="p"
                        variant="body1"
                        fontWeight="bold"
                        fontSize={18}
                      >
                        Trạng thái đơn
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="p"
                        variant="body1"
                        fontWeight="bold"
                        fontSize={18}
                      >
                        Phương thức thanh toán
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        component="p"
                        variant="body1"
                        fontWeight="bold"
                        fontSize={18}
                      >
                        Số tiền
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Typography component="p" variant="body1" fontSize={18}>
                          {row.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography component="p" variant="body1" fontSize={18}>
                          {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography component="p" variant="body1" fontSize={18}>
                          {row.shipTo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography component="p" variant="body1" fontSize={18}>
                          {row.paymentMethod}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography component="p" variant="body1" fontSize={18}>
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(row.amount)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Link
                color="primary"
                href="#"
                onClick={() => {
                  navigate(URL_SIDEBAR[3]);
                }}
                sx={{ mt: 3 }}
              >
                Xem thêm
              </Link>
            </Paper>
          </Grid>
        </Grid>
        <Typography
          mt={3}
          variant="body2"
          color="text.secondary"
          align="center"
        >
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            ADNCloth
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </>
  );
};

export default Dashboard;
