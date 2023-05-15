import React, { useEffect, useState } from 'react';


function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(usersData => setUsers(usersData))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <table className="w-full border border-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="border-b border-r border-gray-800 px-4 py-2">ID</th>
            <th className="border-b border-r border-gray-800 px-4 py-2">Name</th>
            <th className="border-b border-r border-gray-800 px-4 py-2">Username</th>
            <th className="border-b border-gray-800 px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border-b border-r border-gray-800 px-4 py-2">{user.id}</td>
              <td className="border-b border-r border-gray-800 px-4 py-2">{user.name}</td>
              <td className="border-b border-r border-gray-800 px-4 py-2">{user.username}</td>
              <td className="border-b border-gray-800 px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
