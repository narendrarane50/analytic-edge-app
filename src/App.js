import { Routes, Route, Link } from "react-router-dom";
import Users from "./Components/Users";
import Comments from "./Components/Comments";
import Posts from "./Components/Posts";

function App() {
  return (
    <div className="container mx-auto px-4">
      <nav className="my-8">
        <ul className="flex space-x-4">
          <li>
            <Link to="/users" className="text-blue-500 hover:text-blue-700">
              Users
            </Link>
          </li>
          <li>
            <Link to="/posts" className="text-blue-500 hover:text-blue-700">
              Posts
            </Link>
          </li>
          <li>
            <Link to="/comments" className="text-blue-500 hover:text-blue-700">
              Comments
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mb-4">
        <Routes>
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>

      <div className="mb-4">
        <Routes>
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>

      <div>
        <Routes>
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
