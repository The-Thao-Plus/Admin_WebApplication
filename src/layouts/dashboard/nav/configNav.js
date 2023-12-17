// MUI icons
import GroupIcon from '@mui/icons-material/Group';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const navConfigOwner = [
  {
    title: 'tổng quan',
    path: '/dashboard/app',
    icon: <LeaderboardRoundedIcon fontSize="small" />,
  },
  {
    title: 'tài khoản người dùng',
    path: '/dashboard/list-account',
    icon: <GroupIcon fontSize="small" />,
  },
  {
    title: 'tài khoản chủ sân',
    path: '/dashboard/list-owner',
    icon: <ManageAccountsIcon fontSize="small" />,
  },
  {
    title: 'Booking',
    path: '/dashboard/list-booking',
    icon: <BookOnlineIcon fontSize="small" />,
  },
  {
    title: 'môn thể thao',
    path: '/dashboard/sport',
    icon: <SportsSoccerRoundedIcon fontSize="small" />,
  },
];

export default navConfigOwner;
