import React, { useState } from 'react';
import {
  Button,
  Container,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  useGetProductsQuery,
  useGetTypesQuery,
  useHideProductMutation,
} from '../../services/productApis';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { LIMIT, STATUS_ACTIVE } from '../../utils/globalVariables';
import useStyles from './styles';

const Products = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(LIMIT);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, LIMIT));
    setPage(0);
  };

  // Product and types apis
  const { data: productsData, isFetching: isFetchingProducts } =
    useGetProductsQuery({
      pageNumber: page + 1,
      pageSize: rowsPerPage,
      cat: '',
    });
  const { data: typesData, isFetching: isFetchingTypes } = useGetTypesQuery();

  // Disable product apis
  const [hideProduct] = useHideProductMutation();

  const typesAvgPrice = (arr) => {
    const total = arr?.reduce((acc, element) => acc + element.price, 0);

    return Math.ceil(total / arr?.length);
  };

  const handleClickChangeProductStatus = async (id) => {
    try {
        await hideProduct(id);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Container maxWidth="xl" sx={{ padding: '40px 0' }}>
      <Paper sx={{ padding: '12px' }}>
        <div className={classes.productInfo}>
          <Typography variant="h6">
            Tổng sản phẩm hiện có: {productsData?.numberItem}
          </Typography>
          <RouterLink to="/products/add" className={classes.link}>
            <Button variant="contained" size="medium">
              <AddIcon />
              &nbsp;Thêm mới
            </Button>
          </RouterLink>
        </div>
      </Paper>
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="product">
          <TableHead>
            <TableRow>
              <TableCell align="left" width={80}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Mã sản phẩm
                </Typography>
              </TableCell>
              <TableCell align="left" width={80}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Hình ảnh
                </Typography>
              </TableCell>
              <TableCell align="left" width={120}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Tên sản phẩm
                </Typography>
              </TableCell>
              <TableCell align="left" width={100}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Giá trung bình
                </Typography>
              </TableCell>
              <TableCell align="left" width={100}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Tổng loại
                </Typography>
              </TableCell>
              <TableCell align="left" width={100}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Số lượng
                </Typography>
              </TableCell>
              <TableCell align="left" width={100}>
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
            {isFetchingProducts || isFetchingTypes ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography variant="body1" fontSize={16} fontWeight="bold">
                    ...Đang tải sản phẩm
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              productsData?.list.map((product, i) => (
                <TableRow key={i}>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {product?.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <img width={80} src={product?.image} alt="product" />
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {product?.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(
                        typesAvgPrice(
                          typesData?.filter(
                            (type) => product?.id === type.productId
                          )
                        )
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {
                        typesData?.filter(
                          (type) => product?.id === type.productId
                        ).length
                      }
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {typesData
                        ?.filter((type) => product?.id === type.productId)
                        .reduce((acc, type) => acc + type.quantity, 0)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <Link
                        onClick={() =>
                          navigate(`/products/edit/${product?.id}`)
                        }
                        sx={{ cursor: 'pointer' }}
                      >
                        Chỉnh sửa
                      </Link>
                      <Link
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleClickChangeProductStatus(product?.id)}
                      >
                        {product?.status === STATUS_ACTIVE
                          ? 'Ẩn'
                          : 'Bỏ ẩn'}
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        count={!isFetchingProducts ? productsData?.numberItem : 0}
      />
    </Container>
  );
};

export default Products;
