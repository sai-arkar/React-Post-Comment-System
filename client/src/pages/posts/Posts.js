import faker from '@faker-js/faker';
import React, { useContext } from 'react';
import PostsContext from '../../context/posts/PostsContext';
import styles from './Posts.module.css';
import AVATOR from '../../assets/images/avator.png';
import { Link, useNavigate } from 'react-router-dom';
function Posts() {
  const navigate = useNavigate();
  const { posts } = useContext(PostsContext);
  return (
    <div className={styles.container}>
      {' '}
      <div className={styles.allPostsList}>
        {posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <div
              className={styles.postImageWrapper}
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <img src={faker.image.city(640, 480, true)} alt="" />
            </div>
            <div className={styles.postInfo}>
              <span
                className={styles.postTitle}
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                {post.title}
              </span>
              <p className={styles.postDescription}>
                {post.description.length > 150
                  ? `${post.description.substr(0, 150)} . . .`
                  : post.description}
              </p>
              <div className={styles.authorInfo}>
                <div className={styles.authorWrapper}>
                  <img src={AVATOR} alt="" />
                </div>
                <Link to={`/authors/${post.author.id}?_embed=posts`}>
                  {post.author.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
