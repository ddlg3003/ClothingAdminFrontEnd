import React from 'react';
import { Formik } from 'formik';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useCreateCategoryMutation } from '../../services/catApis';

const CategoryControl = () => {
    const [createCategory] = useCreateCategoryMutation();

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
                        await createCategory(values);
                        values.name = '';
                        alert('Tạo danh mục mới thành công');
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
        </Container>
    );
};

export default CategoryControl;
