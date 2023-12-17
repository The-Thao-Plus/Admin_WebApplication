import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

function TableAccountSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={15} />
            </Stack>
          </TableCell>

          <TableCell scope="row" padding="none">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton width={100} />
            </Stack>
          </TableCell>

          <TableCell align="left">
            <Skeleton width={120} />
          </TableCell>
          <TableCell align="left">
            <Skeleton width={150} />
          </TableCell>
          <TableCell align="left">
            <Skeleton width={80} />
          </TableCell>

          <TableCell align="left">
            <Skeleton width={80} />
          </TableCell>

          <TableCell align="left">
            <Skeleton variant="rounded" width={70} height={20} />
          </TableCell>

          <TableCell align="left" width={195}>
            <Skeleton variant="rounded" width={100} height={20} />
          </TableCell>

          <TableCell align="right">
            <IconButton size="large" color="inherit">
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default TableAccountSkeleton;
