import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import InstagramIcon from '@mui/icons-material/Instagram';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import WhereToVoteRoundedIcon from '@mui/icons-material/WhereToVoteRounded';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import AppWidgetPrice from 'src/sections/@dashboard/app/AppWidgetPrice';
import { getAllAccounts } from 'src/services/account/accountSlice';
import { getAllBookings } from 'src/services/booking/bookingSlice';
import { getAllSports } from 'src/services/sport/sportSlice';
import Iconify from '../../components/iconify';
import {
  AppConversionRates,
  AppCurrentVisits,
  AppNewsUpdate,
  AppTrafficBySite,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { accounts } = useSelector((state) => state.account);
  const { sports } = useSelector((state) => state.sport);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllAccounts());
    dispatch(getAllSports());
    dispatch(getAllBookings());
  }, [dispatch]);

  let accountsNotCurrentUser = accounts.filter((account) => account._id !== user._id);

  const accountsNotOwnerUser = accounts.filter(
    (account) => account.role?.name !== 'owner' && account.role?.name !== 'admin'
  );

  const sortedData = accountsNotCurrentUser.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  const totalSportCenter = sports.reduce(function (total, sport) {
    return (total += sport.sportCenters?.length);
  }, 0);

  const userQuantity = accounts.filter((account) => account.role?.name === 'user');
  const ownerQuantity = accounts.filter((account) => account.role?.name === 'owner');

  const newAccountChart = [
    {
      name: 'User',
      quantity: userQuantity?.length,
    },
    {
      name: 'Owner',
      quantity: ownerQuantity?.length,
    },
  ];

  console.log(accountsNotOwnerUser);

  var totalBooking = accountsNotOwnerUser.reduce(function (total, account) {
    return (total += account.bookingforUser?.length);
  }, 0);

  console.log(totalBooking);

  return (
    <>
      <Helmet>
        <title> Dashboard | TheThaoPlus </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Chào mừng bạn quay trở lại
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetPrice
              title="Doanh Thu"
              total={4000000}
              color="success"
              icon={<AttachMoneyRoundedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Bookings" total={totalBooking} icon={<BookOnlineIcon fontSize="large" />} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Người Dùng" total={accounts.length} icon={<GroupsIcon fontSize="large" />} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Môn Thể Thao"
              total={sports.length}
              color="info"
              icon={<SportsSoccerRoundedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Trung Tâm Thể Thao"
              total={totalSportCenter}
              color="warning"
              icon={<WhereToVoteRoundedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppConversionRates
              title="Đánh giá các trung tâm thể thao"
              subheader="(+...%) so với tháng trước"
              // chartData={[
              //   { label: 'Italy', value: 400 },
              //   { label: 'Japan', value: 430 },
              //   { label: 'China', value: 448 },
              //   { label: 'Canada', value: 470 },
              //   { label: 'France', value: 540 },
              //   { label: 'Germany', value: 580 },
              //   { label: 'South Korea', value: 690 },
              //   { label: 'Netherlands', value: 1100 },
              //   { label: 'United States', value: 1200 },
              //   { label: 'United Kingdom', value: 1380 },
              // ]}

              chartData={newAccountChart?.map((role) => {
                return { label: role.name, value: (role.quantity * 100) / accountsNotCurrentUser.length || 50 };
              })}
              sx={{ height: '100%' }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Môn thể thao có trung tâm"
              chartData={sports.map((sport) => {
                return { label: sport.name, value: (sport.sportCenters?.length / totalSportCenter) * 100 };
              })}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.success.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
                theme.palette.main.main,
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppWebsiteVisits
              title="Tiếp cận trung tâm thể thao"
              subheader="(+43%) so với tháng trước"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
              ]}
              chartData={[
                // {
                //   name: 'Facebook',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                {
                  name: 'Facebook',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Instagram',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Dịch vụ ưa dùng"
              chartLabels={['Sân thể thao', 'Phòng thay đồ', 'Nước uống', 'Gửi xe', 'Phòng chờ']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Người dùng mới"
              list={sortedData.slice(0, 5).map((account, index) => ({
                id: account._id,
                title: account.firstname + ' ' + account.lastname,
                role: account.role?.name,
                email: account.email,
                image: account.image,
                postedAt: account.createdAt,
              }))}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Lượng truy cập theo trang web"
              list={[
                {
                  name: 'FaceBook',
                  value: 656,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                  link: 'https://www.facebook.com/exethethaoplus',
                },
                {
                  name: 'Instagram',
                  value: 371,
                  icon: <InstagramIcon fontSize="large" sx={{ color: '#fb5245' }} />,
                  link: 'https://www.instagram.com/the_thao_plus/',
                },
                // {
                //   name: 'Google',
                //   value: 341212,
                //   icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                //   link: 'https://www.facebook.com/exethethaoplus',
                // },
                // {
                //   name: 'Twitter',
                //   value: 443232,
                //   icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                //   link: 'https://www.facebook.com/exethethaoplus',
                // },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
