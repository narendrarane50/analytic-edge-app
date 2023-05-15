import React, { useEffect, useState } from "react";

function PostsTable() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterAttribute, setFilterAttribute] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const limit = 10; // Display 10 users per page

  //   useEffect(() => {
  //     fetchPosts();
  //   }, [currentPage]);

  //   const fetchPosts = () => {
  //     const start = (currentPage - 1) * 10; // Assuming 10 posts per page
  //     const limit = 10;

  //     fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
  //       .then(response => response.json())
  //       .then(postsData => {
  //         setPosts(postsData);
  //       })
  //       .catch(error => console.error('Error:', error));
  //   };

  useEffect(() => {
    fetchPosts();
  }, [
    searchKeyword,
    filterAttribute,
    filterValue,
    currentPage,
    sortColumn,
    sortDirection,
  ]);

  const fetchPosts = () => {
    let url = "https://jsonplaceholder.typicode.com/posts";

    // Calculate the starting index based on the current page and limit
    const startIndex = (currentPage - 1) * limit;

    // Add pagination parameters to the URL
    url += `?_start=${startIndex}&_limit=${limit}`;

    if (searchKeyword) {
      url += `&q=${searchKeyword}`;
    } else if (filterAttribute && filterValue) {
      url += `&${filterAttribute}=${filterValue}`;
    }

    if (sortColumn) {
      url += `&_sort=${sortColumn}&_order=${sortDirection}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((postsData) => {
        setPosts(postsData);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      // If the same column is clicked, toggle the sort direction
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // If a different column is clicked, set it as the new sort column with ascending direction
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((postsData) => {
        const totalPosts = postsData.length;
        const pages = Math.ceil(totalPosts / 10); // Assuming 10 posts per page
        setTotalPages(pages);
      })
      .catch((error) => console.error("Error:", error));
  };

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

      {/* Search Input */}
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Search..."
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      />

      {/* Filter Input */}
      <select
        value={filterAttribute}
        onChange={(e) => setFilterAttribute(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      >
        <option value="">Select Attribute</option>
        <option value="id">ID</option>
        <option value="title">Title</option>
      </select>
      <input
        type="text"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder="Enter Filter Value..."
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      />

      {/* Table */}
      <table className="w-full border border-gray-800">
        <thead>
          <tr>
            <th
              className="border border-gray-800 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              ID{" "}
              {sortColumn === "id" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th
              className="border border-gray-800 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("userId")}
            >
              User ID{" "}
              {sortColumn === "userId" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th
              className="border border-gray-800 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("title")}
            >
              Title{" "}
              {sortColumn === "title" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th
              className="border border-gray-800 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("body")}
            >
              Body{" "}
              {sortColumn === "body" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="border border-gray-800 px-4 py-2">{post.id}</td>
              <td className="border border-gray-800 px-4 py-2">
                {post.userId}
              </td>
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
    </div>
  );
}

export default PostsTable;
