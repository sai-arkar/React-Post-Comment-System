import React, { useContext } from 'react';
import AuthorsContext from '../../context/authors/AuthorsContext';
import styles from './Authors.module.css';
import AVATOR from '../../assets/images/avator.png';
import { useNavigate } from 'react-router-dom';
function Authors() {
  //get authors list form context
  const { authors } = useContext(AuthorsContext);

  //get author information deails
  const navigate = useNavigate();
  const getDetails = (id) => {
    navigate(`/authors/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Authors List</h1>
      <div className={styles.authorslist}>
        {authors.map((author) => (
          <div
            className={styles.author}
            key={author.id}
            onClick={() => getDetails(author.id)}
          >
            <div className={styles.nameWrapper}>
              <div className={styles.imageWrapper}>
                <img src={AVATOR} alt="" />
              </div>
              <span className={styles.authorName}>{author.name}</span>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
              dolorem quibusdam ipsam assumenda quidem, quasi, blanditiis
              mollitia, obcaecati pariatur et repellendus . . .
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Authors;
