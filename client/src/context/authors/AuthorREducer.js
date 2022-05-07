const getAuthorDetail = async (id) => {
  try {
    let authorDetails = await fetch(
      `http://localhost:4000/api/v1/authors/${id}?_embed=posts`
    );
    authorDetails = await authorDetails.json();
    return authorDetails;
  } catch (error) {
    console.log(error);
  }
};
//create reducer function
const authorReducer = async (state, action) => {
  switch (action.type) {
    case 'GET_AUTHOR_DETAIL':
      return { authorDetail: await getAuthorDetail(action.payload) };
    default:
      return state;
  }
};

export default authorReducer;
