import AddIcon from "@mui/icons-material/Add";
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
    Typography
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useGetPagingCategoriesQuery, useDeleteCategoryMutation } from "../../services/catApis";
import {
    CATEGORY_STATUS_ACTIVE, LIMIT
} from "../../utils/globalVariables";
import Pagination from "../Pagination/Pagination";
import useStyles from "./styles";

const Categories = () => {
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

  const { data: catsData, isFetching: isFetchingCats } =
    useGetPagingCategoriesQuery({
      pageNumber: page + 1,
      pageSize: rowsPerPage,
    });

  console.log(catsData);

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleClickChangeCategoryStatus = async (catId) => {
    await deleteCategory(catId);
  }

  return (
    <Container maxWidth="xl" sx={{ padding: "40px 0" }}>
      <Paper sx={{ padding: "12px" }}>
        <div className={classes.categoryInfo}>
          <Typography variant="h6">
            Tổng danh mục hiện có: {catsData?.categoryMapperList.length}
          </Typography>
          <RouterLink to="/categories/add" className={classes.link}>
            <Button variant="contained" size="medium">
              <AddIcon />
              &nbsp;Thêm mới
            </Button>
          </RouterLink>
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
                  Mã danh mục
                </Typography>
              </TableCell>
              <TableCell align="left" width={100}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Tên danh mục
                </Typography>
              </TableCell>
              <TableCell align="left" width={100}>
                <Typography
                  component="p"
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                >
                  Số lượng sản phẩm
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
            {isFetchingCats ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="body1" fontSize={16} fontWeight="bold">
                    ...Đang tải danh mục
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              catsData?.categoryMapperList.map((cat, i) => (
                <TableRow key={i}>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {cat?.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {cat?.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="p" variant="body1" fontSize={16}>
                      {cat?.productQuantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <Link
                        onClick={() => navigate(`/categories/edit/${cat?.id}`)}
                        sx={{ cursor: "pointer" }}
                      >
                        Chỉnh sửa
                      </Link>

                      <Link sx={{ cursor: "pointer" }} onClick={() => handleClickChangeCategoryStatus(cat?.id)}>
                        {cat?.status === CATEGORY_STATUS_ACTIVE
                          ? "Ẩn"
                          : "Bỏ ẩn"}
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
        count={!isFetchingCats ? catsData?.numberItem : 0}
      />
    </Container>
  );
};

export default Categories;
