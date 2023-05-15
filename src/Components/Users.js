// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function UsersTable() {
//   const [users, setUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     fetchUsers();
//   }, [currentPage]);

//   const fetchUsers = () => {
//     const start = (currentPage - 1) * 10; // Assuming 10 users per page
//     const limit = 10;

//     fetch(`https://jsonplaceholder.typicode.com/users?_start=${start}&_limit=${limit}`)
//       .then(response => response.json())
//       .then(usersData => {
//         setUsers(usersData);
//       })
//       .catch(error => console.error('Error:', error));
//   };

//   useEffect(() => {
//     const pages = Math.ceil(users.length / 10); // Assuming 10 users per page
//     setTotalPages(pages);
//   }, [users]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div>
//       <h1 className="text-xl font-bold mb-4">Users</h1>
//       <table className="w-full border border-gray-800">
//         <thead>
//           <tr>
//             <th className="border border-gray-800 px-4 py-2">ID</th>
//             <th className="border border-gray-800 px-4 py-2">Name</th>
//             <th className="border border-gray-800 px-4 py-2">Email</th>
//             <th className="border border-gray-800 px-4 py-2">Username</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td className="border border-gray-800 px-4 py-2">{user.id}</td>
//               <td className="border border-gray-800 px-4 py-2">{user.name}</td>
//               <td className="border border-gray-800 px-4 py-2">{user.email}</td>
//               <td className="border border-gray-800 px-4 py-2">{user.username}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="mt-4 flex justify-center">
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
//           <button
//             key={page}
//             onClick={() => handlePageChange(page)}
//             className={`px-3 py-2 mx-1 bg-blue-500 text-white rounded ${currentPage === page ? 'bg-blue-700' : ''}`}
//           >
//             {page}
//           </button>
//         ))}
//       </div>

//       <Link to="/posts" className="text-blue-500 hover:text-blue-700 block mt-4">
//         Go to Posts
//       </Link>
//     </div>
//   );
// }

// export default UsersTable;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = () => {
    const start = (currentPage - 1) * 10; // Assuming 10 users per page
    const limit = 10;

    fetch(`https://jsonplaceholder.typicode.com/users?_start=${start}&_limit=${limit}`)
      .then(response => response.json())
      .then(usersData => {
        setUsers(usersData);
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = () => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(usersData => {
        const totalUsers = usersData.length;
        const pages = Math.ceil(totalUsers / 10); // Assuming 10 users per page
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
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <table className="w-full border border-gray-800">
        {/* Table headers */}
        <thead>
          <tr>
            <th className="border border-gray-800 px-4 py-2">ID</th>
            <th className="border border-gray-800 px-4 py-2">Name</th>
            <th className="border border-gray-800 px-4 py-2">Username</th>
            <th className="border border-gray-800 px-4 py-2">Email</th>
          </tr>
        </thead>
  
        {/* Table body */}
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border border-gray-800 px-4 py-2">{user.id}</td>
              <td className="border border-gray-800 px-4 py-2">{user.name}</td>
              <td className="border border-gray-800 px-4 py-2">{user.username}</td>
              <td className="border border-gray-800 px-4 py-2">{user.email}</td>
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
  
      <Link to="/posts" className="text-blue-500 hover:text-blue-700 block mt-4">
        Go to Posts
      </Link>
      <Link to="/comments" className="text-blue-500 hover:text-blue-700 block mt-2">
        Go to Comments
      </Link>
    </div>
  );
}

export default UsersTable;
