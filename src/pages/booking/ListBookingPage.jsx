import CommentIcon from '@mui/icons-material/Comment';
import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { filter } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { bookings } from 'src/_mock/bookings';
import Label from 'src/components/label/Label';
import TableBookingSkeleton from 'src/components/skeleton/TableBookingSkeleton';
import { useModal } from 'src/hooks/useModal';
import BookingListToolbar from 'src/sections/@dashboard/booking/BookingListToolbar';
import BookingTableListHead from 'src/sections/@dashboard/booking/BookingTableListHead';
import { getAllBookings } from 'src/services/booking/bookingSlice';
import formatCurrency from 'src/utils/formatPrice';
import Scrollbar from '../../components/scrollbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'customer', label: 'Người đặt sân', alignRight: false },
  { id: 'phone', label: 'Số điện thoại', alignRight: false },
  { id: 'total-price', label: 'Tổng Tiền', alignRight: false },
  { id: 'date', label: 'Ngày Đặt', alignRight: false },
  { id: 'payment', label: 'Thanh Toán', alignRight: false },
];

// ----------------------------------------------------------------------

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
    return filter(array, (_user) => _user.user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function ListBookingPage() {
  const dispatch = useDispatch();

  const isLoading = false;

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('sport-center');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [booking, setBooking] = useState();

  const { toogleOpen: toogleOpenDetail, isOpen: isOpenDetail } = useModal();

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings.length) : 0;
  console.log(emptyRows);

  const filteredUsers = applySortFilter(bookings, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Thông tin đặt sân | TheThaoPlus </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Danh Sách Thông Tin Đặt Sân
          </Typography>
        </Stack>

        <Card>
          <BookingListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <BookingTableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                {isLoading ? (
                  <TableBody>
                    {filteredUsers.length === 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={10}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                              py: 15,
                            }}
                          >
                            <CircularProgress color="main" />
                          </Paper>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                ) : (
                  <TableBody>
                    {filteredUsers.length === 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={10}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                              py: 10,
                            }}
                          >
                            <IconButton color="inherit">
                              <CommentIcon sx={{ fontSize: 80 }} />
                            </IconButton>
                            <Typography variant="h6">Chưa có booking nào trong danh sách</Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                )}

                {isLoading ? (
                  <TableBookingSkeleton length={filteredUsers.length} />
                ) : (
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const { id, totalPrice, payments, user, date } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="center">
                            <Typography variant="subtitle2">{index + 1}</Typography>
                          </TableCell>
                          <TableCell
                            scope="row"
                            padding="none"
                            sx={{ pl: 2 }}
                            onClick={() => {
                              toogleOpenDetail();
                              setBooking(row);
                            }}
                          >
                            <Typography variant="subtitle2" sx={{ width: 150, fontSize: '0.875rem' }} noWrap>
                              {user?.name}
                            </Typography>
                          </TableCell>

                          <TableCell align="left"> {user?.phone}</TableCell>
                          <TableCell align="left">{formatCurrency(totalPrice)}</TableCell>
                          <TableCell align="left">{moment(date).format('DD-MM-YYYY')}</TableCell>

                          <TableCell align="left">
                            <Label color={(payments === true && 'success') || 'error'}>
                              {payments ? 'Đã thanh toán' : 'Chưa thanh toán'}
                            </Label>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={9} />
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
            count={bookings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      {isOpenDetail && (
        <Dialog maxWidth="sm" open={isOpenDetail} onClose={toogleOpenDetail}>
          <DialogContent sx={{ width: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Thông tin giao dịch
            </Typography>

            <img src={booking.imagePayment} alt="payment" style={{ width: '290px' }} />
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

export default ListBookingPage;
