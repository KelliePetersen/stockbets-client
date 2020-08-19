import { useState } from 'react';
import { Divider, Avatar, Grid, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import faker from 'faker';
import Comment from './Comment';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: '40px',
    width: '40px',
    [theme.breakpoints.up('sm')]: {
      height: '80px',
      width: '80px'
    }
  },
  commentInput: {
    width: '100%',
    height: '80px',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 0 8px rgba(0,0,0,0.2)',
    padding: '15px',
    resize: 'vertical',
    fontFamily: 'Arial',
    fontSize: '0.875rem',
    marginBottom: '10px',
    [theme.breakpoints.up('sm')]: {
      padding: '20px',
      borderRadius: '20px',
    }
  },
  button: {
    borderRadius: '20px'
  }
}));

const CommentContainer = () => {
  const classes = useStyles();
  const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [formValue, setformValue] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);
  }

  return (
    <div style={{marginTop: '80px'}}>
       
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt={`avatar of ${faker.name.findName()}`} src={faker.image.avatar()} className={classes.avatar} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <form className="commentForm" onSubmit={handleFormSubmit}>
            <textarea 
              name="content" 
              placeholder="Write your prediction here..."
              className={classes.commentInput} 
              value={formValue}
              onChange={(e) => setformValue(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>Comment</Button>
          </form>
        </Grid>
      </Grid>

      <h2 style={{margin: '50px 0 30px'}}>Predictions</h2>
      <div id="container">
        <Comment 
          author={faker.name.findName()} 
          avatar={faker.image.avatar()} 
          content={faker.lorem.paragraph()} 
          timeAgo={faker.date.past().toLocaleString("en-US", dateFormat)} 
        />
        <Divider style={{margin:'20px 0'}} />
        <Comment 
          author={faker.name.findName()} 
          avatar={faker.image.avatar()} 
          content={faker.lorem.paragraph()} 
          timeAgo={faker.date.past().toLocaleString("en-US", dateFormat)} 
        />
        <Divider style={{margin:'20px 0'}} />
        <Comment 
          author={faker.name.findName()} 
          avatar={faker.image.avatar()} 
          content={faker.lorem.paragraph()} 
          timeAgo={faker.date.past().toLocaleString("en-US", dateFormat)} 
        />
        <Divider style={{margin:'20px 0'}} />
        <Comment 
          author={faker.name.findName()} 
          avatar={faker.image.avatar()} 
          content={faker.lorem.paragraph()} 
          timeAgo={faker.date.past().toLocaleString("en-US", dateFormat)} 
        />
        <Divider style={{margin:'20px 0'}} />
        <Comment 
          author={faker.name.findName()} 
          avatar={faker.image.avatar()} 
          content={faker.lorem.paragraph()} 
          timeAgo={faker.date.past().toLocaleString("en-US", dateFormat)} 
        />
      </div>
    </div>
  )
}

export default CommentContainer;
