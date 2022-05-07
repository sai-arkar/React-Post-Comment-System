import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import styles from './Author.module.css';
import AVATOR from '../../assets/images/avator.png';
function Author() {
  const navigate = useNavigate();
  const params = useParams();
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/authors/${params.aid}?_embed=posts&_order=desc`
      )
      .then((response) => {
        setAuthor(response.data);
        setLoading(false);
      });
  }, [params.aid]);
  const { id, name, email, posts } = author;
  return loading ? (
    <h1 className={styles.loading}>Loading...</h1>
  ) : (
    <div className={styles.container}>
      <div className={styles.authorInfo} key={id}>
        <div className={styles.imageWrapper}>
          <img src={AVATOR} alt="" />
        </div>
        <span className={styles.authorName}>{name}</span>
        <a href={email} className={styles.authorEmail}>
          @{email}{' '}
        </a>
        <p className={styles.authorAbout}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore odit
          iusto distinctio voluptatibus aliquam corrupti, dolorem ipsa, nisi
          maxime earum minima quas, porro quisquam unde expedita incidunt
          dolores error. Temporibus fuga sed qui tempora laborum nesciunt odio,
          esse placeat, consectetur, ut voluptatibus excepturi nam libero
          reprehenderit quidem labore laudantium ducimus?
        </p>
      </div>

      <div className={styles.postsList}>
        {posts.map((post) => (
          <div
            className={styles.post}
            key={post.id}
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <div className={styles.imageWrapper}>
              <img src={`${faker.image.city(640, 480, true)}`} alt="" />
            </div>
            <div className={styles.postInfo}>
              <span className={styles.postTitle}>{post.title}</span>
              <p className={styles.postDescription}>
                {post.description.length > 300
                  ? `${post.description.substr(0, 300)} . . .`
                  : post.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Author;
