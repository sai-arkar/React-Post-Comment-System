import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const signup = async (state, user) => {
  let successData = {};
  const newUser = {
    id: uuidv4(),
    name: user.name,
    email: user.email,
    password: user.password,
  };
  axios({
    method: 'post',
    url: `http://localhost:4000/api/v1/users`,
    data: newUser,
  }).then((response) => (successData = response.data));
  return successData;
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return signup(state, action.payload);
    default:
      return state;
  }
};
export default AuthReducer;
