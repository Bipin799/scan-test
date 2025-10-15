'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  CssBaseline,
  ListItemButton,
  ListItemIcon,
  Avatar,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  Tooltip,
  Paper
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Storage as DataIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  ShowChart as LineChartIcon,
  BarChart as BarChartIcon,
  LocalHospital as PatientIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TableChartIcon from "@mui/icons-material/TableChart";

const drawerWidth = 280;
const collapsedDrawerWidth = 72;

// Define the color palette based on the requested green
const greenPalette = {
  main: '#4ba251ff',
  light: '#7ed482',
  dark: '#2d7231',
  contrastText: '#ffffff'
};

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });


  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { label: 'Users', path: '/user', icon: <PersonIcon /> },
    { label: 'Post', path: '/post', icon: <DataIcon /> },
    { label: "Table", path: "/table", icon: <TableChartIcon /> },
    { label: "Line Chart", path: "/linegraph", icon: <LineChartIcon /> },
    { label: "Bar Chart", path: "/bargraph", icon: <BarChartIcon /> },
    { label: "Patient", path: "/patient", icon: <PatientIcon /> },
  ];

  

  return (
    <Box sx={{ display: 'flex', minHeight: '50vh', }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: isMobile ? '100%' : `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)`,
          ml: isMobile ? 0 : `${open ? drawerWidth : collapsedDrawerWidth}px`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: `linear-gradient(135deg, ${greenPalette.main} 0%, ${greenPalette.dark} 100%)`,
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 3,  }}>
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ 
                mr: 2,
                mb:2,
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                '&:hover': {
                  background: 'rgba(255,`255, 255, 0.2)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography 
              variant="h6" 
              noWrap 
              component="div"
              sx={{ 
                fontWeight: 700,
                fontSize: '1.5rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                pb:2,
              }}
            >
              My Dashboard
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Search">
              <IconButton 
                color="inherit"
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { background: 'rgba(255, 255, 255, 0.2)' }
                }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton 
                color="inherit"
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { background: 'rgba(255, 255, 255, 0.2)' }
                }}
              >
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: `linear-gradient(135deg, ${greenPalette.light} 0%, ${greenPalette.main} 100%)`,
                border: '2px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              AD
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Enhanced Sidebar Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? false : open}
        onClose={() => isMobile && setOpen(false)}
        sx={{
          width: open ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedDrawerWidth,
            overflowX: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '3px',
            },
          },
        }}
      >
        {/* Header Section */}
        <Box sx={{ 
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          background: `linear-gradient(135deg, ${greenPalette.main} 0%, ${greenPalette.dark} 100%)`,
          position: 'relative'
        }}>
          {open && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              animation: 'fadeIn 0.3s ease-in'
            }}>
              <DashboardIcon sx={{ color: 'white', mr: 1, fontSize: '1.8rem' }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.2rem'
                }}
              >
                Admin Panel
              </Typography>
            </Box>
          )}
          {!open && (
            <DashboardIcon sx={{ color: 'white', fontSize: '1.8rem' }} />
          )}
        </Box>

        <Divider sx={{ 
          borderColor: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 1px 0 rgba(255, 255, 255, 0.05)'
        }} />

        {/* User Profile Section */}
        {/* {open && (
          <Box sx={{ 
            p: 2, 
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease-in'
          }}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                mx: 'auto',
                mb: 1,
                background: `linear-gradient(135deg, ${greenPalette.light} 0%, ${greenPalette.main} 100%)`,
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              AD
            </Avatar>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
              Admin User
            </Typography>
            <Chip
              label="Online"
              size="small"
              sx={{
                background: `linear-gradient(135deg, ${greenPalette.light} 0%, ${greenPalette.main} 100%)`,
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 600,
                mt: 1
              }}
            />
          </Box>
        )} */}

        <Divider sx={{ 
          borderColor: 'rgba(255, 255, 255, 0.08)',
          my: 1
        }} />

        {/* Navigation Menu */}
        <List sx={{ px: 1, pt: 2 }}>
          {menuItems.map((item, index) => (
            <ListItem 
              disablePadding 
              key={item.path}
              sx={{ mb: 1 }}
            >
              <Tooltip 
                title={!open ? item.label : ''} 
                placement="right"
                arrow
              >
                <ListItemButton
                  component={Link}
                  href={item.path}
                  selected={pathname === item.path}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    minHeight: 48,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&.Mui-selected': {
                      background: `linear-gradient(135deg, ${greenPalette.main} 0%, ${greenPalette.dark} 100%)`,
                      color: 'white',
                      transform: 'translateX(4px)',
                      boxShadow: `0 4px 20px ${greenPalette.main}80`,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: '4px',
                        background: `linear-gradient(180deg, ${greenPalette.light} 0%, ${greenPalette.main} 100%)`,
                        borderRadius: '0 2px 2px 0'
                      },
                      '&:hover': {
                        background: `linear-gradient(135deg, ${greenPalette.dark} 0%, #1e4b22 100%)`,
                        transform: 'translateX(6px)',
                      },
                    },
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.08)',
                      transform: 'translateX(2px)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: pathname === item.path ? 'white' : 'rgba(255, 255, 255, 0.7)',
                      minWidth: open ? 40 : 'auto',
                      mr: open ? 2 : 0,
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    sx={{ 
                      opacity: open ? 1 : 0,
                      color: pathname === item.path ? 'white' : 'rgba(255, 255, 255, 0.9)',
                      '& .MuiListItemText-primary': {
                        fontWeight: pathname === item.path ? 600 : 500,
                        fontSize: '0.95rem'
                      }
                    }} 
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>

        {/* Settings at Bottom */}
        <Box sx={{ mt: 'auto', p: 1 }}>
          <Divider sx={{ 
            borderColor: 'rgba(255, 255, 255, 0.08)',
            mb: 1
          }} />
          <Tooltip title={!open ? 'Settings' : ''} placement="right" arrow>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mx: 1,
                minHeight: 48,
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  minWidth: open ? 40 : 'auto',
                  mr: open ? 2 : 0,
                  justifyContent: 'center'
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Settings"
                sx={{ 
                  opacity: open ? 1 : 0,
                  color: 'rgba(255, 255, 255, 0.9)',
                  '& .MuiListItemText-primary': {
                    fontSize: '0.95rem'
                  }
                }} 
              />
            </ListItemButton>
          </Tooltip>
        </Box>
      </Drawer>

      <Paper
        component="main"
        elevation={0}
      sx={{
          flexGrow: 1,
          minHeight: '100vh',
          mt: 8,
          ml: isMobile ? 0 : 0,
          // background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          background: ' #ffffffff',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: `linear-gradient(135deg, ${greenPalette.main}20 0%, ${greenPalette.dark}10 100%)`,
            pointerEvents: 'none'
          }
        }}
      >
        <Box sx={{ 
          p: { xs: 2, sm: 3, md: 4 },
          position: 'relative',
          zIndex: 1
        }}>
          {children}
        </Box>
      </Paper>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}