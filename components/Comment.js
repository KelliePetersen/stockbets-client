import faker from 'faker';

const Comment = (props) => {
  return (
    <div className="comment">
      <a href="/" className="avatar">
        <img alt="avatar" src={faker.image.avatar()} />
      </a>
      <div className="content">
        <a href="/" className="author">
          {props.author}
        </a>
        <div className="metadata">
          <span className="date">
            {props.timeAgo}
          </span>
        </div>
        <div className="text">
          {faker.lorem.sentence()}
        </div>
      </div>
    </div>
  )
}

export default Comment;