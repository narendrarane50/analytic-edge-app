import React, { useEffect, useState } from 'react';


function UsersTable() {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterAttribute, setFilterAttribute] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [searchKeyword, filterAttribute, filterValue, currentPage]);

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

const fetchUsers = () => {
    let url = 'https://jsonplaceholder.typicode.com/users';

    const limit = 10; // Display 10 users per page
  
    // Calculate the starting index based on the current page and limit
    const startIndex = (currentPage - 1) * limit;
  
    // Add pagination parameters to the URL
    url += `?_start=${startIndex}&_limit=${limit}`;
  
    if (searchKeyword) {
      url += `&q=${searchKeyword}`;
    } else if (filterAttribute && filterValue) {
      url += `&${filterAttribute}=${filterValue}`;
    }
  
    fetch(url)
      .then(response => response.json())
      .then(usersData => {
        // Calculate the total number of pages
        const totalPages = Math.ceil(usersData.length / limit);
  
        setUsers(usersData);
        setTotalPages(totalPages);
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

      {/* Global Search */}
    <input
      type="text"
      value={searchKeyword}
      onChange={(e) => setSearchKeyword(e.target.value)}
      placeholder="Search..."
      className="border border-gray-300 rounded px-4 py-2 mb-4"
    />

    {/* Filter by Attribute and Value */}
    <select
      value={filterAttribute}
      onChange={(e) => setFilterAttribute(e.target.value)}
      className="border border-gray-300 rounded px-4 py-2 mb-4"
    >
      <option value="">Select Attribute</option>
      <option value="name">Name</option>
      <option value="username">Username</option>
      <option value="email">Email</option>
    </select>
    <input
      type="text"
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
      placeholder="Enter Filter Value..."
      className="border border-gray-300 rounded px-4 py-2 mb-4"
    />


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
    </div>
  );
}

export default UsersTable;
