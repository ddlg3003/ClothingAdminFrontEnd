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
} from '@mui/material';
import {
  BarChart,
  Bar,
  // Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  // ResponsiveContainer,
  // Label,
} from 'recharts';
import React, { useState } from 'react';
import Chart from '../Chart/Chart';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';
import { REPORT_CRITERIA, URL_SIDEBAR } from '../../utils/globalVariables';
import { useNavigate } from 'react-router-dom';
import { useGetAllOrdersQuery } from '../../services/orderApis';
import {
  useGetProfitByCriteriaQuery,
  useGetSoldStatisticQuery,
} from '../../services/reportApis';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Dashboard = () => {
  const [reportCriteria, setReportCriteria] = useState(REPORT_CRITERIA.day);
  // get profit by timeline
  const { data: profit, isFetching: isFetchingProfit } =
    useGetProfitByCriteriaQuery(reportCriteria);

  const { data: ordersData, isFetching: isFetchingOrdersData } =
    useGetAllOrdersQuery();
  console.log(ordersData);

  const { data: soldData, isFetching: isFetchingSoldData } =
    useGetSoldStatisticQuery();

  console.log(soldData);

  const navigate = useNavigate();

  const handleChangeProfitBy = (e) => {
    setReportCriteria(e.target.value);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ paddingTop: '40px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
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
                display: 'flex',
                flexDirection: 'column',
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
                    <MenuItem value={REPORT_CRITERIA.day}>Ngày</MenuItem>
                    <MenuItem value={REPORT_CRITERIA.month}>Tháng</MenuItem>
                    <MenuItem value={REPORT_CRITERIA.year}>Năm</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              {isFetchingProfit ? (
                <Typography component="p" variant="h4" mt={1}>
                  Đang tải...
                </Typography>
              ) : (
                <Typography component="p" variant="h4" mt={1}>
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(profit)}
                </Typography>
              )}
              {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
                {new Date.getDate()}
              </Typography> */}
            </Paper>
          </Grid>
          {isFetchingSoldData ? (
            <></>
          ) : (
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 450,
                  width: '100%',
                }}
              >
                <Typography component="p" variant="body1" fontSize={20} mb={1}>
                  Số lượng sản phẩm đã bán
                </Typography>
                <BarChart
                  width={1200}
                  height={400}
                  data={soldData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sold" fill="#82ca9d" />
                </BarChart>
              </Paper>
            </Grid>
          )}

          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography component="p" variant="body1" fontSize={20} mb={1}>
                Đơn hàng gần đây
              </Typography>
              {isFetchingOrdersData ? (
                <Typography component="p" variant="body1" fontSize={20} mb={1}>
                  Đang tải đơn hàng...
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
                              {Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
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
                      navigate(URL_SIDEBAR.order);
                    }}
                    sx={{ mt: 3 }}
                  >
                    Xem thêm
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
          {'Copyright © '}
          <Link color="inherit" href="http://localhost:3000/">
            ADNCloth
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </>
  );
};

export default Dashboard;
