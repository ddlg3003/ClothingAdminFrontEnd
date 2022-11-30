import React from "react";
import { Avatar, Button, Container, Stack, Typography, Paper, TableRow, TableContainer, TableHead, TableCell, TableBody, Table } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Orders = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ paddingTop: "40px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e3e3e3" }}>
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
                <TableCell width={400}>&nbsp;</TableCell>
                <TableCell align="left" width={100}>
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
                    sx={{ width: "250px" }}
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
              {rows.map((row, i) => (
                <>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Stack
                        direction="row"
                        spacing={1.5}
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Avatar sx={{ width: 24, height: 24 }} />
                        <Typography fontSize={16}>Phi Anh</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">&nbsp;</TableCell>
                    <TableCell align="left">&nbsp;</TableCell>
                    <TableCell align="left">
                      <Typography
                        component="p"
                        variant="body1"
                        fontSize={16}
                        fontWeight="bold"
                      >
                        Mã đơn hàng: 213412
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Button variant="outlined" startIcon={<CheckIcon />}>
                        Xác nhận
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        width={80}
                        src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/October2022/84rising-oversize-basic-tee-trang.jpg"
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="column">
                        <Typography
                          fontSize={16}
                          maxWidth={300}
                          sx={{ color: "#000" }}
                        >
                          Áo thun oversize basic 84RISING
                        </Typography>
                        <Typography
                          fontSize={16}
                          color="text.secondary"
                          maxWidth={200}
                        >
                          Màu: White
                        </Typography>
                        <Typography
                          fontSize={16}
                          color="text.secondary"
                          maxWidth={200}
                        >
                          Kích cỡ: L
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        fontSize={16}
                        maxWidth={300}
                        sx={{ color: "#000" }}
                      >
                        x1
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography component="p" variant="body1" fontSize={18}>
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(10000000)}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        fontSize={16}
                        maxWidth={300}
                        sx={{ color: "#000" }}
                      >
                        Chưa xử lý
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                        &nbsp;
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        width={80}
                        src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/October2022/84rising-oversize-basic-tee-trang.jpg"
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="column">
                        <Typography
                          fontSize={16}
                          maxWidth={300}
                          sx={{ color: "#000" }}
                        >
                          Áo thun oversize basic 84RISING
                        </Typography>
                        <Typography
                          fontSize={16}
                          color="text.secondary"
                          maxWidth={200}
                        >
                          Màu: White
                        </Typography>
                        <Typography
                          fontSize={16}
                          color="text.secondary"
                          maxWidth={200}
                        >
                          Kích cỡ: L
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        fontSize={16}
                        maxWidth={300}
                        sx={{ color: "#000" }}
                      >
                        x1
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography component="p" variant="body1" fontSize={18}>
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(10000000)}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        fontSize={16}
                        maxWidth={300}
                        sx={{ color: "#000" }}
                      >
                        Chưa xử lý
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                        &nbsp;
                    </TableCell>
                  </TableRow>
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
