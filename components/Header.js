import { useState } from 'react';
import Link from 'next/link';
import SearchInput from './SearchInput';
import { AppBar, Toolbar, Typography, Button, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heading: {
    display: 'inline'
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  login: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      backgroundColor: 'transparent',
      color: 'white'
    }
  },
  signup: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(1)
    }
  }
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.up('sm'));
  const [showItems, setShowItems] = useState(true);

  const handleUserInput = () => setShowItems(false);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div>
            { showItems ? <Typography variant="h6" className={classes.heading}>
              <Link href="/"><a>Stockbets</a></Link>
            </Typography> : null }
            <SearchInput handleUserClick={handleUserInput} />
          </div>
          <div>
            { showItems ? <Link href="/login">
              <Button component="a" variant={breakpoint ? "outlined" : "contained"} color="inherit" className={classes.login} disableElevation>Login</Button>
            </Link> : null }
            <Link href="/signup">
              <Button component="a" variant="contained" className={classes.signup} disableElevation>Sign Up</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;