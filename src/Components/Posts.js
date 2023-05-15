import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PostsTable() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(postsData => setPosts(postsData))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Posts</h1>
      <table className="w-full border border-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="border-b border-r border-gray-800 px-4 py-2">ID</th>
            <th className="border-b border-r border-gray-800 px-4 py-2">Title</th>
            <th className="border-b border-r border-gray-800 px-4 py-2">Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} className="hover:bg-gray-100">
              <td className="border-b border-r border-gray-800 px-4 py-2">{post.id}</td>
              <td className="border-b border-r border-gray-800 px-4 py-2">{post.title}</td>
              <td className="border-b border-gray-800 px-4 py-2">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/users" className="text-blue-500 hover:text-blue-700 block mt-4">
        Go to Users
      </Link>
    </div>
  );
}

export default PostsTable;
