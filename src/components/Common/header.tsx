import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function Header() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useAppSelector((s) => s.auth.currentUser);
  const name = user
    ? user.userInfo.fullName
      ? user.userInfo.fullName
      : user.userInfo.username
    : '';
  useEffect(() => {}, [user]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="Account settings">
          <Button
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {name}
            <Avatar sx={{ width: 32, height: 32, marginLeft: 1 }}>{name.split(' ')[0][0]}</Avatar>
          </Button>
        </Tooltip>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            minWidth: '180px',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> {t('Profile')}
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t('Settings')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </>
  );
}
