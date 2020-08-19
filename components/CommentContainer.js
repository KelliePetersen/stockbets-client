import { Divider, Avatar, Grid } from "@material-ui/core";
import faker from 'faker';
import Comment from './Comment';

const CommentContainer = () => {
  const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div style={{marginTop: '80px'}}>
       
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt={`avatar of ${faker.name.findName()}`} src={faker.image.avatar()} style={{height: '70px', width: '70px'}} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <form className="commentForm" onSubmit={handleFormSubmit}>
            <textarea rows="4" placeholder="Write your prediction here..." style={{width: '100%'}} />
            <button type="submit" className="">Comment</button>
          </form>
        </Grid>
      </Grid>

      <div style={{marginTop: '50px'}}>
        <h2 style={{marginBottom: '50px'}}>Predictions</h2>
        <Comment author={faker.name.findName()} avatar={faker.image.avatar()} content={faker.lorem.paragraph()} timeAgo={faker.date.past().toLocaleString("en-US", dateFormat)} />
        <Divider style={{margin:'20px 0'}} />
        <Comment author={faker.name.findName()} avatar={faker.image.avatar()} content={faker.lorem.paragraph()} timeAgo={faker.date.past().toLocaleString("en-US", dateFormat)} />
        <Divider style={{margin:'20px 0'}} />
        <Comment author={faker.name.findName()} avatar={faker.image.avatar()} content={faker.lorem.paragraph()} timeAgo={faker.date.past().toLocaleString("en-US", dateFormat)} />
        <Divider style={{margin:'20px 0'}} />
        <Comment author={faker.name.findName()} avatar={faker.image.avatar()} content={faker.lorem.paragraph()} timeAgo={faker.date.past().toLocaleString("en-US", dateFormat)} />
        <Divider style={{margin:'20px 0'}} />
        <Comment author={faker.name.findName()} avatar={faker.image.avatar()} content={faker.lorem.paragraph()} timeAgo={faker.date.past().toLocaleString("en-US", dateFormat)} />
      </div>
    </div>
  )
}

export default CommentContainer;
