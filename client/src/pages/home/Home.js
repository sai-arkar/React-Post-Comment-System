import faker from '@faker-js/faker';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import AVATOR from '../../assets/images/avator.png';
import PostsContext from '../../context/posts/PostsContext';
function Home() {
  const { featuredPosts, allPosts } = useContext(PostsContext);
  const naviagte = useNavigate();
  return (
    <div className={styles.container}>
      <h1>Posts And Comments System</h1>
      {/* featured posts */}
      <section className={styles.featuredPosts}>
        {/* featured title */}
        <div className={styles.featuredTitle}>
          <h2>
            <span>Featured Posts</span>
          </h2>
        </div>
        {/* fetaured post  */}
        <div className={styles.featuredPostsList}>
          {featuredPosts.map((featuredPost) => (
            <div
              className={styles.featuredPost}
              key={featuredPost.id}
              onClick={() => naviagte(`/posts/${featuredPost.id}`)}
            >
              <div className={styles.imageWrapper}>
                <img src={faker.image.city(640, 480, true)} alt="" />
              </div>
              <div className={styles.featuredPostInfo}>
                <span className={styles.featuredPostTitle}>
                  {featuredPost.title}
                </span>
                <p className={styles.featuredPostDescription}>
                  {featuredPost.description.length > 200
                    ? `${featuredPost.description.substr(0, 200)} . . .`
                    : featuredPost.description}
                </p>
                <div className={styles.authorInfo}>
                  <div className={styles.authorWrapper}>
                    <img src={AVATOR} alt="" />
                  </div>
                  <Link to={`/authors/${featuredPost.author.id}?_embed=posts`}>
                    {featuredPost.author.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* All posts */}
      <section>
        <div className={styles.allPostsTitle}>
          <h2>
            <span>All Posts</span>
          </h2>
        </div>
        <div className={styles.allPostsList}>
          {allPosts.map((post) => (
            <div
              className={styles.post}
              key={post.id}
              onClick={() => naviagte(`/posts/${post.id}`)}
            >
              <div className={styles.postImageWrapper}>
                <img src={faker.image.nature(640, 480, true)} alt="" />
              </div>
              <div className={styles.postInfo}>
                <span className={styles.postTitle}>{post.title}</span>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/posts" className={styles.morePosts}>
            More Posts
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
