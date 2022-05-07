import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RefresherContext from '../refresher/RefresherContext';
//create context
const PostsContext = createContext({});
//create provider
export const PostsProvider = ({ children }) => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  //consuming provided value
  const { refresh } = useContext(RefresherContext);
  console.log(refresh);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/posts?_expand=author&_start=0&_end=4`)
      .then((response) => {
        setFeaturedPosts(response.data);
        return axios.get(
          `http://localhost:4000/api/v1/posts?_expand=author&_sort=id&_order=desc&_start=0&_end=6`
        );
      })
      .then((response) => {
        setAllPosts(response.data);
        return axios.get(
          `http://localhost:4000/api/v1/posts?_expand=author&_sort=id&_order=desc`
        );
      })
      .then((response) => setPosts(response.data));
  }, [refresh]);
  return (
    <PostsContext.Provider
      value={{
        featuredPosts: featuredPosts,
        allPosts: allPosts,
        posts: posts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
