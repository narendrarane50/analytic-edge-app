import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CommentsTable() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(commentsData => setComments(commentsData))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Comments</h1>
      <table className="w-full border border-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="border-b border-r border-gray-800 px-4 py-2">ID</th>
            <th className="border-b border-r border-gray-800 px-4 py-2">Name</th>
            <th className="border-b border-r border-gray-800 px-4 py-2">Email</th>
            <th className="border-b border-gray-800 px-4 py-2">Body</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id} className="hover:bg-gray-100">
              <td className="border-b border-r border-gray-800 px-4 py-2">{comment.id}</td>
              <td className="border-b border-r border-gray-800 px-4 py-2">{comment.name}</td>
              <td className="border-b border-r border-gray-800 px-4 py-2">{comment.email}</td>
              <td className="border-b border-gray-800 px-4 py-2">{comment.body}</td>
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

export default CommentsTable;
