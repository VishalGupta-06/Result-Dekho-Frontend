import React, { useState } from "react";

function ListofResult({ data = [] }) {
  const rowsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = Math.max(1, Math.ceil(data.length / rowsPerPage));

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const visibleButtons = 5;

  let startPage = currentPage;
  let endPage = startPage + visibleButtons - 1;

  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = Math.max(1, endPage - visibleButtons + 1);
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-2xl ">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              CGPA Leaderboard
            </h1>
            <p className="text-gray-500 mt-1">
              Ranked by cumulative grade point average
            </p>
          </div>

          <div className="bg-indigo-50 px-4 py-2 rounded-lg">
            <span className="text-indigo-700 font-semibold">
              Total Students: {data.length}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl  overflow-hidden">
          <table className="w-full bg-white border border-gray-400 ">
            <thead>
               <tr className="bg-[#015cee] text-white">
                <th className="px-6 py-4 text-left font-semibold">RANK</th>
                <th className="px-6 py-4 text-left font-semibold">NAME</th>
                <th className="px-6 py-4 text-left font-semibold">
                  REGISTRATION No.
                </th>
                <th className="px-6 py-4 text-center font-semibold">CGPA</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((value, index) => {
                const rank = indexOfFirstItem + index + 1;

                return (
                  <tr
                    key={value.rollNo}
                    className="
                      border-b border-gray-100
                      even:bg-gray-200
                      hover:bg-indigo-50
                      transition-colors duration-200
                    "
                  >
                    <td className="px-6 py-4">
                      {rank === 1 ? (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-bold">
                          🥇 1
                        </span>
                      ) : rank === 2 ? (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-bold">
                          🥈 2
                        </span>
                      ) : rank === 3 ? (
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-bold">
                          🥉 3
                        </span>
                      ) : (
                        <span className="font-medium text-gray-700">
                          {rank}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {value.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{value.rollNo}</td>

                    <td className="px-6 py-4 text-center font-bold text-indigo-600">
                      {value.cgpa}
                    </td>
                  </tr>
                );
              })}

              {/* Empty rows to keep table height fixed */}
              {Array.from({
                length: rowsPerPage - currentItems.length,
              }).map((_, index) => (
                <tr
                  key={`empty-${index}`}
                  className="border-b border-gray-100 even:bg-gray-50"
                >
                  <td className="px-6 py-4">&nbsp;</td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl ">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="
                px-4 py-2 rounded-lg border border-gray-300
                bg-white text-gray-700
                hover:bg-gray-100
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-all
              "
            >
              Prev
            </button>

            {Array.from(
              { length: endPage - startPage + 1 },
              (_, index) => startPage + index,
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  px-4 py-2 rounded-lg border transition-all duration-200
                  ${
                    currentPage === page
                      ? "bg-[#015cee]  text-white border-transparent shadow-lg scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
                  }
                `}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPage}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="
                px-4 py-2 rounded-lg border border-gray-300
                bg-white text-gray-700
                hover:bg-gray-100
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-all
              "
            >
              Next
            </button>
          </div>
        </div>

        {/* Page Info */}
        <div className="text-center mt-4 text-gray-500 font-medium">
          Page {currentPage} of {totalPage}
        </div>
      </div>
    </div>
  );
}

export default ListofResult;
