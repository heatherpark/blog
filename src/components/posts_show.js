import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    // fetch post with id that matches ID param value in URL
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    // delete post with id that matches ID param value in URL
    const { id } = this.props.match.params;
    // pass callback to action creator to redirect after post deletion
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  // in 'posts' state, find post with key/id that matches id param value in URL
  // pass as prop
  return { post: posts[ownProps.match.params.id] };
}

// connect Redux state to PostsIndex component by having Redux pass
// necessary pieces of state and action creators as props
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
