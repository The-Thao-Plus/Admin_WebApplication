import { Box, Card, CardContent, CardHeader, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { fShortenNumber } from '../../../utils/formatNumber';

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTrafficBySite({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {list.map((site) => (
            <Box key={site.name} component="a" href={site.link} sx={{ textDecoration: 'none' }}>
              <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                <Box sx={{ mb: 0.5 }}>{site.icon}</Box>

                <Typography variant="h6">{fShortenNumber(site.value)}</Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {site.name}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
