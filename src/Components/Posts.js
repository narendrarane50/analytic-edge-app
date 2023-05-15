import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PostsTable() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = () => {
    const start = (currentPage - 1) * 10; // Assuming 10 posts per page
    const limit = 10;

    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
      .then(response => response.json())
      .then(postsData => {
        setPosts(postsData);
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(response => response.json())
      .then(postsData => {
        const totalPosts = postsData.length;
        const pages = Math.ceil(totalPosts / 10); // Assuming 10 posts per page
        setTotalPages(pages);
      })
      .catch(error => console.error('Error:', error));
  };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Posts</h1>
      <table className="w-full border border-gray-800">
        {/* Table headers */}
        <thead>
          <tr>
            <th className="border border-gray-800 px-4 py-2">ID</th>
            <th className="border border-gray-800 px-4 py-2">Title</th>
            <th className="border border-gray-800 px-4 py-2">Body</th>
          </tr>
        </thead>
  
        {/* Table body */}
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td className="border border-gray-800 px-4 py-2">{post.id}</td>
              <td className="border border-gray-800 px-4 py-2">{post.title}</td>
              <td className="border border-gray-800 px-4 py-2">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handlePreviousPage}
          className="px-3 py-2 mx-1 bg-blue-500 text-white rounded"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-3 py-2 mx-1 bg-blue-500 text-white rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="px-3 py-2 mx-1 bg-blue-500 text-white rounded"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
  
      <Link to="/users" className="text-blue-500 hover:text-blue-700 block mt-4">
        Go to Users
      </Link>
      <Link to="/comments" className="text-blue-500 hover:text-blue-700 block mt-2">
        Go to Comments
      </Link>
    </div>
  );
}

export default PostsTable;