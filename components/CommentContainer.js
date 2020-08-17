import { Divider } from "@material-ui/core";
import Comment from './Comment';

const CommentContainer = () => {
  return (
    <div style={{marginTop: '80px'}}>
      <h2 style={{marginBottom: '50px'}}>Comments</h2>
      <Comment author="Jane" timeAgo="Today at 7:00pm"/>
      <Divider style={{margin:'20px 0'}} />
      <Comment author="David" timeAgo="Today at 3:00pm"/>
      <Divider style={{margin:'20px 0'}} />
      <Comment author="Bob" timeAgo="Today at 2:00pm"/>
      <Divider style={{margin:'20px 0'}} />
      <Comment author="Sarah" timeAgo="Today at 1:00pm"/>
      <Divider style={{margin:'20px 0'}} />
      <Comment author="Lynda" timeAgo="Today at 12:00pm"/>
    </div>
  )
}

export default CommentContainer;
