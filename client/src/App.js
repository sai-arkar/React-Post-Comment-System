import { Route, Routes } from 'react-router-dom';
import { AuthorsProvider } from './context/authors/AuthorsContext';
import { PostsProvider } from './context/posts/PostsContext';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/auth/Login/Login';
import Signup from './pages/auth/Signup/Signup';
import Authors from './pages/authors/Authors';
import NewPost from './pages/newPost/NewPost';
import Author from './pages/author/Author';
import Home from './pages/home/Home';
import Posts from './pages/posts/Posts';
import Post from './pages/post/Post';
import { AuthProvider } from './context/auth/AuthContext';
import { ProtectedRoute } from './protected/ProtectedRoute';
import { RefresherProvider } from './context/refresher/RefresherContext';

function App() {
  return (
    <RefresherProvider>
      <AuthorsProvider>
        <PostsProvider>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/posts" element={<Posts />}></Route>
              <Route path="/posts/:pId" element={<Post />}></Route>
              <Route path="signup" element={<Signup />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route
                path="newpost"
                element={
                  <ProtectedRoute>
                    <NewPost />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="authors" element={<Authors />}></Route>
              <Route path="authors/:aid" element={<Author />}></Route>
            </Routes>
          </AuthProvider>
        </PostsProvider>
      </AuthorsProvider>
    </RefresherProvider>
  );
}

export default App;
