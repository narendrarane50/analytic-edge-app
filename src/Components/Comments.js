import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CommentsTable() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchComments();
  }, [currentPage]);

  const fetchComments = () => {
    const start = (currentPage - 1) * 10; // Assuming 10 comments per page
    const limit = 10;

    fetch(`https://jsonplaceholder.typicode.com/comments?_start=${start}&_limit=${limit}`)
      .then(response => response.json())
      .then(commentsData => {
        setComments(commentsData);
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = () => {
    fetch(`https://jsonplaceholder.typicode.com/comments`)
      .then(response => response.json())
      .then(commentsData => {
        const totalComments = commentsData.length;
        const pages = Math.ceil(totalComments / 10); // Assuming 10 comments per page
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
      <h1 className="text-xl font-bold mb-4">Comments</h1>
      <table className="w-full border border-gray-800">
        {/* Table headers */}
        <thead>
          <tr>
            <th className="border border-gray-800 px-4 py-2">ID</th>
            <th className="border border-gray-800 px-4 py-2">Name</th>
            <th className="border border-gray-800 px-4 py-2">Email</th>
            <th className="border border-gray-800 px-4 py-2">Body</th>
          </tr>
        </thead>
  
        {/* Table body */}
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td className="border border-gray-800 px-4 py-2">{comment.id}</td>
              <td className="border border-gray-800 px-4 py-2">{comment.name}</td>
              <td className="border border-gray-800 px-4 py-2">{comment.email}</td>
              <td className="border border-gray-800 px-4 py-2">{comment.body}</td>
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
    </div>
  );
}

export default CommentsTable;