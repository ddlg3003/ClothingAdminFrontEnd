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
import { REPORT_CRITERIA, URL_SIDEBAR } from "../../utils/globalVariables";
import { useNavigate } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../services/orderApis";
import { useGetProfitByCriteriaQuery } from "../../services/reportApis";

const Dashboard = () => {
  const [reportCriteria, setReportCriteria] = useState(REPORT_CRITERIA[0]);
  // get profit by timeline
  const { data: profit, isFetching: isFetchingProfit } =
    useGetProfitByCriteriaQuery(reportCriteria);

  const { data: ordersData, isFetching: isFetchingOrdersData } =
    useGetAllOrdersQuery();
  console.log(ordersData);

  const navigate = useNavigate();


  const handleChangeProfitBy = (e) => {
    setReportCriteria(e.target.value);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ paddingTop: "40px" }}>
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
                    value={reportCriteria}
                    label="Age"
                    onChange={(e) => handleChangeProfitBy(e)}
                  >
                    <MenuItem value={REPORT_CRITERIA[0]}>Ng??y</MenuItem>
                    <MenuItem value={REPORT_CRITERIA[1]}>Th??ng</MenuItem>
                    <MenuItem value={REPORT_CRITERIA[2]}>N??m</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              {isFetchingProfit ? (
                <Typography component="p" variant="h4" mt={1}>
                  ??ang t???i...
                </Typography>
              ) : (
                <Typography component="p" variant="h4" mt={1}>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(profit)}
                </Typography>
              )}
              {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
                {new Date.getDate()}
              </Typography> */}
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Typography component="p" variant="body1" fontSize={20} mb={1}>
                ????n h??ng g???n ????y
              </Typography>
              {isFetchingOrdersData ? (
                <Typography component="p" variant="body1" fontSize={20} mb={1}>
                  ??ang t???i ????n h??ng...
                </Typography>
              ) : (
                <>
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
                            Th???i gian
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            component="p"
                            variant="body1"
                            fontWeight="bold"
                            fontSize={18}
                          >
                            T??n kh??ch
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            component="p"
                            variant="body1"
                            fontWeight="bold"
                            fontSize={18}
                          >
                            Tr???ng th??i ????n
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            component="p"
                            variant="body1"
                            fontWeight="bold"
                            fontSize={18}
                          >
                            Ph????ng th???c thanh to??n
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            component="p"
                            variant="body1"
                            fontWeight="bold"
                            fontSize={18}
                          >
                            S??? ti???n
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ordersData?.slice(0, 5).map((order) => (
                        <TableRow key={order?.id}>
                          <TableCell>
                            <Typography
                              component="p"
                              variant="body1"
                              fontSize={18}
                            >
                              {order?.ordDate}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              component="p"
                              variant="body1"
                              fontSize={18}
                            >
                              {order?.ordName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              component="p"
                              variant="body1"
                              fontSize={18}
                            >
                              {order?.ordStatus}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              component="p"
                              variant="body1"
                              fontSize={18}
                            >
                              {order?.ordPayment}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              component="p"
                              variant="body1"
                              fontSize={18}
                            >
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(order?.ordTotalPrice)}
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
                    Xem th??m
                  </Link>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Typography
          mt={3}
          variant="body2"
          color="text.secondary"
          align="center"
        >
          {"Copyright ?? "}
          <Link color="inherit" href="http://localhost:3000/">
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
