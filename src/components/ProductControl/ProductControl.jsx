import React, { useState } from 'react';
import { Formik, FieldArray, getIn } from 'formik';
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
import { useGetCategoriesQuery } from '../../services/catApis';
import {
  useCreateProductMutation,
  useCreateTypesMutation,
  useCreateProductImageMutation,
} from '../../services/productApis';
import { COLOR_LIST, SIZE_LIST } from '../../utils/globalVariables';
import * as yup from 'yup';
import Alert from '../Alert/Alert';
import { LoadingButton } from '@mui/lab';
import { isValidImage } from '../../utils/helperFunction';
import useStyles from './styles';

const ProductControl = () => {
  const classes = useStyles();

  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  const { data: catsData, isFetching: isFetchingCats } =
    useGetCategoriesQuery();

  const validationSchema = yup.object().shape({
    name: yup
      .string('Nhập tên sản phẩm')
      .min(10, 'Tên sản phẩm cần có ít nhất 10 kí tự')
      .required('Tên sản phẩm là trường bắt buộc'),
    category_id: yup.string('Chọn danh mục').required('Vui lòng chọn danh mục'),
    description: yup
      .string('Nhập mô tả')
      .min(20, 'Mô tả cần ít nhất 20 kí tự')
      .required('Mô tả là trường bắt buộc'),
    types: yup.array().of(
      yup.object().shape({
        quantity: yup
          .number('Nhập số lượng')
          .min(1, 'Cần lớn hơn 0')
          .max(1000000000, 'Số quá lớn')
          .required('Bắt buộc'),
        price: yup
          .number('Nhập số lượng')
          .min(1, 'Cần lớn hơn 0')
          .max(1000000000, 'Số quá lớn')
          .required('Bắt buộc'),
        color: yup.string('Chọn màu').required('Vui lòng chọn màu'),
        color: yup.string('Chọn cỡ').required('Vui lòng chọn cỡ'),
      })
    ),
  });

  const [imageArr, setImageArr] = useState([]);

  const handleChooseImg = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        if (imageArr.length <= 5) {
          if(isValidImage(e.target)) {
            setImageArr((prev) => [...prev, fileReader.result]);
          }
          else {
            setOpenToast(true);
            setToastMessage('Vui lòng chọn định dạng JPEG/JPG/PNG và nhỏ hơn 10MB');
          }
        }
      }
    }

    if(e.target.files[0]){
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const [createProduct, { isLoading: isLoadingProduct }] =
    useCreateProductMutation();
  const [createTypes, { isLoading: isLoadingType }] = useCreateTypesMutation();
  const [createProductImage, { isLoading: isLoadingImg }] =
    useCreateProductImageMutation();

  const submit = async (values) => {
    const { types, ...productData } = values;

    if (imageArr.length === 5) {
      // Create product main field
      // const { data: newProduct } = await createProduct(productData);

      // Create types based on product
      // const { id } = newProduct;
      // console.log(id);
      // const newTypes = types.map(type => ({ ...type, product_id: id }));    
      // console.log(newTypes)  
      // await createTypes(newTypes);

      // Upload images for product
      // const formData = new FormData();
      // imageArr.forEach(img => formData.append('image', img));
      // await createProductImage(formData);
    } else {
      setOpenToast(true);
      setToastMessage('Vui lòng chọn đủ 5 ảnh');
    }
  };

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
            category_id: '',
            types: [{ color: '', size: '', quantity: '', price: '' }],
          }}
          onSubmit={submit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleSubmit, touched, errors }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Stack spacing={3}>
                    <TextField
                      id="name"
                      name="name"
                      label="Tên sản phẩm"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      className={classes.helperText}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="category_id">Danh mục</InputLabel>
                      <Select
                        defaultValue="--Chọn danh mục--"
                        labelId="category_id"
                        id="category_id"
                        name="category_id"
                        label="Danh mục"
                        value={values.category_id}
                        onChange={handleChange}
                        required
                      >
                        {isFetchingCats ? (
                          <MenuItem>Đang tải...</MenuItem>
                        ) : (
                          catsData?.map((cat) => (
                            <MenuItem key={cat.name} value={cat.id}>
                              {cat.name}
                            </MenuItem>
                          ))
                        )}
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
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                      className={classes.helperText}
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
                          {values.types.map((type, i) => {
                            const quantity = `types[${i}].quantity`;
                            const touchedQuantity = getIn(touched, quantity);
                            const errorsQuantity = getIn(errors, quantity);

                            const price = `types[${i}].price`;
                            const touchedPrice = getIn(touched, price);
                            const errorsPrice = getIn(errors, price);

                            return (
                              <Stack key={i} direction="row" spacing={1} mb={2}>
                                <FormControl fullWidth>
                                  <InputLabel id="color">Màu sắc</InputLabel>
                                  <Select
                                    defaultValue=""
                                    id="color"
                                    name={`types.${i}.color`}
                                    label="Màu sắc"
                                    value={values.types[i].color}
                                    onChange={handleChange}
                                    required
                                  >
                                    {COLOR_LIST.map((color, i) => (
                                      <MenuItem key={i} value={color.color}>
                                        {color.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                  <InputLabel id="size">Kích cỡ</InputLabel>
                                  <Select
                                    defaultValue=""
                                    id="size"
                                    name={`types.${i}.size`}
                                    label="Kích cỡ"
                                    value={`${values.types[i].size}`}
                                    onChange={handleChange}
                                    required
                                  >
                                    {SIZE_LIST.map((size, i) => (
                                      <MenuItem key={i} value={size}>
                                        {size}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <TextField
                                  id="quantity"
                                  name={`types.${i}.quantity`}
                                  label="Số lượng"
                                  value={`${values.types[i].quantity}`}
                                  onChange={handleChange}
                                  error={Boolean(
                                    touchedQuantity && errorsQuantity
                                  )}
                                  helperText={
                                    touchedQuantity && errorsQuantity
                                      ? errorsQuantity
                                      : ''
                                  }
                                  className={classes.helperText}
                                  type="number"
                                  fullWidth
                                />
                                <TextField
                                  id="price"
                                  name={`types.${i}.price`}
                                  label="Giá"
                                  value={`${values.types[i].price}`}
                                  onChange={handleChange}
                                  error={touchedPrice && Boolean(errorsPrice)}
                                  helperText={touchedPrice && errorsPrice}
                                  className={classes.helperText}
                                  type="number"
                                  fullWidth
                                />
                                <Button
                                  variant="contained"
                                  onClick={() => arrayHelpers.remove(i)}
                                >
                                  <RemoveIcon />
                                </Button>
                              </Stack>
                            );
                          })}
                        </div>
                      )}
                    />
                  </Stack>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    loading={isLoadingProduct || isLoadingType || isLoadingImg}
                    size="large"
                  >
                    Lưu sản phẩm
                  </LoadingButton>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={1}>
                    {[1, 2, 3, 4, 5].map((elem, i) => (
                      <Grid item key={elem}>
                        <img
                          src={
                            imageArr[i]
                              ? imageArr[i]
                              : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoCzq9xjEDLMt0eFPm5RP_-kTFYleKW3iheQ&usqp=CAU`
                          }
                          alt="img"
                          style={{
                            width: '200px',
                            height: '300px',
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Stack sx={{ marginTop: '12px' }} spacing={1} direction="row">
                    <Button
                      variant="contained"
                      component="label"
                      disabled={
                        isLoadingProduct || isLoadingType || isLoadingImg
                      }
                    >
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
                      disabled={
                        isLoadingProduct || isLoadingType || isLoadingImg
                      }
                    >
                      Đặt lại
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
        <Alert
          message={toastMessage}
          openToast={openToast}
          handleCloseToast={handleCloseToast}
          color="error"
          severity="error"
        />
      </Paper>
    </Container>
  );
};

export default ProductControl;
