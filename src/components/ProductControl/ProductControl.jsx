import React from 'react';
import { Formik, FieldArray } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFilePicker } from 'use-file-picker';
import { Button, Container, TextField, Stack, Grid } from '@mui/material';

const ProductControl = () => {
    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    limitFilesConfig: { max: 1 },
    // minFileSize: 1,
    maxFileSize: 10, // in megabytes
  });

  return (
    <Container maxWidth="xl" sx={{ padding: '40px 0' }}>
      <Formik
        initialValues={{
          name: '',
          types: [{ color: '', size: '', quantity: '', price: '' }],
        }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <TextField
                    id="name"
                    name="name"
                    label="Tên sản phẩm"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <FieldArray
                    name="types"
                    render={(arrayHelpers) => (
                      <div>
                        <Button
                          onClick={() =>
                            arrayHelpers.push({
                              color: '',
                              size: '',
                              quantity: '',
                              price: '',
                            })
                          }
                          variant="contained"
                          sx={{
                            marginBottom: '12px',
                          }}
                        >
                          <AddIcon /> Thêm loại
                        </Button>
                        {values.types.map((type, i) => (
                          <Stack key={i} direction="row" spacing={1} mb={2}>
                            <TextField
                              id="color"
                              name={`types.${i}.color`}
                              label="Màu sắc"
                              value={values.types[i].color}
                              onChange={handleChange}
                            />
                            <TextField
                              id="size"
                              name={`types.${i}.size`}
                              label="Kích cỡ"
                              value={`${values.types[i].size}`}
                              onChange={handleChange}
                            />
                            <TextField
                              id="quantity"
                              name={`types.${i}.quantity`}
                              label="Số lượng"
                              value={`${values.types[i].quantity}`}
                              onChange={handleChange}
                            />
                            <TextField
                              id="price"
                              name={`types.${i}.price`}
                              label="Giá"
                              value={`${values.types[i].price}`}
                              onChange={handleChange}
                            />
                            <Button
                              variant="contained"
                              onClick={() => arrayHelpers.remove(i)}
                            >
                              <RemoveIcon />
                            </Button>
                          </Stack>
                        ))}
                      </div>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              size="large"
            >
              Lưu sản phẩm
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default ProductControl;
