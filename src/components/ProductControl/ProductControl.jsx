import React, { useState } from 'react';
import { Formik, FieldArray } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Button,
  Container,
  TextField,
  Stack,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Typography,
} from '@mui/material';

const ProductControl = () => {
  const [imageArr, setImageArr] = useState([]);

  const catsData = [
    {
      id: 1,
      name: 'Đồ mặc hàng ngày',
    },
    {
      id: 2,
      name: 'Đồ ngủ',
    },
  ];

  const handleChooseImg = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        if(imageArr.length <= 5) {
          setImageArr(prev => [...prev, fileReader.result]);
        }
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  }

  console.log(imageArr)

  return (
    <Container maxWidth="xl" sx={{ padding: '40px 0' }}>
      <Paper sx={{ padding: '24px 8px 24px 48px' }}>
        <Typography variant="h5" mb={4}>
          Thêm sản phẩm
        </Typography>
        <Formik
          initialValues={{
            name: '',
            description: '',
            catId: '',
            types: [{ color: '', size: '', quantity: '', price: '' }],
          }}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Stack spacing={2}>
                    <TextField
                      id="name"
                      name="name"
                      label="Tên sản phẩm"
                      value={values.name}
                      onChange={handleChange}
                      required
                    />
                    <FormControl fullWidth>
                      <InputLabel id="catId">Danh mục</InputLabel>
                      <Select
                        defaultValue="--Chọn danh mục--"
                        labelId="catId"
                        id="catId"
                        name="catId"
                        label="Danh mục"
                        value={values.catId}
                        onChange={handleChange}
                        required
                      >
                        {catsData.map((cat) => (
                          <MenuItem key={cat.name} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      id="description"
                      name="description"
                      label="Mô tả"
                      value={values.description}
                      onChange={handleChange}
                      rows={5}
                      multiline
                      required
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
                                required
                              />
                              <TextField
                                id="size"
                                name={`types.${i}.size`}
                                label="Kích cỡ"
                                value={`${values.types[i].size}`}
                                onChange={handleChange}
                                required
                              />
                              <TextField
                                id="quantity"
                                name={`types.${i}.quantity`}
                                label="Số lượng"
                                value={`${values.types[i].quantity}`}
                                onChange={handleChange}
                                required
                              />
                              <TextField
                                id="price"
                                name={`types.${i}.price`}
                                label="Giá"
                                value={`${values.types[i].price}`}
                                onChange={handleChange}
                                required
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
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    size="large"
                  >
                    Lưu sản phẩm
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={1}>
                    {[1, 2, 3, 4, 5].map((elem, i) => (
                      <Grid item key={elem}>
                        <img
                          src={imageArr[i] ? imageArr[i] : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoCzq9xjEDLMt0eFPm5RP_-kTFYleKW3iheQ&usqp=CAU`}
                          alt="img"
                          style={{ width: '200px', height: '300px' }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Stack sx={{ marginTop: '12px' }} spacing={1} direction="row">
                    <Button variant="contained" component="label">
                      Chọn ảnh
                      <input
                        name="image"
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        hidden
                        onChange={handleChooseImg}
                      />
                    </Button>
                    <Button 
                      variant="contained"
                      onClick={() => setImageArr([])}
                    >
                      Đặt lại
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ProductControl;
