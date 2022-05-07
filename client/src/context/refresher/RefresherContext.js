import { createContext, useState } from 'react';

const RefresherContext = createContext();

export const RefresherProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(0);
  return (
    <RefresherContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </RefresherContext.Provider>
  );
};

export default RefresherContext;
