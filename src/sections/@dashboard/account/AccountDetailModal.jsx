import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeAccount, deactiveAccount, getAccount } from 'src/services/account/accountSlice';
import moment from 'moment';
import Label from 'src/components/label/Label';
import AccountSkeleton from 'src/components/skeleton/AccountSkeleton';
import palette from 'src/theme/palette';
import { getAllSports } from 'src/services/sport/sportSlice';

function AccountDetailModal({ isOpenDetail, toogleOpenDetail, idToDetail }) {
  const dispatch = useDispatch();

  const { account, isLoading } = useSelector((state) => state.account);
  const { sports } = useSelector((state) => state.sport);

  console.log(account);

  useEffect(() => {
    dispatch(getAccount(idToDetail));
  }, [dispatch, idToDetail]);

  useEffect(() => {
    dispatch(getAllSports());
  }, [dispatch]);

  return (
    <>
      {isOpenDetail && (
        <Dialog maxWidth="md" fullWidth open={isOpenDetail} onClose={toogleOpenDetail}>
          <DialogContent>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
              <PersonIcon fontSize="large" color="main" />
              <Typography variant="h4">Thông tin chi tiết người dùng</Typography>
            </Stack>

            {isLoading ? (
              <AccountSkeleton role={account.role?.name} />
            ) : (
              <Grid container columnSpacing={2}>
                <Grid item xs={12} md={4}>
                  <Avatar src={account?.image} alt={account.lastname} sx={{ width: 250, height: 250 }} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Stack
                    direction="column"
                    gap={1}
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      borderWidth: 2,
                      borderStyle: 'dashed',
                      borderColor: (theme) => theme.palette['main'].lighter,
                    }}
                  >
                    <Typography component="h6" variant="h3" sx={{ textTransform: 'capitalize' }}>
                      {account.firstname} {account.lastname}
                    </Typography>
                    <Grid container>
                      <Grid item md={6}>
                        <Stack direction="row" alignItems="center" gap={1} mb={2}>
                          <CakeIcon color="main" />
                          <Typography>{moment(account.YOB).format('DD-MM-YYYY')}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <LocalPhoneRoundedIcon color="main" />
                          <Typography>{account.phone}</Typography>
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" alignItems="center" gap={1}>
                          <Typography fontWeight="bold">Trạng thái:</Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                size="small"
                                color="success"
                                checked={!account.isBlocked}
                                onClick={() =>
                                  dispatch(
                                    !account.isBlocked ? deactiveAccount(account._id) : activeAccount(account._id)
                                  )
                                }
                              />
                            }
                            label={
                              <Label color={(!account.isBlocked === false && 'error') || 'success'}>
                                {!account.isBlocked ? 'Hoạt động' : 'Không hoạt động'}
                              </Label>
                            }
                          />
                        </Stack>

                        <Divider sx={{ my: 2 }} />
                      </Grid>
                      <Grid item md={6}>
                        <Box mb={2}>
                          {account.gender === 'male' ? (
                            <Stack direction="row" alignItems="center" gap={1}>
                              <MaleIcon color="main" />
                              <Typography textTransform="capitalize">{account.gender}</Typography>
                            </Stack>
                          ) : account.gender === 'female' ? (
                            <Stack direction="row" alignItems="center" gap={1}>
                              <FemaleIcon color="main" />
                              <Typography textTransform="capitalize">{account.gender}</Typography>
                            </Stack>
                          ) : (
                            <Stack direction="row" alignItems="center" gap={1}>
                              <TransgenderIcon color="main" />
                              <Typography textTransform="capitalize">{account.gender}</Typography>
                            </Stack>
                          )}
                        </Box>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <EmailIcon color="main" />
                          <Typography>{account.email}</Typography>
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" alignItems="center" gap={1}>
                          <Typography fontWeight="bold">Vai trò:</Typography>
                          <Label
                            color={
                              account.role?.name === 'user'
                                ? 'success'
                                : account.role?.name === 'owner'
                                ? 'warning'
                                : account.role?.name === 'admin'
                                ? 'primary'
                                : 'error'
                            }
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {account.role?.name}
                          </Label>
                        </Stack>

                        <Divider sx={{ my: 2.2 }} />
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>

                {account.role?.name === 'owner' && (
                  <Stack paddingX={3} mt={5}>
                    <Typography variant="h5">Trung tâm sở hữu</Typography>

                    <Stack direction="column" gap={2} mt={1}>
                      {account.sportCenters?.map((sportCenter) => (
                        <Stack
                          direction="row"
                          gap={1}
                          p={2}
                          sx={{ backgroundColor: palette.grey[200] }}
                          borderRadius={2}
                        >
                          <Avatar
                            variant="square"
                            src={sportCenter?.image}
                            alt={sportCenter.name}
                            sx={{ width: 100, height: 100, borderRadius: 1 }}
                          />

                          <Stack>
                            <Typography variant="h5">{sportCenter.name}</Typography>
                            <Typography variant="subtitle1" mb={1}>
                              {sportCenter.address}
                            </Typography>
                            {sports.map((sport) => (
                              <Box>
                                {sport._id === sportCenter.sport && (
                                  <Label
                                    color={
                                      sport.name === 'bóng đá'
                                        ? 'success'
                                        : sport.name === 'bóng rổ'
                                        ? 'warning'
                                        : sport.name === 'cầu lông'
                                        ? 'primary'
                                        : 'error'
                                    }
                                    sx={{ textTransform: 'capitalize', fontSize: '16px' }}
                                  >
                                    {sport.name}
                                  </Label>
                                )}
                              </Box>
                            ))}
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                )}
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" size="small" onClick={toogleOpenDetail}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default AccountDetailModal;
