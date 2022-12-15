import React, { useEffect, useState } from 'react';
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
  Box,
  CircularProgress,
} from '@mui/material';
import { useGetCategoriesQuery } from '../../services/catApis';
import {
  useCreateProductMutation,
  useCreateTypesMutation,
  useCreateProductImageMutation,
  useGetProductQuery,
  useGetProductTypesQuery,
  useGetImagesListQuery,
  useUpdateProductMutation,
  useUpdateTypesMutation,
} from '../../services/productApis';
import { COLOR_LIST, SIZE_LIST } from '../../utils/globalVariables';
import * as yup from 'yup';
import Alert from '../Alert/Alert';
import { LoadingButton } from '@mui/lab';
import { isValidImage } from '../../utils/helperFunction';
import { useParams } from 'react-router-dom';
import useStyles from './styles';

const ProductControl = () => {
  const classes = useStyles();

  // If id in param, this is edit product if not, this is create product
  const { id } = useParams();

  // Toast message config
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

  // Fetch categories api
  const { data: catsData, isFetching: isFetchingCats } =
    useGetCategoriesQuery();

  // Yup validation
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
        size: yup.string('Chọn cỡ').required('Vui lòng chọn cỡ'),
      })
    ),
  });

  // Image stuff
  const [imageArr, setImageArr] = useState([]);

  const { data: imagesListData, isFetching: isFetchingImagesList } =
    useGetImagesListQuery(id, { skip: !id });

  // Set image data when in update mode
  useEffect(() => {
    if (imagesListData?.length > 0) {
      const newImagesList = imagesListData?.map(({ image }) => ({
        content: image,
        file: '',
      }));
      setImageArr(newImagesList);
    }
  }, [isFetchingImagesList]);

  const handleChooseImg = (e) => {
    // Check when choose 5 image or not
    if (imageArr.length <= 5) {
      // Check valid image to upload (<10mb, jpg/jpeg/png)
      if (isValidImage(e.target.files[0])) {
        // Set image for imageArr
        setImageArr((prev) => [
          ...prev,
          {
            content: URL.createObjectURL(e.target.files[0]), // URL for show in UI
            file: e.target.files[0], // file to upload to cloudinary
          },
        ]);
      } else {
        setOpenToast(true);
        setToast((toast) => ({
          ...toast,
          color: 'error',
          severity: 'error',
          message: 'Vui lòng chọn định dạng JPEG/JPG/PNG và nhỏ hơn 10MB',
        }));
      }
    }
  };

  // Create product apis
  const [createProduct, { isLoading: isLoadingProduct }] =
    useCreateProductMutation();
  const [createTypes, { isLoading: isLoadingType }] = useCreateTypesMutation();
  const [createProductImage, { isLoading: isLoadingImg }] =
    useCreateProductImageMutation();

  // Get product info for updating apis
  const { data: product, isFetching: isFetchingProduct } = useGetProductQuery(
    id,
    { skip: !id }
  );

  const { data: productTypes, isFetching: isFetchingTypes } =
    useGetProductTypesQuery(id, { skip: !id });

  // Update product apis
  const [updateProduct] = useUpdateProductMutation();
  const [updateTypes] = useUpdateTypesMutation();

  // Map types to get new types array
  const newTypes = productTypes?.map(({ color, size, quantity, price }) => ({
    color,
    size,
    quantity,
    price,
  }));

  // Form init, when in edit mode we will set product's field to formInit or else empty
  const formInit = {
    name: product?.name ? product?.name : '',
    description: product?.description ? product?.description : '',
    category_id: product?.categoryId ? product?.categoryId : '',
    types: productTypes
      ? newTypes
      : [{ color: '', size: '', quantity: '', price: '' }],
  };

  // Types transform function
  const typesTransformer = (types) => {
    return types.map((type) => ({
      ...type,
      size: type.size.toString(),
      price: type.price.toString(),
      quantity: type.quantity.toString(),
    }))
  }

  // Create product submit function
  const submitCreate = async ({ types, ...productData }, { resetForm }) => {
    if (imageArr.length === 5) {
      // Create product main field
      try {
        const { data: newProduct } = await createProduct(productData);

        // Create types based on product
        const { id } = newProduct;

        await createTypes({ id, formData: typesTransformer(types) });

        // Upload images for product
        const files = new FormData();
        imageArr.forEach((img) => files.append('image', img.file));
        await createProductImage({ id, files });

        setOpenToast(true);

        setToast((toast) => ({
          ...toast,
          color: 'success',
          severity: 'success',
          message: 'Tạo sản phẩm thành công',
        }));

        // Reset form
        resetForm();
        setImageArr([]);
      } catch (error) {
        setOpenToast(true);

        setToast((toast) => ({
          ...toast,
          color: 'error',
          severity: 'error',
          message: 'Đã có lỗi xảy ra vui lòng thử lại',
        }));
      }
    } else {
      setOpenToast(true);

      setToast((toast) => ({
        ...toast,
        color: 'error',
        severity: 'error',
        message: 'Vui lòng chọn đủ 5 ảnh',
      }));
    }
  };

  // Update product submit function
  const submitUpdate = async ({ types, ...productData }) => {
    // Update field
    try {
      await updateProduct({ id, formData: productData });

      await updateTypes({ productId: id, formData: typesTransformer(types) });

      // Check if file content exist for 5 pics
      if (!isFetchingImagesList && !imageArr.find((img) => img.file === '')) {
        if (imageArr.length === 5) {
          const files = new FormData();
          imageArr.forEach((img) => files.append('image', img.file));

          // Call create images api
          await createProductImage({ id, files });
        }
      }

      setToast((toast) => ({
        ...toast,
        color: 'success',
        severity: 'success',
        message: 'Cập nhật sản phẩm thành công',
      }));
    } catch (error) {
      setToast((toast) => ({
        ...toast,
        color: 'error',
        severity: 'error',
        message: 'Đã có lỗi xảy ra vui lòng thử lại',
      }));
    }

    setOpenToast(true);
  };

  return (
    <Container maxWidth="xl" sx={{ padding: '40px 0' }}>
      <Paper sx={{ padding: '24px 8px 24px 48px' }}>
        <Typography variant="h5" mb={4}>
          {id ? 'Sửa' : 'Thêm'} sản phẩm {product ? `(Mã: ${product?.id})` : ''}
        </Typography>
        {isFetchingProduct ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="6rem" />
          </Box>
        ) : (
          <Formik
            initialValues={formInit}
            enableReinitialize={true}
            onSubmit={!product ? submitCreate : submitUpdate}
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
                        disabled={isLoadingImg}
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
                          disabled={isLoadingImg}
                          required
                        >
                          {isFetchingCats ? (
                            <MenuItem value="">Đang tải...</MenuItem>
                          ) : (
                            catsData?.map((cat) => (
                              <MenuItem key={cat?.name} value={cat?.id}>
                                {cat?.name}
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
                        error={
                          touched.description && Boolean(errors.description)
                        }
                        helperText={touched.description && errors.description}
                        className={classes.helperText}
                        disabled={isLoadingImg}
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
                              disabled={isLoadingImg}
                            >
                              <AddIcon /> Thêm loại
                            </Button>
                            {values.types?.map((type, i) => {
                              const quantity = `types[${i}].quantity`;
                              const touchedQuantity = getIn(touched, quantity);
                              const errorsQuantity = getIn(errors, quantity);

                              const price = `types[${i}].price`;
                              const touchedPrice = getIn(touched, price);
                              const errorsPrice = getIn(errors, price);

                              return (
                                <Stack
                                  key={i}
                                  direction="row"
                                  spacing={1}
                                  mb={2}
                                >
                                  <FormControl fullWidth>
                                    <InputLabel id="color">Màu sắc</InputLabel>
                                    <Select
                                      defaultValue=""
                                      id="color"
                                      name={`types.${i}.color`}
                                      label="Màu sắc"
                                      value={values.types[i].color}
                                      onChange={handleChange}
                                      disabled={isLoadingImg}
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
                                      disabled={isLoadingImg}
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
                                    disabled={isLoadingImg}
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
                                    disabled={isLoadingImg}
                                    fullWidth
                                  />
                                  <Button
                                    variant="contained"
                                    onClick={() => arrayHelpers.remove(i)}
                                    disabled={isLoadingImg}
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
                      loading={isLoadingImg}
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
                                ? imageArr[i].content
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
                    <Stack
                      sx={{ marginTop: '12px' }}
                      spacing={1}
                      direction="row"
                      alignItems="center"
                    >
                      <Button
                        variant="contained"
                        component="label"
                        disabled={isLoadingImg}
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
                        disabled={isLoadingImg}
                      >
                        Đặt lại
                      </Button>
                      {product ? (
                        <Typography variant="subtitle1">
                          {'(Đặt lại và chọn đủ 5 ảnh để cập nhật)'}
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        )}
        <Alert
          message={toast.message}
          openToast={openToast}
          handleCloseToast={handleCloseToast}
          color={toast.color}
          severity={toast.severity}
        />
      </Paper>
    </Container>
  );
};

export default ProductControl;
