import { Divider, Avatar, Grid } from "@material-ui/core";
import faker from 'faker';
import Comment from './Comment';

const CommentContainer = () => {

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
        <Comment author="Jane" avatar={faker.image.avatar()} content={faker.lorem.paragraph()} timeAgo="Today at 7:00pm"/>
        <Divider style={{margin:'20px 0'}} />
        <Comment author="David" avatar={faker.image.avatar()} content={faker.lorem.paragraph()} timeAgo="Today at 3:00pm"/>
        <Divider style={{margin:'20px 0'}} />
        <Comment author="Bob" avatar={faker.image.avatar()} content={faker.lorem.paragraph()} timeAgo="Today at 2:00pm"/>
        <Divider style={{margin:'20px 0'}} />
        <Comment author="Sarah" avatar={faker.image.avatar()} content={faker.lorem.paragraph()} timeAgo="Today at 1:00pm"/>
        <Divider style={{margin:'20px 0'}} />
        <Comment author="Lynda" avatar={faker.image.avatar()} content={faker.lorem.paragraph()} timeAgo="Today at 12:00pm"/>
      </div>
    </div>
  )
}

export default CommentContainer;
