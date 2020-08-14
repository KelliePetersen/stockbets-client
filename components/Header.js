import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between"
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">
            <Link href="/"><a>Stockbets</a></Link>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}