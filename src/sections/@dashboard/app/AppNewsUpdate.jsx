import { Box, Button, Card, CardHeader, Divider, Stack, Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { fToNow } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Link to="/dashboard/list-account">
          <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
            View all
          </Button>
        </Link>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.string,
    title: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  const { image, title, role, email, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography color="inherit" variant="subtitle2" underline="hover" noWrap textTransform="capitalize">
            {title}
          </Typography>

          <Typography color="inherit" variant="subtitle2" underline="hover" noWrap textTransform="capitalize">
            |
          </Typography>

          <Typography color="inherit" variant="subtitle2" underline="hover" noWrap textTransform="capitalize">
            {role}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {email}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(moment(postedAt))}
      </Typography>
    </Stack>
  );
}
