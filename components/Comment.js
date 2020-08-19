import { Avatar, Grid } from "@material-ui/core";

const Comment = (props) => {
  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar alt={`avatar of ${props.author}`} src={props.avatar} style={{height: '50px', width: '50px'}} />
      </Grid>
      <Grid item xs zeroMinWidth>
        <h4 style={{ margin: 0, fontSize: '1rem'}}>{props.author}</h4>
        <p style={{ margin: '10px 0'}} >{props.content}</p>
        <p style={{ color: "gray", margin: 0 }}>{props.timeAgo}</p>
      </Grid>
    </Grid>
  )
}

export default Comment;