import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Switch,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Label from 'src/components/label/Label';
import { useModal } from 'src/hooks/useModal';
import { activeSport, deactiveSport, deleteSport, setEditSport } from 'src/services/sport/sportSlice';
import AddSportModal from './AddSportModal';

function SportTableRow({ sportRow, index }) {
  const { _id, name, image, sportCenters, status } = sportRow;

  const dispatch = useDispatch();

  const { toogleOpen, isOpen } = useModal();
  const { toogleOpen: toogleOpenAdd, isOpen: isOpenAdd } = useModal();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell align="center" width={60}>
          <Typography variant="subtitle2">{index + 1}</Typography>
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={image} sx={{ width: 56, height: 56 }} />
            <Typography variant="subtitle2" noWrap sx={{ textTransform: 'capitalize' }}>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{sportCenters.length} trung tâm thể thao</TableCell>

        <TableCell align="left">
          <FormControlLabel
            control={
              <Switch
                size="small"
                color="success"
                checked={status}
                onClick={() => dispatch(status ? deactiveSport(_id) : activeSport(_id))}
              />
            }
            label={
              <Label color={(status === false && 'error') || 'success'}>
                {status ? 'Hoạt động' : 'Không hoạt động'}
              </Label>
            }
          />
        </TableCell>

        <TableCell align="right">
          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      {isOpenAdd && (
        <AddSportModal isOpenAdd={isOpenAdd} toogleOpenAdd={toogleOpenAdd} handleCloseMenu={handleCloseMenu} />
      )}

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
        <MenuItem
          onClick={() => {
            toogleOpenAdd();
            dispatch(setEditSport(sportRow));
          }}
        >
          <EditRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={toogleOpen}>
          <DeleteRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>

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
            <Typography variant="subtitle1">Bạn có muốn xóa môn thể thao này không?</Typography>
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
                dispatch(deleteSport(_id));
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

export default SportTableRow;
