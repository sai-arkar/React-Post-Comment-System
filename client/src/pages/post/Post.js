import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
import styles from './Post.module.css';
import AVATOR from '../../assets/images/avator.png';
import faker from '@faker-js/faker';
import RefresherContext from '../../context/refresher/RefresherContext';
function Post() {
  //consuming provided value
  const auth = useAuth();
  const { refresh, setRefresh } = useContext(RefresherContext);

  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  //getting data from fetching APIs
  useEffect(() => {
    const postRequest = axios.get(
      `http://localhost:4000/api/v1/posts/${params.pId}?_expand=author`
    );
    const commentsRequest = axios.get(
      `http://localhost:4000/api/v1/posts/${params.pId}/comments?_expand=author`
    );
    axios
      .all([postRequest, commentsRequest])
      .then(
        axios.spread((postResponse, commentsResponse) => {
          setPost(postResponse.data);
          setComments(commentsResponse.data);
          setLoading(false);
        })
      )
      .catch((err) => {
        auth.setErrorMsg('Something Wrong');
        setLoading(false);
      });
  }, [params.pId, refresh]);

  //commenter
  const [commentText, setCommentText] = useState('');
  const handleComment = (event) => {
    event.preventDefault();
    if (auth.userInfo.email) {
      const newComment = {
        postId: post.id,
        authorId: auth.userInfo.id,
        comment: commentText,
      };
      auth.createComment(newComment);
      setRefresh(refresh + 1);
      setCommentText('');
    } else {
      alert('You Need to Login!');
    }
  };

  //delete comment
  const deleteCommentHandler = (comment) => {
    auth.deleteComment(comment);
    setRefresh(refresh + 1);
    function deleted() {
      alert('Deleted');
    }
    setTimeout(deleted, 100);
  };
  return loading ? (
    <h1>Loading..</h1>
  ) : (
    <div className={styles.container}>
      <section className={styles.authorInfo}>
        <div className={styles.authorWrapper}>
          <img src={AVATOR} alt="" />
        </div>
        <Link to={`/authors/${post.author.id}`}>{post.author.name}</Link>
      </section>
      <section className={styles.post}>
        <span>{post.title}</span>
        <img src={faker.image.nature(1234, 2345, true)} alt="" />
        <p>{post.description}</p>
      </section>
      <section className={styles.comments}>
        <span className={styles.commentsCount}>
          {comments.length ? `${comments.length} comments` : ``}
        </span>
        {comments.map((comment) => (
          <div className={styles.comment} key={comment.id}>
            <div className={styles.commenterWrapper}>
              <img src={AVATOR} alt="" />
            </div>
            <div>
              <div className={styles.commenterInfo}>
                <Link to={`/authors/${comment.author.id}`}>
                  {comment.author.name}
                </Link>
                <span>{comment.comment}</span>
              </div>
              {comment.author.email === auth.userInfo.email && (
                <button
                  className={styles.deleteComment}
                  onClick={() => deleteCommentHandler(comment)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
      <section className={styles.commentBox}>
        <form action="" onSubmit={handleComment}>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder="your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button disabled={commentText.trim().length > 0 ? false : true}>
            comment
          </button>
        </form>
      </section>
    </div>
  );
}

export default Post;
