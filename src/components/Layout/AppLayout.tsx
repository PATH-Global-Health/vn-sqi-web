import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Header } from 'components/Common/header';
import { authActions } from 'features/auth/authSlice';
import ReportFeature from 'features/report';
import SQiFeature from 'features/sqi';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Route, Switch } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { authUtils } from 'utils';

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);

const Link = styled(NavLink)({
  textDecoration: 'none',
  color: 'inherit',

  '&.active > div': {
    backgroundColor: 'whitesmoke',
  },
});

export function AppLayout() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const user = useAppSelector((s) => s.auth.currentUser);
  const access_token =
    localStorage.getItem('access_token') ?? sessionStorage.getItem('access_token');

  useEffect(() => {
    dispatch(authActions.getUserInfo());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-end' : 'flex-start',
            px: [1],
          }}
        >
          {open && (
            <Typography
              sx={{
                marginRight: '30px',
                fontWeight: 'bold',
              }}
            >
              {t('Provincial Data Hub')}
            </Typography>
          )}
          <IconButton onClick={toggleDrawer}>
            {open && <ChevronLeftIcon />}
            {!open && <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {authUtils.checkPermission(access_token, 'SQI_LIST_FORM') && (
            <Link to="/sqi">
              <ListItemButton>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="SQi Forms" />
              </ListItemButton>
            </Link>
          )}
          {authUtils.checkPermission(access_token, 'SQI_LIST_REPORT') && (
            <Link to="/report">
              <ListItemButton>
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Report" />
              </ListItemButton>
            </Link>
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Header />
        <Switch>
          {authUtils.checkPermission(access_token, 'SQI_LIST_FORM') && (
            <Route path="/sqi">
              <SQiFeature />
            </Route>
          )}
          {authUtils.checkPermission(access_token, 'SQI_LIST_REPORT') && (
            <Route path="/report">
              <ReportFeature />
            </Route>
          )}
        </Switch>
      </Box>
    </Box>
  );
}
