import { Divider, Grid, Skeleton, Stack } from '@mui/material';
import palette from 'src/theme/palette';

function AccountSkeleton({ role }) {
  console.log(role);
  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} md={4}>
        <Skeleton variant="circular" width={250} height={250} />
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
          <Skeleton variant="text" width={280} sx={{ fontSize: '32px' }} />
          <Grid container>
            <Grid item md={6}>
              <Stack direction="row" alignItems="center" mb={2}>
                <Skeleton width={150} />
              </Stack>
              <Stack direction="row" alignItems="center">
                <Skeleton width={150} />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" alignItems="center">
                <Skeleton variant="rounded" width={180} height={20} />
              </Stack>

              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid item md={6}>
              <Stack direction="row" alignItems="center" mb={2}>
                <Skeleton width={150} />
              </Stack>
              <Stack direction="row" alignItems="center">
                <Skeleton width={150} />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" alignItems="center" gap={1}>
                <Skeleton variant="rounded" width={180} height={20} />
              </Stack>

              <Divider sx={{ my: 2 }} />
            </Grid>
          </Grid>
        </Stack>
      </Grid>

      {role === 'owner' && (
        <Stack paddingX={3} mt={5}>
          <Skeleton width={250} height={40} />

          <Stack direction="column" gap={2} mt={1}>
            {Array.from({ length: 1 }).map(() => (
              <Stack direction="row" gap={1} p={2} sx={{ backgroundColor: palette.grey[100] }} borderRadius={2}>
                <Skeleton variant="rounded" width={100} height={100} />

                <Stack>
                  <Skeleton width={350} />
                  <Skeleton width={500} />
                  <Skeleton variant="rounded" width={90} height={20} />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </Grid>
  );
}

export default AccountSkeleton;
