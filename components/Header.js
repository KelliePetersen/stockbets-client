import Link from 'next/link';
import SearchInput from './SearchInput';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heading: {
    display: 'inline'
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  signup: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1)
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography variant="h6" className={classes.heading}>
              <Link href="/"><a>Stockbets</a></Link>
            </Typography>
            <SearchInput />
          </div>
          <div>
            <Link href="/login">
              <Button component="a" variant="outlined" color="inherit">Login</Button>
            </Link>
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