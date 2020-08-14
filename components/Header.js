import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}