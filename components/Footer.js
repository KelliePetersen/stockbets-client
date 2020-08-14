import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    padding: '20px 0',
    borderTop: '1px solid #eaeaea',
    alignItems: 'center',
    textAlign: 'center',
    '& a': {
      fontWeight: 'bold',
    },
    '& a:hover': {
      color: theme.palette.primary.main
    }
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <p>&copy; Stockbets 2020. All rights reserved.</p>
      <p>
        Created by&nbsp;
        <a
          href="https://www.parchot.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Parchot
        </a>
      </p>
    </footer>
  )
}

export default Footer;
