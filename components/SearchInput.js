import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  search: {
    display: 'inline-block',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
}));

const SearchInput = (props) => {
  const [value, setValue] = useState('');
  const router = useRouter();
  const classes = useStyles();
  const { handleUserFocus, handleUserLeaveFocus } = props;

  const handleClick = event => {
    console.log('clicked input');
  }

  const handleKeyDown = (event) => {
    if (value && event.key === 'Enter') {
      router.push('/stock/[id]', `/stock/${value}`);
    }
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleUserFocus}
        onBlur={handleUserLeaveFocus}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchInput;