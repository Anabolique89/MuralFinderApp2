import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Set the active value based on the current location
    switch (location.pathname) {
      case '/':
        setValue(0);
        break;
      case '/Profile':
        setValue(1);
        break;
      case '/addWall':
        setValue(2);
        break;
      case '/Map':
        setValue(3);
        break;
      case '/ProfileSettings':
        setValue(4);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  const handleNavigation = (newValue, path) => {
    setValue(newValue);
    navigate(path);
  };

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction
            onClick={() => handleNavigation(0, '/')}
            label="Home"
            sx={{
              color: value === 0 ? 'primary.main' : '#353535',
              transform: value === 0 ? 'scale(1.2)' : 'scale(1)'
            }}
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            onClick={() => handleNavigation(1, '/Profile')}
            label="Profile"
            sx={{
              color: value === 1 ? 'primary.main' : '#353535',
              transform: value === 1 ? 'scale(1.2)' : 'scale(1)'
            }}
            icon={<PersonIcon />}
          />
          <BottomNavigationAction
            onClick={() => handleNavigation(2, '/addWall')}
            label="Add"
            sx={{
              color: value === 2 ? 'primary.main' : '#353535',
              transform: value === 2 ? 'scale(1.2)' : 'scale(1)'
            }}
            icon={<AddCircleIcon />}
          />
          <BottomNavigationAction
            onClick={() => handleNavigation(3, '/Map')}
            label="Map"
            sx={{
              color: value === 3 ? 'primary.main' : '#353535',
              transform: value === 3 ? 'scale(1.2)' : 'scale(1)'
            }}
            icon={<LocationOnIcon />}
          />
          <BottomNavigationAction
            onClick={() => handleNavigation(4, '/ProfileSettings')}
            label="Settings"
            sx={{
              color: value === 4 ? 'primary.main' : '#353535',
              transform: value === 4 ? 'scale(1.2)' : 'scale(1)'
            }}
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
