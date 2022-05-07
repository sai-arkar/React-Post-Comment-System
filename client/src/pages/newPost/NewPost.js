import React, { useContext, useState } from 'react';
import styles from './NewPost.module.css';
import { useAuth } from '../../context/auth/AuthContext';
import RefresherContext from '../../context/refresher/RefresherContext';
function NewPost() {
  //consume provided user data
  const auth = useAuth();
  const { refresh, setRefresh } = useContext(RefresherContext);

  const initialState = {
    title: '',
    description: '',
  };
  const [fill, setFill] = useState(false);
  const [post, setPost] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
    if (post.title.trim().length > 0 && post.description.trim().length > 0) {
      setFill(false);
    } else {
      setFill(true);
    }
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const newPost = {
      authorId: auth.userInfo.id,
      title: post.title,
      description: post.description,
    };
    console.log(auth.userInfo);
    if (fill) {
      setErrorMsg('Fills all fileds');
    } else {
      auth.createPost(newPost);
      setPost(initialState);
      setRefresh(refresh + 1);
    }
  };
  return (
    <div className={styles.container}>
      {errorMsg && (
        <h3
          style={{ color: '#e9023c', padding: '20px', background: 'lightgrey' }}
        >
          {errorMsg}
        </h3>
      )}
      <form
        action=""
        className={styles.newpostForm}
        autoComplete="off"
        onSubmit={handleCreate}
      >
        <span className={styles.header}>Create New Post</span>
        <div className={styles.formControl}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="textarea">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="30"
            value={post.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button disabled={fill}>Create</button>
      </form>
    </div>
  );
}

export default NewPost;
