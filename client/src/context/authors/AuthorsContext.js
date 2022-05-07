import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RefresherContext from '../refresher/RefresherContext';

//create context
const AuthorsContext = createContext({});
//create provider
export const AuthorsProvider = ({ children }) => {
  //consuming provided value
  const { refresh } = useContext(RefresherContext);
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/authors`)
      .then((response) => setAuthors(response.data));
  }, [refresh]);
  return (
    <AuthorsContext.Provider
      value={{
        authors: authors,
      }}
    >
      {children}
    </AuthorsContext.Provider>
  );
};

export default AuthorsContext;
