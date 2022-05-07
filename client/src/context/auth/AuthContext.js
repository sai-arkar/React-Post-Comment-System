import { createContext, useContext, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //state
  const [userInfo, setUserInfo] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  //navigate
  const navigate = useNavigate();

  //for signup
  const signup = (user) => {
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const newAuthor = {
      name: user.name,
      email: user.email,
    };
    axios
      .post(`http://localhost:4000/api/v1/users`, newUser)
      .then(() => {
        return axios.post(`http://localhost:4000/api/v1/authors`, newAuthor);
      })
      .then((response) => {
        setSuccessMsg('Success!Please Login');
        navigate('/login');
      })
      .catch((err) => {
        setErrorMsg('Something Wrong! Error');
      });
  };

  //login
  const login = (user) => {
    axios
      .get(
        `http://localhost:4000/api/v1/users?email=${user.email}&password=${user.password}`
      )
      .then((response) => {
        const { id, name, email } = response.data[0];
        setUserInfo({ id: id, name: name, email: email });
        navigate('/');
      })
      .catch((err) => setErrorMsg('Something Wrong! Error'));
  };

  //logout
  const logout = () => {
    setUserInfo(null);
    navigate('/');
  };

  //createPost
  const createPost = (post) => {
    axios
      .post(`http://localhost:4000/api/v1/posts`, post)
      .then((response) => navigate(`/authors/${response.data.authorId}`))
      .catch((err) => setErrorMsg('Something Wrong!'));
  };

  //createComment
  const createComment = (comment) => {
    axios
      .post(`http://localhost:4000/api/v1/comments`, comment)
      .then((response) => {
        return true;
      })
      .catch((err) => {
        setErrorMsg('Something Wrongs!');
      });
  };
  //deleteComment
  const deleteComment = (comment) => {
    axios
      .delete(`http://localhost:4000/api/v1/comments/${comment.id}`)
      .then((result) => {
        return true;
      })
      .catch((err) => {
        setErrorMsg('Something Wrongs!');
      });
  };

  //rendering
  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        successMsg,
        setSuccessMsg,
        errorMsg,
        setErrorMsg,
        signup,
        login,
        logout,
        createPost,
        createComment,
        deleteComment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
