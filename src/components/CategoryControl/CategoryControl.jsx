import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useCreateCategoryMutation } from '../../services/catApis';
import Alert from '../Alert/Alert';

const CategoryControl = () => {
  const [createCategory] = useCreateCategoryMutation();

  const [openToast, setOpenToast] = useState(false);

  const [toast, setToast] = useState({
    message: '',
    color: '',
    severity: '',
  });

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '40px 0' }}>
      <Paper sx={{ padding: '24px 48px 24px 48px' }}>
        <Typography variant="h5" mb={4}>
          Thêm danh mục
        </Typography>
        <Formik
          initialValues={{
            name: '',
            parent_id: 0,
          }}
          onSubmit={async (values) => {
            try {
              await createCategory(values);
              values.name = '';

              setOpenToast(true);
              setToast((toast) => ({
                ...toast,
                color: 'success',
                severity: 'success',
                message: 'Tạo danh mục thành công',
              }));
            } catch (error) {
              setOpenToast(true);
              setToast((toast) => ({
                ...toast,
                color: 'error',
                severity: 'error',
                message: 'Đã có lỗi xảy ra vui lòng thử lại sau',
              }));
            }
          }}
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
                sx={{ mt: '8px' }}
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
