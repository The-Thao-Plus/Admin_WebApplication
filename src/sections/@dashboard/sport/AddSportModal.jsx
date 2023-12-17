import AddIcon from '@mui/icons-material/Add';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from 'src/Firebase/firebase';
import { creatNewSport, updateSport } from 'src/services/sport/sportSlice';
import * as Yup from 'yup';

function AddSportModal({ isOpenAdd, toogleOpenAdd, handleCloseMenu }) {
  const dispatch = useDispatch();

  const { isEditing, sport } = useSelector((state) => state.sport);

  // Upload Image to firebase
  const [image, setImage] = useState(isEditing && sport?.image);
  const [stringImg, setStringImg] = useState([]);

  const onImageChange = (event) => {
    let storageImage = [];
    console.log('event.target.files: ', event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      storageImage.push(event.target.files[0]);
    }
    setStringImg(storageImage);
  };

  let imagesLink = [];
  const uploadAndGetLinkImg = async () => {
    for (let i = 0; i < stringImg.length; i++) {
      const storageRef = ref(storage, `/sport/${stringImg[i].name}`);
      console.log(stringImg[i].name);
      await uploadBytes(storageRef, stringImg[i]);
      // get link from database to download
      await getDownloadURL(storageRef)
        .then((url) => {
          imagesLink.push(url);
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: isEditing ? sport?.name : '',
    },
    onSubmit: async (values, formikHelpers) => {
      await uploadAndGetLinkImg();
      const newSport = {
        name: formik.values.name,
        image: imagesLink[0] || sport?.image,
      };
      const params = {
        sportId: sport._id,
        newSport,
      };
      dispatch(isEditing ? updateSport(params) : creatNewSport(newSport));
      toogleOpenAdd();
      formikHelpers.resetForm();
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Hãy nhập tên môn thể thao'),
    }),
  });

  return (
    <>
      {isOpenAdd && (
        <Dialog maxWidth="xs" fullWidth open={isOpenAdd} onClose={toogleOpenAdd}>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
                <SportsSoccerRoundedIcon fontSize="large" color="main" />
                <Typography variant="h4">Thêm môn thể thao mới</Typography>
              </Stack>
              <Stack direction="column" justifyContent="center" alignItems="center" position="relative">
                {!image ? (
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      width: 250,
                      height: 250,
                      borderRadius: 999,
                      p: 2,
                      mb: 2,
                      boxShadow: 0,
                      textAlign: 'center',
                      color: (theme) => theme.palette['main'].darker,
                      borderColor: (theme) => theme.palette['main'].lighter,
                      borderWidth: 2,
                      borderStyle: 'dashed',
                    }}
                  >
                    <AddIcon fontSize="large" />
                    <Typography variant="subtitle2">Tải hình ảnh</Typography>
                  </Stack>
                ) : (
                  <Box>
                    <Avatar src={image} alt="sport" sx={{ width: 255, height: 255 }} />
                  </Box>
                )}
                <Box position="absolute" bottom={15} right={95}>
                  <Box position="relative">
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      sx={{ width: 50, height: 50, borderRadius: 999, backgroundColor: 'main.main', color: '#fff' }}
                    >
                      <AddToPhotosIcon />
                    </Stack>
                    <input
                      type="file"
                      onChange={onImageChange}
                      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0 }}
                    />
                  </Box>
                </Box>
              </Stack>
              <FormControl fullWidth sx={{ mt: 2, px: 5 }}>
                <TextField
                  name="name"
                  label="Môn thể thao"
                  type="text"
                  color="main"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && (
                  <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                    {formik.errors.name}
                  </Typography>
                )}
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                onClick={() => {
                  toogleOpenAdd();
                  handleCloseMenu();
                }}
              >
                Đóng
              </Button>
              {isEditing ? (
                <Button variant="contained" color="warning" size="medium" type="submit">
                  Cập nhật
                </Button>
              ) : (
                <Button variant="contained" color="success" size="medium" type="submit">
                  Thêm mới
                </Button>
              )}
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
}

export default AddSportModal;
