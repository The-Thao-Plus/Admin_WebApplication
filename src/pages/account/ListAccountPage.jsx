import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import TableAccountSkeleton from 'src/components/skeleton/TableAccountSkeleton';
import { useModal } from 'src/hooks/useModal';
import AccountDetailModal from 'src/sections/@dashboard/account/AccountDetailModal';
import { activeAccount, deactiveAccount, deleteAccount, getAllAccounts } from 'src/services/account/accountSlice';
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
import { TableListHead, UserListToolbar } from '../../sections/@dashboard/table';

const TABLE_HEAD = [
  { id: 'name', label: 'Họ & Tên', alignRight: false },
  { id: 'sdt', label: 'Số điện thoại', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'booking', label: 'Booking', alignRight: false },
  { id: 'role', label: 'Vai trò', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
  { id: '' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => {
      const name = _user.firstname + ' ' + _user.lastname;
      return name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  return stabilizedThis.map((el) => el[0]);
}

function ListAccountPage() {
  const dispatch = useDispatch();

  const { toogleOpen, isOpen } = useModal();
  const { toogleOpen: toogleOpenDetail, isOpen: isOpenDetail } = useModal();

  const { accounts, isLoading } = useSelector((state) => state.account);
  console.log(accounts)

  const accountsNotCurrentUser = accounts.filter(
    (account) => account.role?.name !== 'owner' && account.role?.name !== 'admin'
  );

  const [open, setOpen] = useState(null);

  const [idToDelete, setIdToDelete] = useState(null);
  const [idToDetail, setIdToDetail] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllAccounts());
  }, [dispatch]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - accountsNotCurrentUser.length) : 0;

  const filteredUsers = applySortFilter(accountsNotCurrentUser, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Người Dùng | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Danh sách người dùng
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                {isLoading ? (
                  <TableAccountSkeleton />
                ) : (
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const {
                        _id,
                        firstname,
                        lastname,
                        phone,
                        role,
                        email,
                        bookingforOwner,
                        bookingforUser,
                        image,
                        isBlocked,
                      } = row;

                      const name = firstname + ' ' + lastname;

                      return (
                        <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                          <TableCell align="center" width={60}>
                            <Typography variant="subtitle2">{index + 1}</Typography>
                          </TableCell>

                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                            onClick={() => {
                              toogleOpenDetail();
                              setIdToDetail(_id);
                            }}
                            sx={{ cursor: 'pointer' }}
                          >
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={firstname} src={image} sx={{ width: 56, height: 56 }} />
                              <Typography variant="subtitle2" noWrap sx={{ textTransform: 'capitalize' }}>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">
                            <Typography sx={{ width: 150, fontSize: '0.875rem' }} noWrap>
                              {email}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            {/* {Math.floor(Math.random() * 5) + 1} bookings */}
                            {bookingforOwner.length + bookingforUser.length}{' '}
                            {bookingforOwner.length + bookingforUser.length > 1 ? 'bookings' : 'booking'}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              color={
                                role?.name === 'user'
                                  ? 'success'
                                  : role?.name === 'owner'
                                  ? 'warning'
                                  : role?.name === 'admin'
                                  ? 'primary'
                                  : 'error'
                              }
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {role?.name}
                            </Label>
                          </TableCell>

                          <TableCell align="left">
                            <FormControlLabel
                              control={
                                <Switch
                                  size="small"
                                  color="success"
                                  checked={!isBlocked}
                                  onClick={() => dispatch(!isBlocked ? deactiveAccount(_id) : activeAccount(_id))}
                                />
                              }
                              label={
                                <Label color={(!isBlocked === false && 'error') || 'success'}>
                                  {!isBlocked ? 'Hoạt động' : 'Không hoạt động'}
                                </Label>
                              }
                            />
                          </TableCell>

                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                              <MoreVertIcon
                                onClick={() => {
                                  setIdToDelete(_id);
                                }}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                )}

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Không tìm thấy
                          </Typography>

                          <Typography variant="body2">
                            Không tìm thấy kết quả cho &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Hãy thử kiểm tra lỗi chính tả hoặc sử dụng các từ hoàn chỉnh.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem sx={{ color: 'error.main' }} onClick={toogleOpen}>
          <DeleteRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>

      {isOpenDetail && (
        <AccountDetailModal isOpenDetail={isOpenDetail} toogleOpenDetail={toogleOpenDetail} idToDetail={idToDetail} />
      )}

      {isOpen && (
        <Dialog
          sx={{
            '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
              width: '300px',
              maxWidth: '300px',
            },
          }}
          open={isOpen}
          onClose={toogleOpen}
        >
          <DialogContent sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Bạn có muốn xóa tài khoản này không?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                toogleOpen();
                handleCloseMenu();
              }}
            >
              Đóng
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                dispatch(deleteAccount(idToDelete));
                toogleOpen();
                handleCloseMenu();
              }}
            >
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ListAccountPage;
