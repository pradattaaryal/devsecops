import React from "react";
import { Author } from "../../types";

interface AuthorListProps {
  authors: Author[];
  loading: boolean;
  onEdit: (author: Author) => void;
  onDelete: (id: number) => void;
}

export const AuthorList: React.FC<AuthorListProps> = ({
  authors,
  loading,
  onEdit,
  onDelete
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Author ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Bio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {authors.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                {loading ? "Loading authors..." : "No authors found."}
              </td>
            </tr>
          ) : (
            authors.map((author) => (
              <tr key={author.author_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {author.author_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {author.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {author.bio}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(author)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this author?")) {
                          onDelete(author.author_id);
                        }
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
