import React, { useState } from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../services/catApis";
import Alert from "../Alert/Alert";
import { useParams } from "react-router-dom";

const CategoryControl = () => {
  // If id in param, this is edit product if not, this is create product
  const { id } = useParams();

  const { data: categoryData, isFetching: isFetchingCategoryData } =
    useGetCategoryByIdQuery(id, {
      skip: !id,
    });

  const [updateCategory] = useUpdateCategoryMutation();

  const [createCategory] = useCreateCategoryMutation();

  const [openToast, setOpenToast] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    color: "",
    severity: "",
  });

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };

  const handleSubmit = async (values) => {
    try {
      if (categoryData) {
        await updateCategory({ catId: id, formData: values });
      }
      else {
        await createCategory(values);
        values.name = "";
      }
      

      setOpenToast(true);
      setToast((toast) => ({
        ...toast,
        color: "success",
        severity: "success",
        message: `${categoryData ? 'Sửa' : 'Thêm'} danh mục thành công`,
      }));
    } catch (error) {
      setOpenToast(true);
      setToast((toast) => ({
        ...toast,
        color: "error",
        severity: "error",
        message: "Đã có lỗi xảy ra vui lòng thử lại sau",
      }));
    }
  }

  return (
    <Container maxWidth="lg" sx={{ padding: "40px 0" }}>
      <Paper sx={{ padding: "24px 48px 24px 48px" }}>
        <Typography variant="h5" mb={4}>
          {id ? "Sửa" : "Thêm"} danh mục{" "}
          {categoryData ? `(Mã: ${categoryData?.id})` : ""}
        </Typography>
        {isFetchingCategoryData ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="6rem" />
          </Box>
        ) : (
          <Formik
            initialValues={{
              name: categoryData?.name ? categoryData?.name : "",
              parent_id: 0,
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  id="name"
                  name="name"
                  label="Tên danh mục"
                  required
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                />
                <Button
                  sx={{ mt: "8px" }}
                  color="primary"
                  variant="contained"
                  type="submit"
                  size="large"
                >
                  Lưu danh mục
                </Button>
              </form>
            )}
          </Formik>
        )}
      </Paper>
      <Alert
        message={toast.message}
        openToast={openToast}
        handleCloseToast={handleCloseToast}
        color={toast.color}
        severity={toast.severity}
      />
    </Container>
  );
};

export default CategoryControl;
